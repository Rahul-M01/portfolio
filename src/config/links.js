// Where each project actually lives.
//
// Electron apps point at /releases/latest, which always resolves to the newest
// release, so these never need updating when a new version ships.
//
// Anything left null hides its button rather than rendering a dead link.

const gh = (repo) => `https://github.com/Rahul-M01/${repo}`;

const LINKS = {
    lekhak: {
        repo: gh('lekhak'),
        download: `${gh('lekhak')}/releases/latest`,
    },
    kubera: {
        repo: gh('kubera'),
        download: `${gh('kubera')}/releases/latest`,
    },
    yudhishtra: {
        repo: gh('yudhishtra'),
        download: `${gh('yudhishtra')}/releases/latest`,
    },
    drishti: {
        repo: gh('drishti'),
        download: `${gh('drishti')}/releases/latest`,
    },
    bhima: {
        repo: gh('bhima'),
        // Set REACT_APP_DISCORD_INVITE to the OAuth2 URL from the Discord
        // developer portal. Unset means no invite button renders.
        invite: process.env.REACT_APP_DISCORD_INVITE || null,
    },
    drishyam: {
        repo: gh('drishyam'),
    },
};

export default LINKS;
