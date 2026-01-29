export default function AnimatedGrid() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Subtle animated grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(0, 212, 255, 0.1) 25%, rgba(0, 212, 255, 0.1) 26%, transparent 27%, transparent 74%, rgba(0, 212, 255, 0.1) 75%, rgba(0, 212, 255, 0.1) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(0, 212, 255, 0.1) 25%, rgba(0, 212, 255, 0.1) 26%, transparent 27%, transparent 74%, rgba(0, 212, 255, 0.1) 75%, rgba(0, 212, 255, 0.1) 76%, transparent 77%, transparent)
          `,
          backgroundSize: "50px 50px",
          animation: "grid-move 20s linear infinite",
        }}
      ></div>

      {/* Radial gradient overlay (top) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent rounded-full blur-3xl"></div>

      {/* Radial gradient overlay (bottom) */}
      <div className="absolute bottom-0 right-0 w-[800px] h-[400px] bg-gradient-to-t from-blue-500/5 via-transparent to-transparent rounded-full blur-3xl"></div>
    </div>
  );
}
