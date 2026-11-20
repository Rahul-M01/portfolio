import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import LaunchIntro from './LaunchIntro';

beforeEach(() => {
    jest.useFakeTimers();
    sessionStorage.clear();
    window.matchMedia = jest.fn(() => ({matches:false,addEventListener:jest.fn(),removeEventListener:jest.fn()}));
});
afterEach(() => jest.useRealTimers());

test('reduced-motion visitors bypass the animated introduction', () => {
    window.matchMedia = jest.fn(() => ({matches:true}));
    render(<LaunchIntro />);
    expect(screen.queryByRole('button',{name:/Skip intro/})).not.toBeInTheDocument();
});

test('intro can be skipped and does not replay on return', () => {
    const first = render(<LaunchIntro />);
    fireEvent.click(screen.getByRole('button',{name:/Skip intro/}));
    expect(screen.queryByRole('button',{name:/Skip intro/})).not.toBeInTheDocument();
    first.unmount();
    render(<LaunchIntro />);
    act(() => jest.advanceTimersByTime(3000));
    expect(screen.queryByRole('button',{name:/Skip intro/})).not.toBeInTheDocument();
});
