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

const BOID_COUNT = 50;
const MAX_SPEED = 8;
const SEPARATION_DIST = 50;
const ALIGNMENT_DIST = 80;
const COHESION_DIST = 100;

function createBoid(x: number, y: number): Boid {
  // Random direction in all directions
  const angle = Math.random() * Math.PI * 2;
  const speed = 3 + Math.random() * 5;
  return {
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    life: 0,
    maxLife: 2.5 + Math.random() * 2,
    size: 40 + Math.random() * 60, // 10x bigger
    wingPhase: Math.random() * Math.PI * 2,
    wingSpeed: 6 + Math.random() * 5,
  };
}

function limitSpeed(boid: Boid) {
  const speed = Math.sqrt(boid.vx ** 2 + boid.vy ** 2);
  if (speed > MAX_SPEED) {
    boid.vx = (boid.vx / speed) * MAX_SPEED;
    boid.vy = (boid.vy / speed) * MAX_SPEED;
  }
  // Minimum speed so they keep moving
  if (speed < 2) {
    boid.vx = (boid.vx / (speed || 1)) * 2;
    boid.vy = (boid.vy / (speed || 1)) * 2;
  }
}

function drawBat(ctx: CanvasRenderingContext2D, boid: Boid, alpha: number) {
  const { x, y, size, wingPhase, vx, vy } = boid;
  const wingFlap = Math.sin(wingPhase);
  const angle = Math.atan2(vy, vx);
  const s = size;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle + Math.PI); // face direction of travel
  ctx.globalAlpha = alpha;

  // === REALISTIC BAT SILHOUETTE ===

  ctx.fillStyle = "#0a0a0a";
  ctx.strokeStyle = `rgba(234, 179, 8, ${alpha * 0.3})`;
  ctx.lineWidth = 1;

  ctx.beginPath();

  // Start at body center-top
  // Right ear
  ctx.moveTo(s * 0.02, -s * 0.08);
  ctx.lineTo(s * 0.06, -s * 0.28);
  ctx.lineTo(s * 0.12, -s * 0.12);

  // Right wing - upper edge with scalloped membrane
  const wingY = wingFlap * s * 0.15;
  ctx.quadraticCurveTo(s * 0.25, -s * 0.18 + wingY * 0.3, s * 0.45, -s * 0.12 + wingY);
  ctx.quadraticCurveTo(s * 0.55, -s * 0.08 + wingY * 1.2, s * 0.6, -s * 0.05 + wingY * 1.1);

  // Right wing tip
  ctx.quadraticCurveTo(s * 0.62, s * 0.02 + wingY, s * 0.55, s * 0.08 + wingY * 0.6);

  // Right wing - lower scalloped edge (bat wing fingers)
  ctx.quadraticCurveTo(s * 0.48, s * 0.12 + wingY * 0.4, s * 0.42, s * 0.06 + wingY * 0.3);
  ctx.quadraticCurveTo(s * 0.36, s * 0.12 + wingY * 0.3, s * 0.3, s * 0.06 + wingY * 0.2);
  ctx.quadraticCurveTo(s * 0.24, s * 0.1 + wingY * 0.15, s * 0.18, s * 0.05);

  // Body right side
  ctx.quadraticCurveTo(s * 0.1, s * 0.06, s * 0.05, s * 0.12);

  // Tail
  ctx.quadraticCurveTo(s * 0.02, s * 0.16, 0, s * 0.14);
  ctx.quadraticCurveTo(-s * 0.02, s * 0.16, -s * 0.05, s * 0.12);

  // Body left side
  ctx.quadraticCurveTo(-s * 0.1, s * 0.06, -s * 0.18, s * 0.05);

  // Left wing - lower scalloped edge
  ctx.quadraticCurveTo(-s * 0.24, s * 0.1 + wingY * 0.15, -s * 0.3, s * 0.06 + wingY * 0.2);
  ctx.quadraticCurveTo(-s * 0.36, s * 0.12 + wingY * 0.3, -s * 0.42, s * 0.06 + wingY * 0.3);
  ctx.quadraticCurveTo(-s * 0.48, s * 0.12 + wingY * 0.4, -s * 0.55, s * 0.08 + wingY * 0.6);

  // Left wing tip
  ctx.quadraticCurveTo(-s * 0.62, s * 0.02 + wingY, -s * 0.6, -s * 0.05 + wingY * 1.1);

  // Left wing - upper edge
  ctx.quadraticCurveTo(-s * 0.55, -s * 0.08 + wingY * 1.2, -s * 0.45, -s * 0.12 + wingY);
  ctx.quadraticCurveTo(-s * 0.25, -s * 0.18 + wingY * 0.3, -s * 0.12, -s * 0.12);

  // Left ear
  ctx.lineTo(-s * 0.06, -s * 0.28);
  ctx.lineTo(-s * 0.02, -s * 0.08);

  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Wing bone lines for detail
  ctx.strokeStyle = `rgba(50, 50, 50, ${alpha * 0.6})`;
  ctx.lineWidth = 0.8;

  // Right wing bones
  for (let i = 0; i < 3; i++) {
    const boneAngle = -0.3 + i * 0.25;
    const boneLen = s * (0.35 + i * 0.08);
    ctx.beginPath();
    ctx.moveTo(s * 0.08, 0);
    ctx.quadraticCurveTo(
      Math.cos(boneAngle) * boneLen * 0.5,
      Math.sin(boneAngle) * boneLen * 0.5 + wingY * 0.5,
      Math.cos(boneAngle) * boneLen,
      Math.sin(boneAngle) * boneLen + wingY * 0.8
    );
    ctx.stroke();
  }
  // Left wing bones (mirrored)
  for (let i = 0; i < 3; i++) {
    const boneAngle = Math.PI + 0.3 - i * 0.25;
    const boneLen = s * (0.35 + i * 0.08);
    ctx.beginPath();
    ctx.moveTo(-s * 0.08, 0);
    ctx.quadraticCurveTo(
      Math.cos(boneAngle) * boneLen * 0.5,
      Math.sin(boneAngle) * boneLen * 0.5 + wingY * 0.5,
      Math.cos(boneAngle) * boneLen,
      Math.sin(boneAngle) * boneLen + wingY * 0.8
    );
    ctx.stroke();
  }

  // Glowing eyes
  ctx.fillStyle = `hsla(48, 96%, 53%, ${alpha * 0.9})`;
  ctx.shadowColor = "hsla(48, 96%, 53%, 0.8)";
  ctx.shadowBlur = 6;
  ctx.beginPath();
  ctx.arc(s * 0.04, -s * 0.06, s * 0.015 + 1, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(-s * 0.04, -s * 0.06, s * 0.015 + 1, 0, Math.PI * 2);
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
    const h = window.innerHeight;
    const boids: Boid[] = [];
    // Spawn from center-ish area, they'll scatter everywhere
    const spawnX = w * 0.7 + Math.random() * w * 0.2;
    const spawnY = h * 0.1;
    for (let i = 0; i < BOID_COUNT; i++) {
      boids.push(createBoid(
        spawnX + (Math.random() - 0.5) * 100,
        spawnY + Math.random() * 60
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

          let sepX = 0, sepY = 0;
          let aliVx = 0, aliVy = 0, aliCount = 0;
          let cohX = 0, cohY = 0, cohCount = 0;

          for (let j = 0; j < boids.length; j++) {
            if (i === j) continue;
            const other = boids[j];
            const ddx = b.x - other.x;
            const ddy = b.y - other.y;
            const dist = Math.sqrt(ddx * ddx + ddy * ddy);

            if (dist < SEPARATION_DIST && dist > 0) {
              sepX += ddx / dist;
              sepY += ddy / dist;
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

          // Flocking forces
          b.vx += sepX * 0.6;
          b.vy += sepY * 0.6;

          if (aliCount > 0) {
            b.vx += (aliVx / aliCount - b.vx) * 0.03;
            b.vy += (aliVy / aliCount - b.vy) * 0.03;
          }
          if (cohCount > 0) {
            b.vx += (cohX / cohCount - b.x) * 0.001;
            b.vy += (cohY / cohCount - b.y) * 0.001;
          }

          // Random jitter for organic scattering
          b.vx += (Math.random() - 0.5) * 3;
          b.vy += (Math.random() - 0.5) * 3;

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
