<!--
  Draft for community.home-assistant.io. Suggested category: "Frontend" (or
  "Share your Projects"). Fill in the [bracketed] bits, attach 1-2
  screenshots/a GIF, then post under your own account.

  Title suggestion (keep it short, searchable):
  Sigenergy Energy Flow Card — mySigen-style Solar/Battery/Grid flow graph with a period selector
-->

Hi all,

I've put together a custom Lovelace card that recreates the energy flow
graph from Sigenergy's **mySigen** phone app — Solar / Battery / Grid as
sources on the left, Battery / Load / Grid as destinations on the right —
directly in Home Assistant, with its own **Day / Week / Month / Year**
period selector.

**Repo:** https://github.com/kjmcfall/sigen-flow-card

### Why

The Sigenergy integrations give you plenty of raw sensors, but nothing that
reproduces the at-a-glance flow picture the phone app shows. I wanted that
picture on my own dashboard, with full history rather than just live power,
so I built it.

### What it looks like

[screenshot / GIF here]

### How it works (the honest version)

Sigenergy doesn't meter the individual sub-flows (e.g. "solar that went
straight to the battery" vs "solar that went to load") — only totals: solar
produced, battery charged/discharged, grid imported/exported, and load
consumed. This card allocates those totals across the ribbons using the same
priority order HA's own core Energy Distribution card uses (solar → load →
battery → grid export; battery/grid → whatever load is left), computed at an
hourly/daily/monthly bucket size depending on the period so a day where the
battery both charged and discharged doesn't cancel itself out. Full writeup
in the README if you're curious, along with a worked example from real data.

If your setup does expose real sub-flow sensors, wire them in — the
allocation model only fills in the gaps.

### Requirements

- Any Sigenergy integration that gives you daily energy (kWh) sensors for
  solar/battery/grid (Sigenergy Local Modbus, sigenergy2mqtt, etc.) — this
  card doesn't talk Modbus itself, it just reads whatever entities you point
  it at.
- HA's recorder keeping long-term statistics for those entities (the
  default).

### Install

Via HACS as a custom repository for now (details in the README) — happy to
submit it to the default HACS store once it's had a bit of real-world use.

### Feedback wanted

- Screenshots of the real mySigen graph from anyone willing to share one —
  I built the default colour palette and layout from written descriptions,
  not a live screenshot, so I'd like to true it up.
- Which Sigenergy integration/entity-naming you're on, if it's not covered
  in the README yet.
- Anything that looks wrong in the flow allocation for your own system.

[Your GitHub: kjmcfall]

<!-- Cross-post nudge: also worth linking this thread from
     https://community.home-assistant.io/t/energy-power-flow-with-generation-and-battery-monitoring-live-sankey-charts/863230
     and from the relevant Sigenergy integration's GitHub Discussions, since
     people already interested in exactly this problem are there. -->
