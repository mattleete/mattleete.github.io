---
title: "Designing an internal AI product people could trust"
subtitle: "Product design and project management for an internally funded AI product at a global professional services firm, from a first version that missed to a funded full build."
description: "Case study: resetting an executive-led AI product after its first round of testing, and designing the MVP around trust in the output. Password-protected."
breadcrumb: "Work → AI Product"
meta:
  - { label: "My Role", value: "Product Designer & Project Manager" }
  - { label: "Context", value: "Internally funded AI product\nProfessional services" }
  - { label: "Timeline", value: "Two sprints · 2024" }
  - { label: "Team", value: "Design team (which I managed)\nDevelopment team" }
  - { label: "Deliverables", value: "Research and insights\nWireframes and prototypes\nTested MVP design" }
overview:
  challenge: "The firm funded an AI product as a strategic initiative, and the first version was scoped by executive stakeholders before it had been tested with the people who would use it."
  approach: "When our first round of testing showed that V1 didn't solve a real problem, I escalated it, worked directly with the business unit who would use the product to redefine its vision and scope, and designed the MVP around the adoption risk research had found, which was trust in the output."
  outcome: "The MVP was selected for continued internal funding, identified as a global priority and moved to full build."
gated: true
draft: false
next: super-fund
hero_html: |
  <div class="img-ph-lg"></div>
---

## An executive-led AI product, set up before the user need was defined

This was an unusual engagement, in that the client was the firm itself. The product was an internally funded AI tool intended to speed up how client services were delivered, and it was a strategic initiative led by senior executives rather than a response to a need a team had raised.

I was the product designer and the project manager. I managed the design team, contributed to the MVP product strategy, and ran the design process across two sprints: research and insights workshops to establish the current state, ideation, wireframes, user testing, and design updates from what testing found.

## The first round of testing said V1 solved no real problem

The V1 MVP had been directed by the executive stakeholders, and we designed it to that brief. The first round of user testing showed that it didn't solve a real problem for the people it was built for.

## Escalating the finding immediately instead of refining V1

There were two ways to handle that. We could keep iterating V1 within the brief, which was the lower-friction path with the sponsors, or we could take the finding back to them straight away and ask to change the brief. I escalated the insights immediately. In my opinion refining V1 would have produced a better-designed version of the wrong product, and every sprint spent on it would have made the reset harder to argue for.

## Redefining the scope with the business unit who would use it

Escalating the problem was only useful if we came back with a better answer, so I requested direct access to the internal business unit who would be using the product. We worked closely with them to redefine the product vision and scope around what their work actually needed, and took the revised scope back to the executive for approval. Once it was approved the project was back on track.

## Trust in the output was the adoption risk

Early research with users surfaced a second issue, which turned out to be the one that shaped the design. People were not confident in the accuracy of what an LLM would give them, and that lack of trust was a significant risk to adoption. A tool that produces a good answer the user doesn't believe will still go unused, or be checked so thoroughly that it saves no time.

With that in mind, we built every element of the MVP to be transparent about where its output came from, and treated trust as a requirement that applied to the whole product.

## Making every answer traceable to its source

The clearest expression of this was the trace feature. A user could highlight any part of the output and see the sources the LLM had generated it from. It let people check a specific claim against its source without re-doing the work themselves, which is what made the output usable.

I worked directly with the development team on the solution architecture, which kept the design inside what could actually be built. Traceability in particular depended on how the system handled and stored its sources, so it had to be agreed with the developers early rather than designed on top at the end.

## Funded for full build and identified as a global priority

The MVP was selected for continued internal funding, identified as a global priority and moved into full build.

## Reflection

The V1 problem only surfaced at the first round of testing, which was also the first time the business unit's view entered the work. If I ran this again I would push for access to them before V1 was scoped, since a few early conversations would have cost far less than a reset. The trust work confirmed something I now apply to any AI product, which is that the first question is whether people will believe the output, and the design has to answer that before it answers anything else.
