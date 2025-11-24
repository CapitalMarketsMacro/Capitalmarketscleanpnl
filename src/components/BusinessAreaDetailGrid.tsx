import { Activity, CheckCircle2, PlayCircle, AlertTriangle, XCircle } from 'lucide-react';
import { ActivityDefinition, ActivityStatus } from '../services/mockApi';
import { Badge } from './ui/badge';

interface BusinessAreaDetailGridProps {
  businessArea: string;
  definitions: ActivityDefinition[];
  statuses: ActivityStatus[];
}

export function BusinessAreaDetailGrid({
  businessArea,
  definitions,
  statuses,
}: BusinessAreaDetailGridProps) {
  // Get all apps for this business area
  const businessAreaDefs = definitions.filter((def) => def.businessArea === businessArea);
  const appIds = [...new Set(businessAreaDefs.map((def) => def.appId))].sort();

  const getActivityStatus = (activityId: string) => {
    return statuses.find((s) => s.activityId === activityId);
  };

  const getSLAStatusIcon = (slaStatus: string) => {
    switch (slaStatus) {
      case 'SLA_SUCCESS':
        return <CheckCircle2 className="size-4 text-green-600 dark:text-green-500" />;
      case 'SLA_VIOLATION_MISSED_WINDOW':
        return <AlertTriangle className="size-4 text-red-600 dark:text-red-500" />;
      case 'SLA_VIOLATION_DUPLICATION':
        return <XCircle className="size-4 text-orange-600 dark:text-orange-500" />;
      default:
        return <CheckCircle2 className="size-4 text-muted-foreground" />;
    }
  };

  const getActivityTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      TRADE: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700',
      RISK: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700',
      MARKET_DATA: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700',
      KESSEL_FEED: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700',
      PNL: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700',
      DATA: 'bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-300 dark:border-cyan-700',
      PRICE: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700',
      POSITION: 'bg-pink-100 text-pink-800 border-pink-200 dark:bg-pink-900/30 dark:text-pink-300 dark:border-pink-700',
    };
    return colors[type] || 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-sm">
      <div className="p-6 border-b border-border">
        <h3 className="text-card-foreground">{businessArea} - Applications & Activities</h3>
        <p className="text-sm text-muted-foreground mt-1">
          {appIds.length} Applications • {businessAreaDefs.length} Activities
        </p>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          {appIds.map((appId) => {
            const appActivities = businessAreaDefs.filter((def) => def.appId === appId);
            const appStatuses = appActivities.map((act) => getActivityStatus(act.activityId)).filter(Boolean) as ActivityStatus[];
            const successCount = appStatuses.filter((s) => s.slaStatus === 'SLA_SUCCESS').length;
            const violationCount = appStatuses.filter(
              (s) => s.slaStatus === 'SLA_VIOLATION_MISSED_WINDOW' || s.slaStatus === 'SLA_VIOLATION_DUPLICATION'
            ).length;
            const runningCount = appStatuses.filter((s) => s.activityStatus === 'RUNNING').length;

            return (
              <div key={appId} className="border border-border rounded-lg overflow-hidden">
                <div className="bg-muted/50 px-4 py-3 border-b border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Activity className="size-5 text-primary" />
                      <div>
                        <h4 className="text-card-foreground">{appId}</h4>
                        <p className="text-xs text-muted-foreground">
                          {appActivities.length} activities
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="size-4 text-green-600 dark:text-green-500" />
                        <span className="text-sm text-card-foreground">{successCount}</span>
                      </div>
                      {runningCount > 0 && (
                        <div className="flex items-center gap-1">
                          <PlayCircle className="size-4 text-blue-600 dark:text-blue-500" />
                          <span className="text-sm text-card-foreground">{runningCount}</span>
                        </div>
                      )}
                      {violationCount > 0 && (
                        <div className="flex items-center gap-1">
                          <AlertTriangle className="size-4 text-red-600 dark:text-red-500" />
                          <span className="text-sm text-card-foreground">{violationCount}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {appActivities.map((activity) => {
                      const status = getActivityStatus(activity.activityId);
                      return (
                        <div
                          key={activity.activityId}
                          className="border border-border rounded-lg p-3 bg-card hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs text-muted-foreground">
                                  {activity.activityId}
                                </span>
                                <Badge className={`text-xs ${getActivityTypeColor(activity.activityType)}`}>
                                  {activity.activityType}
                                </Badge>
                              </div>
                              <p className="text-sm text-card-foreground">{activity.activityName}</p>
                            </div>
                            {status && (
                              <div className="ml-2">
                                {status.activityStatus === 'RUNNING' ? (
                                  <PlayCircle className="size-4 text-blue-600 dark:text-blue-500 animate-pulse" />
                                ) : (
                                  getSLAStatusIcon(status.slaStatus)
                                )}
                              </div>
                            )}
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">Expected:</span>
                              <span className="text-card-foreground">
                                {activity.expectedStartTime} - {activity.expectedEndTime}
                              </span>
                            </div>
                            {status && status.reportingTime && (
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">Reported:</span>
                                <span className="text-card-foreground">
                                  {new Date(status.reportingTime).toLocaleTimeString()}
                                </span>
                              </div>
                            )}
                            {status && (
                              <div className="flex items-center justify-between text-xs pt-1 border-t border-border">
                                <span className="text-muted-foreground">Status:</span>
                                <Badge variant={status.activityStatus === 'RUNNING' ? 'default' : 'secondary'} className="text-xs">
                                  {status.activityStatus}
                                </Badge>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
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
