import { ArrowLeft, Activity, CheckCircle2, AlertTriangle, PlayCircle } from 'lucide-react';
import { Button } from './ui/button';
import { ActivityDefinition, ActivityStatus } from '../services/mockApi';

interface BusinessAreaAppsViewProps {
  businessArea: string;
  definitions: ActivityDefinition[];
  statuses: ActivityStatus[];
  onBack: () => void;
  onAppClick: (appId: string) => void;
}

export function BusinessAreaAppsView({
  businessArea,
  definitions,
  statuses,
  onBack,
  onAppClick,
}: BusinessAreaAppsViewProps) {
  const areaActivities = definitions.filter((def) => def.businessArea === businessArea);
  const appIds = [...new Set(areaActivities.map((def) => def.appId))];

  const getAppStats = (appId: string) => {
    const appDefs = areaActivities.filter((def) => def.appId === appId);
    const appStatuses = statuses.filter((s) => s.appId === appId);

    const total = appDefs.length;
    const success = appStatuses.filter((s) => s.slaStatus === 'SLA_SUCCESS').length;
    const violations = appStatuses.filter(
      (s) =>
        s.slaStatus === 'SLA_VIOLATION_MISSED_WINDOW' ||
        s.slaStatus === 'SLA_VIOLATION_DUPLICATION'
    ).length;
    const running = appStatuses.filter((s) => s.activityStatus === 'RUNNING').length;

    return { total, success, violations, running };
  };

  const getAppStatusColor = (appId: string) => {
    const stats = getAppStats(appId);
    if (stats.violations > 0) return 'border-l-red-500 bg-red-500/5 dark:bg-red-500/10';
    if (stats.running > 0) return 'border-l-blue-500 bg-blue-500/5 dark:bg-blue-500/10';
    if (stats.success === stats.total) return 'border-l-green-500 bg-green-500/5 dark:bg-green-500/10';
    return 'border-l-border bg-card';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="size-4 mr-2" />
          Back to Overview
        </Button>
      </div>

      <div className="bg-card rounded-lg border border-border p-6">
        <div className="mb-6">
          <h2 className="text-card-foreground mb-2">{businessArea}</h2>
          <p className="text-muted-foreground">{appIds.length} Applications</p>
        </div>

        <div className="space-y-4">
          {appIds.map((appId) => {
            const stats = getAppStats(appId);
            return (
              <div
                key={appId}
                className={`border-l-4 rounded-lg p-4 cursor-pointer hover:shadow-md transition-all ${getAppStatusColor(
                  appId
                )}`}
                onClick={() => onAppClick(appId)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Activity className="size-5 text-primary" />
                    <div>
                      <h3 className="text-card-foreground">{appId}</h3>
                      <p className="text-sm text-muted-foreground">{stats.total} activities</p>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-green-600 dark:text-green-500" />
                      <div>
                        <div className="text-card-foreground">{stats.success}</div>
                        <div className="text-xs text-muted-foreground">Success</div>
                      </div>
                    </div>

                    {stats.running > 0 && (
                      <div className="flex items-center gap-2">
                        <PlayCircle className="size-4 text-blue-600 dark:text-blue-500" />
                        <div>
                          <div className="text-card-foreground">{stats.running}</div>
                          <div className="text-xs text-muted-foreground">Running</div>
                        </div>
                      </div>
                    )}

                    {stats.violations > 0 && (
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="size-4 text-red-600 dark:text-red-500" />
                        <div>
                          <div className="text-card-foreground">{stats.violations}</div>
                          <div className="text-xs text-muted-foreground">Violations</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}