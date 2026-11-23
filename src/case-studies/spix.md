---
title: "Giving gamers with impaired speech a voice in team chat"
subtitle: "Founder and product designer of Spix App, an accessibility product that let gamers with impaired speech say key callouts to their team, from a design-a-thon category win to a funded accelerator place."
description: "Case study: researching, co-designing and testing an accessibility product for gamers with impaired speech, built around a phrase wheel that played recorded or text-to-speech callouts into voice chat."
breadcrumb: "Work → Spix App"
meta:
  - { label: "My Role", value: "Founder & Product Designer" }
  - { label: "Type", value: "Accessibility startup" }
  - { label: "Timeline", value: "Oct 2020 – Dec 2022" }
  - { label: "Team", value: "Founding team\nDevelopers" }
  - { label: "Deliverables", value: "Research and co-design\nFlows, IA and UI in Figma\nWorking proof of concept\nPitch deck and live demo" }
overview:
  challenge: "Team play in online games runs mostly on voice chat, and the most popular tools are built around speech, which makes it harder for gamers with impaired speech to take part."
  approach: "We researched, co-designed and tested with the people we were designing for, and built a phrase wheel that played recorded or text-to-speech callouts into voice chat with a key press and a flick of the mouse."
  outcome: "Won the e-sports and online gaming category and $10,000 at Remarkable's 2020 design-a-thon, and a place in its 2021 accelerator with $70,000 in funding."
gated: false
draft: false
next: ai-accelerator
hero_image: /images/spix/hero.png
hero_caption: "The Spix App banner"
---

## Online games run on voice, and the tools assume everyone can speak

Spix was my idea. I took it to the Remarkable design-a-thon in 2020, where I formed a team around a shared interest in online gaming, and we entered the e-sports and online gaming category. The problem we set out to solve was that team play in online games runs mostly on voice chat. Calling out an enemy, asking for a heal or leading a team through a fight all rely on being able to say it quickly and clearly, and the most popular tools are built around speech, which makes gaming harder for people with impaired speech. We set out to design something built around inclusion from the start, where every player had an equal chance to contribute and to be heard.

I was the founder and the product designer. After the design-a-thon I was the one who carried Spix forward, and I held all of the equity in the business. I defined the product vision, value proposition and MVP scope from what our research found, designed the flows, information architecture and UI in Figma from wireframes through to high-fidelity screens, and produced the pitch deck and live demo we took to judges and accelerator panels.

## Researching and co-designing with the people who would use it

We ran research, co-design workshops and usability testing with people with impaired speech, autistic people and children with a range of access needs, working with the users themselves rather than through proxies for them.

## A phrase wheel on a key and a flick of the mouse

We built the product around a phrase wheel. A player loaded their key phrases into the wheel, either recorded in their own voice or typed in for text-to-speech, and each phrase sat at a position on it, such as 12 o'clock. In a game they held a key, moved the mouse towards the phrase and released the key, and Spix said it to their team. "Push the point", "heal me", "I'm being attacked", "enemy on me" and "wait a second" could each be said in one movement.

<div class="cs-image-full fit"><img class="cs-shot" src="/images/spix/phrase-wheel.png" alt="A six-position phrase wheel with Push the point selected at 12 o'clock, and a hold key in the centre"></div>
<div class="cs-image-caption">The phrase wheel, illustrated for this page rather than taken from the original designs</div>

The calls that matter most in team games are short and time-critical, and the wheel let players with impaired speech get that information to their teammates quickly. Binding phrases to a key and a mouse direction also kept their hands where they already were, on the keyboard and mouse, so a callout didn't mean stopping to type in the middle of a fight.

<div class="cs-flow" role="group" aria-label="How a player set up and used the phrase wheel">
<div class="cs-flow-lane">
<div class="cs-flow-label">Before a game</div>
<ol class="cs-flow-steps">
<li>Record a phrase, or type it for text-to-speech</li>
<li>Choose a voice for typed phrases</li>
<li>Place each phrase on the wheel</li>
</ol>
</div>
<div class="cs-flow-lane">
<div class="cs-flow-label">In a game</div>
<ol class="cs-flow-steps is-reset">
<li>Hold the wheel key</li>
<li>Move the mouse towards the phrase</li>
<li class="is-outcome">Release, and the team hears it in voice chat</li>
</ol>
</div>
</div>

## Sitting in the audio chain so it worked with any game

Spix sat in the audio chain, between the player and their voice chat, so the phrases reached teammates as speech through Discord or a game's own voice chat. A player could use it instead of a microphone or alongside one, which meant someone with some speech could talk as normal and use the wheel for the calls that were harder to say. It also meant their teammates didn't need to install anything or change how they played.

Building it meant designing within the technical constraints of speech input and game controls, which we worked through with the developers on a working proof of concept.

## A voice that fitted the player

For players who couldn't speak, text-to-speech did the talking, and that raised a question recorded phrases didn't, which was whose voice the team would hear. The concept was a range of text-to-speech voices, so a player could choose one that resonated with their persona in the game.

## Mapping the product around the wheel

Alongside the wheel itself, I mapped the key screens of the product and what each one needed to do. The wheel sat at the centre, and the active wheel stayed visible from the home dashboard and the persistent menu. Around it, loadouts let a player keep alternative wheels and attach them to a game profile, a recording studio let them record, trim and edit their own clips, a library kept those clips searchable and tagged, and a marketplace let them sample and buy clips. The game setup also covered Zoom and Teams calls as well as games.

<div class="cs-map" role="group" aria-label="The key screens of Spix App and what each one did">
<div class="cs-map-screen"><div class="cs-map-name">Log in</div><ul><li>Username and password</li><li>Recover password</li><li>Sign in or sign up</li></ul></div>
<div class="cs-map-screen"><div class="cs-map-name">Persistent menu</div><ul><li>Active loadout</li><li>Change or edit loadout</li><li>Home, library, marketplace and settings</li></ul></div>
<div class="cs-map-screen"><div class="cs-map-name">Home dashboard</div><ul><li>Active voice wheel</li><li>Navigation</li><li>What's new and tips</li><li>Sign out</li></ul></div>
<div class="cs-map-screen is-core"><div class="cs-map-name">Audio wheel</div><ul><li>Phrase buttons with audio attached</li><li>Keybindings</li><li>Update audio files</li><li>Equalise audio levels</li><li>Customise visuals</li><li>Swap wheel</li></ul></div>
<div class="cs-map-screen"><div class="cs-map-name">Loadouts</div><ul><li>Saved loadouts</li><li>Create new loadout</li><li>Duplicate</li><li>Favourite</li></ul></div>
<div class="cs-map-screen"><div class="cs-map-name">Recording studio</div><ul><li>Record a new clip</li><li>Edit length and sound</li><li>Apply sound effects</li><li>Name and save</li></ul></div>
<div class="cs-map-screen"><div class="cs-map-name">Library</div><ul><li>Review saved clips</li><li>Search, tag and filter</li><li>Upload and delete</li><li>Link to marketplace</li></ul></div>
<div class="cs-map-screen"><div class="cs-map-name">Marketplace</div><ul><li>Search clips</li><li>Sample and listen</li><li>Buy</li></ul></div>
<div class="cs-map-screen"><div class="cs-map-name">Game setup</div><ul><li>Game profiles</li><li>Add wheels to a profile</li><li>Customise a wheel per game</li><li>Setup for Zoom and Teams</li></ul></div>
<div class="cs-map-screen"><div class="cs-map-name">Settings</div><ul><li>Audio</li><li>Light and dark mode</li><li>Keyboard shortcuts</li></ul></div>
</div>
<div class="cs-image-caption">The key screens and what each needed, redrawn from my original screen map</div>

## Testing the prototype with users with a range of needs

We designed against WCAG and tested the prototype with users with a range of specific needs, running rounds of usability testing and feeding what they found into each iteration.

## Winning our category, and a funded accelerator place

Spix won the e-sports and online gaming category and $10,000 at Remarkable's 2020 design-a-thon, which led to a place in its 2021 accelerator with $70,000 in funding. Through the accelerator we had coaches and mentors we met with several times a week, and by mid-2021 the prototype was in testing and we were working to finalise it for market. I worked on Spix until December 2022.
