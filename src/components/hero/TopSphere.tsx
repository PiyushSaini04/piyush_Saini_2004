'use client';

export default function AISphere() {
  return (
    <div className="absolute inset-0 z-5 pointer-events-none">
      <div className="absolute top-0 left-[7.5%] w-[16vw] h-[16vw] overflow-hidden">
        <div
            className="
                absolute
                w-[30vw]
                h-[30vw]
                rounded-full
                -top-[16vw]
                -left-[16vw]
                overflow-visible
            "
            style={{
                background: `
                radial-gradient(
                    circle at 65% 70%,
                    #1a1a1a 10%,
                    #101010 60%,
                    #060606 82%,
                    #000000 0%
                )
                `,

                boxShadow: `
                inset -30px -30px 70px rgba(255,255,255,0.02),
                inset 60px 60px 120px rgba(0,0,0,0.95),
                0 0 100px rgba(0,0,0,.55)
                `,
            }}
            >
        </div>
        
      </div>
    </div>
  );
}


