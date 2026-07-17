'use client';

/**
 * PhysicsCloud.tsx  —  Production-ready 2D physics bubble cloud
 *
 * Major changes vs. the old broken version:
 *  1. initPhysics() is a pure function called by a ResizeObserver, NOT from
 *     inside useEffect directly. This eliminates the race condition where the
 *     container had zero size at mount time.
 *  2. Bubble DOM refs are collected into a Map<index, HTMLDivElement> and the
 *     animation loop starts only once every slot is filled.
 *  3. Initial positions use a deterministic spiral / grid layout with a small
 *     random jitter — no pure-random placement, so bubbles never pile up in
 *     one corner or overlap badly on first load.
 *  4. container.getBoundingClientRect() is used for world dimensions instead of
 *     clientWidth / clientHeight (avoids stale values in some browsers).
 *  5. Collision distance is clamped to ≥ 1 px before any division to prevent
 *     divide-by-zero NaN propagation.
 *  6. ResizeObserver re-initialises the world when the container is resized
 *     (e.g. responsive layout shift), cleaning up the previous loop first.
 *  7. Full cleanup on unmount: cancelAnimationFrame + ResizeObserver.disconnect.
 */

import { useEffect, useRef } from 'react';
import { skills } from '@/data/skills';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Bubble {
  id: number;
  x: number;   // centre x in container-local coords
  y: number;   // centre y
  vx: number;
  vy: number;
  radius: number;
  mass: number;
  text: string;
  category: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const categoryColors: Record<string, string> = {
  'Languages':    'border-white/40  bg-white/10  text-white',
  'Frontend':     'border-gray-300/40 bg-gray-300/10 text-gray-200',
  'Backend':      'border-gray-400/40 bg-gray-400/10 text-gray-300',
  'Tools':        'border-gray-500/40 bg-gray-500/10 text-gray-400',
  'AI/ML':        'border-white/20  bg-white/5   text-gray-300',
  'Soft Skills':  'border-gray-600/40 bg-gray-600/10 text-gray-400',
};

const DAMPING         = 0.985;   // velocity damping per frame
const MOUSE_RADIUS    = 120;     // px — mouse repulsion zone
const MOUSE_STRENGTH  = 0.6;     // repulsion force scalar
const DRAG_STIFFNESS  = 0.25;    // spring stiffness for dragged bubble
const BASE_SPEED      = 0.4;     // max random initial velocity component
const WALL_RESTITUTION = 0.55;   // bounciness on wall hit

// Radius derived from skill name length — same formula as before
function bubbleRadius(name: string) {
  return Math.max(40, name.length * 5 + 20);
}

// ─── Deterministic initial layout ─────────────────────────────────────────────
/**
 * Arrange N bubbles in a sunflower / Vogel spiral so they are evenly spread
 * across the container from the very first frame, with a small random jitter.
 * This prevents the "all bubbles in top-left" problem caused by setting
 * position after the first render.
 */
function computeInitialPositions(
  radii: number[],
  worldW: number,
  worldH: number
): { x: number; y: number }[] {
  const n = radii.length;
  const golden = Math.PI * (3 - Math.sqrt(5)); // golden angle ≈ 137.5°

  const cx = worldW / 2;
  const cy = worldH / 2;
  // Maximum spiral radius — leave a margin equal to the largest bubble
  const maxR = Math.min(cx, cy) * 0.88;

  return radii.map((r, i) => {
    const t      = i / Math.max(n - 1, 1);        // 0 → 1
    const dist   = Math.sqrt(t) * maxR;            // Vogel spiral radius
    const angle  = i * golden;
    const jitter = r * 0.3;                        // ≤ 30 % of bubble radius

    const x = cx + dist * Math.cos(angle) + (Math.random() - 0.5) * jitter;
    const y = cy + dist * Math.sin(angle) + (Math.random() - 0.5) * jitter;

    // Clamp so bubble stays within bounds
    return {
      x: Math.max(r, Math.min(worldW - r, x)),
      y: Math.max(r, Math.min(worldH - r, y)),
    };
  });
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PhysicsCloud() {
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * domRefs holds the HTMLDivElement for each bubble index.
   * We use a Map so we can reliably detect when ALL refs have been assigned.
   */
  const domRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  /**
   * Mutable physics state — stored in a ref so the animation loop closure
   * always sees the current values without triggering re-renders.
   */
  const stateRef = useRef<{
    bubbles: Bubble[];
    mouse: { x: number; y: number; isDown: boolean; draggingIdx: number };
    raf: number;
    worldW: number;
    worldH: number;
  }>({
    bubbles: [],
    mouse: { x: -9999, y: -9999, isDown: false, draggingIdx: -1 },
    raf: 0,
    worldW: 0,
    worldH: 0,
  });

  // ── Pointer handlers (defined once, attached via JSX) ─────────────────────

  function onPointerDown(e: React.PointerEvent) {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const mx   = e.clientX - rect.left;
    const my   = e.clientY - rect.top;

    const state = stateRef.current;
    state.mouse.isDown = true;
    state.mouse.x = mx;
    state.mouse.y = my;

    let closest = -1;
    let minD    = Infinity;
    state.bubbles.forEach((b, i) => {
      const dx = b.x - mx, dy = b.y - my;
      const d  = Math.sqrt(dx * dx + dy * dy);
      if (d < b.radius && d < minD) { minD = d; closest = i; }
    });

    state.mouse.draggingIdx = closest;
    if (closest !== -1) container.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent) {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    stateRef.current.mouse.x = e.clientX - rect.left;
    stateRef.current.mouse.y = e.clientY - rect.top;
  }

  function onPointerUp(e: React.PointerEvent) {
    stateRef.current.mouse.isDown     = false;
    stateRef.current.mouse.draggingIdx = -1;
    containerRef.current?.releasePointerCapture(e.pointerId);
  }

  // ── Physics engine ────────────────────────────────────────────────────────

  /**
   * initPhysics — called by the ResizeObserver once the container has a
   * non-zero size.  Returns a cleanup function that cancels the RAF loop.
   */
  function initPhysics(container: HTMLDivElement): () => void {
    // ── 1. Measure world ────────────────────────────────────────────────────
    // Use getBoundingClientRect for accuracy (avoids stale clientWidth values)
    const { width: worldW, height: worldH } = container.getBoundingClientRect();

    const radii = skills.map(s => bubbleRadius(s.name));
    const positions = computeInitialPositions(radii, worldW, worldH);

    // ── 2. Build bubble state ───────────────────────────────────────────────
    const bubbles: Bubble[] = skills.map((skill, i) => {
      const r = radii[i];
      return {
        id:       i,
        x:        positions[i].x,
        y:        positions[i].y,
        vx:       (Math.random() - 0.5) * BASE_SPEED * 2,
        vy:       (Math.random() - 0.5) * BASE_SPEED * 2,
        radius:   r,
        mass:     r * r,           // mass ∝ area
        text:     skill.name,
        category: skill.category,
      };
    });

    // ── 3. Store in shared ref ──────────────────────────────────────────────
    const state = stateRef.current;
    state.bubbles = bubbles;
    state.worldW  = worldW;
    state.worldH  = worldH;

    // ── 4. Apply initial positions to DOM immediately ───────────────────────
    // This prevents bubbles from flashing at (0,0) before the loop starts.
    bubbles.forEach((b, i) => {
      const el = domRefs.current.get(i);
      if (el) {
        el.style.transform = `translate(${b.x - b.radius}px, ${b.y - b.radius}px)`;
      }
    });

    // ── 5. Wait for all DOM refs, then start the loop ───────────────────────
    let raf = 0;
    let isRunning = true;

    /**
     * Poll until every bubble's DOM ref is ready.
     * In practice this takes ≤ 1 frame after mount.
     */
    function waitForRefs() {
      if (!isRunning) return;
      if (domRefs.current.size < skills.length) {
        // Not all refs collected yet — retry next frame
        raf = requestAnimationFrame(waitForRefs);
        return;
      }
      // All refs ready — kick off the physics loop
      raf = requestAnimationFrame(loop);
    }

    // ── 6. The animation loop ───────────────────────────────────────────────

    function loop() {
      if (!isRunning) return;

      const { bubbles: bs, mouse, worldW: W, worldH: H } = stateRef.current;
      const N = bs.length;

      // 6a. Dragging — spring the dragged bubble toward the cursor
      if (mouse.isDown && mouse.draggingIdx >= 0) {
        const b = bs[mouse.draggingIdx];
        b.vx += (mouse.x - b.x) * DRAG_STIFFNESS;
        b.vy += (mouse.y - b.y) * DRAG_STIFFNESS;
      }

      // 6b. Mouse repulsion for non-dragged bubbles
      bs.forEach((b, i) => {
        if (i === mouse.draggingIdx) return;
        const dx = b.x - mouse.x;
        const dy = b.y - mouse.y;
        const d  = Math.sqrt(dx * dx + dy * dy) || 1;
        if (d < MOUSE_RADIUS) {
          const force = (1 - d / MOUSE_RADIUS) * MOUSE_STRENGTH;
          b.vx += (dx / d) * force;
          b.vy += (dy / d) * force;
        }
      });

      // 6c. Integrate velocities & apply damping
      bs.forEach(b => {
        b.x  += b.vx;
        b.y  += b.vy;
        b.vx *= DAMPING;
        b.vy *= DAMPING;
      });

      // 6d. Wall collisions
      bs.forEach(b => {
        if (b.x - b.radius < 0) {
          b.x  = b.radius;
          b.vx = Math.abs(b.vx) * WALL_RESTITUTION;
        } else if (b.x + b.radius > W) {
          b.x  = W - b.radius;
          b.vx = -Math.abs(b.vx) * WALL_RESTITUTION;
        }
        if (b.y - b.radius < 0) {
          b.y  = b.radius;
          b.vy = Math.abs(b.vy) * WALL_RESTITUTION;
        } else if (b.y + b.radius > H) {
          b.y  = H - b.radius;
          b.vy = -Math.abs(b.vy) * WALL_RESTITUTION;
        }
      });

      // 6e. Elastic bubble–bubble collisions  (O(n²) — fine for < 50 bubbles)
      for (let i = 0; i < N - 1; i++) {
        for (let j = i + 1; j < N; j++) {
          const a = bs[i];
          const b = bs[j];
          const dx   = b.x - a.x;
          const dy   = b.y - a.y;
          // Clamp to ≥ 1 to guard against divide-by-zero
          const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
          const minD = a.radius + b.radius;

          if (dist < minD) {
            // Normal vector
            const nx = dx / dist;
            const ny = dy / dist;

            // Push apart so they no longer overlap
            const overlap = (minD - dist) / 2;
            a.x -= nx * overlap;
            a.y -= ny * overlap;
            b.x += nx * overlap;
            b.y += ny * overlap;

            // 1-D elastic collision along normal
            const dvx = a.vx - b.vx;
            const dvy = a.vy - b.vy;
            const dot = dvx * nx + dvy * ny;

            // Only resolve if bubbles are approaching
            if (dot > 0) {
              const impulse = (2 * dot) / (a.mass + b.mass);
              a.vx -= impulse * b.mass * nx;
              a.vy -= impulse * b.mass * ny;
              b.vx += impulse * a.mass * nx;
              b.vy += impulse * a.mass * ny;
            }
          }
        }
      }

      // 6f. Commit positions to DOM via transform (skips layout recalc)
      bs.forEach((b, i) => {
        const el = domRefs.current.get(i);
        if (el) {
          el.style.transform = `translate(${b.x - b.radius}px, ${b.y - b.radius}px)`;
        }
      });

      raf = requestAnimationFrame(loop);
    }

    // Kick off the ref-wait → loop chain
    waitForRefs();

    // ── 7. Return cleanup ───────────────────────────────────────────────────
    return () => {
      isRunning = false;
      cancelAnimationFrame(raf);
    };
  }

  // ── Effect: attach ResizeObserver ──────────────────────────────────────────
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cleanupPhysics: (() => void) | undefined;

    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;

        // Skip zero-size frames (hidden tab, SSR hydration, etc.)
        if (width === 0 || height === 0) continue;

        // Tear down any existing physics loop before re-initialising
        cleanupPhysics?.();
        cleanupPhysics = initPhysics(container);

        // Stop observing after the first valid size — we handle subsequent
        // resizes by continuing to observe (so remove the disconnect call).
        // If you only want one-time init, add: observer.disconnect();
        break;
      }
    });

    observer.observe(container);

    // Unmount cleanup
    return () => {
      observer.disconnect();
      cleanupPhysics?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      className="relative w-full h-[700px] md:h-[900px] overflow-hidden rounded-3xl touch-none"
    >
      {skills.map((skill, i) => {
        const r          = bubbleRadius(skill.name);
        const colorClass = categoryColors[skill.category] ?? categoryColors['Tools'];

        return (
          <div
            key={i}
            ref={el => {
              if (!el) {
                domRefs.current.delete(i);
                return;
              }
              domRefs.current.set(i, el);
            }}
            className={[
              'absolute top-0 left-0',
              'flex items-center justify-center',
              'rounded-full border backdrop-blur-md',
              'cursor-grab active:cursor-grabbing select-none',
              'transition-colors duration-200',
              'hover:bg-white/20 hover:text-white hover:border-white/50',
              'shadow-[0_0_15px_rgba(255,255,255,0.05)]',
              colorClass,
            ].join(' ')}
            style={{
              width:      r * 2,
              height:     r * 2,
              willChange: 'transform',
              // Start at a position off-screen bottom-right so the Vogel
              // spiral placement (written via style.transform inside
              // initPhysics) is visible on first paint rather than (0,0).
              transform:  'translate(-9999px, -9999px)',
            }}
          >
            <span className="text-center px-4 font-medium text-sm pointer-events-none leading-tight">
              {skill.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
