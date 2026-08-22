import { identity, groups } from './content/portfolio';

test('portfolio content exposes the owner identity and project groups', () => {
    expect(identity.first).toBe('Rahul');
    expect(identity.last).toBe('Mahajan');
    expect(groups.length).toBeGreaterThan(0);
    groups.forEach((g) => {
        expect(Array.isArray(g.projects)).toBe(true);
        g.projects.forEach((p) => {
            expect(p.title).toBeTruthy();
            expect(p.href).toBeTruthy();
        });
    });
});
