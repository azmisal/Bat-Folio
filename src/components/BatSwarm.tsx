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

const BOID_COUNT = 40;
const MAX_SPEED = 6;
const SEPARATION_DIST = 30;
const ALIGNMENT_DIST = 60;
const COHESION_DIST = 80;

function createBoid(x: number, y: number): Boid {
  const angle = Math.random() * Math.PI * 2;
  const speed = 2 + Math.random() * 3;
  return {
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    life: 0,
    maxLife: 1.5 + Math.random() * 1.5,
    size: 4 + Math.random() * 6,
    wingPhase: Math.random() * Math.PI * 2,
    wingSpeed: 8 + Math.random() * 6,
  };
}

function limitSpeed(boid: Boid) {
  const speed = Math.sqrt(boid.vx ** 2 + boid.vy ** 2);
  if (speed > MAX_SPEED) {
    boid.vx = (boid.vx / speed) * MAX_SPEED;
    boid.vy = (boid.vy / speed) * MAX_SPEED;
  }
}

function drawBat(ctx: CanvasRenderingContext2D, boid: Boid, alpha: number) {
  const { x, y, size, wingPhase, vx, vy } = boid;
  const wing = Math.sin(wingPhase) * 0.7;
  const angle = Math.atan2(vy, vx);

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.globalAlpha = alpha;

  // Body
  ctx.fillStyle = "#1a1a1a";
  ctx.beginPath();
  ctx.ellipse(0, 0, size * 0.4, size * 0.15, 0, 0, Math.PI * 2);
  ctx.fill();

  // Wings
  ctx.fillStyle = `rgba(30, 30, 30, ${alpha})`;
  // Left wing
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(-size * 0.5, -size * wing, -size, -size * wing * 0.5);
  ctx.quadraticCurveTo(-size * 0.7, size * 0.1, 0, 0);
  ctx.fill();
  // Right wing
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(-size * 0.5, size * wing, -size, size * wing * 0.5);
  ctx.quadraticCurveTo(-size * 0.7, -size * 0.1, 0, 0);
  ctx.fill();

  // Eyes
  ctx.fillStyle = `hsla(48, 96%, 53%, ${alpha * 0.8})`;
  ctx.beginPath();
  ctx.arc(size * 0.2, -size * 0.05, 1, 0, Math.PI * 2);
  ctx.arc(size * 0.2, size * 0.05, 1, 0, Math.PI * 2);
  ctx.fill();

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
      boids.push(createBoid(w - 50 + Math.random() * 50, Math.random() * 80));
    }
    swarms.current.push(boids);
  }, []);

  useEffect(() => {
    // Listen for custom event from buttons
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

        // Flocking
        for (let i = 0; i < boids.length; i++) {
          const b = boids[i];
          b.life += dt;
          if (b.life >= b.maxLife) continue;
          alive = true;

          let sepX = 0, sepY = 0;
          let aliVx = 0, aliVy = 0, aliCount = 0;
          let cohX = 0, cohY = 0, cohCount = 0;

          for (let j = 0; j < boids.length; j++) {
            if (i === j) continue;
            const other = boids[j];
            const dx = b.x - other.x;
            const dy = b.y - other.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < SEPARATION_DIST && dist > 0) {
              sepX += dx / dist;
              sepY += dy / dist;
            }
            if (dist < ALIGNMENT_DIST) {
              aliVx += other.vx;
              aliVy += other.vy;
              aliCount++;
            }
            if (dist < COHESION_DIST) {
              cohX += other.x;
              cohY += other.y;
              cohCount++;
            }
          }

          // Apply forces
          b.vx += sepX * 0.8;
          b.vy += sepY * 0.8;

          if (aliCount > 0) {
            b.vx += (aliVx / aliCount - b.vx) * 0.05;
            b.vy += (aliVy / aliCount - b.vy) * 0.05;
          }
          if (cohCount > 0) {
            b.vx += (cohX / cohCount - b.x) * 0.003;
            b.vy += (cohY / cohCount - b.y) * 0.003;
          }

          // Drift away from origin (scatter)
          b.vx -= 1.5;
          b.vy += (Math.random() - 0.5) * 2;

          limitSpeed(b);
          b.x += b.vx;
          b.y += b.vy;
          b.wingPhase += b.wingSpeed * dt * Math.PI * 2;

          const alpha = Math.max(0, 1 - b.life / b.maxLife);
          drawBat(ctx, b, alpha);
        }

        if (!alive) {
          swarms.current.splice(s, 1);
        }
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
