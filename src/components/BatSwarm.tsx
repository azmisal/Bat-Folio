import { useEffect, useRef, useCallback } from "react";

interface Boid {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  wingPhase: number;
  wingSpeed: number;
}

const BOID_COUNT = 35;
const MAX_SPEED = 2.5;
const SEPARATION_DIST = 40;

function createBoid(x: number, y: number): Boid {
  const angle = Math.random() * Math.PI * 2;
  const speed = 0.8 + Math.random() * 1.2;
  return {
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    life: 0,
    maxLife: 4 + Math.random() * 3,
    size: 30 + Math.random() * 30,
    wingPhase: Math.random() * Math.PI * 2,
    wingSpeed: 3 + Math.random() * 2,
  };
}

function drawBat(ctx: CanvasRenderingContext2D, b: Boid, alpha: number) {
  const { x, y, size: s, wingPhase, vx, vy } = b;
  const angle = Math.atan2(vy, vx);
  const wing = Math.sin(wingPhase); // -1 to 1

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle + Math.PI);
  ctx.globalAlpha = alpha;

  // Wing lift amount
  const lift = wing * s * 0.35;

  ctx.fillStyle = "#111";
  ctx.beginPath();

  // --- Body center (small oval) ---
  // We'll draw the whole bat as one path

  // Head top
  ctx.moveTo(0, -s * 0.06);

  // Right ear
  ctx.lineTo(s * 0.04, -s * 0.16);
  ctx.lineTo(s * 0.08, -s * 0.06);

  // Right wing — top edge, curves up with lift
  ctx.bezierCurveTo(
    s * 0.15, -s * 0.1 + lift * 0.3,
    s * 0.3, -s * 0.15 + lift * 0.7,
    s * 0.5, -s * 0.05 + lift
  );

  // Wing tip
  ctx.bezierCurveTo(
    s * 0.52, lift * 0.9,
    s * 0.48, s * 0.04 + lift * 0.6,
    s * 0.4, s * 0.06 + lift * 0.4
  );

  // Right wing scallops (3 finger points)
  ctx.bezierCurveTo(s * 0.38, s * 0.1 + lift * 0.3, s * 0.34, s * 0.04 + lift * 0.25, s * 0.3, s * 0.06 + lift * 0.2);
  ctx.bezierCurveTo(s * 0.28, s * 0.1 + lift * 0.15, s * 0.24, s * 0.04 + lift * 0.1, s * 0.2, s * 0.06 + lift * 0.08);
  ctx.bezierCurveTo(s * 0.16, s * 0.09, s * 0.12, s * 0.05, s * 0.08, s * 0.06);

  // Right body
  ctx.bezierCurveTo(s * 0.05, s * 0.08, s * 0.03, s * 0.1, s * 0.01, s * 0.12);

  // Tail
  ctx.quadraticCurveTo(0, s * 0.15, -s * 0.01, s * 0.12);

  // Left body
  ctx.bezierCurveTo(-s * 0.03, s * 0.1, -s * 0.05, s * 0.08, -s * 0.08, s * 0.06);

  // Left wing scallops (mirrored)
  ctx.bezierCurveTo(-s * 0.12, s * 0.05, -s * 0.16, s * 0.09, -s * 0.2, s * 0.06 + lift * 0.08);
  ctx.bezierCurveTo(-s * 0.24, s * 0.04 + lift * 0.1, -s * 0.28, s * 0.1 + lift * 0.15, -s * 0.3, s * 0.06 + lift * 0.2);
  ctx.bezierCurveTo(-s * 0.34, s * 0.04 + lift * 0.25, -s * 0.38, s * 0.1 + lift * 0.3, -s * 0.4, s * 0.06 + lift * 0.4);

  // Left wing tip
  ctx.bezierCurveTo(
    -s * 0.48, s * 0.04 + lift * 0.6,
    -s * 0.52, lift * 0.9,
    -s * 0.5, -s * 0.05 + lift
  );

  // Left wing top edge
  ctx.bezierCurveTo(
    -s * 0.3, -s * 0.15 + lift * 0.7,
    -s * 0.15, -s * 0.1 + lift * 0.3,
    -s * 0.08, -s * 0.06
  );

  // Left ear
  ctx.lineTo(-s * 0.04, -s * 0.16);
  ctx.lineTo(0, -s * 0.06);

  ctx.closePath();
  ctx.fill();

  // Subtle dark outline
  ctx.strokeStyle = `rgba(0,0,0,${alpha * 0.5})`;
  ctx.lineWidth = 0.5;
  ctx.stroke();

  // Glowing eyes
  ctx.shadowColor = "hsla(48, 96%, 53%, 0.9)";
  ctx.shadowBlur = 4;
  ctx.fillStyle = `hsla(48, 96%, 53%, ${alpha})`;
  ctx.beginPath();
  ctx.arc(s * 0.025, -s * 0.04, s * 0.012 + 0.8, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(-s * 0.025, -s * 0.04, s * 0.012 + 0.8, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  ctx.restore();
}

const BatSwarm = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const swarms = useRef<Boid[][]>([]);
  const animRef = useRef<number>(0);

  const triggerSwarm = useCallback(() => {
    const w = window.innerWidth;
    const boids: Boid[] = [];
    for (let i = 0; i < BOID_COUNT; i++) {
      boids.push(createBoid(
        w * 0.6 + (Math.random() - 0.5) * w * 0.3,
        (Math.random() - 0.3) * 100
      ));
    }
    swarms.current.push(boids);
  }, []);

  useEffect(() => {
    const handler = () => triggerSwarm();
    window.addEventListener("bat-swarm-trigger", handler);
    return () => window.removeEventListener("bat-swarm-trigger", handler);
  }, [triggerSwarm]);

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

    let lastTime = performance.now();

    const update = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let s = swarms.current.length - 1; s >= 0; s--) {
        const boids = swarms.current[s];
        let alive = false;

        for (let i = 0; i < boids.length; i++) {
          const b = boids[i];
          b.life += dt;
          if (b.life >= b.maxLife) continue;
          alive = true;

          // Separation only (keeps them spread without tight flocking)
          let sepX = 0, sepY = 0;
          for (let j = 0; j < boids.length; j++) {
            if (i === j) continue;
            const dx = b.x - boids[j].x;
            const dy = b.y - boids[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < SEPARATION_DIST && dist > 0) {
              sepX += dx / dist;
              sepY += dy / dist;
            }
          }
          b.vx += sepX * 0.15;
          b.vy += sepY * 0.15;

          // Gentle random drift for organic scatter
          b.vx += (Math.random() - 0.5) * 0.4;
          b.vy += (Math.random() - 0.5) * 0.4;

          // Speed limit
          const spd = Math.sqrt(b.vx ** 2 + b.vy ** 2);
          if (spd > MAX_SPEED) {
            b.vx = (b.vx / spd) * MAX_SPEED;
            b.vy = (b.vy / spd) * MAX_SPEED;
          }

          b.x += b.vx;
          b.y += b.vy;
          b.wingPhase += b.wingSpeed * dt * Math.PI * 2;

          const alpha = b.life < 0.3
            ? b.life / 0.3
            : Math.max(0, 1 - (b.life - b.maxLife + 1.5) / 1.5);

          drawBat(ctx, b, Math.min(1, alpha));
        }

        if (!alive) swarms.current.splice(s, 1);
      }

      animRef.current = requestAnimationFrame(update);
    };
    animRef.current = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9998] pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default BatSwarm;
