import { useLayoutEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigationType } from 'react-router-dom';
import usePageTracker from './useTracker';
import Chrome from '../common/Chrome';
import Header from '../header/header';
import LaunchIntro from '../common/LaunchIntro';
import { jumpTo, smoothTo } from '../common/smoothScroll';

export default function LayoutWithTracker() {
    const { pathname, hash, key } = useLocation();
    const navigation = useNavigationType();
    const previousPath = useRef(pathname);
    const initialKey = useRef(key);
    const positions = useRef(new Map());
    usePageTracker();

    useLayoutEffect(() => {
        const previous = window.history.scrollRestoration;
        window.history.scrollRestoration = 'manual';
        return () => { window.history.scrollRestoration = previous; };
    }, []);

    useLayoutEffect(() => {
        const changedPage = pathname !== previousPath.current;
        previousPath.current = pathname;
        const main = document.getElementById('main-content');
        if (!main) return undefined;
        const project = main.querySelector('#project-name')?.textContent.replace(/\.$/, '');
        const title = project || ({ '/login': 'Sign in to Drishyam', '/drishyam_home': 'Video library' })[pathname];
        document.title = title ? title + ' · Rahul Mahajan' : 'Rahul Mahajan · Software developer';

        const target = hash && document.getElementById(hash.slice(1));
        const saved = navigation === 'POP' ? positions.current.get(key) : undefined;
        if (saved !== undefined) {
            jumpTo(saved);
        } else if (target) {
            const header = document.querySelector('.site-header');
            smoothTo(target, { offset: -(header.offsetHeight + 18), immediate: changedPage || navigation === 'POP' });
        } else if (changedPage || navigation !== 'POP') {
            jumpTo(0);
        }

        if (changedPage || target) {
            const focusTarget = target || main;
            focusTarget.tabIndex = -1;
            focusTarget.focus({ preventScroll: true });
        }
        const nativeTransition = window.CSS?.supports?.('selector(:active-view-transition)') && document.documentElement.matches(':active-view-transition');
        if (changedPage && !nativeTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            main.animate?.([{ opacity: .45, translate: '28px 0' }, { opacity: 1, translate: '0 0' }],
                { duration: 480, easing: 'cubic-bezier(.22,.65,.25,1)' });
        }

        const remember = () => positions.current.set(key, window.scrollY);
        remember();
        window.addEventListener('scroll', remember, { passive: true });
        return () => window.removeEventListener('scroll', remember);
    }, [key, pathname, hash, navigation]);

    return <>
        <Chrome emergingStars={pathname === '/'} />
        <Header />
        {pathname === '/' && key === initialKey.current && <LaunchIntro />}
        <Outlet />
    </>;
}
