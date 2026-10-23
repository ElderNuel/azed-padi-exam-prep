# 🌍 AZed Padi — Unofficial AZ-900 Exam Prep

**[🌐 Live Demo](https://azedpadi.vercel.app)**

> **⚠️ UNOFFICIAL COMPLIANCE DISCLAIMER:**
> _AZed Padi is an independent, unofficial study tool built for the Power Learn Project (PLP) Vibe Coding Hackathon (#1MillionDevs). It is NOT affiliated with, endorsed by, or sponsored by Microsoft Corporation. All 50 scenario questions are 100% original and mapped to the public 2026 Microsoft Learn AZ-900 syllabus. No official Microsoft or Azure logos are used in this project._

## 📖 The Problem Statement

African developers joining the **#1MillionDevs** movement face three massive hurdles when preparing for their first cloud certification (AZ-900):

1. **Information Overload & Time Crunch:** Microsoft Learn is incredibly comprehensive but overwhelming when you only have a few days left before the exam.

2. **Fear of Practical Application:** Learners memorize definitions but freeze on scenario-based exam questions because they lack practical simulation practice.

3. **Zero Cultural Context:** Intimidating cloud jargon (like _Availability Zones_, _LRS vs. GZRS_, or _ExpressRoute_) is explained using abstract Western corporate examples rather than relatable African commerce and logistics.

## 🚀 How AZed Padi Solves It

AZed Padi is a 4-in-1 integrated web app designed to take a learner from "panicking" to "exam-ready" through contextual, scenario-driven learning:

- **📅 Time-Crunch Triage Planner:** Enter your exam date, and the app generates a dynamic study plan. Less than 5 days left? It automatically triggers "Emergency Cram Mode," prioritizing high-weight domains (35-40%).

- **⏱️ 50-Scenario Smart Quiz Engine:** A rigorous exam simulator featuring 50 original questions. In Mock Mode, it enforces a strict **45-minute countdown timer**, randomizes question order, and shuffles A/B/C/D options to prevent pattern memorization.

- **🧠 African Analogy AI Study Buddy ("Padi"):** Built on a strictly governed Anthropic LLM, "Padi" translates tough Azure concepts into everyday African realities (e.g., comparing _Availability Zones_ to bank branches in Victoria Island, Ikeja, and Lekki on separate power grids). Available in Pan-African English, Nigerian Pidgin, and Swahili.

- **📊 Domain-Weighted Readiness Tracker:** Calculates your true exam readiness (0-100%) using the exact official syllabus weights (D1: 27.5%, D2: 37.5%, D3: 32.5%), pulling data seamlessly from your quiz attempts.

## 🏗️ Architecture & Tech Stack

**The Vibe Coding Workflow:** `Claude.ai` (Architecture & Data) ➔ `Lovable.dev + Supabase` (Scaffolding & Backend) ➔ `Cursor AI / VS Code Cline` (Logic Injection & UI Polish).

```
+-------------------------------------------------------------+
|                AZed Padi Client (React + TS SPA)            |
|  +--------------+  +--------------+  +-------------------+  |
|  | Quiz Engine  |  | Triage Plan  |  | Readiness Tracker |  |
|  +--------------+  +--------------+  +-------------------+  |
|         |                 |                    |            |
|         +---------+-------+---------+----------+            |
|                   ▼                 ▼                       |
|           [ Zustand Stores ]   [ DualAdapter ]              |
+---------------------------------------|---------------------+
                                        | (Sync & Async Writes)
          +-----------------------------+-----------------+
          ▼                                               ▼
+-------------------+                           +--------------------+
|   Local Storage   |                           |      Supabase      |
| (Offline Fallback)|                           | (PostgreSQL + RLS) |
+-------------------+                           +---------|----------+
                                                          ▼ (SSE)
                                                +--------------------+
                                                |   Edge Function    |
                                                |    (padi-chat)     |
                                                +---------|----------+
                                                          ▼
                                                +--------------------+
                                                |   Anthropic LLM    |
                                                +--------------------+

```

## 🏆 PLP Hackathon Judging Rubric Mapping

| Judging Criteria (Weight)    | How AZed Padi Delivers                                                                                                                                                  |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Learning Value (25%)**     | 50 syllabus-accurate (2026) scenario questions. Mathematical domain-weighted readiness score preventing false confidence.                                               |
| **Prompt Engineering (20%)** | Built using the **\[AIM + MAP\]** and **\[OCEAN\]** frameworks. Incorporates a Chain-of-Thought + Verifier pattern to guarantee 0% hallucinations. _(See `PROMPTS.md`)_ |
| **UX & Vibes (15%)**         | Vibrant dark/light mode African tech aesthetic. Flashing 45-min timer. Full keyboard accessibility (keys 1-4, A-D, Enter) for rapid studying.                           |
| **Rapid Prototyping (15%)**  | Scaffolded via AI in days. Implements a "Judge Demo Seeder" to instantly view analytics without answering 50 questions manually.                                        |
| **Tech Creativity (15%)**    | "Dual-Persistence" adapter writes to `localStorage` instantly for zero-latency, then syncs asynchronously to Supabase when online.                                      |
| **Presentation (10%)**       | Comprehensive markdown documentation, ASCII diagrams, and a UI "Prompt X-Ray" modal allowing judges to inspect system prompts live.                                     |

## 🔗 Prompt Engineering Documentation

The secret sauce behind AZed Padi is its rigorous prompt architecture. We have documented the exact prompts used to generate the app, the 50 questions, and the AI Buddy.
👉 [**Read the Master Prompt Architecture (PROMPTS.md)**](./PROMPTS.md)

## 💻 Installation & Usage

### Option 1: 1-Click Live Demo & Mobile Install (PWA)

AZed Padi is a Progressive Web App (PWA). You don't need an app store to install it.

1. Navigate to the live deployment URL: [https://azedpadi.vercel.app](https://azedpadi.vercel.app)

2. **On Android:** Tap the three dots (Chrome) and select **"Add to Home Screen"**.

3. **On iOS:** Tap the Share button (Safari) and select **"Add to Home Screen"**.

4. The app will launch in native full-screen mode!

### Option 2: Run Locally (Developers)

```bash
# 1. Clone the repository
git clone https://github.com/ElderNuel/azed-padi-exam-prep.git

# 2. Navigate into the directory
cd azed-padi-exam-prep

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev

```

_Note: Due to the `DualAdapter` architecture, the app works perfectly in local `study` mode without needing Supabase `.env` variables (falling back seamlessly to `localStorage`)._

_Built with passion for the #1MillionDevs Movement._
