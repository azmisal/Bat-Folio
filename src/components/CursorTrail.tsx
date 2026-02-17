import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  age: number;
}

const MAX_POINTS = 80;
const SPRING = 0.4;
const FRICTION = 0.55;
const TRAIL_LIFE = 0.6; // seconds

const CursorTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trail = useRef<Point[]>([]);
  const mouse = useRef({ x: -200, y: -200 });
  const follower = useRef({ x: -200, y: -200, vx: 0, vy: 0 });
  const animRef = useRef<number>(0);
  const lastTime = useRef(performance.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    const draw = (now: number) => {
      const dt = Math.min((now - lastTime.current) / 1000, 0.05);
      lastTime.current = now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Physics-based follower
      const f = follower.current;
      const dx = mouse.current.x - f.x;
      const dy = mouse.current.y - f.y;
      f.vx += dx * SPRING;
      f.vy += dy * SPRING;
      f.vx *= FRICTION;
      f.vy *= FRICTION;
      f.x += f.vx;
      f.y += f.vy;

      // Add point
      trail.current.push({ x: f.x, y: f.y, age: 0 });
      if (trail.current.length > MAX_POINTS) trail.current.shift();

      // Age points
      for (const p of trail.current) {
        p.age += dt;
      }
      // Remove dead points
      trail.current = trail.current.filter((p) => p.age < TRAIL_LIFE);

      if (trail.current.length < 2) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      // Draw tapered neon ribbon
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let i = 1; i < trail.current.length; i++) {
        const p0 = trail.current[i - 1];
        const p1 = trail.current[i];
        const progress = i / trail.current.length; // 0 = old, 1 = new
        const life0 = 1 - p0.age / TRAIL_LIFE;
        const life1 = 1 - p1.age / TRAIL_LIFE;
        const alpha = Math.min(life0, life1) * progress;
        const width = progress * 6 + 1; // taper: thin at tail, thick at head

        // Core bright line
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.strokeStyle = `hsla(48, 96%, 60%, ${alpha * 0.9})`;
        ctx.lineWidth = width;
        ctx.stroke();

        // Outer glow
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.strokeStyle = `hsla(48, 96%, 53%, ${alpha * 0.25})`;
        ctx.lineWidth = width + 10;
        ctx.stroke();

        // Hot white core
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.strokeStyle = `hsla(48, 96%, 90%, ${alpha * 0.5})`;
        ctx.lineWidth = Math.max(width * 0.3, 1);
        ctx.stroke();
      }

      // Bright head dot
      const head = trail.current[trail.current.length - 1];
      const headLife = 1 - head.age / TRAIL_LIFE;
      ctx.beginPath();
      ctx.arc(head.x, head.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(48, 96%, 80%, ${headLife * 0.8})`;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(head.x, head.y, 12, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(48, 96%, 53%, ${headLife * 0.15})`;
      ctx.fill();

      animRef.current = requestAnimationFrame(draw);
    };
    animRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default CursorTrail;
