# HACS submission checklist

## Custom repository (works immediately, no approval needed)

- [x] Public GitHub repo
- [x] `hacs.json` at repo root
- [x] README with install + config instructions
- [x] MIT `LICENSE`
- [x] Built `dist/sigen-flow-card.js` committed (HACS/manual installs read
      this directly — there's no build step on the user's HA instance)
- [ ] Push to `github.com/kjmcfall/sigen-flow-card` and set the repo
      description + topics (see below) — this repo doesn't exist on GitHub
      yet, so this is the first real step
- [ ] Cut a tagged **GitHub Release** (e.g. `v0.1.0`) — HACS reads release
      tags for versioning, not raw commits. Without a release, HACS falls
      back to "last 7 characters of the last commit," which works but looks
      unpolished to anyone browsing custom repos.
- [ ] Add repo topics: `home-assistant`, `hacs`, `lovelace`, `custom-card`,
      `sigenergy`, `energy`, `sankey`
- [ ] At least one real screenshot or GIF in the README (currently a
      placeholder — see the open item in README's Contributing section)

Once the above is done, anyone can add it via **HACS → Custom repositories**
using the repo URL, category "Dashboard" — no further approval needed.

## Default HACS store (optional, later)

Only worth pursuing once the card has had some real-world use and the
screenshot/polish items above are done. Process, per
[hacs/default](https://github.com/hacs/default):

- [ ] Repo has been public and stable for a while (no hard minimum, but a
      brand-new repo with zero history is routinely asked to wait)
- [ ] No open issues suggesting the card doesn't work at all
- [ ] Clear README, consistent releases
- [ ] Open a PR against `hacs/default` adding this repo to the
      `plugin` category list, following their PR template

This step is genuinely optional — plenty of well-used cards stay as custom
repositories indefinitely. It mainly buys discoverability (people can find it
by searching inside HACS instead of needing your repo URL).
