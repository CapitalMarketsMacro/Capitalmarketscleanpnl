import { TrendingUp, AlertTriangle, CheckCircle2, Activity } from 'lucide-react';
import { ActivityDefinition, ActivityStatus } from '../services/mockApi';

interface BusinessAreaCardProps {
  businessArea: string;
  definitions: ActivityDefinition[];
  statuses: ActivityStatus[];
  onClick: () => void;
  onDoubleClick: () => void;
  isSelected: boolean;
}

const getBusinessAreaIcon = (area: string) => {
  // You can customize icons per business area
  return <TrendingUp className="size-6" />;
};

export function BusinessAreaCard({
  businessArea,
  definitions,
  statuses,
  onClick,
  onDoubleClick,
  isSelected,
}: BusinessAreaCardProps) {
  const areaActivities = definitions.filter((def) => def.businessArea === businessArea);
  const areaStatuses = statuses.filter((s) => s.businessArea === businessArea);

  const totalActivities = areaActivities.length;
  const successCount = areaStatuses.filter((s) => s.slaStatus === 'SLA_SUCCESS').length;
  const violationCount = areaStatuses.filter(
    (s) =>
      s.slaStatus === 'SLA_VIOLATION_MISSED_WINDOW' ||
      s.slaStatus === 'SLA_VIOLATION_DUPLICATION'
  ).length;
  const runningCount = areaStatuses.filter((s) => s.activityStatus === 'RUNNING').length;
  const completedCount = areaStatuses.filter((s) => s.activityStatus === 'COMPLETED').length;

  // Determine the overall status color
  const getStatusColor = () => {
    if (violationCount > 0) return 'border-red-500 bg-red-500/5 dark:bg-red-500/10';
    if (runningCount > 0) return 'border-blue-500 bg-blue-500/5 dark:bg-blue-500/10';
    if (successCount === totalActivities) return 'border-green-500 bg-green-500/5 dark:bg-green-500/10';
    return 'border-border bg-card';
  };

  const getStatusIndicator = () => {
    if (violationCount > 0) return 'bg-red-500 shadow-lg shadow-red-500/50';
    if (runningCount > 0) return 'bg-blue-500 shadow-lg shadow-blue-500/50';
    if (successCount === totalActivities) return 'bg-green-500 shadow-lg shadow-green-500/50';
    return 'bg-muted-foreground';
  };

  // Get unique app IDs
  const appIds = [...new Set(areaActivities.map((def) => def.appId))];

  return (
    <div
      className={`relative border-2 rounded-lg p-6 cursor-pointer hover:shadow-lg transition-all ${getStatusColor()} ${
        isSelected ? 'ring-4 ring-primary ring-offset-2 ring-offset-background' : ''
      }`}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      <div className={`absolute top-3 right-3 w-3 h-3 rounded-full ${getStatusIndicator()}`} />

      <div className="flex items-start gap-4 mb-4">
        <div className="p-3 bg-primary/10 dark:bg-primary/20 rounded-lg border border-primary/20">
          {getBusinessAreaIcon(businessArea)}
        </div>
        <div className="flex-1">
          <h3 className="text-card-foreground mb-1">{businessArea}</h3>
          <p className="text-sm text-muted-foreground">{appIds.length} Applications</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="text-card-foreground">{totalActivities}</div>
          <div className="text-sm text-muted-foreground">Total</div>
        </div>
        <div className="text-center">
          <div className="text-card-foreground">{completedCount}</div>
          <div className="text-sm text-muted-foreground">Completed</div>
        </div>
        <div className="text-center">
          <div className="text-card-foreground">{runningCount}</div>
          <div className="text-sm text-muted-foreground">Running</div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="size-4 text-green-600 dark:text-green-500" />
          <span className="text-sm text-card-foreground">{successCount} Success</span>
        </div>
        {violationCount > 0 && (
          <div className="flex items-center gap-2">
            <AlertTriangle className="size-4 text-red-600 dark:text-red-500" />
            <span className="text-sm text-red-600 dark:text-red-500">{violationCount} Violations</span>
          </div>
        )}
      </div>
    </div>
  );
}