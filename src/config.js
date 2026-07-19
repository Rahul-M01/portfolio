const env = import.meta.env;

const value = (viteName, legacyName) => env[viteName] || env[legacyName] || '';

export const clientConfig = Object.freeze({
    linkedinUrl: value('VITE_LINKEDIN_URL', 'REACT_APP_LINKEDIN_URL') || 'https://www.linkedin.com/in/rahul1816/',
    githubUrl: value('VITE_GITHUB_URL', 'REACT_APP_GITHUB_URL') || 'https://github.com/Rahul-M01',
    discordInvite: value('VITE_DISCORD_INVITE', 'REACT_APP_DISCORD_INVITE'),
    indraUrl: value('VITE_INDRA_URL', 'REACT_APP_INDRA_URL'),
    plexUrl: value('VITE_PLEX_URL', 'REACT_APP_PLEX_URL'),
});
