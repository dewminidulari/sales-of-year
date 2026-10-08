import React from 'react';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { RefreshCw } from 'lucide-react';

export interface ApiStatusBadgeProps {
  isLoading: boolean;
  onRefresh: () => void;
}

export const ApiStatusBadge: React.FC<ApiStatusBadgeProps> = ({
  isLoading,
  onRefresh,
}) => {
  return (
    <div className="flex items-center gap-2">
      <Badge variant="success" size="sm" dot>
        <span className="hidden sm:inline">API:</span> Live Connected
      </Badge>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={onRefresh}
        disabled={isLoading}
        className="h-7 px-2 text-xs text-slate-600 dark:text-slate-300"
        title="Refetch data from API"
      >
        <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
        <span className="hidden md:inline">Refresh</span>
      </Button>
    </div>
  );
};
