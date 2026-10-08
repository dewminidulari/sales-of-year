import React from 'react';
import { Database, Layers } from 'lucide-react';
import { Badge } from '@/components/atoms/Badge';

export const DatasetMetaCard: React.FC = () => {
  return (
    <div className="rounded-2xl p-4 bg-gradient-to-r from-blue-900/90 via-indigo-900/90 to-slate-900 text-white shadow-lg border border-blue-700/30">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-blue-400" />
            <h4 className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
              Kaggle Superstore Analytics Engine
            </h4>
            <Badge variant="purple" size="sm">
              Multi-Year (2022 - 2024)
            </Badge>
          </div>
          <p className="text-xs text-blue-200/80 max-w-2xl leading-relaxed">
            Data synthesized from benchmark Kaggle retail distributions. Features dynamic threshold filtering, live Next.js 15 API synchronization, multi-format Recharts graphs, and strictly adheres to Atomic Design Architecture.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs">
            <Layers className="w-3.5 h-3.5 text-blue-300" />
            <span className="text-slate-200">Atomic System:</span>
            <span className="font-semibold text-white">Atoms → Pages</span>
          </div>
        </div>
      </div>
    </div>
  );
};
