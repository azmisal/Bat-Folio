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
const MAX_SPEED = 14;
const SEPARATION_DIST = 40;

function createBoid(x: number, y: number): Boid {
  const angle = Math.random() * Math.PI * 2;
  const speed = 1.8 + Math.random() * 2.2;
  return {
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    life: 0,
    maxLife: 4 + Math.random() * 3,
    size: 50 + Math.random() * 40,
    wingPhase: Math.random() * Math.PI * 2,
    wingSpeed: 1 + Math.random() * 1,
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

  // Wing lift/fold amount
  const lift = wing * s * 0.5;
  const flapAmount = Math.abs(wing) * 0.15; // Wing contraction on down beat

  ctx.fillStyle = "#111";
  ctx.beginPath();

  // Head top
  ctx.moveTo(0, -s * 0.06);

  // Right ear
  ctx.lineTo(s * 0.04, -s * 0.16);
  ctx.lineTo(s * 0.08, -s * 0.06);

  // === RIGHT WING - ANATOMICALLY CORRECT CONCAVE STRUCTURE ===

  // Thumb - short, fat finger near body
  ctx.bezierCurveTo(
    s * 0.1, -s * 0.04 + lift * 0.1,
    s * 0.12, s * 0.02 + lift * 0.05,
    s * 0.11, s * 0.05
  );

  // Scallop between thumb and index
  ctx.bezierCurveTo(
    s * 0.15, s * 0.075,
    s * 0.18, s * 0.06,
    s * 0.2, s * 0.065
  );

  // Index finger - longest, extends far
  ctx.lineTo(s * 0.28, -s * 0.06 + lift * 0.8);

  // Concave membrane between index and middle (INWARD curve)
  ctx.bezierCurveTo(
    s * 0.36, -s * 0.08 + lift * 0.6,
    s * 0.42, -s * 0.04 + lift * 0.5,
    s * 0.46, s * 0.03 + lift * 0.4
  );

  // Scallop between index and middle
  ctx.bezierCurveTo(
    s * 0.48, s * 0.06,
    s * 0.46, s * 0.08,
    s * 0.42, s * 0.075
  );

  // Middle finger - medium length
  ctx.lineTo(s * 0.52, -s * 0.02 + lift * 0.65);

  // Concave membrane between middle and ring (INWARD curve)
  ctx.bezierCurveTo(
    s * 0.54, -s * 0.01 + lift * 0.5,
    s * 0.56, s * 0.03 + lift * 0.4,
    s * 0.57, s * 0.06 + lift * 0.3
  );

  // Scallop between middle and ring
  ctx.bezierCurveTo(
    s * 0.565, s * 0.09,
    s * 0.54, s * 0.09,
    s * 0.5, s * 0.08
  );

  // Ring finger - shorter
  ctx.lineTo(s * 0.56, -s * 0.015 + lift * 0.55);

  // Concave membrane between ring and pinky (INWARD curve)
  ctx.bezierCurveTo(
    s * 0.565, s * 0.02 + lift * 0.35,
    s * 0.57, s * 0.055 + lift * 0.25,
    s * 0.568, s * 0.085
  );

  // Scallop between ring and pinky
  ctx.bezierCurveTo(
    s * 0.555, s * 0.095,
    s * 0.52, s * 0.09,
    s * 0.46, s * 0.08
  );

  // Pinky finger - shortest, uropatagium support
  ctx.lineTo(s * 0.5, -s * 0.01 + lift * 0.45);

  // Uropatagium (tail membrane) - concave inward
  ctx.bezierCurveTo(
    s * 0.35, s * 0.06 + lift * 0.2,
    s * 0.15, s * 0.09,
    s * 0.04, s * 0.08
  );

  // Right body side
  ctx.bezierCurveTo(s * 0.02, s * 0.1, s * 0.005, s * 0.12, -s * 0.001, s * 0.13);

  // Tail
  ctx.quadraticCurveTo(0, s * 0.16, s * 0.001, s * 0.13);

  // Left body side - mirror
  ctx.bezierCurveTo(-s * 0.005, s * 0.12, -s * 0.02, s * 0.1, -s * 0.04, s * 0.08);

  // === LEFT WING - MIRRORED CONCAVE STRUCTURE ===

  // Uropatagium (tail membrane) - concave inward
  ctx.bezierCurveTo(
    -s * 0.15, s * 0.09,
    -s * 0.35, s * 0.06 + lift * 0.2,
    -s * 0.5, -s * 0.01 + lift * 0.45
  );

  // Pinky finger - shortest
  ctx.lineTo(-s * 0.46, s * 0.08);

  // Scallop between ring and pinky (mirrored)
  ctx.bezierCurveTo(
    -s * 0.52, s * 0.09,
    -s * 0.555, s * 0.095,
    -s * 0.568, s * 0.085
  );

  // Concave membrane between ring and pinky (INWARD curve)
  ctx.bezierCurveTo(
    -s * 0.57, s * 0.055 + lift * 0.25,
    -s * 0.565, s * 0.02 + lift * 0.35,
    -s * 0.56, -s * 0.015 + lift * 0.55
  );

  // Ring finger - shorter
  ctx.lineTo(-s * 0.5, s * 0.08);

  // Scallop between middle and ring (mirrored)
  ctx.bezierCurveTo(
    -s * 0.54, s * 0.09,
    -s * 0.565, s * 0.09,
    -s * 0.57, s * 0.06 + lift * 0.3
  );

  // Concave membrane between middle and ring (INWARD curve)
  ctx.bezierCurveTo(
    -s * 0.56, s * 0.03 + lift * 0.4,
    -s * 0.54, -s * 0.01 + lift * 0.5,
    -s * 0.52, -s * 0.02 + lift * 0.65
  );

  // Middle finger - medium length
  ctx.lineTo(-s * 0.42, s * 0.075);

  // Scallop between index and middle (mirrored)
  ctx.bezierCurveTo(
    -s * 0.46, s * 0.08,
    -s * 0.48, s * 0.06,
    -s * 0.46, s * 0.03 + lift * 0.4
  );

  // Concave membrane between index and middle (INWARD curve)
  ctx.bezierCurveTo(
    -s * 0.42, -s * 0.04 + lift * 0.5,
    -s * 0.36, -s * 0.08 + lift * 0.6,
    -s * 0.28, -s * 0.06 + lift * 0.8
  );

  // Index finger - longest
  ctx.lineTo(-s * 0.2, s * 0.065);

  // Scallop between thumb and index (mirrored)
  ctx.bezierCurveTo(
    -s * 0.18, s * 0.06,
    -s * 0.15, s * 0.075,
    -s * 0.11, s * 0.05
  );

  // Thumb - short, fat finger
  ctx.bezierCurveTo(
    -s * 0.12, s * 0.02 + lift * 0.05,
    -s * 0.1, -s * 0.04 + lift * 0.1,
    -s * 0.08, -s * 0.06
  );

  // Left ear
  ctx.lineTo(-s * 0.04, -s * 0.16);
  ctx.lineTo(0, -s * 0.06);

  ctx.closePath();
  ctx.fill();

  // Wing bone structure lines (subtle)
  ctx.strokeStyle = `rgba(0, 0, 0, ${alpha * 0.25})`;
  ctx.lineWidth = 0.4;

  // Right wing bones
  const rightBones = [
    { start: [0.08, -0.06], end: [0.28, -0.06 + lift * 0.8], name: "index" },
    { start: [0.075, 0.02], end: [0.52, -0.02 + lift * 0.65], name: "middle" },
    { start: [0.065, 0.04], end: [0.56, -0.015 + lift * 0.55], name: "ring" },
  ];

  rightBones.forEach(bone => {
    ctx.beginPath();
    ctx.moveTo(bone.start[0] * s, bone.start[1] * s);
    ctx.lineTo(bone.end[0] * s, bone.end[1] * s);
    ctx.stroke();
  });

  // Left wing bones (mirrored)
  rightBones.forEach(bone => {
    ctx.beginPath();
    ctx.moveTo(-bone.start[0] * s, bone.start[1] * s);
    ctx.lineTo(-bone.end[0] * s, bone.end[1] * s);
    ctx.stroke();
  });

  // Ear outlines
  ctx.strokeStyle = `rgba(0, 0, 0, ${alpha * 0.5})`;
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(0, -s * 0.06);
  ctx.lineTo(s * 0.04, -s * 0.16);
  ctx.lineTo(s * 0.08, -s * 0.06);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, -s * 0.06);
  ctx.lineTo(-s * 0.04, -s * 0.16);
  ctx.lineTo(-s * 0.08, -s * 0.06);
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
  const lastCornerRef = useRef<number>(-1);

  const triggerSwarm = useCallback(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;

    // Select a random corner different from the last one
    const corners = [0, 1, 2, 3];
    const availableCorners = corners.filter(c => c !== lastCornerRef.current);
    const corner = availableCorners[Math.floor(Math.random() * availableCorners.length)];
    lastCornerRef.current = corner;

    let cornerX = 0, cornerY = 0;
    switch (corner) {
      case 0: // top-left
        cornerX = 0;
        cornerY = 0;
        break;
      case 1: // top-right
        cornerX = w;
        cornerY = 0;
        break;
      case 2: // bottom-left
        cornerX = 0;
        cornerY = h;
        break;
      case 3: // bottom-right
        cornerX = w;
        cornerY = h;
        break;
    }

    const boids: Boid[] = [];
    for (let i = 0; i < BOID_COUNT; i++) {
      boids.push(createBoid(
        cornerX + (Math.random() - 0.5) * 150,
        cornerY + (Math.random() - 0.5) * 150
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
