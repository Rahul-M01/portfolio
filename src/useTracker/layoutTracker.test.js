import { render, screen, fireEvent } from '@testing-library/react';
import { Link, MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import LayoutWithTracker from './layoutTracker';
import { jumpTo } from '../common/smoothScroll';

jest.mock('../common/Chrome', () => () => <canvas data-testid="sky" />);
jest.mock('../common/LaunchIntro', () => () => null);
jest.mock('../common/smoothScroll', () => ({ jumpTo: jest.fn(), smoothTo: jest.fn() }));

function Page() {
    const navigate = useNavigate();
    return <main id="main-content"><h1 id="project-name">Project.</h1>
        <Link to="/project">Open project</Link><Link to="/#work">Collection</Link>
        <section id="work">Work</section><button onClick={() => navigate(-1)}>Back</button>
    </main>;
}

test.each([false, true])('route motion respects reduced motion (%s) and preserves the gallery on Back', reduced => {
    const animate = jest.fn();
    HTMLElement.prototype.animate = animate;
    window.matchMedia = jest.fn(() => ({ matches: reduced }));
    try {
        render(<MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Routes><Route element={<LayoutWithTracker />}><Route index element={<Page />} />
                <Route path="project" element={<Page />} /></Route></Routes>
        </MemoryRouter>);
        const sky = screen.getByTestId('sky');
        fireEvent.click(screen.getByRole('link', { name: 'Collection' }));
        expect(animate).not.toHaveBeenCalled();
        Object.defineProperty(window, 'scrollY', { value: 680, configurable: true });
        fireEvent.scroll(window);
        fireEvent.click(screen.getByRole('link', { name: 'Open project' }));
        expect(screen.getByTestId('sky')).toBe(sky);
        expect(document.activeElement).toBe(screen.getByRole('main'));
        expect(animate.mock.calls.length).toBe(reduced ? 0 : 1);
        if (!reduced) expect(animate.mock.calls[0][1].duration).toBe(480);
        fireEvent.click(screen.getByRole('button', { name: 'Back' }));
        expect(jumpTo).toHaveBeenLastCalledWith(680);
    } finally {
        delete HTMLElement.prototype.animate;
        Object.defineProperty(window, 'scrollY', { value: 0, configurable: true });
    }
});
