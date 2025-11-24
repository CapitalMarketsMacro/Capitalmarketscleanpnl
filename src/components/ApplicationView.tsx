import { ArrowLeft, Activity } from 'lucide-react';
import { Button } from './ui/button';
import { ActivityDefinition, ActivityStatus } from '../services/mockApi';
import { ActivityCard } from './ActivityCard';

interface ApplicationViewProps {
  appId: string;
  businessArea: string;
  definitions: ActivityDefinition[];
  statuses: ActivityStatus[];
  onBack: () => void;
}

export function ApplicationView({
  appId,
  businessArea,
  definitions,
  statuses,
  onBack,
}: ApplicationViewProps) {
  const appActivities = definitions.filter(
    (def) => def.appId === appId && def.businessArea === businessArea
  );

  const getActivityStatus = (activityId: string) => {
    return statuses.find((s) => s.activityId === activityId);
  };

  const successCount = appActivities.filter((def) => {
    const status = getActivityStatus(def.activityId);
    return status?.slaStatus === 'SLA_SUCCESS';
  }).length;

  const violationCount = appActivities.filter((def) => {
    const status = getActivityStatus(def.activityId);
    return (
      status?.slaStatus === 'SLA_VIOLATION_MISSED_WINDOW' ||
      status?.slaStatus === 'SLA_VIOLATION_DUPLICATION'
    );
  }).length;

  const runningCount = appActivities.filter((def) => {
    const status = getActivityStatus(def.activityId);
    return status?.activityStatus === 'RUNNING';
  }).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="size-4 mr-2" />
          Back to Business Areas
        </Button>
      </div>

      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Activity className="size-6 text-primary" />
              <h2 className="text-card-foreground">{appId}</h2>
            </div>
            <p className="text-muted-foreground">{businessArea}</p>
          </div>
          <div className="flex gap-4">
            <div className="text-center">
              <div className="text-green-600 dark:text-green-500">{successCount}</div>
              <div className="text-sm text-muted-foreground">Success</div>
            </div>
            <div className="text-center">
              <div className="text-blue-600 dark:text-blue-500">{runningCount}</div>
              <div className="text-sm text-muted-foreground">Running</div>
            </div>
            <div className="text-center">
              <div className="text-red-600 dark:text-red-500">{violationCount}</div>
              <div className="text-sm text-muted-foreground">Violations</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {appActivities.map((def) => (
            <ActivityCard
              key={def.activityId}
              definition={def}
              status={getActivityStatus(def.activityId)}
            />
          ))}
        </div>

        {appActivities.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No activities found for this application
          </div>
        )}
      </div>
    </div>
  );
}