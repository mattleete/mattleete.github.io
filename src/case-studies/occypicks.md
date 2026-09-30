---
title: Designing and running a World Cup fantasy game for 23 friends
subtitle: OccyPicks, a self-initiated side project. I designed the game, the
  product and the brand, built it as a live web app and ran it across the 2026
  FIFA World Cup. Live at occypicks.com.
description: "Case study: self-initiated product, game and experience
  design for a season-long fantasy draft played by 23 friends across the 2026
  FIFA World Cup."
breadcrumb: Fun → OccyPicks
meta:
  - label: My Role
    value: Game design, product design and build
  - label: Type
    value: Self-initiated side project
  - label: Duration
    value: Feb – Jul 2026
  - label: Built for
    value: 23 friends
  - label: Deliverables
    value: |-
      Game and scoring system
      Design system and brand
      Live web app
      Post-season analysis
draft: false
hero_html: >
  <video class="cs-hero-media" autoplay muted loop playsinline
  poster="images/occypicks/occy-poster.png">
    <source src="images/occypicks/occy.mp4" type="video/mp4">
  </video>
overview:
  challenge: Off-the-shelf fantasy football is built around individual players
    in a domestic season. In a draft of national teams, whoever lands the
    favourites usually wins, and everyone else loses interest once their teams
    are knocked out.
  approach: I designed a team draft with a scoring multiplier that rewards
    weaker teams, built it as a web app with a real-time draft room and a
    mascot, and ran it live for the whole tournament.
  outcome: 23 people played through all 104 matches. Average points per team
    finished within 3.8 points across all four tiers, and the title was decided
    by two points on the final weekend.
gated: false
next: super-fund
---

## A tournament-length game for a casual group

Every four years my friend group, a couple of dozen people spread across cities and time zones, looks for a way to follow the World Cup together. Fantasy formats are built for domestic leagues, where you manage a squad of individual players week to week, and that is the wrong shape for a one-month tournament and a group who mostly want something to talk about.

Drafting national teams is simpler, but it has two problems. If you only count wins, whoever drafts Argentina or France runs away with it, and the person holding a minnow is out before a ball is kicked. And once your teams are eliminated you have nothing left to follow, often with two weeks of the tournament still to play.

I set four goals before designing anything, and used them to settle every decision after that. The game had to be fair, so that weak teams still gave you a real chance of winning. It had to be effortless, with no admin and no manual scoring. It had to be social, with shared live moments. And it had to be legible, so anyone could see where they stood without reading a rulebook. The constraints were fixed: 48 teams and 23 players meant about two teams each, FIFA set the calendar, and most people would only ever open it on their phone.

## The rules came before any of the screens

The most important design decision in the project was a scoring rule. I split the 48 teams into four tiers of twelve by FIFA ranking and inverted the reward, so a result from a top-tier team is multiplied by one and a result from a bottom-tier team by four. The base scoring stayed simple, three for a win, one for a draw and a bonus point for winning by two or more, and the tier multiplied the whole total.

Giving everyone more teams would have spread the luck, but with 48 teams and 23 players there weren't enough to go around, so the balance had to come from the scoring. I also scored the advancing team in a knockout as a win even when the game went to penalties, so that a shootout was never an anticlimactic draw. The draft itself was a snake draft, with pick order reversing every round so that no slot was a disadvantage.

The test I held the rules to was whether I could say them in one breath. "Win three, draw one, extra for a thrashing, times how much of an underdog your team is" is the whole game, and the rules screen is a handful of plain sentences.

![The OccyPicks rules screen explaining the scoring system](images/occypicks/rules.png "The rules screen, with the whole game stated in a few sentences")

## The multiplier balanced the game almost exactly

After the tournament I checked whether the multiplier had done its job. Across the full World Cup, the average points scored per team in each tier finished within 3.8 points of each other (×1: 14.8, ×2: 13.3, ×3: 11.0, ×4: 12.0), so on average it made very little difference whether you drafted a favourite or a minnow.

The final table showed the same thing. The winner's two teams were both knocked out by the round of 16, and they still won on 57 points, because a weak team's deep run was worth more than a favourite lifting the trophy. I finished second, two points behind, after a single penalty shootout at the ×4 multiplier.

## The live draft was the hardest piece of UX

The draft was the one event everyone joined at the same time, so it had to work for up to two dozen people picking in turn, on a timer, on any device, with everyone seeing the board update instantly. I designed the waiting room, the snake order, per-pick countdowns and commissioner controls to pause, undo, pick on someone's behalf and auto-draft.

The detail that mattered most was a drag-to-rank preference list. Anyone who couldn't be online for their turn ranked the teams they wanted in advance, and the draft picked for them from that list. It meant a casual player in a different time zone could still take part without holding the rest of the group up.

![The live draft room, mid-draft](images/occypicks/draft.png "The live draft room, with pick order on the left and the available teams and tiers on the right")

## A calm leaderboard in a genre full of clutter

Day to day, the app lived on its leaderboard. I went with a deliberately un-sporty look, minimal and editorial, near-monochrome, with large tight headlines and flag emoji as the only real colour. Betting and fantasy apps tend to be dense and loud, and I wanted the table to be something you could read at a glance in a group chat argument.

Each player's card shows their teams, form and points, and expands into a per-match breakdown for anyone who wants the detail. Your own card inverts to solid black so you can always find yourself, and the table refreshes itself as games finish. Fixtures, results and group tables each have a "your teams" filter, so a casual player can go straight to what they care about. It was built mobile-first, with full keyboard support, ARIA labelling and a reduced-motion path that stills the animated mascot.

<div class="cs-image-full tall"><img class="cs-shot" src="images/occypicks/leaderboard.png" alt="The OccyPicks live leaderboard"></div>
<div class="cs-image-caption">The live standings, with your own row inverted to black</div>

<div class="cs-image-half-grid">
<div class="cs-image-half"><img class="cs-phone" src="images/occypicks/m-landing.png" alt="OccyPicks on mobile, landing page"></div>
<div class="cs-image-half"><img class="cs-phone" src="images/occypicks/m-leaderboard.png" alt="OccyPicks on mobile, leaderboard"></div>
</div>
<div class="cs-image-caption">Mobile, where the game was actually played. Left: the landing page. Right: the leaderboard.</div>

## Occy had to earn its place on the landing page

Before kick-off the landing page would otherwise have been an empty countdown for weeks, and a social product needs a personality. "Occy" is Australian slang for an octopus and the name of the game is a pun on it, so the mascot was an easy choice, but I made myself justify it against a goal before building it.

Occy is a hand-drawn octopus that wanders the landing page on its own, chasing the flag emoji drifting around the screen. Each of its eight tentacles is a small physics simulation, so they trail and curl as it moves rather than following a keyframed loop. When it catches a flag it samples the emoji's pixels, pulls out its main colours and repaints itself, so eating Brazil turns it green and yellow. It gave people a reason to open the page before the tournament started, and it was the part of the product people screenshotted and sent to the group.

![Occy the octopus mascot on the landing page, recoloured from a flag](images/occypicks/landing.png "The landing page, with Occy recoloured from a flag it has just caught")

## Running it live found problems the prototypes couldn't

I built the app in React with Supabase for sign-in, data and real-time updates, used passwordless magic-link sign-in to keep joining simple, and served live scores from a cached feed so it stayed fast however many people were watching. Then I ran it for the whole tournament, which surfaced things no Figma file would have. An API rate limit broke live scores, I had a penalty-shootout scoring rule subtly wrong, time zones created edge cases, and some people got stuck at onboarding.

I kept designing while it ran. When the final whistle went I added a post-season analysis view, with the final table, top-scoring teams, how each tier performed, the best and worst value picks and an animated race of the whole season, so the tournament had an ending in the app as well as on the pitch.

![Occypicks post-season analysis, with the final standings](images/occypicks/postseason-analysis.png "Post-season analysis: final standings, top teams and how each tier performed")

## Fair on average, and still decided by luck

The multiplier was fair on average, but with only two teams each, the result still swung a lot on luck, and one team on a hot run could decide your month. Levelling that out would have meant more teams per person, which the numbers didn't allow, and it would also have taken away the best part of the game, which was a minnow's unlikely run. I chose to leave that variance in. The other thing I would keep from this is building what I design and then living with it, because operating the game for a month taught me more than any prototype did.
