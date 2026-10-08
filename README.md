# 📊 SalesPulse: Atomic Sales Intelligence Platform

An enterprise-grade, modern Sales Analytics Dashboard built with **Next.js 15 (App Router)**, **TypeScript**, and **Tailwind CSS**, strictly engineered in accordance with **Atomic Design Methodology**. 

The platform visualizes multi-year retail performance (**2024, 2023, 2022**) modeled on benchmark **Kaggle Superstore & Retail Analytics** datasets, featuring real-time API integrations, custom user sales threshold filtering, and multi-format interactive Recharts visualizations.

---

## 🌟 Highlights & Features

### 1. ⚛️ Atomic Design Structural Architecture
The user interface is systematically decomposed into five distinct atomic levels:
* **Atoms (`src/components/atoms/`)**: Indivisible UI primitives (`Badge`, `Button`, `Input`, `Select`, `Typography`, `IconBadge`, `Skeleton`).
* **Molecules (`src/components/molecules/`)**: Focused, reusable component units (`MetricCard`, `ThresholdFilter`, `YearSelector`, `ChartTypeSwitch`, `CategoryFilter`, `ApiStatusBadge`).
* **Organisms (`src/components/organisms/`)**: Self-contained business sections (`SalesTrendChart`, `CategoryPieChart`, `RegionalBarChart`, `MonthlyDataTable`, `KPIGrid`, `DashboardHeader`, `DatasetMetaCard`).
* **Templates (`src/components/templates/`)**: Wireframe slot layouts (`DashboardTemplate`).
* **Pages (`src/app/dashboard/page.tsx` & `src/app/page.tsx`)**: Concrete interactive views orchestrating state, reactivity, and API data hydration.

### 2. 📈 Multi-Year Kaggle Sales Analytics (2024, 2023, 2022)
* Synthesized from the benchmark **Kaggle Superstore Dataset**.
* Includes full 12-month performance figures for 2024 ($2.47M), 2023 ($1.89M), and 2022 ($1.48M).
* Reflects realistic retail seasonality (Q4 holiday surge, Q3 back-to-school spike).
* Includes product catalog breakdown: **Technology (44%)**, **Furniture (30%)**, and **Office Supplies (26%)**.
* Geographical fulfillment distribution across West, East, Central, and South territories.

### 3. 🎯 Custom Sales Threshold Filter (Enhancement)
* Interactive numeric input allowing stakeholders to specify their custom monthly sales quota (e.g. `$150,000` or `$200,000`).
* Quick 1-click threshold presets: `$100k`, `$150k`, `$200k`, `$250k`.
* Real-time calculation of **Qualifying Months** and total sales revenue exceeding the threshold.
* Visual reference line overlaid across Recharts charts with conditional bar/point styling.

### 4. ⚡ Next.js 15 Server-Side REST API Integration
* Client components fetch data from a dynamic Next.js 15 Route Handler (`/api/sales`).
* Query parameters support: `?year=2024&threshold=150000&category=Technology`.
* Server-side computation of summary KPIs, threshold analytics, and category weighting.
* Real-time UI indicator with refresh button and latency handling.

### 5. 📉 Multi-Type Recharts Visualizations
Toggle seamlessly between different chart paradigms:
* **Bar Chart**: Highlights qualifying months meeting the user threshold in vibrant blue, with sub-threshold months differentiated.
* **Line Chart**: Smooth monotone trajectory comparing monthly revenue against budgeted targets.
* **Area Chart**: Gradient-filled velocity curves depicting sales and net profit margins.
* **Composed Chart**: Combines bar revenue, line profit, and dashed target benchmarks.
* **Donut / Pie Chart**: Category revenue distribution with central summary and custom tooltips.
* **Horizontal Bar Chart**: Geographic regional performance and YoY expansion rates.

---

## 🏗️ Directory & Atomic Structure

```
src/
├── app/
│   ├── api/
│   │   └── sales/
│   │       └── route.ts             # Dynamic Next.js API Route for sales data
│   ├── dashboard/
│   │   └── page.tsx                 # Populated interactive Dashboard page
│   ├── globals.css                  # Global Tailwind CSS styles
│   ├── layout.tsx                   # SEO Metadata & Root font configuration
│   └── page.tsx                     # Landing portal introducing Atomic system
├── components/
│   ├── atoms/                       # Level 1: Atomic primitives
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   ├── IconBadge.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Skeleton.tsx
│   │   └── Typography.tsx
│   ├── molecules/                   # Level 2: Molecules
│   │   ├── ApiStatusBadge.tsx
│   │   ├── CategoryFilter.tsx
│   │   ├── ChartTypeSwitch.tsx
│   │   ├── MetricCard.tsx
│   │   ├── ThresholdFilter.tsx
│   │   └── YearSelector.tsx
│   ├── organisms/                   # Level 3: Organisms
│   │   ├── CategoryPieChart.tsx
│   │   ├── DashboardHeader.tsx
│   │   ├── DatasetMetaCard.tsx
│   │   ├── KPIGrid.tsx
│   │   ├── MonthlyDataTable.tsx
│   │   ├── RegionalBarChart.tsx
│   │   └── SalesTrendChart.tsx
│   └── templates/                   # Level 4: Templates
│       └── DashboardTemplate.tsx
├── data/
│   └── kaggleSalesDataset.ts        # Kaggle Superstore data model (2022-2024)
├── lib/
│   ├── api.ts                       # Client-side API fetch abstraction
│   └── utils.ts                     # Formatting currency, number, and cn()
└── types/
    └── sales.ts                     # TypeScript schemas & contracts
```

---

## 🚀 Getting Started & Setup

### Prerequisites
* **Node.js**: v18.17.0 or higher (v20 / v22 recommended)
* **npm**: v9 or higher

### Installation

1. **Clone or enter the project directory**:
   ```bash
   cd assigment
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   * Landing Page: [http://localhost:3000](http://localhost:3000)
   * Interactive Dashboard: [http://localhost:3000/dashboard](http://localhost:3000/dashboard)
   * API Endpoint: [http://localhost:3000/api/sales?year=2024&threshold=150000](http://localhost:3000/api/sales?year=2024&threshold=150000)

### Production Build

To build and verify the production bundle:
```bash
npm run build
npm run start
```

---

## 📡 API Reference (`/api/sales`)

| Parameter | Type | Default | Description |
|---|---|---|---|
| `year` | `2024 \| 2023 \| 2022` | `2024` | Fiscal calendar year to inspect |
| `threshold` | `number` | `150000` | Custom monthly sales benchmark |
| `category` | `All \| Technology \| Furniture \| Office Supplies` | `All` | Product category slice filter |

#### Example Query:
```http
GET /api/sales?year=2024&threshold=180000&category=Technology
```

---

## 🐙 Pushing to Your GitHub Repository

To push this repository to your personal GitHub account:

1. **Create a new repository on GitHub**:
   * Navigate to [github.com/new](https://github.com/new).
   * Name your repository (e.g. `nextjs-atomic-sales-dashboard`).
   * Leave "Initialize this repository with a README" **unchecked** (we already have a complete one).

2. **Link and push from your terminal**:
   ```bash
   # Add your GitHub repository remote
   git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git

   # Set master / main branch
   git branch -M main

   # Push all commits to GitHub
   git push -u origin main
   ```

---

## 🛠️ Tech Stack
* **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
* **Visualizations**: [Recharts](https://recharts.org/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **Dataset Reference**: [Kaggle Superstore Sales Benchmark](https://www.kaggle.com/datasets/vivek46/superstore-dataset-final)
