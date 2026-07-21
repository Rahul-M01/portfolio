import React, { useEffect } from 'react';
import './chrome.css';

const Chrome = ({ pageA = '139, 92, 246', pageB = '47, 248, 255' }) => {
    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--page-a', pageA);
        root.style.setProperty('--page-b', pageB);
    }, [pageA, pageB]);

    useEffect(() => {
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add('in-view');
                        obs.unobserve(e.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
        );
        const scan = () => {
            document.querySelectorAll('.fade-up:not(.in-view)').forEach((el) => obs.observe(el));
        };
        scan();
        const mo = new MutationObserver(scan);
        mo.observe(document.body, { childList: true, subtree: true });
        return () => { obs.disconnect(); mo.disconnect(); };
    }, []);

    useEffect(() => {
        const bar = document.createElement('div');
        bar.className = 'scroll-bar';
        document.body.appendChild(bar);
        const onScroll = () => {
            const h = document.documentElement.scrollHeight - window.innerHeight;
            const r = h > 0 ? window.scrollY / h : 0;
            bar.style.transform = `scaleX(${r})`;
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            bar.remove();
        };
    }, []);


    // Site-wide starfield with a slow orbit ring and the odd meteor.
    useEffect(() => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const wrap = document.createElement('div');
        wrap.className = 'starfield';
        wrap.setAttribute('aria-hidden', 'true');
        const canvas = document.createElement('canvas');
        wrap.appendChild(canvas);
        document.body.appendChild(wrap);

        const ctx = canvas.getContext('2d');
        if (!ctx) { wrap.remove(); return; }

        const DPR = Math.min(2, window.devicePixelRatio || 1);
        let W = 0, H = 0, raf = 0, t = 0;
        let stars = [];

        const resize = () => {
            W = Math.max(1, window.innerWidth);
            H = Math.max(1, window.innerHeight);
            canvas.width = W * DPR;
            canvas.height = H * DPR;
            canvas.style.width = W + 'px';
            canvas.style.height = H + 'px';
            ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
            stars = [];
            const count = Math.min(200, Math.floor((W * H) / 11000));
            for (let i = 0; i < count; i++) {
                stars.push({
                    x: Math.random() * W,
                    y: Math.random() * H,
                    r: 0.4 + Math.random() * 1.4,
                    a: 0.35 + Math.random() * 0.55,
                    tw: Math.random() * Math.PI * 2,
                });
            }
        };

        // Meteors: rare, thin, and gone in about a second.
        const meteors = [];
        const spawnMeteor = () => {
            const fromLeft = Math.random() < 0.5;
            const speed = 7 + Math.random() * 5;
            const dir = fromLeft ? 1 : -1;
            meteors.push({
                x: fromLeft ? -30 : W + 30,
                y: Math.random() * H * 0.4,
                vx: dir * speed,
                vy: speed * (0.32 + Math.random() * 0.18),
                life: 1,
            });
        };

        const drawMeteors = () => {
            if (Math.random() < 0.002 && meteors.length < 2) spawnMeteor();
            for (let i = meteors.length - 1; i >= 0; i--) {
                const m = meteors[i];
                m.x += m.vx;
                m.y += m.vy;
                m.life -= 0.011;
                if (m.life <= 0) { meteors.splice(i, 1); continue; }
                const a = Math.sin(m.life * Math.PI) * 0.55;
                const tx = m.x - m.vx * 11;
                const ty = m.y - m.vy * 11;
                const grad = ctx.createLinearGradient(m.x, m.y, tx, ty);
                grad.addColorStop(0, `rgba(220, 235, 255, ${a.toFixed(3)})`);
                grad.addColorStop(1, 'rgba(220, 235, 255, 0)');
                ctx.strokeStyle = grad;
                ctx.lineWidth = 1.2;
                ctx.beginPath();
                ctx.moveTo(m.x, m.y);
                ctx.lineTo(tx, ty);
                ctx.stroke();
            }
        };

        const draw = () => {
            t += 0.016;
            ctx.clearRect(0, 0, W, H);

            ctx.strokeStyle = 'rgba(140, 200, 255, 0.07)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.ellipse(W * 0.75, H * 0.55, W * 0.5, H * 0.35, Math.sin(t * 0.1) * 0.05, 0, Math.PI * 2);
            ctx.stroke();

            for (let i = 0; i < stars.length; i++) {
                const s2 = stars[i];
                s2.tw += 0.03;
                ctx.globalAlpha = s2.a * (0.7 + Math.sin(s2.tw) * 0.3);
                ctx.fillStyle = 'rgba(220, 235, 255, 1)';
                ctx.beginPath();
                ctx.arc(s2.x, s2.y, s2.r, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.globalAlpha = 1;
            if (!reduce) drawMeteors();
            if (!reduce) raf = requestAnimationFrame(draw);
        };

        resize();
        window.addEventListener('resize', resize);
        draw();

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', resize);
            wrap.remove();
        };
    }, []);

    return (
        <>
            <div className="page-wash" aria-hidden />
            <div className="grain" aria-hidden />
        </>
    );
};

export default Chrome;
