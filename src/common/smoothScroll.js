import Lenis from 'lenis';

const prefersReduced = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lenis = null;
let rafId = 0;

/**
 * Inertial scrolling for the live site. Drives window scroll directly, so
 * IntersectionObserver reveals, hash links and scroll listeners elsewhere
 * keep working unchanged. No-op under reduced motion.
 *
 * Returns a cleanup fn; call from a single long-lived component (Chrome).
 */
export function initSmoothScroll() {
    if (lenis || prefersReduced()) return undefined;

    lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.95,
        touchMultiplier: 1.6,
    });

    const loop = (time) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    const prev = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';

    return () => {
        cancelAnimationFrame(rafId);
        lenis.destroy();
        lenis = null;
        document.documentElement.style.scrollBehavior = prev;
    };
}

/* Programmatic scroll that stays in sync with lenis while it runs. */
export function smoothTo(target, options = {}) {
    const { offset = 0, immediate = false } = options;

    if (lenis) {
        lenis.scrollTo(target, { offset, immediate });
        return;
    }

    if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: immediate ? 'auto' : 'smooth' });
        return;
    }

    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top: y, behavior: immediate ? 'auto' : 'smooth' });
}

/* Instant reposition (route changes) that also resets any lenis flight. */
export function jumpTo(top) {
    if (lenis) {
        lenis.scrollTo(top, { immediate: true });
        return;
    }
    window.scrollTo({ top, behavior: 'auto' });
}
