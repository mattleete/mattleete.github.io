# Case study rewrite notes, 30 September 2026

Covers the three live case studies in `src/case-studies/`: the super fund (`super-fund.md`), the AI product and Occypicks.
Nothing is committed yet, so `git diff` shows the old and new versions side by side.

## Changes across all three

**Headings now tell the story.** "The Problem / Process / Reflection" became sentences like "Testing dropped a concept the team had rated highly". A reviewer who only reads the headings should still get the plot, and process labels make every case study look the same.

**The outcome sits at the top.** The overview strip now leads with the strongest result that can be verified. Previously, two of the three were vague ("received with strong enthusiasm", "[add outcome]").

**Your voice, not a template's.** I removed em-dash asides, "not X, but Y" lines, one-line punchlines, present-tense narration and words like "seamless". Sentences are longer and build across clauses. "I" is used for decisions and "we" for delivery. Spelling is Australian.

**Plain Markdown instead of bespoke HTML.** All three can now be edited in the CMS. The downside is that the stat boxes, persona cards and concept grid are gone. Occypicks keeps one small HTML block for the pair of phone screenshots.

**Shorter.** Each one is now roughly 650–1,300 words, down from about 2,000. Each section is one or two paragraphs.

**Heading size, 40px → 24px** (mobile 28px → 22px) in `case-study.css`. Sentence-length headings at 40px wrapped to five or six lines in the narrow left column.

**Grey placeholder boxes removed from the body text.** The placeholder heroes are still there.

## Super fund

| Change | Why |
|---|---|
| Title "Reducing Churn at the Moment of Value" → "Giving young super members a reason to stay" | The old title was clever but vague. The new one tells a stranger what the work was about. |
| Removed the FY23–25 member/FUM table and "2 million members" | With public annual reports, these identify the fund, and the client name is still unconfirmed in your facts file. Replaced with "~$100B FUM". |
| Outcome changed to "prioritised in the roadmap + came back for more work" | Both outcomes are verified. "Strong enthusiasm" reads as padding. |
| Persona cards cut, and your own hindsight about the persona is now the reflection | Reviewers are sceptical of personas presented as findings. Your source doc had an honest reflection (the persona drifted into a reference point) that is stronger than the four generic lessons. |
| Six concepts cut to the three you ranked highest | They make the point in one paragraph. Six concept cards read as a screen dump. |
| Testing reversal given its own section | A concept dropped after testing is the strongest signal in the piece. |
| Added: workshops with up to 20 stakeholders, maps co-built with SMEs | Verified facts that weren't on the page. |
| Dropped "Test assumptions, not solutions… two major pivots" | This only appears on the live page, not in your source doc, and nothing supports "two pivots". |

**Confirm before this goes live:**
1. ~~Did you test with members?~~ **Confirmed 30 Sep: yes, concepts were tested with members.**
2. Your source doc lists the six concepts as "illustrative directions" in an appendix. Were the three I describe the ones actually delivered and prioritised?
3. 12 weeks and a team of 3–4 are carried over from the old page. Neither is in the facts file.
4. The finding that app users churn less comes from the client's own data. I stated it without numbers. Check you're comfortable including it.
5. ~~The URL names the client.~~ **Done 30 Sep: renamed to `portfolio-case-study-super-fund.html`.** The old URL no longer exists, so any link you've already sent will 404.
6. Your title is still unresolved (CX Lead or CX Designer), so I used "Led the CX team", which is verified.

## AI product

| Change | Why |
|---|---|
| Rebuilt from your verified facts: the V1 reset, the trust research, the trace feature and the funding outcomes | The old page was mostly placeholders. This is your strongest story and none of it was on the page. |
| Role changed from "Delivery Lead" to "Product Designer & Project Manager" | Matches the facts file. |
| Dropped "on time and within budget" | It isn't in the facts file, which only says "delivered successfully". |
| Firm not named in the body ("a global professional services firm"); no codename | The V1 story criticises executive direction at your former employer, and the employment matter is still live. |

**Reasoning I've written in your voice that isn't in the facts file. Check it or replace it:**
- That refining V1 would have given "a better-designed version of the wrong product", and that iterating was the lower-friction option with the sponsors.
- That traceability had to be agreed with the developers early because it depended on how sources were stored.
- The whole reflection paragraph.

Also: "2024" is carried over from the old page. Team size and the number of test participants are unknown, and adding either would make the piece stronger. **Read this one once more with the employment matter in mind before it goes live.**

## Occypicks

| Change | Why |
|---|---|
| Cut about 40%, and the facts are unchanged | It was the longest page, and the best material was buried under process. |
| Removed lines like "it authored the result", "Delight was a feature, not a decoration", "falls off a cliff", "load-bearing whimsy" | These are the lines that read most like AI. |
| The five "Process" phases merged into the sections they belong to | The phases repeated what the other sections already said. |
| Added the option you didn't take (more teams per person) to the scoring decision | A decision reads as judgement when the alternative is shown. This comes from your own reflection. |
| The winner is referred to without a pronoun, and "the KSO group" is removed | Neither needed on a public page. |
| All images kept, captions rewritten | — |

It's still slightly over the target length at around 1,280 words. If you want it shorter, cut the paragraph on Occy's mechanics first.

## Not touched
- **University CRM draft** (`design-source/`). It's already in this style from the last session, and its inferred items are still open.
- **Home card descriptions** in `home.yml` still use the old framing and em-dashes. Suggested replacements:
  - Making complex simple: "Member experience strategy and product concepts to keep young members with a large Australian super fund."
  - Making unknown trustworthy: "Resetting an internal AI product after its first round of testing, and designing it around trust in the output."
  - Occypicks: "A World Cup fantasy game for 23 friends, with scoring that makes minnows worth drafting. Designed, built and run solo."

## Short versions (for applications and LinkedIn)

**Super fund (~140 words).** Member experience strategy for an Australian super fund with around $100B in funds under management. The fund was losing young members just as their balances started to grow, and the experience gave them little reason to feel they were in the right fund. Over twelve weeks we worked from the fund's existing research, and anchored the work on one finding: members who used the app churned far less than those who didn't. I facilitated workshops with up to 20 stakeholders, built current and future state journey maps with the fund's SMEs, and developed concepts aimed at first login, life milestones and return visits. We dropped one concept the team rated highly after testing showed members didn't feel the problem it solved. The fund prioritised the chosen concepts in its roadmap and came back for further work. I led the CX team.

**AI product (~140 words).** An internally funded AI product at a global professional services firm, set up as an executive-led strategic initiative. The first round of user testing showed that V1, scoped by the executive sponsors, didn't solve a real problem for its users. I escalated the finding immediately, asked for direct access to the business unit who would use the product, and redefined the vision and scope with them before taking it back to the executive for approval. Research also showed that trust in the accuracy of the output was the main adoption risk, so we made every element of the MVP transparent. The most visible part was a trace feature that showed the sources behind any part of an answer. The MVP was funded for full build and identified as a global priority. I was product designer and project manager, and managed the design team.

**Occypicks (~135 words).** A World Cup fantasy game I designed, built and ran for 23 friends across the 2026 tournament. Drafting national teams usually means whoever gets the favourites wins, and everyone else stops caring once their teams are out. I split the 48 teams into four tiers by FIFA ranking and multiplied each result by its tier, so a minnow's win was worth four times a favourite's. After the tournament, average points per team finished within 3.8 points across all four tiers, and the winner took the title with two teams that were both out by the round of 16. I built it in React and Supabase, with a real-time draft room, a mobile-first leaderboard and an animated mascot. Solo side project covering game design, product design and build.

## Visuals still needed
- **Super fund:** an abstracted journey map, the three prioritised concepts as mockups with dummy data, and a workshop photo only if it shows the thinking. No client branding.
- **AI product:** V1 scope next to the redefined scope, the trace feature as an abstracted wireframe with no real data, and a simple diagram of the reset.
- **Occypicks:** done.
