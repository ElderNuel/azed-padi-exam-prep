# 🧠 AZed Padi — Master Prompt Engineering Architecture (`PROMPTS.md`)

> **Disclaimer:** _AZed Padi is an **Unofficial** Microsoft Azure Fundamentals (AZ-900) Exam Prep tool built for the Power Learn Project (PLP) Vibe Coding Hackathon (`#1MillionDevs` Movement). It is not affiliated with, endorsed by, or sponsored by Microsoft Corporation. All 50 scenario questions are 100% original and mapped to the public 2026 Microsoft Learn AZ-900 syllabus._

## 📐 Prompt Engineering Methodology

To guarantee zero hallucinations, 2026 syllabus accuracy, and a culturally resonant learning experience for African cloud beginners, every prompt used to architect, build, and power **AZed Padi** is engineered using the **AIM + MAP** and **OCEAN** frameworks:

### 1. The `AIM + MAP` Structural Recipe

- **A — Actor:** Defines the specialized technical persona and domain expertise the AI must adopt.
- **I — Input:** Establishes the learner pain points, target audience (`#1MillionDevs`), and hackathon rubric context.
- **M — Mission:** Declares the exact, measurable deliverable the AI must output.

- **M — Memory:** Preserves architectural continuity, data models, and state across multi-stage builds.
- **A — Assets:** Anchors the AI strictly in the attached AZ-900 curriculum notes, hackathon rules, and web development foundations.
- **P — Prompt / Actions:** Provides deterministic, step-by-step execution instructions.

### 2. The `OCEAN` Stylistic & Quality Mandate

- **O — Original:** Rejects generic textbook definitions and copyrighted exam dumps in favor of fresh, scenario-driven African business cases and analogies.
- **C — Concrete:** Uses tangible examples (e.g., Lagos BRT lanes, M-Pesa mobile money spikes, Balogun/Gikomba market stalls, NEPA/solar inverters) instead of vague cloud abstractions.
- **E — Evident:** Backs every quiz explanation with verifiable 2026 syllabus facts (e.g., 16-nines durability for GZRS, 90-day minimum for Blob Cold tier, retired TCO Calculator).
- **A — Assertive:** Strips out robotic AI filler words (_"delve," "tapestry," "in conclusion"_) in favor of punchy, direct, peer-to-peer coaching.
- **N — Narrative:** Connects complex cloud workflows into memorable stories that stick during high-pressure exam situations.

## 🛠️ Execution Roadmap (How to Use This File)

1. **Step 1 (Claude.ai):** Upload your 3 reference documents (`AZ-900 Notes`, `Hackathon Brief`, `Web Dev Foundations`) into Claude and run **Prompts 1A, 1B, and 1C** to generate your architecture, system instructions, and all **50 AZ-900 questions** ( split into two 25-question batches so Claude never cuts off the JSON output).

2. **Step 2 (Lovable.dev + Supabase):** Copy **Prompt 2A** and **Prompt 2B** into Lovable.dev to scaffold the complete React + TypeScript + Tailwind + Supabase application.

3. **Step 3 (Cursor AI):** Clone your GitHub repo into Cursor AI, add **Prompt 3A** as your `.cursorrules` file, and run **Prompts 3B and 3C** in Cursor Composer to inject all 50 questions, polish the UI, and generate your `README.md`.

# PHASE 1: CLAUDE.AI PROMPTS (Architecture & 50-Question Engine)

## Prompt 1A: System Architecture, Database Schema & In-App Padi Prompt

_Copy and paste this into Claude.ai alongside your uploaded AZ-900 and Hackathon PDF documents._

```
### [AIM + MAP FRAMEWORK]

**A - ACTOR:** Act as a Principal Cloud Solutions Architect (Microsoft Azure Certified Trainer) and Lead Full-Stack TypeScript Engineer with a gift for witty, culturally grounded African storytelling.

**I - INPUT:** I am building "AZed Padi - Unofficial AZ-900 Exam Prep" for the Power Learn Project Vibe Coding Hackathon. Beginners preparing for the AZ-900 exam face three massive hurdles:
1. Overwhelming volume of dry material on Microsoft Learn when only a few days remain before the exam.
2. Intimidating cloud jargon (e.g., IaaS vs. PaaS, ExpressRoute vs. VPN Gateway, GZRS vs. ZRS, Microsoft Entra ID, Defense-in-Depth) with zero relatable African examples.
3. Anxiety over practical application—learners need interactive scenario-based decision practice rather than rote memorization.

**M - MISSION:** Design the complete system architecture, PostgreSQL/Supabase schema (`supabase_schema.sql`), and the production in-app AI System Prompt (`system_prompt_padi.txt`) that will govern the "AZed Padi" AI Study Buddy.

**M - MEMORY:** We are building a 4-in-1 integrated web app using React, TypeScript, Tailwind CSS, shadcn/ui, and Supabase (with automatic browser `localStorage` fallback so the live demo works without login friction):
- Track 1: Scenario-Based Smart Quiz Builder (50 questions, randomized order and shuffled options).
- Track 3: Time-Crunch Triage Study Planner (dynamic schedule based on 1–30 days left until the exam).
- Track 4: "AZed Padi" AI Study Buddy & Jargon Translator (explains concepts using African commerce, logistics, and everyday analogies, plus optional Nigerian Pidgin, Swahili, or Standard English).
- Track 5: Domain-Weighted Exam Readiness Tracker (calculates readiness based on official exam weights: Cloud Concepts 25–30%, Architecture & Services 35–40%, Management & Governance 30–35%).

**A - ASSETS:** Use the attached documents strictly as your source of truth:
1. `AZ-900 - Microsoft Azure Fundamentals.doc` (Enforce 2026 updates: use "Microsoft Entra ID" instead of Azure AD; explicitly note the "TCO Calculator is retired" in favor of the Azure Pricing Calculator and Microsoft Cost Management; include Cold tier [90 days], Archive tier [180 days], Azure Arc, Bicep, Microsoft Purview, Copilot in Azure, and Agentic AI).
2. `Vibe Coding Hackathon.pdf` (Enforce strict compliance: no exam dumps, no Microsoft/Azure logos, prominent "Unofficial AZ-900 Prep Tool" disclaimer).

**P - PROMPT / ACTIONS:** Execute the following steps in order:
1. Output `ARCHITECTURE.md`: Define the component hierarchy, state flow, domain-weighted readiness math formula, and dual-persistence adapter (Supabase + `localStorage` fallback).
2. Output `supabase_schema.sql`: Write production-ready SQL tables for `profiles`, `quiz_attempts` (tracking score by domain and question IDs 1–50), `study_plans`, and `saved_padi_analogies`, complete with Row Level Security (RLS) policies.
3. Output `system_prompt_padi.txt`: Write the system instructions for the in-app AI Study Buddy incorporating the Chain-of-Thought + Verifier Pattern so it always verifies syllabus accuracy before outputting an African analogy.

### [OCEAN STYLING MANDATE]
- **Original:** Craft unique pan-African analogies (e.g., comparing Azure Availability Zones to running bank branches across Victoria Island, Ikeja, and Lekki on separate power grids; or comparing ExpressRoute to a private railway vs. Site-to-Site VPN as an armored bullion van on a public highway).
- **Concrete:** Every architectural component and analogy must map to a real AZ-900 service and a tangible physical-world equivalent.
- **Evident:** Include exact SLA/durability numbers (11 nines for LRS, 12 nines for ZRS, 16 nines for GRS/GZRS) and exact day thresholds (Cool: 30 days, Cold: 90 days, Archive: 180 days).
- **Assertive:** Use direct, authoritative engineering specifications. Zero filler words ("delve", "Moreover", "In conclusion").
- **Narrative:** Frame the `system_prompt_padi.txt` so the AI speaks like a sharp, encouraging senior developer friend ("Padi") coaching a junior dev to pass their exam on the first try.
```

## Prompt 1B: 50-Question AZ-900 Dataset — Batch 1 (Questions 1 to 25)

_Note: Generating 50 rich JSON objects in one message can hit AI output token limits. Run Prompt 1B for Questions 1–25, then Prompt 1C for Questions 26–50._

```
### [AIM + MAP FRAMEWORK]

**A - ACTOR:** Act as a Senior Microsoft Azure Certification Item Writer and African EdTech Curriculum Designer.

**I - INPUT:** Learners fail AZ-900 practice tests because standard questions only test dry definitions and don't explain *why* distractor options are traps. Furthermore, learners fear practical exam scenarios where they must choose the right Azure service for a business problem.

**M - MISSION:** Generate **Questions 1 to 25** of our 50-question master dataset (`seed_questions_part1.json`) in valid, strictly typed JSON format.

**M - MEMORY:** Our 50-question bank is weighted strictly according to the official AZ-900 exam blueprint in our syllabus document:
- **Domain 1: Describe Cloud Concepts (25–30% of exam) -> Questions 1 to 13 (13 Questions)**
- **Domain 2: Describe Azure Architecture and Services (35–40% of exam) -> Questions 14 to 33 (20 Questions total; generate Questions 14 to 25 in this batch)**
- **Domain 3: Describe Azure Management and Governance (30–35% of exam) -> Questions 34 to 50 (17 Questions; reserved for Batch 2)**

**A - ASSETS:** Base every question strictly on the attached `AZ-900 - Microsoft Azure Fundamentals.doc`:
- **Questions 1–13 (Domain 1 - Cloud Concepts)** MUST cover:
  - Q1: High Availability vs. Fault Tolerance
  - Q2: Vertical Scaling (Scaling Up) vs. Horizontal Scaling (Scaling Out)
  - Q3: Elasticity vs. Agility in cloud workloads
  - Q4: Disaster Recovery vs. High Availability
  - Q5: Capital Expenditure (CapEx) vs. Operational Expenditure (OpEx)
  - Q6: Consumption-Based (Pay-As-You-Go) pricing model benefits
  - Q7: Serverless computing core characteristics (no infrastructure management, scales to zero)
  - Q8: Shared Responsibility Model — Physical Security & Host Infrastructure (Cloud Provider responsibility)
  - Q9: Shared Responsibility Model — Data, Endpoints, & Account Management (Always Customer responsibility)
  - Q10: IaaS vs. PaaS vs. SaaS responsibility matrix comparison
  - Q11: Public Cloud vs. Private Cloud vs. Hybrid Cloud scenarios
  - Q12: Multi-Cloud architecture scenarios
  - Q13: Sovereign Cloud Regions (Azure Government & Azure China 21Vianet compliance)
- **Questions 14–25 (Domain 2 Part 1 - Core Architecture, Compute & Networking)** MUST cover:
  - Q14: Azure Regions & Data Residency requirements
  - Q15: Availability Zones (minimum 3 physically separate zones with independent power/cooling/networking)
  - Q16: Azure Region Pairs (300+ miles apart, sequential platform updates)
  - Q17: Hierarchy of Management Groups (up to 6 levels), Subscriptions, Resource Groups, and Resources
  - Q18: Resource Groups rules (a resource belongs to only 1 Resource Group; deleting a group deletes all child resources; resources can span regions)
  - Q19: Compute selection — Azure Virtual Machines (IaaS) vs. Virtual Machine Scale Sets (VMSS)
  - Q20: Compute selection — Azure Container Instances (ACI) vs. Azure Kubernetes Service (AKS)
  - Q21: Compute selection — Azure App Service (PaaS) vs. Azure Functions (Event-driven Serverless)
  - Q22: Azure Virtual Desktop (AVD) multi-session Windows 11 cloud VDI scenario
  - Q23: Networking — Azure Virtual Network (VNet), Subnets, and VNet Peering
  - Q24: Hybrid Connectivity — Point-to-Site (P2S) VPN vs. Site-to-Site (S2S) VPN vs. Azure ExpressRoute (private dedicated fiber, bypasses public internet)
  - Q25: Network Security & Routing — Public vs. Private Endpoints & Azure DNS

**P - PROMPT / ACTIONS:** Output a raw, valid JSON array containing objects 1 through 25. Each JSON object MUST contain these exact keys:
- `id`: number (1 to 25)
- `domain`: `"Cloud Concepts"` or `"Architecture and Services"`
- `domain_weight`: `"25-30%"` or `"35-40%"`
- `topic`: string (specific syllabus sub-topic)
- `question_type`: `"Scenario Decision"` or `"Service Matching"`
- `scenario`: A realistic mini case study (e.g., a fintech startup in Lagos, an agritech platform in Nairobi, a logistics hub in Accra, or a hospital network in Johannesburg).
- `question`: The specific exam-style question prompt.
- `options`: Object with keys `"A"`, `"B"`, `"C"`, `"D"`.
- `correct_option`: `"A"`, `"B"`, `"C"`, or `"D"`.
- `explanation`: Clear technical breakdown of why the correct option wins AND why the other three options are wrong.
- `padi_analogy`: A vivid, witty African real-life analogy explaining the core concept so a beginner never forgets it.
- `exam_trap_warning`: A 1-sentence heads-up on how the real AZ-900 exam tries to trick candidates on this specific topic.

### [OCEAN STYLING MANDATE]
- **Original:** Write 100% original scenarios. Zero copied exam dump text.
- **Concrete:** Use specific African business scenarios (mobile money transfers during festive peaks, e-commerce flash sales, cross-border logistics tracking).
- **Evident:** Cite exact technical constraints from the syllabus in the `explanation` field.
- **Assertive:** Keep explanations crisp, punchy, and unambiguous.
- **Narrative:** Make every `padi_analogy` read like a memorable 2-sentence story from a wise tech friend.
```

## Prompt 1C: 50-Question AZ-900 Dataset — Batch 2 (Questions 26 to 50)

_Paste this into Claude immediately after Prompt 1B finishes to generate the remaining 25 questions._

```
### [AIM + MAP FRAMEWORK]

**A - ACTOR:** Act as a Senior Microsoft Azure Certification Item Writer and African EdTech Curriculum Designer.

**I - INPUT:** We are completing the second half of our 50-question AZ-900 dataset (`seed_questions_part2.json`) covering Storage, Identity, Security, and the entire Management & Governance domain.

**M - MISSION:** Generate **Questions 26 to 50** in the exact same valid JSON schema as Batch 1 so both arrays can merge cleanly into a single 50-question `seed_questions.json` file.

**M - MEMORY:** Maintain the exact JSON schema from Batch 1 (`id`, `domain`, `domain_weight`, `topic`, `question_type`, `scenario`, `question`, `options`, `correct_option`, `explanation`, `padi_analogy`, `exam_trap_warning`).
- **Questions 26 to 33 (8 Questions)** complete **Domain 2: Describe Azure Architecture and Services (35–40%)**.
- **Questions 34 to 50 (17 Questions)** complete **Domain 3: Describe Azure Management and Governance (30–35%)**.

**A - ASSETS:** Base every question strictly on the attached `AZ-900 - Microsoft Azure Fundamentals.doc`:
- **Questions 26–33 (Domain 2 Part 2 - Storage, Identity & Security)** MUST cover:
  - Q26: Azure Storage Services comparison — Azure Blobs vs. Azure Files (SMB protocol) vs. Azure Queues vs. Azure Tables vs. Azure Disks
  - Q27: Blob Storage Access Tiers — Hot, Cool (30 days min), Cold (90 days min), and Archive (180 days min, offline/rehydration required)
  - Q28: Storage Redundancy — LRS (11 nines, single datacenter) vs. ZRS (12 nines, 3 Availability Zones)
  - Q29: Geo-Redundancy — GRS (16 nines, 6 copies across paired regions) vs. GZRS and Read-Access (RA-GRS / RA-GZRS)
  - Q30: Data Migration & Movement Tools — AzCopy (CLI utility) vs. Azure Storage Explorer (GUI) vs. Azure File Sync vs. Azure Migrate vs. Azure Data Box (offline physical appliance for terabytes/petabytes)
  - Q31: Identity — Microsoft Entra ID (formerly Azure AD), Single Sign-On (SSO), Multi-Factor Authentication (MFA), and Passwordless (Windows Hello, FIDO2, Microsoft Authenticator)
  - Q32: Conditional Access Policies (If-Then identity signals) vs. External Identities (B2B Guest Collaboration vs. B2C Customer Identity)
  - Q33: Security Architecture — Role-Based Access Control (RBAC), Zero Trust Model ("Never trust, always verify"), Defense-in-Depth (7 layers: Physical -> Identity -> Perimeter -> Network -> Compute -> Application -> Data), and Microsoft Defender for Cloud (Secure Score)
- **Questions 34–50 (Domain 3 - Management & Governance)** MUST cover:
  - Q34: Cost Factors in Azure (Resource type, consumption, maintenance, geography, subscription type, Azure Marketplace, Inbound data free vs. Outbound data egress billed)
  - Q35: Cost Saving Options — Azure Reservations (1 or 3 years up to 72% discount) vs. Azure Spot VMs (up to 90% discount, evictable) vs. Azure Hybrid Benefit (reusing on-premises Windows Server/SQL licenses)
  - Q36: Azure Pricing Calculator (estimating upfront cloud workloads) AND the 2026 Syllabus Update that the **TCO Calculator is retired**
  - Q37: Microsoft Cost Management (analyzing actual historical spend, setting Cost Alerts & Budgets)
  - Q38: Resource Tags (Name/Value pairs for billing/organization; NOT inherited automatically by child resources)
  - Q39: Azure Advisor (free recommendations across 5 pillars: Reliability, Security, Performance, Cost, Operational Excellence)
  - Q40: Governance — Azure Policy (enforcing compliance rules like allowed regions/SKUs) vs. RBAC (controlling user actions)
  - Q41: Governance — Resource Locks (`CanNotDelete` vs. `ReadOnly` locks and how they prevent accidental deletion even by Owners)
  - Q42: Data Governance — Microsoft Purview (unified data governance, automated data discovery, sensitivity labeling, compliance lifecycle)
  - Q43: Management Interfaces — Azure Portal vs. Azure Cloud Shell (browser-based Bash/PowerShell with persistent storage) vs. local Azure CLI / Azure PowerShell
  - Q44: Hybrid & Multi-Cloud Governance — Azure Arc (projecting non-Azure, on-premises, and AWS/GCP servers into Azure Resource Manager)
  - Q45: Infrastructure as Code (IaC) — ARM Templates (JSON) vs. Azure Bicep (declarative domain-specific language with cleaner syntax)
  - Q46: Monitoring — Azure Monitor core platform & Log Analytics (KQL queries)
  - Q47: Monitoring — Application Insights (APM telemetry for live web apps)
  - Q48: Service Health Triumvirate — Azure Status (global view) vs. Azure Service Health (personalized region/service impact) vs. Azure Resource Health (specific VM/resource health)
  - Q49: 2026 Addition — Microsoft Copilot in Azure (AI assistant for natural language resource management, KQL generation, and troubleshooting)
  - Q50: 2026 Addition — Agentic AI Patterns on Azure (combining Azure AI Services + Azure OpenAI Service with application logic to reason and act)

**P - PROMPT / ACTIONS:** Output a raw, valid JSON array containing objects 26 through 50 with zero missing fields or markdown truncation.

### [OCEAN STYLING MANDATE]
- **Original:** Every scenario and analogy must feel fresh and distinctly tailored to everyday African tech and business realities.
- **Concrete:** Ground analogies in concrete concepts (e.g., comparing `CanNotDelete` vs. `ReadOnly` locks to a shop where staff can sell inventory vs. a museum display case where nobody can move or sell items; comparing Outbound Data Egress fees to free entry into a wholesale market vs. paying a toll gate fee when driving goods out).
- **Evident:** Explicitly verify 2026 updates (Entra ID, Purview, retired TCO Calculator, Copilot in Azure).
- **Assertive:** Direct, clear language with zero fluff.
- **Narrative:** Keep the witty, supportive "AZed Padi" voice consistent through Question 50.
```

# PHASE 2: LOVABLE.DEV (+ SUPABASE) PROMPTS (Full-Stack Generation)

## Prompt 2A: The One-Shot Full-Stack Master Prompt for Lovable.dev

_Paste this into Lovable.dev to scaffold the entire application UI, routing, state management, and Supabase/localStorage persistence in one shot._

```
### [AIM + MAP FRAMEWORK]

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

6. **View 5: Scenario Smart Quiz Engine (`/labs`):**
   - Interactive quiz handling `multiple_choice`, `dropdown`, and `drag_and_drop` types.
   - Instant submit feedback and "Ask Padi" button integration.
   - Strict 45-minute countdown timer that auto-submits when zero, and flashes red under 5 minutes.

7. **View 6: "Padi's Memory Vault" (`/flashcards`):**
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
```

## Prompt 2B: Supabase Integration & Edge Function Prompt (Optional Live AI Chat)

_Paste this into Lovable.dev after connecting your Supabase project to wire up cloud persistence and the live AI Study Buddy._

```
### [AIM + MAP FRAMEWORK]

**A - ACTOR:** Act as a Senior Supabase Backend & Edge Function Engineer.

**I - INPUT:** Our frontend for "AZed Padi - Unofficial AZ-900 Exam Prep" is scaffolded. Now we need resilient data persistence and an AI chat service that never crashes during live hackathon judging.

**M - MISSION:** Connect the React state for quiz attempts, study plan configurations, and bookmarked Padi analogies to Supabase tables, while maintaining an automatic, zero-latency `localStorage` fallback if the user is not authenticated or offline.

**M - MEMORY:** Our app tracks progress across 50 AZ-900 questions (`id` 1 to 50) divided into 3 weighted domains (`Cloud Concepts`, `Architecture and Services`, `Management and Governance`).

**A - ASSETS:** Use the `quiz_attempts`, `study_plans`, and `saved_padi_analogies` schema structures and our `system_prompt_padi.txt` rules.

**P - PROMPT / ACTIONS:**
1. Create a unified storage service (`src/services/storageService.ts`) that writes/reads quiz scores, answered question IDs (1–50), and study plans to `localStorage` immediately AND syncs asynchronously with Supabase when connected.
2. Add a `"Demo Judge Mode: Simulate 88% Passing Readiness"` button and a `"Reset Progress"` button in the Readiness Tracker view so hackathon judges can test both a fresh learner state and a completed analytics dashboard in 1 click.
3. Implement `try/catch/finally` error handling with friendly toast notifications on all async calls.

### [OCEAN STYLING MANDATE]
- **Original:** Build a 1-click "Judge Demo Seeder" so evaluators don't have to answer 50 questions manually to see the analytics charts light up.
- **Concrete:** Ensure every saved attempt records the exact `question_id`, `domain`, `is_correct`, and `timestamp`.
- **Evident:** Render a live sync indicator badge (`"Synced Locally & Cloud Ready"`) in the header.
- **Assertive:** Fail gracefully and silently fall back to `localStorage` without blocking the UI.
- **Narrative:** Keep the user experience seamless from first click to final readiness score.
```

# PHASE 3: CURSOR AI PROMPTS (Local Refinement, 50-Question Injection & Polish)

## Prompt 3A: `.cursorrules` File (Save in Root Directory of Your Repo)

_Create a file named `.cursorrules` in the root of your project in Cursor AI and paste this inside so Cursor obeys your architecture and hackathon rules on every edit._

```
# AZed Padi — Cursor AI Architectural & Hackathon Rules (.cursorrules)

## 1. AIM + MAP Operational Context
- **Actor:** Senior TypeScript/React Architect & Microsoft Azure AZ-900 Subject Matter Expert.
- **Mission:** Maintain and refine "AZed Padi - Unofficial AZ-900 Exam Prep" for the PLP Vibe Coding Hackathon.
- **Assets:** `src/data/seedQuestions.ts` (50 original AZ-900 questions across all 3 syllabus domains) and `PROMPTS.md`.

## 2. Strict Hackathon Compliance (GUARD Protocol)
- NEVER add official Microsoft or Azure SVG logos.
- ALWAYS keep the "Unofficial AZ-900 Exam Prep" disclaimer visible in the header and footer.
- ALWAYS use 2026 AZ-900 terminology:
  - Use **Microsoft Entra ID** (note "formerly Azure Active Directory" only for context).
  - Explicitly state the **TCO Calculator is retired**; use **Azure Pricing Calculator** (upfront estimates) and **Microsoft Cost Management** (historical spend/budgets/alerts).
  - Include all 4 Blob Storage access tiers: **Hot**, **Cool (30d)**, **Cold (90d)**, **Archive (180d)**.
  - Include **Microsoft Purview**, **Azure Arc**, **Bicep**, **Copilot in Azure**, and **Agentic AI**.

## 3. Code Quality & Resilience Standards
- Enforce strict TypeScript types (no `any`).
- Wrap all external API or Supabase calls in `try / catch / finally` blocks with graceful fallback to `localStorage`.
- Ensure mobile-first responsiveness (`sm:`, `md:`, `lg:` Tailwind breakpoints) for African learners studying on smartphones.
```

## Prompt 3B: Cursor Composer Prompt — Injecting All 50 Questions, Randomization & 45-Min Timer Logic

_Open Cursor Composer (`Ctrl+I` or `Cmd+I`), attach the JSON outputs from Claude Prompts 1B and 1C, and run this prompt._

```
### [AIM + MAP FRAMEWORK]

**A - ACTOR:** Act as a Lead TypeScript Data Engineer and React State Architect.

**I - INPUT:** I have generated the complete 50-question AZ-900 dataset (Questions 1 to 50) from Claude across all three official syllabus domains. We now need to build the rigorous exam logic, including shuffling and the strict AZ-900 45-minute exam time limit.

**M - MISSION:** Integrate all 50 questions into `src/data/seedQuestions.ts`, verify TypeScript interfaces, and wire up the Quiz Engine filters, pagination, randomization algorithm, the strict 45-minute timer, and the Domain-Weighted Readiness calculation.

**M - MEMORY:** Ensure that learners can filter the 50 questions by:
1. Full Mock Exam Mode (Shuffles all 50 questions and randomizes the A/B/C/D options).
2. Quick 10-Question Triage Sprint (randomly samples weighted questions or unanswered questions).
3. Domain 1 Only (Questions 1–13).
4. Domain 2 Only (Questions 14–33).
5. Domain 3 Only (Questions 34–50).
6. Missed Questions Only (Spaced-repetition retry queue).

**A - ASSETS:** Refer to `@seed_questions_part1.json`, `@seed_questions_part2.json`, and `@src/data/seedQuestions.ts`.

**P - PROMPT / ACTIONS:**
1. Merge Questions 1–25 and Questions 26–50 into `src/data/seedQuestions.ts` with strict TypeScript typing (`QuizQuestion[]`).
2. Write a randomization function (e.g., Fisher-Yates shuffle) that triggers every time a quiz starts, shuffling both the question order and the display order of the options (A, B, C, D) so users cannot memorize patterns.
3. **Implement a strict 45:00 countdown timer for the Full Mock Exam Mode.** Display this timer prominently on the screen. If the timer hits `00:00`, immediately lock the quiz, auto-submit the answers, and route the user to the Readiness Tracker dashboard.
4. Update the Quiz View component so users can jump to any question (1–50) via a compact question navigator grid, see which questions they answered right/wrong, and toggle the `"Ask AZed Padi"` African Analogy card at any time.
5. Verify the Readiness Tracker math so answering questions accurately updates the weighted domain scores in real time and persists to `localStorage` and Supabase.

### [OCEAN STYLING MANDATE]
- **Original:** Keep the question navigator grid clean and intuitive with color-coded status dots (emerald = mastered, red = needs review, slate = unseen).
- **Concrete:** Display exact progress counters (e.g., `"Domain 2: 14 / 20 Mastered (35–40% Exam Weight)"`). Use a sticky red flashing timer when under 5 minutes remaining.
- **Evident:** Ensure every question displays its `topic` badge and `exam_trap_warning`.
- **Assertive:** Zero console errors, zero unused variables, strict TypeScript compilation.
- **Narrative:** Trigger a celebratory confetti animation and Padi voice congratulation when the learner crosses the 85% Exam Readiness threshold.
```

## Prompt 3C: Cursor Composer Prompt — Final UX Polish & `README.md` Generator

_Run this final prompt in Cursor Composer before pushing to GitHub and deploying._

```
### [AIM + MAP FRAMEWORK]

**A - ACTOR:** Act as a Principal DevRel Engineer and Hackathon Judge Evaluator.

**I - INPUT:** We are preparing our final submission for the Power Learn Project Vibe Coding Hackathon. Technical Judging Criteria weights are:
- Learning Value (25%)
- Prompt Engineering (20%)
- User Experience & Vibes (15%)
- Rapid Prototyping & Execution (15%)
- Technical Creativity (15%)
- Presentation & Documentation (10%)

**M - MISSION:** Perform a final code audit across the repository and generate a world-class, judge-ready `README.md` that links directly to `PROMPTS.md`.

**M - MEMORY:** Our app is **"AZed Padi - Unofficial AZ-900 Exam Prep"**, combining Tracks 1, 3, 4, and 5 with a 50-question scenario bank and African contextual analogies.

**A - ASSETS:** Inspect the entire `@src` directory and `@PROMPTS.md`.

**P - PROMPT / ACTIONS:**
1. Audit all components for mobile responsiveness, keyboard accessibility (allow keys `1/A`, `2/B`, `3/C`, `4/D` to select quiz options and `Enter` for next question), and loading states.
2. Verify that the `"🧠 Prompt X-Ray"` modal in the header accurately displays our **AIM + MAP**, **OCEAN**, and **Chain-of-Thought + Verifier** system prompts.
3. Generate `README.md` containing:
   - Project Banner & Unofficial Compliance Disclaimer
   - The Personal AZ-900 Story & Problem Statement (Information overload, fear of practical simulations, lack of African context)
   - How AZed Padi Solves It (Triage Study Planner, 50 Scenario Quiz Engine with 45-minute countdown, African Analogy Study Buddy, Domain-Weighted Readiness Tracker)
   - Tech Stack & Vibe Coding Workflow (`Claude.ai` -> `Lovable.dev + Supabase` -> `Cursor AI`)
   - Direct link to [`PROMPTS.md`](./PROMPTS.md) highlighting the **AIM + MAP** and **OCEAN** frameworks
   - Local Installation & 1-Click Live Demo Instructions

### [OCEAN STYLING MANDATE]
- **Original:** Structure the `README.md` with clean ASCII architecture diagrams and markdown tables that judges can scan in 30 seconds.
- **Concrete:** Highlight exact metrics (50 original scenario questions, 3 weighted domains, 20+ jargon cards, 3 dialect vibes).
- **Evident:** Map our features directly to the PLP Hackathon judging rubric in a dedicated table.
- **Assertive:** Professional, confident documentation with zero placeholder text.
- **Narrative:** Tell the compelling story of how a learner went from feeling overwhelmed by Microsoft Learn to building the ultimate study companion for `#1MillionDevs`.
```

### Cursor AI Composer Prompt 3D — Implementing Dropdown & Drag-and-Drop Components

_(Used locally in Cursor to build View 5's interactive matching lab). Copy and paste this prompt directly into Cursor AI Composer (Ctrl + I or Cmd + I) to implement the components:_

> Act as a Senior Frontend Engineer. I need to extend our AZ-900 quiz engine in `src/components/quiz/` to support Dropdown and Drag-and-Drop questions alongside existing multiple-choice cards.
>
> Requirements:
>
> 1. Create `src/components/quiz/DropdownQuestionCard.tsx` to parse `[blank_id]` placeholders and render inline shadcn/ui select dropdowns.
> 2. Create `src/components/quiz/DragDropQuestionCard.tsx` to implement touch-friendly matching with a mobile-friendly "tap-to-place" fallback.
> 3. Update `QuestionCard.tsx` to dispatch between `multiple_choice`, `dropdown`, and `drag_and_drop` question types seamlessly.
>
> Assets & Specs:
>
> 1. Review `src/types/quiz.ts` for the `DropdownQuestion` and `DragDropQuestion` interfaces.
> 2. Ensure both formats integrate seamlessly with our existing 45-minute countdown timer and Zustand `useQuizStore` submission flow.
>
> Step 1: Create `src/components/quiz/DropdownQuestionCard.tsx`
>
> - Parses `prompt` containing `[blank_id]` placeholders.
> - Replaces each placeholder with a clean shadcn/ui `<Select>` dropdown inline inside the sentence.
> - Updates component state when each blank is selected.
> - Submits answer as correct only when all blanks match their respective `correct` string.
>
> Step 2: Create `src/components/quiz/DragDropQuestionCard.tsx`
>
> - Implement a touch-friendly Drag-and-Drop / Tap-to-Place matching layout:
>   - Top or Left: Draggable source badges (`items`).
>   - Bottom or Right: Droppable destination cards (`targets`).
>   - Mobile UX Fallback: If drag events are awkward on touch screens, allow tap-item -> tap-target to assign items smoothly.
> - Visual feedback: Show assigned items inside targets with a clear "x" to unassign.
> - Submits as correct when every target has its corresponding `correctItemId`.
>
> Step 3: Update `QuestionCard.tsx` Dispatcher
>
> - Inspect `question.type`:
>   - If 'multiple_choice' -> render `MultipleChoiceCard`
>   - If 'dropdown' -> render `DropdownQuestionCard`
>   - If 'drag_and_drop' -> render `DragDropQuestionCard`
> - Keep the "Ask Padi" button and option explanations active on reviewing incorrect answers for all types.

# APPENDIX: Production In-App System Prompt (`system_prompt_padi.txt`)

_This is the runtime system instruction embedded inside AZed Padi's AI Study Buddy and "Prompt X-Ray" inspection drawer._

```
### [ROLE & PERSONA — AIM + MAP + OCEAN + VERIFIER PATTERN]

**ACTOR:** You are "AZed Padi", a witty, encouraging, and razor-sharp Microsoft Azure Cloud Coach built for African learners in the #1MillionDevs movement preparing for the AZ-900 (Microsoft Azure Fundamentals) exam.

**INPUT & CONTEXT:** The learner talking to you is preparing for the AZ-900 exam under tight time constraints. They find standard cloud documentation overly abstract and intimidating.

**MISSION:** Explain any AZ-900 concept, scenario, or quiz question in simple, unforgettable terms using relatable African business, logistics, or everyday analogies, while guaranteeing 100% alignment with the 2026 Microsoft Learn AZ-900 syllabus.

**ASSETS & HARD SYLLABUS GUARDRAILS (2026 EDITION):**
1. Always use "Microsoft Entra ID" (mention "formerly Azure Active Directory" briefly for context).
2. Always note that the "TCO Calculator is retired"—use the "Azure Pricing Calculator" for upfront workload cost estimates and "Microsoft Cost Management" for monitoring actual spend, budgets, and alerts.
3. Enforce the 4 Blob Storage Access Tiers: Hot, Cool (30 days min), Cold (90 days min), Archive (180 days min, offline).
4. Enforce Storage Redundancy durability nines: LRS (11 nines, 1 datacenter), ZRS (12 nines, 3 Availability Zones), GRS/GZRS (16 nines, cross-region pair).
5. Enforce the 3 official exam domain weights: Cloud Concepts (25–30%), Azure Architecture and Services (35–40%), Azure Management and Governance (30–35%).
6. Never claim to be an official Microsoft product.

**INTERNAL CHAIN-OF-THOUGHT & VERIFIER CHECKLIST (THINK BEFORE SPEAKING):**
Before outputting any response, silently verify:
- [Check 1 - Syllabus Accuracy]: Is this concept tested on AZ-900, and does my explanation match the 2026 Microsoft Learn curriculum?
- [Check 2 - Analogy Relatability]: Did I include a concrete African analogy (e.g., Lagos BRT lanes, M-Pesa mobile money spikes, market stalls, solar/inverter failover, or regional flight routes)?
- [Check 3 - Exam Trap Alert]: Did I point out the exact keyword or distractor trap the exam uses for this topic?
- [Check 4 - OCEAN Style]: Have I removed all robotic filler ("delve", "tapestry", "in conclusion") and kept the tone warm, assertive, and clear?

**OUTPUT FORMAT:**
Structure every explanation into four crisp sections:
1. **🎯 The 10-Second Exam Rule:** The direct, plain-English technical definition and keyword trigger.
2. **🌍 How Your Padi Sees It (African Analogy):** A vivid, relatable story from everyday African commerce, transport, or life that makes the concept click instantly.
3. **⚖️ Quick Comparison / Responsibility Check:** How not to confuse this service with its closest sibling (e.g., Azure Policy vs. RBAC, or ExpressRoute vs. Site-to-Site VPN).
4. **⚠️ Watch Out for the Exam Trap:** The #1 trick question pattern to watch out for on exam day.
```
