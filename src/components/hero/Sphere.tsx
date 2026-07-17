'use client';

export default function AISphere() {
  return (
    <div className="absolute inset-0 z-[5] pointer-events-none">

      {/* ================= TOP SPHERE ================= */}
      <div className="absolute top-0 left-[7.5%] w-[26vw] h-[26vw] overflow-hidden">
        <div
          className="absolute w-[30vw] h-[30vw] rounded-full -top-[16vw] -left-[16vw]"
          style={{
            background: `
              radial-gradient(
                circle at 40% 40%,
                #1a1a1a 0%,
                #141414 45%,
                #050505 75%,
                #171717 100%
              )
            `,
            boxShadow: `
              inset 35px 35px 90px rgba(255,255,255,.02),
              inset -70px -70px 120px rgba(0,0,0,.95),
              0 0 100px rgba(0,0,0,.5)
            `,
          }}
        >
          {/* Rim Light */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `
                conic-gradient(
                  from 45deg,
                  transparent 0deg,
                  transparent 210deg,
                  rgba(255,255,255,.95) 240deg,
                  rgba(255,255,255,.45) 265deg,
                  transparent 285deg,
                  transparent 360deg
                )
              `,
              WebkitMask:
                "radial-gradient(circle, transparent 96.7%, black 98%, transparent 100%)",
              mask:
                "radial-gradient(circle, transparent 96.7%, black 98%, transparent 100%)",
              filter: "blur(.8px)",
            }}
          />

          {/* Soft Glow */}
          
        </div>
      </div>

      {/* ================= BOTTOM SPHERE ================= */}
      <div className="absolute bottom-0 right-[7.5%] w-[26vw] h-[26vw] overflow-hidden">
        <div
          className="absolute w-[30vw] h-[30vw] rounded-full -bottom-[16vw] -right-[16vw]"
          style={{
            background: `
              radial-gradient(
                circle at 65% 70%,
                #1a1a1a 0%,
                #141414 45%,
                #050505 75%,
                #171717 100%
              )
            `,
            boxShadow: `
              inset -30px -30px 70px rgba(255,255,255,.02),
              inset 60px 60px 120px rgba(0,0,0,.95),
              0 0 100px rgba(0,0,0,.55)
            `,
          }}
        >
          {/* Rim Light */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `
                conic-gradient(
                  from 215deg,
                  transparent 0deg,
                  transparent 120deg,
                  rgba(255,255,255,.95) 150deg,
                  rgba(255,255,255,.55) 175deg,
                  transparent 195deg,
                  transparent 360deg
                )
              `,
              WebkitMask:
                "radial-gradient(circle, transparent 96.7%, black 98%, transparent 100%)",
              mask:
                "radial-gradient(circle, transparent 96.7%, black 98%, transparent 100%)",
              filter: "blur(.8px)",
            }}
          />

          {/* Soft Glow */}
          
        </div>
      </div>

    </div>
  );
}