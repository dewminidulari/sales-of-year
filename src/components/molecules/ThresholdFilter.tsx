import React from 'react';
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';
import { DollarSign, SlidersHorizontal, CheckCircle2 } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export interface ThresholdFilterProps {
  threshold: number;
  onThresholdChange: (newThreshold: number) => void;
  monthsAboveCount?: number;
  totalMonths?: number;
}

export const ThresholdFilter: React.FC<ThresholdFilterProps> = ({
  threshold,
  onThresholdChange,
  monthsAboveCount = 0,
  totalMonths = 12,
}) => {
  const [inputValue, setInputValue] = React.useState<string>(threshold.toString());

  // Keep internal input sync if parent changes
  React.useEffect(() => {
    setInputValue(threshold.toString());
  }, [threshold]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    setInputValue(raw);
    const parsed = parseInt(raw, 10);
    if (!isNaN(parsed)) {
      onThresholdChange(parsed);
    } else if (raw === '') {
      onThresholdChange(0);
    }
  };

  const presets = [
    { label: '$100k', value: 100000 },
    { label: '$150k', value: 150000 },
    { label: '$200k', value: 200000 },
    { label: '$250k', value: 250000 },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
              Sales Performance Threshold
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Highlight & measure months beating your target
            </p>
          </div>
        </div>

        <Badge variant={monthsAboveCount > 0 ? 'success' : 'neutral'} size="md" dot>
          <CheckCircle2 className="w-3.5 h-3.5 mr-0.5" />
          {monthsAboveCount} of {totalMonths} Months Qualified ({totalMonths > 0 ? Math.round((monthsAboveCount / totalMonths) * 100) : 0}%)
        </Badge>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            prefixIcon={<DollarSign className="w-4 h-4 text-slate-400" />}
            suffixText="USD"
            placeholder="e.g. 150000"
          />
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium mr-1">
            Presets:
          </span>
          {presets.map((preset) => {
            const isActive = threshold === preset.value;
            return (
              <Button
                key={preset.value}
                type="button"
                variant={isActive ? 'primary' : 'outline'}
                size="sm"
                onClick={() => {
                  setInputValue(preset.value.toString());
                  onThresholdChange(preset.value);
                }}
                className={isActive ? 'shadow-xs' : 'text-xs text-slate-600 dark:text-slate-300'}
              >
                {preset.label}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
