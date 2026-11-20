import { useEffect, useLayoutEffect, useRef } from 'react';

/* Site-wide backdrop. Milky Way band, nebulae and star dust are baked
   into offscreen textures once per resize; frames only blit those plus
   a small twinkling layer. Static frame under reduced motion. */

const TAU = Math.PI * 2;
const rand = (a, b) => a + Math.random() * (b - a);
const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;

const SPARKLE_COLORS = ['226, 236, 248', '198, 214, 255', '255, 243, 224', '255, 218, 176'];

const Cosmos = ({ emerging = false }) => {
    const ref = useRef(null);
    const emergingMode = useRef(emerging);
    const paint = useRef(null);

    useLayoutEffect(() => {
        emergingMode.current = emerging;
        paint.current?.();
    }, [emerging]);

    useEffect(() => {
        const canvas = ref.current;
        if (!canvas) return undefined;
        const ctx = canvas.getContext('2d');
        if (!ctx) return undefined;

        const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
        let reduce = motion.matches;
        const DPR = Math.min(2, window.devicePixelRatio || 1);
        let W = 0, H = 0, raf = 0, last = 0;
        let deepTex = null, midTex = null;
        let sparkles = [];
        const meteors = [];
        let mx = 0;

        /* ---------- texture builders ---------- */

        const makeCanvas = () => {
            const c = document.createElement('canvas');
            c.width = W * DPR;
            c.height = H * DPR;
            const g = c.getContext('2d');
            g.scale(DPR, DPR);
            return [c, g];
        };

        const buildDeepTexture = () => {
            const [c, g] = makeCanvas();

            // faint nebular patches, kept whisper-quiet
            const nebulae = [
                { x: 0.18, y: 0.26, r: 0.34, col: '62, 94, 156',  a: 0.14 },
                { x: 0.84, y: 0.70, r: 0.30, col: '86, 60, 138',  a: 0.105 },
                { x: 0.64, y: 0.14, r: 0.22, col: '44, 108, 126', a: 0.08 },
                { x: 0.38, y: 0.86, r: 0.26, col: '120, 84, 60',  a: 0.055 },
            ];
            g.globalCompositeOperation = 'lighter';
            nebulae.forEach((n) => {
                const r = n.r * Math.max(W, H);
                const grad = g.createRadialGradient(n.x * W, n.y * H, 0, n.x * W, n.y * H, r);
                grad.addColorStop(0, `rgba(${n.col}, ${n.a})`);
                grad.addColorStop(0.6, `rgba(${n.col}, ${n.a * 0.35})`);
                grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
                g.fillStyle = grad;
                g.fillRect(n.x * W - r, n.y * H - r, r * 2, r * 2);
            });

            // Milky Way: tilted band of layered light…
            const ang = -0.53;
            const cxp = W * 0.58, cyp = H * 0.42;
            const bdx = Math.cos(ang), bdy = Math.sin(ang);

            for (let i = -16; i <= 16; i++) {
                const t = i / 16;
                const bx = cxp + bdx * t * W * 0.75;
                const by = cyp + bdy * t * W * 0.75;
                const r = rand(100, 210);
                const grad = g.createRadialGradient(bx, by, 0, bx, by, r);
                const cool = `rgba(146, 170, 204, ${rand(0.035, 0.075).toFixed(3)})`;
                const warm = `rgba(194, 166, 136, ${rand(0.015, 0.045).toFixed(3)})`;
                grad.addColorStop(0, Math.random() < 0.72 ? cool : warm);
                grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
                g.fillStyle = grad;
                g.fillRect(bx - r, by - r, r * 2, r * 2);
            }

            // Small turbulent knots give the band structure without per-frame noise.
            for (let i = 0; i < 180; i++) {
                const t = rand(-0.85, 0.85), offset = gauss() * H * 0.18;
                const x = cxp + bdx * t * W - bdy * offset;
                const y = cyp + bdy * t * W + bdx * offset;
                const r = rand(14, 70);
                const grad = g.createRadialGradient(x, y, 0, x, y, r);
                grad.addColorStop(0, `rgba(139, 155, 207, ${rand(0.015, 0.055)})`);
                grad.addColorStop(1, 'rgba(0,0,0,0)');
                g.fillStyle = grad;
                g.fillRect(x-r, y-r, r*2, r*2);
            }

            // …with a dark dust lane carved through its middle
            g.globalCompositeOperation = 'destination-out';
            for (let i = -10; i <= 10; i++) {
                const t = i / 10;
                const bx = cxp + bdx * t * W * 0.8;
                const by = cyp + bdy * t * W * 0.8 + 7 + Math.sin(t * 10) * 18;
                const r = rand(26, 58);
                const grad = g.createRadialGradient(bx, by, 0, bx, by, r);
                grad.addColorStop(0, 'rgba(0, 0, 0, 0.38)');
                grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
                g.fillStyle = grad;
                g.fillRect(bx - r, by - r, r * 2, r * 2);
            }

            // Branching dark wisps inside the luminous band, baked once.
            for (let branch = 0; branch < 3; branch++) {
                for (let j = -22; j <= 22; j++) {
                    const t = j / 22;
                    const off = Math.sin(t * 7 + branch * 2) * 25 + (branch - 1) * 30;
                    const x = cxp + bdx * t * W * 0.8 - bdy * off;
                    const y = cyp + bdy * t * W * 0.8 + bdx * off;
                    const radius = rand(8, 24);
                    const dust = g.createRadialGradient(x,y,0,x,y,radius);
                    dust.addColorStop(0,'rgba(0,0,0,0.15)');
                    dust.addColorStop(1,'rgba(0,0,0,0)');
                    g.fillStyle = dust;
                    g.fillRect(x-radius,y-radius,radius*2,radius*2);
                }
            }
            // micro-star dust, clustered toward the band like a real plate
            g.globalCompositeOperation = 'lighter';
            const n = Math.round((W * H) / 285);
            for (let i = 0; i < n; i++) {
                let x, y;
                if (Math.random() < 0.7) {
                    const t = rand(-0.85, 0.85);
                    const off = gauss() * H * 0.13;
                    x = cxp + bdx * t * W * 0.9 - bdy * off;
                    y = cyp + bdy * t * W * 0.9 + bdx * off;
                } else {
                    x = rand(0, W);
                    y = rand(0, H);
                }
                if (x < 0 || x > W || y < 0 || y > H) continue;
                g.fillStyle = `rgba(218, 228, 244, ${rand(0.06, 0.42).toFixed(3)})`;
                const size = rand(0.45, 1.15);
                g.fillRect(x, y, size, size);
            }
            g.globalCompositeOperation = 'source-over';
            return c;
        };

        const buildMidTexture = () => {
            const [c, g] = makeCanvas();

            // uniform field of ordinary stars
            const n = Math.round((W * H) / 3100);
            for (let i = 0; i < n; i++) {
                const col = SPARKLE_COLORS[Math.floor(Math.pow(Math.random(), 1.6) * SPARKLE_COLORS.length)];
                const r = rand(0.4, 1.1);
                const a = rand(0.14, 0.72);
                g.beginPath();
                g.arc(rand(0, W), rand(0, H), r, 0, TAU);
                g.fillStyle = `rgba(${col}, ${a.toFixed(3)})`;
                g.fill();
            }

            // a handful of bright stars with diffraction spikes
            const spots = [
                { x: 0.12, y: 0.16, warm: false }, { x: 0.79, y: 0.11, warm: true },
                { x: 0.31, y: 0.72, warm: false }, { x: 0.90, y: 0.48, warm: false },
                { x: 0.52, y: 0.30, warm: true },  { x: 0.07, y: 0.62, warm: true },
                { x: 0.68, y: 0.86, warm: false }, { x: 0.44, y: 0.50, warm: false },
                { x: 0.95, y: 0.83, warm: true },
            ];
            spots.forEach((s) => {
                const x = s.x * W, y = s.y * H;
                const col = s.warm ? '255, 226, 184' : '214, 228, 255';
                const halo = rand(5, 9);
                const grad = g.createRadialGradient(x, y, 0, x, y, halo);
                grad.addColorStop(0, `rgba(${col}, 0.55)`);
                grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
                g.fillStyle = grad;
                g.fillRect(x - halo, y - halo, halo * 2, halo * 2);

                const spike = rand(5, 12);
                g.strokeStyle = `rgba(${col}, 0.30)`;
                g.lineWidth = 0.8;
                g.beginPath();
                g.moveTo(x - spike, y); g.lineTo(x + spike, y);
                g.moveTo(x, y - spike); g.lineTo(x, y + spike);
                g.stroke();

                g.beginPath();
                g.arc(x, y, 1.3, 0, TAU);
                g.fillStyle = 'rgba(245, 250, 255, 0.95)';
                g.fill();
            });
            return c;
        };

        const seedSparkles = () => {
            sparkles = [];
            const n = Math.min(72, Math.round((W * H) / 24000));
            for (let i = 0; i < n; i++) {
                sparkles.push({
                    x: rand(0, W),
                    y: rand(0, H),
                    z: rand(0.25, 1),
                    r: rand(0.5, 1.3),
                    a: rand(0.25, 0.7),
                    tw: Math.random() * TAU,
                    tws: rand(0.0006, 0.0018),
                    col: SPARKLE_COLORS[Math.floor(Math.pow(Math.random(), 1.6) * SPARKLE_COLORS.length)],
                });
            }
        };

        /* ---------- frame ---------- */

        const drawMeteors = () => {
            if (Math.random() < 0.0022 && meteors.length < 2) {
                const speed = rand(7, 12);
                const fromLeft = Math.random() < 0.5;
                meteors.push({
                    x: fromLeft ? -30 : W + 30,
                    y: rand(0, H * 0.5),
                    vx: (fromLeft ? 1 : -1) * speed,
                    vy: speed * rand(0.3, 0.5),
                    life: 1,
                });
            }
            for (let i = meteors.length - 1; i >= 0; i--) {
                const m = meteors[i];
                m.x += m.vx;
                m.y += m.vy;
                m.life -= 0.01;
                if (m.life <= 0) { meteors.splice(i, 1); continue; }
                const a = Math.sin(m.life * Math.PI) * 0.4;
                ctx.strokeStyle = `rgba(210, 228, 250, ${a.toFixed(3)})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(m.x, m.y);
                ctx.lineTo(m.x - m.vx * 10, m.y - m.vy * 10);
                ctx.stroke();
            }
        };

        const drawFrame = () => {
            if (!deepTex) return;
            ctx.clearRect(0, 0, W, H);
            const sy = window.scrollY;

            const oyD = ((sy * 0.018) % H + H) % H;
            const oyM = ((sy * 0.045) % H + H) % H;
            const oxD = reduce ? 0 : -mx * 6;
            const oxM = reduce ? 0 : -mx * 14;

            ctx.drawImage(deepTex, oxD, -oyD, W, H);
            ctx.drawImage(deepTex, oxD, -oyD + H, W, H);
            ctx.drawImage(midTex, oxM, -oyM, W, H);
            ctx.drawImage(midTex, oxM, -oyM + H, W, H);

            for (let i = 0; i < sparkles.length; i++) {
                const s = sparkles[i];
                if (!reduce) s.tw += s.tws * 16;
                const tw = 0.55 + Math.sin(s.tw) * 0.45;
                const py = (((s.y - sy * 0.08 * s.z) % H) + H) % H;
                const px = s.x - mx * 22 * s.z;
                ctx.beginPath();
                ctx.arc(px, py, s.r, 0, TAU);
                ctx.fillStyle = `rgba(${s.col}, ${(s.a * tw).toFixed(3)})`;
                ctx.fill();
            }

            if (!reduce) drawMeteors();
            if (emergingMode.current) {
                // World-space fade: the sky grows denser below the bright horizon.
                const mask = ctx.createLinearGradient(0, 0, 0, H);
                for (let i = 0; i <= 8; i++) {
                    const worldY = sy + H * i / 8;
                    const p = Math.max(0, Math.min(1, (worldY - 180) / 1150));
                    const a = 0.06 + 0.94 * p * p * (3 - 2 * p);
                    mask.addColorStop(i / 8, `rgba(0,0,0,${a})`);
                }
                ctx.globalCompositeOperation = 'destination-in';
                ctx.fillStyle = mask;
                ctx.fillRect(0, 0, W, H);
                ctx.globalCompositeOperation = 'source-over';
            }
        };

        function loop(now) {
            raf = requestAnimationFrame(loop);
            if (now - last < 33) return;
            last = now;
            drawFrame();
        }

        const resize = () => {
            W = window.innerWidth;
            H = window.innerHeight;
            canvas.width = W * DPR;
            canvas.height = H * DPR;
            ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
            deepTex = buildDeepTexture();
            midTex = buildMidTexture();
            seedSparkles();
            if (reduce) drawFrame();
        };
        const onMove = (e) => {
            mx = e.clientX / window.innerWidth - 0.5;
        };
        const onVisibility = () => {
            cancelAnimationFrame(raf);
            last = 0;
            if (!document.hidden && !reduce) raf = requestAnimationFrame(loop);
        };
        const onScroll = () => { if (reduce) drawFrame(); };
        const onMotion = () => { reduce = motion.matches; drawFrame(); onVisibility(); };

        paint.current = drawFrame;
        resize();
        if (!reduce) {
            raf = requestAnimationFrame(loop);
            window.addEventListener('mousemove', onMove, { passive: true });

        }
        window.addEventListener('resize', resize);
        window.addEventListener('scroll', onScroll, { passive: true });
        document.addEventListener('visibilitychange', onVisibility);
        motion.addEventListener('change', onMotion);

        return () => {
            paint.current = null;
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', resize);
            window.removeEventListener('scroll', onScroll);
            motion.removeEventListener('change', onMotion);
            window.removeEventListener('mousemove', onMove);
            document.removeEventListener('visibilitychange', onVisibility);
        };
    }, []);

    return <canvas className="cosmos" ref={ref} aria-hidden="true" />;
};

export default Cosmos;
