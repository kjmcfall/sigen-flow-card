<!--
  Paste this into the GitHub Release description when you create the
  v0.1.0 tag (see the instructions Claude gave you for the exact commands).
-->

First public release of the Sigenergy Energy Flow Card — a Home Assistant
Lovelace card that recreates the **mySigen** app's colour-coded energy flow
graph (Solar / Battery / Grid → Battery / Load / Grid) directly on your own
dashboard, with a built-in Day / Week / Month / Year period selector.

### Features

- Animated Sankey-style flow ribbons sized by kWh, colour-matched to the
  real mySigen app
- Own Day/Week/Month/Year period selector with `‹ ›` navigation — no Energy
  Dashboard configuration required
- Works off Home Assistant's long-term statistics; configurable entity
  mapping so it works with whichever Sigenergy integration you're on
- Since no Sigenergy integration meters individual sub-flows directly, flows
  are allocated using the same priority model as HA's core Energy
  Distribution card, computed per statistics bucket (hourly/daily/monthly)
  so a day where the battery both charges and discharges doesn't cancel
  itself out — see the README for the full explanation

### Install

Via HACS as a custom repository — see the README for details.

**Full changelog**: https://github.com/kjmcfall/sigen-flow-card/commits/v0.1.0
