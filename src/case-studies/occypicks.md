---
title: A fantasy World Cup where every pick counts
subtitle: OccyPicks — self-initiated product, game and experience design
  for a season-long fantasy draft, played by 23 friends across the 2026 FIFA
  World Cup. Live at occypicks.com.
description: "Case study: self-initiated product, game and experience
  design for a season-long fantasy draft played by 23 friends across the 2026
  FIFA World Cup."
breadcrumb: Fun → OccyPicks
tags:
  - Product Design
  - Game Design
  - Creative Coding
  - Solo
meta:
  - label: My Role
    value: Design, game system & build
  - label: Type
    value: Self-initiated side project
  - label: Duration
    value: Feb – Jul 2026
  - label: Built for
    value: 23 friends (the KSO group)
  - label: Deliverables
    value: |-
      Game & scoring system
      Design system & brand
      Live web app
      Post-season analytics
draft: false
hero_html: >
  <video class="cs-hero-media" autoplay muted loop playsinline
  poster="images/occypicks/occy-poster.png">
    <source src="images/occypicks/occy.mp4" type="video/mp4">
  </video>
overview:
  challenge: Twenty-three friends wanted a shared, season-long way into the 2026
    World Cup. But fantasy formats are fiddly and player-by-player — and once
    your team is knocked out, you're watching the rest of the tournament with
    nothing at stake.
  approach: I designed a simple team-draft game with a scoring system that
    deliberately rewards weaker teams, built it as a live web app with a
    real-time draft, gave it a character — Occy — and ran it for real across the
    whole tournament.
  outcome: A product genuinely used by 23 people for a month. The scoring landed
    near-perfect balance across team strengths, the draft became a group event,
    and the season closed with its own analytics pack.
gated: false
next: rest-super
---

<!-- 01 THE PROBLEM -->
<div class="cs-section">
<div class="cs-section-aside">
<div class="cs-section-label">01</div>
<h2 class="cs-section-heading">The Problem</h2>
</div>
<div class="cs-section-body">
<p class="cs-body-text">Every four years my friend group — a couple of dozen people spread across cities and time zones — looks for a way to make a month-long tournament feel like a shared event rather than a series of games we each half-watch alone. Off-the-shelf fantasy football is built for domestic leagues: you manage a squad of individual players week to week. For a one-month World Cup with a casual, social group, that's the wrong shape entirely.</p>
<p class="cs-body-text">I set out to design something purpose-built for this exact situation. Three problems defined the brief:</p>
<div class="cs-stats">
<div class="stat-box">
<div class="stat-box-title">The dead-rubber problem</div>
<div class="stat-label">In most formats, once the teams or players you backed are eliminated, you have nothing left to care about — often with two weeks of tournament still to play. Engagement falls off a cliff at exactly the moment the football gets best.</div>
</div>
<div class="stat-box">
<div class="stat-box-title">The favourite tax</div>
<div class="stat-label">Everyone wants the same handful of strong teams. If you draft nations and simply count wins, whoever lands Argentina or France runs away with it, and the person left holding a minnow is out of contention before a ball is kicked.</div>
</div>
<div class="stat-box">
<div class="stat-box-title">It has to be social</div>
<div class="stat-label">The point isn't the app — it's the group. The product had to create shared moments (a draft night, a live table to argue over) and demand almost nothing from casual players who wouldn't tolerate friction or admin.</div>
</div>
</div>
<p class="cs-body-text">So this was really two design problems stacked on top of each other: a <strong>game-design</strong> problem — invent rules that keep everyone in it and every pick meaningful — and a <strong>product-design</strong> problem — wrap those rules in something so low-friction and enjoyable that 23 busy people would actually use it for a month.</p>
</div>
</div>

<!-- 02 GOALS & CONSTRAINTS -->
<div class="cs-section">
<div class="cs-section-aside">
<div class="cs-section-label">02</div>
<h2 class="cs-section-heading">Goals &amp; Constraints</h2>
</div>
<div class="cs-section-body">
<p class="cs-body-text">Before designing anything, I set four goals to hold the whole thing to. They became the lens I used to make every subsequent decision — from the scoring maths to the size of a tap target.</p>
<div class="cs-principles">
<div class="principle-cell">
<div class="principle-name">Fair</div>
<div class="principle-body">Someone who ends up with weak teams must still have a genuine, believable shot at winning. No dead picks.</div>
</div>
<div class="principle-cell">
<div class="principle-name">Effortless</div>
<div class="principle-body">A casual player should be able to draft, then check in occasionally, with zero admin and no manual scoring. It has to run itself.</div>
</div>
<div class="principle-cell">
<div class="principle-name">Social</div>
<div class="principle-body">Create shared, live moments — a draft everyone joins at once, a table that updates as games finish and gives people something to talk about.</div>
</div>
<div class="principle-cell">
<div class="principle-name">Legible</div>
<div class="principle-body">At any moment you should understand exactly where you stand and why, without reading a rulebook. The scoring has to be explainable in one breath.</div>
</div>
</div>
<p class="cs-body-text">The constraints were fixed and unusually concrete. Forty-eight teams and twenty-three players meant roughly two teams each. The calendar was set by FIFA — I was designing around a real tournament with real kick-off times, played by people in different time zones, mostly on their phones. And it had to be free, instant to join, and impossible to break.</p>
</div>
</div>

<!-- 03 MY ROLE -->
<div class="cs-section">
<div class="cs-section-aside">
<div class="cs-section-label">03</div>
<h2 class="cs-section-heading">My Role</h2>
</div>
<div class="cs-section-body">
<p class="cs-body-text">This was a solo project end to end. I moved between three hats, often within a single evening.</p>
<div class="cs-role-grid">
<div class="role-cell">
<div class="role-title">Game Designer</div>
<div class="role-body">Invented and balanced the rules — the tiered scoring system, the snake draft, the tie-breaks and edge cases (penalty shootouts, auto-assigned teams). The scoring maths was the single highest-leverage design decision in the project.</div>
</div>
<div class="role-cell">
<div class="role-title">Product &amp; Experience Designer</div>
<div class="role-body">Designed every screen and flow — onboarding, the live draft, the leaderboard, fixtures and results — plus the design system, the brand, and Occy the mascot. Prototyped in Figma, then designed directly in code.</div>
</div>
<div class="role-cell">
<div class="role-title">Engineer &amp; Operator</div>
<div class="role-body">Built and shipped the app (React, Supabase, real-time), stood it up on a custom domain, and ran the live season — entering edge-case results, keeping scores honest, and supporting 23 real users for a month.</div>
</div>
</div>
</div>
</div>

<!-- 04 DESIGNING THE GAME -->
<div class="cs-section">
<div class="cs-section-aside">
<div class="cs-section-label">04</div>
<h2 class="cs-section-heading">Designing the Game</h2>
</div>
<div class="cs-section-body">
<p class="cs-body-text">The heart of the product isn't a screen — it's a rule. If you draft national teams and simply score three points for a win, the game is decided at the draft: whoever grabs the strongest teams wins, and half the group is eliminated before kick-off. That fails the very first goal. So the central design problem was: <strong>how do you make a minnow worth drafting?</strong></p>
<p class="cs-body-text">My answer was a <strong>tier multiplier</strong>. I split all 48 teams into four tiers of twelve by FIFA ranking, then <em>inverted</em> the reward: the weaker the team, the more each result is worth.</p>
<div class="cs-table-wrap">
<table class="cs-table">
<thead>
<tr><th>Tier</th><th>FIFA rank</th><th>Multiplier</th><th>Design intent</th></tr>
</thead>
<tbody>
<tr><td class="td-meta">Top</td><td>1–12</td><td class="td-highlight">×1</td><td>Strong teams win often, so each win is worth less.</td></tr>
<tr><td class="td-meta">Upper</td><td>13–24</td><td class="td-highlight">×2</td><td>Solid teams; a fair middle.</td></tr>
<tr><td class="td-meta">Lower</td><td>25–36</td><td class="td-highlight">×3</td><td>Underdogs; every result matters more.</td></tr>
<tr><td class="td-meta">Bottom</td><td>37–48</td><td class="td-highlight">×4</td><td>Minnows win rarely, so when they do it pays off big.</td></tr>
</tbody>
</table>
</div>
<p class="cs-body-text">The base scoring stays dead simple — <strong>win 3, draw 1, plus a bonus point for winning by two or more</strong> — and the whole total is multiplied by the team's tier. A crucial detail: I score the <em>advancing</em> team in a knockout as a win even when the game goes to penalties, so a shootout is never an anticlimactic draw. Two more mechanics complete the design:</p>
<div class="cs-stats">
<div class="stat-box">
<div class="stat-box-title">The snake draft</div>
<div class="stat-label">Pick order reverses every round, so whoever picks last in round one picks first in round two. It's the fairness lever for the draft itself — nobody's slot is a disadvantage. Order is randomised, with a "scramble" so it can't be gamed.</div>
</div>
<div class="stat-box">
<div class="stat-box-title">One rule you can say out loud</div>
<div class="stat-label">"Win three, draw one, extra for a thrashing — times how much of an underdog your team is." That's the entire game. Legibility was a hard requirement: if I had to write a paragraph to explain scoring, the design had failed.</div>
</div>
</div>
<div class="cs-image-full"><img class="cs-shot" src="images/occypicks/rules.png" alt="The OccyPicks rules screen explaining the scoring system"></div>
<div class="cs-image-caption">The rules screen — the entire game stated in a handful of plain sentences</div>
<p class="cs-body-text">The real test came after the tournament, when I could check whether the multiplier had actually done its job. It had — almost exactly. Across a full World Cup, the average points scored per team in each of the four tiers landed within <strong>3.8 points of each other</strong> (×1: 14.8, ×2: 13.3, ×3: 11.0, ×4: 12.0). In other words, on average it made no meaningful difference whether you drafted a giant or a minnow — which is precisely what the system was designed to achieve.</p>
<div class="cs-quote">
<div class="cs-quote-text">The champion's two teams were both knocked out by the round of 16 — she still won. A weak team on a deep run was worth more than a favourite lifting the trophy. The multiplier didn't just balance the game; it authored the result.</div>
<div class="cs-quote-attr">From the post-season analysis</div>
</div>
</div>
</div>

<!-- 05 PROCESS -->
<div class="cs-section">
<div class="cs-section-aside">
<div class="cs-section-label">05</div>
<h2 class="cs-section-heading">Process</h2>
</div>
<div class="cs-section-body">
<p class="cs-body-text">I ran the project in five phases, from rules on paper through to operating a live season.</p>
<div class="cs-phases">
<div class="phase-item">
<div class="phase-num">1</div>
<div class="phase-content">
<div class="phase-title">Rules &amp; balance</div>
<div class="phase-body">I designed the game before designing a single screen — the tiers, the multiplier, the draft format — and pressure-tested the scoring against past tournaments to make sure a weak-team roster could realistically win. The rules were the product's foundation; everything visual came after.</div>
</div>
</div>
<div class="phase-item">
<div class="phase-num">2</div>
<div class="phase-content">
<div class="phase-title">Design language &amp; brand</div>
<div class="phase-body">I chose a deliberately un-sporty aesthetic — minimal, editorial, near-monochrome, with huge tight-tracked headlines and national-flag emoji as the only real colour. It's the opposite of a cluttered betting app, and it made the data feel calm and legible. This is also where Occy was born.</div>
</div>
</div>
<div class="phase-item">
<div class="phase-num">3</div>
<div class="phase-content">
<div class="phase-title">The live draft</div>
<div class="phase-body">The hardest UX in the project: a real-time room where up to two dozen people pick in turn, on a timer, from any device, all seeing the same board update instantly. I designed the waiting room, the snake order, per-pick countdowns, commissioner controls (pause, undo, pick-on-behalf, auto-draft) and a drag-to-rank preference list that auto-drafts for anyone who's offline on their turn.</div>
</div>
</div>
<div class="phase-item">
<div class="phase-num">4</div>
<div class="phase-content">
<div class="phase-title">Build &amp; ship</div>
<div class="phase-body">I built the app in React with Supabase for auth, data and real-time, chose passwordless magic-link sign-in to strip out friction, and shipped it on its own domain. Live scores come from a cached feed so the app stays fast no matter how many people are watching.</div>
</div>
</div>
<div class="phase-item">
<div class="phase-num">5</div>
<div class="phase-content">
<div class="phase-title">Run a real season</div>
<div class="phase-body">The product went live for the whole tournament — and I kept designing while it ran, adding a post-season "analysis" view once the final whistle blew so the story didn't just stop. Operating it taught me things no prototype could (see the reflection).</div>
</div>
</div>
</div>
<div class="cs-image-full"><img class="cs-shot" src="images/occypicks/draft.png" alt="The live draft room, mid-draft"></div>
<div class="cs-image-caption">The live draft room — pick order down the left, the available teams (with tiers) on the right, updating in real time for everyone at once</div>
</div>
</div>

<!-- 06 THE PRODUCT -->
<div class="cs-section">
<div class="cs-section-aside">
<div class="cs-section-label">06</div>
<h2 class="cs-section-heading">The Product</h2>
</div>
<div class="cs-section-body">
<p class="cs-body-text">Day to day, the app lives on its leaderboard. I designed it as a calm, scannable table where every player's card shows their teams, form and points at a glance — and expands to a full per-match breakdown for anyone who wants to argue the details. Your own card inverts to solid black so you always find yourself instantly. It refreshes itself as games finish, so the table people are arguing about in the group chat is always live.</p>
<div class="cs-image-full tall"><img class="cs-shot" src="images/occypicks/leaderboard.png" alt="The OccyPicks live leaderboard"></div>
<div class="cs-image-caption">The live standings — your own row inverts to black; tap any card for a per-match breakdown</div>
<p class="cs-body-text">Around the leaderboard sit fixtures, results and real group tables, each with a "your teams" filter so a casual player can cut straight to what they care about. Progressive disclosure runs throughout — expandable cards and collapsible sections keep dense data skimmable instead of overwhelming. And when the tournament ended, I added a Post Season Analysis view: the final table, top-scoring teams, tier performance, best and worst draft-value picks, and an animated race of the whole season.</p>
<p class="cs-body-text">Everything is responsive and built mobile-first — most people only ever opened it on a phone — with genuine accessibility care: full keyboard support, ARIA labelling, and a <em>prefers-reduced-motion</em> path that stills the animated mascot for anyone who needs it.</p>
<div class="cs-image-half-grid">
<div class="cs-image-half"><img class="cs-phone" src="images/occypicks/m-landing.png" alt="OccyPicks on mobile — landing"></div>
<div class="cs-image-half"><img class="cs-phone" src="images/occypicks/m-leaderboard.png" alt="OccyPicks on mobile — leaderboard"></div>
</div>
<div class="cs-image-caption">Mobile — where the game was actually played. Left: the landing. Right: the leaderboard.</div>
</div>
</div>

<!-- 07 OCCY -->
<div class="cs-section">
<div class="cs-section-aside">
<div class="cs-section-label">07</div>
<h2 class="cs-section-heading">Occy — Giving It a Face</h2>
</div>
<div class="cs-section-body">
<p class="cs-body-text">A social product needs a personality. "Occy" is Australian slang for an octopus — and the name of the game is a pun on it — so the mascot picked itself. But I didn't want a static logo sitting in a corner. The landing page, in the weeks before kick-off, would otherwise be an empty countdown. So I turned it into a playground.</p>
<p class="cs-body-text">Occy is a hand-drawn octopus that lives on the landing page and behaves like a small creature. National-flag emoji drift around the screen; Occy chases them, catches them, and — the part I'm most fond of — <strong>recolours itself from whatever flag it just ate</strong>. Eat the Brazil flag and Occy turns green and yellow; eat Japan and it goes red and white. It's built from three pieces of creative coding:</p>
<div class="cs-stats">
<div class="stat-box">
<div class="stat-box-title">A creature with moods</div>
<div class="stat-label">Occy wanders autonomously with a physics of its own — velocity, drift, a "breathing" speed that ebbs and flows, and an eased energy level that periodically re-rolls, so it speeds up and slows down like something alive rather than looping a canned animation.</div>
</div>
<div class="stat-box">
<div class="stat-box-title">Tentacles that actually hang</div>
<div class="stat-label">Each of the eight tentacles is a verlet-physics chain with its own personality — a travelling wave, curl and sway — that trails behind as Occy moves and reaches toward a nearby flag. Nothing is keyframed; it's simulated every frame.</div>
</div>
<div class="stat-box">
<div class="stat-box-title">Generative colour</div>
<div class="stat-label">On catching a flag, I sample the emoji's pixels, cluster them into its handful of real colours, and repaint Occy's body and each tentacle from that palette — so the mascot is endlessly, genuinely regenerating itself from the teams in play.</div>
</div>
</div>
<div class="cs-image-full"><img class="cs-shot" src="images/occypicks/landing.png" alt="Occy the octopus mascot on the landing page, recoloured from a flag"></div>
<div class="cs-image-caption">The landing page — Occy mid-roam, recoloured from a flag it has just caught</div>
<div class="cs-quote">
<div class="cs-quote-text">Occy did real work. It turned a dead countdown page into something people opened just to watch, gave the product a face people recognised, and became the thing they screenshotted and sent to the group. Delight was a feature, not a decoration.</div>
<div class="cs-quote-attr">On why it mattered</div>
</div>
</div>
</div>

<!-- 08 THE 2026 SEASON -->
<div class="cs-section">
<div class="cs-section-aside">
<div class="cs-section-label">08</div>
<h2 class="cs-section-heading">The 2026 Season</h2>
</div>
<div class="cs-section-body">
<p class="cs-body-text">The real test was the tournament itself. 23 friends drafted 48 teams and followed a live leaderboard for a month of football.</p>
<div class="cs-stats">
<div class="stat-box"><div class="stat-num">23</div><div class="stat-label">players drafted through a full season</div></div>
<div class="stat-box"><div class="stat-num">104</div><div class="stat-label">matches scored across the tournament</div></div>
<div class="stat-box"><div class="stat-num">2 pts</div><div class="stat-label">the winning margin, settled on the final weekend</div></div>
</div>
<p class="cs-body-text">The title came down to the wire: the champion took it on 57 points &mdash; despite both her teams being knocked out by the Round of 16 &mdash; edging me into second by a single penalty-shootout result at the &times;4 multiplier. It was exactly the kind of finish the scoring was designed to produce.</p>
<div class="cs-image-full"><img class="cs-shot" src="images/occypicks/postseason-analysis.png" alt="Occypicks post-season analysis — the final standings, with the champion crowned on 57 points"></div>
<div class="cs-image-caption">Post-season analysis &mdash; final standings, top teams, and how each multiplier tier performed.</div>
</div>
</div>

<!-- 09 REFLECTION -->
<div class="cs-section">
<div class="cs-section-aside">
<div class="cs-section-label">09</div>
<h2 class="cs-section-heading">Reflection</h2>
</div>
<div class="cs-section-body">
<div class="cs-reflection-list">
<div class="reflection-item">
<div class="reflection-heading">The most important design decision wasn't a screen — it was a rule.</div>
<div class="reflection-body">Every visual choice mattered, but the tier multiplier is what made the whole thing work. Getting weak teams to score more is a systems-design decision, and the post-tournament data showed it balanced the game to within a few points across every tier. It's a reminder that in a product like this, the mechanics <em>are</em> the experience.</div>
</div>
<div class="reflection-item">
<div class="reflection-heading">Fairness and drama pull against each other.</div>
<div class="reflection-body">Analysing the season afterwards, I found the multiplier was fair <em>on average</em>, but with only two teams each the outcome still swung on a lot of luck — one hot team could decide your month. Truly levelling that would mean giving everyone more teams. But that variance is also where the fun lives: a minnow's improbable run is the best part. Knowing which knob does what — and choosing not to turn it all the way — is the design judgement.</div>
</div>
<div class="reflection-item">
<div class="reflection-heading">Delight earns its place when it does a job.</div>
<div class="reflection-body">Occy could read as indulgence, but it solved a real problem — a lifeless pre-tournament page — and drove word of mouth. The lesson I took: whimsy is worth the effort when it's load-bearing, and self-indulgent when it isn't. I made myself justify Occy against a goal before building it.</div>
</div>
<div class="reflection-item" style="border-bottom:none;">
<div class="reflection-heading">Shipping and operating it taught me more than any mockup.</div>
<div class="reflection-body">Running a real season for real people surfaced problems no Figma file would have — an API rate limit that broke live scores, a penalty-shootout scoring rule I'd got subtly wrong, time-zone edge cases, onboarding friction. Designing something and then living with the consequences is the fastest feedback loop I know, and it's why I keep building the things I design.</div>
</div>
</div>
</div>
</div>
