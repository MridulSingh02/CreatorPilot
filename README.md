# 🚀 CreatorPilot

> **Code decides math, LLM narrates facts** • Built for Micro-Creators (5k – 100k followers)

**CreatorPilot** is an intelligent dashboard and creator workspace designed to empower micro-creators with data-backed sponsorship pricing, content performance autopsies, deal management, and AI-assisted pitch generation.

---

## 📸 Key Features

- 📊 **Analytics Dashboard**: High-level overview of creator reach, engagement rates, and top-performing content across platforms.
- 💳 **Dynamic Rate Card Generator**: Algorithmic pricing calculations tailored to follower counts, engagement metrics, and specific deliverables (Reels, Stories, YouTube Integrations).
- 🔍 **Content Autopsy**: In-depth analysis of high and low performing posts to break down hooked retention, engagement drivers, and formatting patterns.
- 💼 **Outreach & Sponsorship Pipeline**: End-to-end deal management tracking pitches, negotiations, and deliverables with AI pitch generator.
- 📅 **Content Planner**: Interactive content calendar and strategic scheduling engine.
- 🧪 **Eval Suite & Custom Ingestion**: Deterministic evaluation scripts and CSV/Manual data ingestion modal.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **UI & Logic**: [React 18](https://react.dev/), [TypeScript](https://www.typescript.org/)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Execution & Evals**: [tsx](https://github.com/privatenumber/tsx), [Zod](https://zod.dev/)

---

## ⚡ Quick Start & How to Run

### Prerequisites

Ensure you have **Node.js** (v18.0.0 or higher recommended) and **npm** installed on your system.

```bash
node -v
npm -v
```

---

### Step 1: Install Dependencies

Navigate to the project directory and install the required npm packages:

```bash
cd "e:/Personal project/CreatorPilot"
npm install
```

---

### Step 2: Run the Development Server

Start the local development server:

```bash
npm run dev
```

Once running, open your web browser and navigate to:
👉 **[http://localhost:3000](http://localhost:3000)**

---

### Quick Launch (Windows Batch Script)

If you are on Windows, you can simply run the provided launcher script:

Double-click `run_creator_pilot.bat` or run in terminal:

```cmd
.\run_creator_pilot.bat
```

*This will automatically run the evaluation suite first and then start the Next.js development server.*

---

## 🧪 Running Evals & Tests

To execute the built-in deterministic evaluation suite (`evals/runEvals.ts`):

```bash
npm test
# or
npm run evals
```

---

## 📦 Building for Production

To create an optimized production build:

```bash
npm run build
```

To run the built production server locally:

```bash
npm start
```

---

## 📂 Project Structure

```
CreatorPilot/
├── app/                  # Next.js App Router (pages, layout, global CSS)
│   ├── globals.css       # Design tokens & Tailwind CSS imports
│   ├── layout.tsx        # Base layout & font configurations
│   └── page.tsx          # Main application tab router
├── components/           # React components for tabs & modals
│   ├── Header.tsx        # Top sticky navigation bar
│   ├── DashboardTab.tsx  # Analytics dashboard view
│   ├── RateCardTab.tsx   # Dynamic rate card generator
│   ├── AutopsyTab.tsx    # Content performance autopsy
│   ├── OutreachTab.tsx   # Sponsorship deal pipeline
│   ├── PlannerTab.tsx    # Editorial planner view
│   ├── EvalRunnerTab.tsx # Interactive eval suite runner
│   └── IngestionModal.tsx# CSV & manual data ingestion
├── lib/                  # State management, types, & business logic
├── evals/                # Automated evaluation scripts (runEvals.ts)
├── run_creator_pilot.bat # One-click Windows starter script
├── tailwind.config.js    # Tailwind configuration
└── package.json          # Dependencies & npm scripts
```

---

## 📜 License

Private Project — All rights reserved.
