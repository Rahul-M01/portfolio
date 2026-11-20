import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './home/home';
import Bot from './projects/discord_bot/bot';
import Homelab from './projects/homelab/homelab';
import Drishyam from './projects/drishyam/drishyam';
import Lekhak from './projects/lekhak/lekhak';
import Kubera from './projects/kubera/kubera';
import Yudhishtra from './projects/yudhishtra/yudhishtra';
import Drishti from './projects/drishti/drishti';
import Login from './login/login';
import Library from './projects/drishyam/drishyam_site/drishyam_home';
import Header from './header/header';
import { allProjects } from './content/portfolio';

jest.mock('./common/Chrome', () => () => null);
jest.mock('./common/BlackHole', () => () => null);
jest.mock('./common/LaunchIntro', () => () => null);
jest.mock('./common/smoothScroll', () => ({ smoothTo: jest.fn() }));
const show = (element, path = '/') => render(<MemoryRouter initialEntries={[path]} future={{v7_startTransition:true,v7_relativeSplatPath:true}}>{element}</MemoryRouter>);
afterEach(cleanup);

test('homepage retains every project destination and navigable section', () => {
    show(<Home />);
    expect(screen.getByRole('heading', {level:1})).toHaveTextContent('RahulMahajan.');
    for (const project of allProjects) {
        expect(screen.getByRole('button', {name:'Preview ' + project.title})).toBeVisible();
    }
    fireEvent.click(screen.getByRole('button', {name:'Preview Drishyam'}));
    expect(screen.getByRole('heading', {level:1})).toHaveTextContent('Drishyam');
    expect(screen.getByRole('link', {name:/Open project/})).toHaveAttribute('href','/drishyam');
    fireEvent.keyDown(screen.getByRole('heading', {level:1}), {key:'ArrowRight'});
    expect(screen.getByRole('heading', {level:1})).toHaveTextContent('Lekhak');
    fireEvent.click(screen.getByRole('button', {name:'Project index'}));
    for (const project of allProjects) {
        const link = screen.getByRole('link', {name:new RegExp(project.title)});
        expect(link).toHaveAttribute('href', project.href);
        if (project.external) expect(link).toHaveAttribute('rel', 'noreferrer');
    }
    for (const id of ['work','apps','experiments','about','elsewhere','skills']) expect(document.getElementById(id)).toBeInTheDocument();
});

test.each([[Bot,'Bhima','/bot'],[Homelab,'Agni','/homelab'],[Drishyam,'Drishyam','/drishyam'],[Lekhak,'Lekhak','/lekhak'],[Kubera,'Kubera','/kubera'],[Yudhishtra,'Yudhishtra','/yudhishtra'],[Drishti,'Drishti','/drishti']])('%s renders the shared project layout with preserved features', (Page,title,path) => {
    show(<Page />, path);
    expect(screen.getByRole('heading',{level:1,name:title})).toBeInTheDocument();
    expect(document.querySelectorAll('.detail-feature').length).toBeGreaterThanOrEqual(3);
    expect(screen.getByRole('navigation',{name:'Project navigation'})).toBeInTheDocument();
    for (const a of document.querySelectorAll('a')) expect(a.getAttribute('href')).toBeTruthy();
    if (path === '/drishyam') expect(screen.getByRole('link',{name:/Open Drishyam/})).toHaveAttribute('href','/drishyam_home');
});

test('mobile menu closes on Escape and navigation', () => {
    show(<Header />);
    fireEvent.click(screen.getByRole('button',{name:'Open navigation'}));
    expect(screen.getByRole('button',{name:'Close navigation'})).toHaveAttribute('aria-expanded','true');
    fireEvent.keyDown(document,{key:'Escape'});
    expect(screen.getByRole('button',{name:'Open navigation'})).toHaveAttribute('aria-expanded','false');
    fireEvent.click(screen.getByRole('button',{name:'Open navigation'}));
    fireEvent.click(screen.getByRole('link',{name:'About',exact:true}));
    expect(screen.getByRole('button',{name:'Open navigation'})).toHaveAttribute('aria-expanded','false');
});

test('sign-in preserves the unavailable-backend guard', () => {
    show(<Login />, '/login');
    fireEvent.click(screen.getByRole('button',{name:'Login',exact:true}));
    expect(screen.getByRole('alert')).toHaveTextContent("Sign-in isn't available");
});

test('library has a usable empty state and disables unavailable downloads', () => {
    show(<Library />, '/drishyam_home');
    expect(screen.getByRole('heading',{level:1,name:'Your video library.'})).toBeInTheDocument();
    expect(screen.getByRole('button',{name:'Download'})).toBeDisabled();
    expect(screen.getByText('No videos to show yet.')).toBeInTheDocument();
});
