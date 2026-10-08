import Link from 'next/link';
import {
  BarChart3,
  Layers,
  Database,
  SlidersHorizontal,
  ArrowRight,
  PieChart,
  Code2,
} from 'lucide-react';
import { Badge } from '@/components/atoms/Badge';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white selection:bg-blue-500 selection:text-white">
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-blue-600/20 via-indigo-500/20 to-purple-600/10 blur-[130px] rounded-full" />
      </div>

      {/* Navigation */}
      <header className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-lg text-white tracking-tight">SalesPulse</span>
            <span className="ml-2 text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
              Next.js 15
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/api/sales?year=2024"
            target="_blank"
            className="text-xs font-mono text-slate-400 hover:text-white transition-colors hidden sm:inline-block"
          >
            /api/sales ↗
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Launch Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Kaggle Superstore Analytics Engine (2022 - 2024)</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Sales Intelligence Built with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
              Atomic Design
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            A production-ready Next.js 15 analytics suite with Recharts dynamic visualizations, custom sales threshold evaluation, real API endpoints, and a strictly organized atomic component hierarchy.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-xl shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Explore Interactive Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/api/sales?year=2024&threshold=150000"
              target="_blank"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-medium bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700 transition-colors"
            >
              <Code2 className="w-4 h-4 text-slate-400" />
              <span>Inspect Next.js API Route</span>
            </Link>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/60 backdrop-blur-sm space-y-3 hover:border-slate-600 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Custom Threshold Filter</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dynamically calibrate minimum monthly sales quotas. The system calculates compliance percentages and plots visual threshold reference lines across charts in real-time.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/60 backdrop-blur-sm space-y-3 hover:border-slate-600 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <PieChart className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Multi-Type Recharts Visuals</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Switch smoothly between Bar, Line, Area, and Composed charts. Includes Donut breakdown by product category and horizontal geographic regional performance charts.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/60 backdrop-blur-sm space-y-3 hover:border-slate-600 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Live API Route Architecture</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Server-side Next.js route handler (<code className="text-emerald-300">/api/sales</code>) simulates Kaggle retail logs for 2024, 2023, and 2022 with query parameters and instant refresh.
            </p>
          </div>
        </div>

        {/* Atomic Architecture Breakdown */}
        <div className="mt-16 p-8 rounded-3xl bg-slate-800/30 border border-slate-700/60">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  Atomic Structural Principle Implemented
                </h3>
                <p className="text-xs text-slate-400">
                  Components organized from foundational primitives up to full page templates
                </p>
              </div>
            </div>
            <Badge variant="purple" size="md">
              Atomic Design Methodology
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <span className="text-[11px] font-mono uppercase text-blue-400 font-bold">1. Atoms</span>
              <p className="text-xs font-semibold text-slate-200">Indivisible UI</p>
              <ul className="text-[11px] text-slate-400 space-y-1">
                <li>• Badge</li>
                <li>• Button</li>
                <li>• Input & Select</li>
                <li>• Typography</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <span className="text-[11px] font-mono uppercase text-indigo-400 font-bold">2. Molecules</span>
              <p className="text-xs font-semibold text-slate-200">Focused Units</p>
              <ul className="text-[11px] text-slate-400 space-y-1">
                <li>• MetricCard (KPI)</li>
                <li>• ThresholdFilter</li>
                <li>• YearSelector</li>
                <li>• ChartTypeSwitch</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <span className="text-[11px] font-mono uppercase text-emerald-400 font-bold">3. Organisms</span>
              <p className="text-xs font-semibold text-slate-200">Complex Sections</p>
              <ul className="text-[11px] text-slate-400 space-y-1">
                <li>• SalesTrendChart</li>
                <li>• CategoryPieChart</li>
                <li>• RegionalBarChart</li>
                <li>• MonthlyDataTable</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <span className="text-[11px] font-mono uppercase text-amber-400 font-bold">4. Templates</span>
              <p className="text-xs font-semibold text-slate-200">Layout Grids</p>
              <ul className="text-[11px] text-slate-400 space-y-1">
                <li>• DashboardTemplate</li>
                <li>• Responsive slots</li>
                <li>• Layout wireframes</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <span className="text-[11px] font-mono uppercase text-rose-400 font-bold">5. Pages</span>
              <p className="text-xs font-semibold text-slate-200">Concrete Views</p>
              <ul className="text-[11px] text-slate-400 space-y-1">
                <li>• /dashboard (Live)</li>
                <li>• State orchestration</li>
                <li>• API data hydration</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
