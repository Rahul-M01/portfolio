# Hosting the projects, for free, with no card

Goal: someone reading the CV can click through and actually try something.
Constraint: no payment method anywhere.

The seven projects need three different things. Only two of them are
"hosting" in the normal sense.

---

## 1. The four Electron apps

**Lekhak, Kubera, Yudhishtra, Drishti**

These have no server. There is nothing to host. What they need is
distribution, and GitHub gives that away:

- **GitHub Releases** stores the installers. No download limit, no cost.
- **GitHub Actions** builds them. Unlimited minutes on public repos.
- **electron-updater** reads Releases directly, so the apps self-update.

### Setup, once per repo

1. Copy `electron-release.yml` into the repo at `.github/workflows/release.yml`.
2. Add electron-builder if it isn't there yet:

   ```
   npm install --save-dev electron-builder
   ```

3. Point electron-builder at GitHub in `package.json`:

   ```json
   "build": {
     "appId": "com.rahulmahajan.<app>",
     "publish": [{ "provider": "github", "owner": "Rahul-M01", "repo": "<repo>" }]
   }
   ```

4. Tag and push:

   ```
   git tag v1.0.0
   git push origin v1.0.0
   ```

The workflow builds Windows, macOS and Linux in parallel and attaches every
installer to the release.

### The one cost trap

Actions minutes are unlimited **only on public repos**. Private repos get
2000 minutes a month and **macOS runners bill at 10x**, so three platforms on
a private repo will burn the quota quickly. Either keep these repos public,
or delete the `macos-latest` line from the workflow matrix.

### Downloads on the site

Each project page links to:

```
https://github.com/Rahul-M01/<repo>/releases/latest
```

That URL always resolves to the newest release, so the site never needs
updating when a new version ships.

---

## 2. Bhima, the Discord bot

A Discord bot doesn't need to be publicly hosted for someone to try it. It
needs an **invite link**. Anyone can add the bot to their own server and use
it, as long as the process is running somewhere, and it already runs on the
homelab.

Generate the invite in the Discord Developer Portal:

1. Applications, pick the bot, then OAuth2 > URL Generator
2. Scopes: `bot` and `applications.commands`
3. Pick only the permissions the bot actually uses. Do not tick Administrator.
4. Copy the generated URL, set it as `REACT_APP_DISCORD_INVITE`

**The honest caveat:** the invite only works while the homelab is up. If the
bot is offline when a recruiter clicks, it joins the server and sits there
dead, which is worse than no link. Two options:

- Accept it, and only advertise the link while the lab is healthy.
- Move the bot to a free always-on host. Without a card that means one of the
  small operators (Wispbyte, bot-hosting.net, Pella). They need no payment
  method, but they are small businesses that may not last, and you would be
  handing them your bot token. For a portfolio piece that tradeoff is
  probably fine; for anything you depend on, it isn't.

Oracle Cloud Always Free is the only genuinely permanent free VM, but it
requires a card for identity verification, so it is ruled out here. Worth
knowing they also cut the free ARM allocation from 4 cores/24GB to
2 cores/12GB in June 2026.

---

## 3. Drishyam, the video platform

This is the one that cannot be done properly for free, and it's better to say
so than to point at something that dies in three months.

Video means storage, egress bandwidth and FFmpeg transcoding. Every free tier
that offers all three either caps it so low it's useless or shuts down. There
is no stable free option.

What to do instead, in order of preference:

1. **A screen recording.** A 60 second capture of the real thing, uploaded to
   the repo or YouTube unlisted, embedded on the project page. A recruiter
   gets to see it work in less time than a live demo would take to load.
2. **Screenshots** of the actual interface on the project page.
3. **Keep it homelab-only** and say so on the page. "Runs on my homelab" is a
   perfectly good line on a portfolio, and self-hosting is the point of the
   project anyway.

Do not build a fake public demo with mock data. It reads as dishonest to
anyone technical, which is exactly who is looking.

---

## 4. Agni and Simulation

**Agni** is the homelab itself. There is nothing to host, it *is* the host.

**Simulation** is already on GitHub Pages and already linked.

---

## Summary

| Project     | What it needs        | Where            | Cost |
|-------------|----------------------|------------------|------|
| Lekhak      | Distribution         | GitHub Releases  | Free |
| Kubera      | Distribution         | GitHub Releases  | Free |
| Yudhishtra  | Distribution         | GitHub Releases  | Free |
| Drishti     | Distribution         | GitHub Releases  | Free |
| Bhima       | Invite link          | Discord OAuth2   | Free |
| Drishyam    | Recording or stills  | Repo or YouTube  | Free |
| Agni        | Nothing              | Is the homelab   | Free |
| Simulation  | Already done         | GitHub Pages     | Free |
