import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Drishyam from './drishyam/drishyam';
import Homelab from './homelab/homelab';
import Drishti from './drishti/drishti';

jest.mock('../common/Chrome', () => () => null);
jest.mock('../common/smoothScroll', () => ({ smoothTo: jest.fn() }));
const show = Page => render(<MemoryRouter future={{v7_startTransition:true,v7_relativeSplatPath:true}}><Page /></MemoryRouter>);

test('every feature is visible and details can be opened independently', () => {
    show(Drishyam);
    for(const name of ['Uploads & playback','Save from a link','Hosted at home','Library controls']) {
        expect(screen.getByRole('heading',{level:3,name})).toBeVisible();
    }
    const button=screen.getByRole('button',{name:'More detail about Save from a link'});
    const panel=document.getElementById(button.getAttribute('aria-controls'));
    expect(panel).not.toBeVisible();
    fireEvent.click(button);
    expect(panel).toBeVisible();
    expect(button).toHaveAttribute('aria-expanded','true');
    expect(panel).toHaveTextContent('uses yt-dlp');
    expect(screen.getByRole('button',{name:'Less detail about Uploads & playback'})).toHaveAttribute('aria-expanded','true');
    fireEvent.click(button);
    expect(panel).not.toBeVisible();
});

test('expand and collapse all keep disclosure states consistent', () => {
    show(Drishyam);
    fireEvent.click(screen.getByRole('button',{name:'Expand all details'}));
    const buttons=screen.getAllByRole('button',{name:/Less detail about/});
    expect(buttons).toHaveLength(4);
    for(const button of buttons) expect(document.getElementById(button.getAttribute('aria-controls'))).toBeVisible();
    fireEvent.click(screen.getByRole('button',{name:'Collapse all details'}));
    for(const button of screen.getAllByRole('button',{name:/More detail about/})) {
        expect(button).toHaveAttribute('aria-expanded','false');
        expect(document.getElementById(button.getAttribute('aria-controls'))).not.toBeVisible();
    }
});

test('in-progress homelab status remains visible without opening details', () => {
    show(Homelab);
    const card=screen.getByRole('heading',{name:'Prometheus',level:3}).closest('article');
    expect(within(card).getByText(/I’m wiring up Prometheus/)).toBeVisible();
    expect(within(card).getByRole('button')).toHaveAttribute('aria-expanded','false');
});

test('related work includes external next project and a return link', () => {
    show(Drishti);
    const next=screen.getByRole('link',{name:/Next project.*Simulation/});
    expect(next).toHaveAttribute('href','https://rahul-m01.github.io/simulation/');
    expect(next).toHaveAttribute('rel','noreferrer');
    expect(screen.getByRole('link',{name:/Back to all projects/})).toHaveAttribute('href','/#apps');
    expect(screen.getAllByRole('link',{name:/project.*(Simulation|Yudhishtra)/})).toHaveLength(2);
});
