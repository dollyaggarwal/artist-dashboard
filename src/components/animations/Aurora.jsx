import { useEffect, useRef } from "react";

/**
 * Aurora — animated mesh gradient background
 * Inspired by React Bits aurora effect
 * Used behind the UpgradeModal header
 */
export default function Aurora({ colors = ["#f97316", "#ec4899", "#8b5cf6"], size = 1.5 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const blobs = colors.map((color, i) => ({
      color,
      x: 0.2 + i * 0.3,
      y: 0.3 + (i % 2) * 0.4,
      vx: 0.0003 * (i % 2 === 0 ? 1 : -1),
      vy: 0.0002 * (i % 3 === 0 ? 1 : -1),
      r: size * (canvas.width * 0.3),
    }));

    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      blobs.forEach((blob) => {
        blob.x += blob.vx;
        blob.y += blob.vy;
        if (blob.x < 0.1 || blob.x > 0.9) blob.vx *= -1;
        if (blob.y < 0.1 || blob.y > 0.9) blob.vy *= -1;

        const grd = ctx.createRadialGradient(
          blob.x * width, blob.y * height, 0,
          blob.x * width, blob.y * height, blob.r
        );
        grd.addColorStop(0, blob.color + "99");
        grd.addColorStop(1, blob.color + "00");

        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(blob.x * width, blob.y * height, blob.r, 0, Math.PI * 2);
        ctx.fill();
      });

      t += 0.01;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [colors, size]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ filter: "blur(32px)", opacity: 0.85 }}
    />
  );
}
