# AZed Padi Exam Prep

**A - ACTOR:** Act as a Principal Frontend Product Designer and Full-Stack React/TypeScript Architect specializing in high-engagement EdTech applications with Tailwind CSS, shadcn/ui, Lucide Icons, and Supabase.

**I - INPUT:** I am building **"AZed Padi - Unofficial AZ-900 Exam Prep"** for the Power Learn Project Vibe Coding Hackathon (`#1MillionDevs`). Cloud beginners are overwhelmed by massive Microsoft Learn reading lists, dry terminology, and fear of practical scenario questions when they only have days left before their exam.

**M - MISSION:** Build a responsive, dark/light-mode enabled, full-stack React + TypeScript + Tailwind CSS application featuring 4 integrated study modules, a "Prompt X-Ray" inspection drawer for hackathon judges, and dual-persistence storage (Supabase + automatic `localStorage` fallback).

**M - MEMORY:** Enforce strict hackathon compliance across the entire UI:
1. Display a prominent, stylish badge in the top navigation bar and footer: `"Unofficial AZ-900 Exam Prep Tool — Not Affiliated with Microsoft"`.
2. Do NOT use official Microsoft or Azure logos anywhere in the interface (use custom Lucide cloud/shield/sparkles icons instead).
3. Support all 3 official AZ-900 exam domains with their exact syllabus weights:
   - Domain 1: Describe Cloud Concepts (25–30%)
   - Domain 2: Describe Azure Architecture and Services (35–40%)
   - Domain 3: Describe Azure Management and Governance (30–35%)

**A - ASSETS:** Structure the application around a clean data layer (`src/data/seedQuestions.ts`) capable of holding 50 scenario-based questions (`id` 1 to 50) with fields: `id`, `domain`, `domain_weight`, `topic`, `question_type`, `scenario`, `question`, `options` (A, B, C, D), `correct_option`, `explanation`, `padi_analogy`, and `exam_trap_warning`. Include 12 complete starter questions across all 3 domains immediately in `seedQuestions.ts` with a clean modular export so I can paste the full 50-question array in Cursor AI.

**P - PROMPT / ACTIONS:** Build the application with a persistent top header, mobile bottom bar / desktop sidebar navigation, and the following 5 interactive features:

1. **Global Header & "Prompt X-Ray" Judge's Modal:**
   - Brand logo: `"AZed Padi"` with a warm emerald-and-amber African tech aesthetic alongside Azure-inspired electric blue accents.
   - `"Unofficial Prep"` compliance badge.
   - `"Dialect / Vibe Selector"` pill in the header: lets the user switch Padi's explanation flavor between `"Pan-African English"`, `"Naija Pidgin Flow"`, and `"East African / Swahili Mix"`.
   - `"🧠 Prompt X-Ray"` button: Opens a sleek modal showcasing the exact **AIM + MAP** and **OCEAN** system prompts powering the app so hackathon judges can inspect our Prompt Engineering (20% rubric score) directly in the UI.

2. **View 1: "Time-Crunch" Triage Study Planner (`/planner`):**
   - Interactive slider: `"How many days until your AZ-900 exam?"` (Range: 1 to 30 days) + `"Daily study hours available"` (1 to 6 hours).
   - Dynamic Triage Algorithm: If `< 5 days` remain, activate **"Emergency Cram Mode"**—prioritizing high-weight topics first: *Domain 2: Architecture & Services (35–40%)* and *Domain 3: Management & Governance (30–35%)*.
   - Output an interactive, checkable day-by-day study roadmap showing exact topics to study, estimated minutes, and a `"Practice This Topic Now"` button that deep-links straight into the filtered Quiz Engine.
   - Include a visual relief banner: `"Exam Format Reality Check: AZ-900 has ZERO live portal coding labs! You only need to master scenario decisions, drop-downs, and concept matching."`

3. **View 2: Scenario Smart Quiz & "Practical Simulator" (`/quiz`):**
   - Filter bar: Filter questions by Domain, Mode (`Study Mode with Instant Feedback` vs. `Timed Exam Simulation`), or `Mistakes Review Deck`.
   - **CRITICAL TIMED MODE REQUIREMENT:** If the user selects `Timed Exam Simulation`, the app MUST randomize the order of the 50 questions, randomize the A/B/C/D option order, and display a sticky **45:00 Minute Countdown Timer** at the top of the screen (mirroring the real AZ-900 time limit). If the timer hits `00:00`, it must auto-submit the exam and route to the Readiness Tracker.
   - Question Card: Presents the real-world African business `scenario` in a highlighted callout box, followed by the `question` and 4 interactive option cards (`A`, `B`, `C`, `D`).
   - Instant Remediation Flow (Study Mode Only):
     - Upon selecting an option in Study Mode, highlight the correct option in emerald green and wrong selection in coral red.
     - Display the technical `explanation` and the `"⚠️ Exam Trap Warning"` callout.
     - Prominently render an interactive `"Ask AZed Padi: Break This Down with an African Analogy"` card that reveals the `padi_analogy`.
     - Include a `"Bookmark Analogy"` button that saves the concept.

4. **View 3: "AZed Padi" Jargon Translator & Study Buddy (`/padi`):**
   - Searchable quick-flip dictionary of the 20 toughest AZ-900 terms (including *CapEx vs. OpEx*, *Shared Responsibility*, *IaaS vs. PaaS vs. SaaS*, *Availability Zones vs. Region Pairs*, *ExpressRoute vs. VPN Gateway*, *Blob Tiers: Hot/Cool/Cold/Archive*, *LRS/ZRS/GRS/GZRS*, *Microsoft Entra ID*, *Zero Trust & 7-Layer Defense-in-Depth*, *Azure Policy vs. RBAC vs. Resource Locks*, *Azure Arc*, *Bicep vs. ARM*, *Retired TCO Calculator vs. Pricing Calculator*, *Copilot in Azure*).
   - Each card shows: (1) The 10-Second Exam Rule, (2) The African Real-Life Analogy (Commerce, Logistics, or Everyday Life), and (3) How the Exam Tests It.
   - Interactive AI Chat Drawer: Allows learners to type any confusing Azure question and get an instant **AIM + MAP + OCEAN** structured response from AZed Padi.

5. **View 4: Domain-Weighted Readiness Tracker (`/readiness`):**
   - Overall Readiness Gauge (0–100%) calculated using the exact AZ-900 domain weights:
     $$\text{Readiness} = (0.275 \times \text{Domain}_1) + (0.375 \times \text{Domain}_2) + (0.35 \times \text{Domain}_3)$$
   - Color-coded status badge: `< 65%` ("Needs Triage — Focus on Weak Domains"), `65%–84%` ("Almost Exam Ready"), `>= 85%` ("Ready to Ace AZ-900!").
   - Three domain progress cards showing accuracy percentage, questions completed out of 50, and a `"Drill Weakest Domain"` CTA button.

6. View 5: Scenario Smart Quiz Engine (Interactive quiz handling \multiple_choice`, `dropdown`, and `drag_and_drop` types, instant submit feedback, "Ask Padi" button). Ensure it includes a strict 45-minute countdown timer that auto-submits when zero, and flashes red under 5 minutes.`

7. **View 6 to our application: "Padi's Memory Vault" (/flashcards) — A flashcard and spaced-repetition coach for AZ-900 revision**
- Features an interactive card stack with a smooth 3D card-flip animation (Front: Tough AZ-900 Term or Scenario Trap; Back: Technical Definition + Padi's African Analogy).
- Includes two feedback buttons per card: "Still Confusing" (pushes card to the front of the retry queue) and "Got It, Padi!" (retires the card from the active deck).
- Includes a sub-tab for "Bookmarked Analogies" that automatically aggregates all analogies the user saved during their quiz sessions or AI chat buddy interactions.
- Styled with clean Tailwind cards, progress counters (e.g., "Cards Mastered: 14 / 30"), and a celebratory state when the deck is fully cleared.

### [OCEAN STYLING MANDATE]
- **Original:** Design a distinctive, vibrant UI (deep slate dark mode `#0B0F19`, electric sky blue `#0EA5E9`, warm amber `#F59E0B`, emerald `#10B981`) that looks like a flagship EdTech product, not a generic template.
- **Concrete:** Pre-populate realistic African scenarios and analogies so the app feels alive on first load.
- **Evident:** Display clear domain weight badges (`25–30%`, `35–40%`, `30–35%`) across every view. Include a visual 45-minute countdown clock in Timed Mode.
- **Assertive:** Micro-copy should be energetic, reassuring, and action-oriented.
- **Narrative:** Guide the user smoothly from "Panic about the exam" -> "Triage Plan" -> "Scenario Quiz with Padi" -> "85%+ Readiness Confidence."

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/44b8d35c-30b2-4851-858c-2c443d3e18df).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
