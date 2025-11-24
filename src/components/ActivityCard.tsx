import { Clock, CheckCircle2, AlertCircle, PlayCircle } from 'lucide-react';
import { ActivityStatus, ActivityDefinition } from '../services/mockApi';
import { Badge } from './ui/badge';

interface ActivityCardProps {
  definition: ActivityDefinition;
  status?: ActivityStatus;
}

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

const getSLAStatusIcon = (slaStatus?: string) => {
  switch (slaStatus) {
    case 'SLA_SUCCESS':
      return <CheckCircle2 className="size-4 text-green-600" />;
    case 'SLA_VIOLATION_MISSED_WINDOW':
    case 'SLA_VIOLATION_DUPLICATION':
      return <AlertCircle className="size-4 text-red-600" />;
    default:
      return <Clock className="size-4 text-gray-400" />;
  }
};

const getSLAStatusLabel = (slaStatus?: string) => {
  switch (slaStatus) {
    case 'SLA_SUCCESS':
      return 'Success';
    case 'SLA_VIOLATION_MISSED_WINDOW':
      return 'Missed Window';
    case 'SLA_VIOLATION_DUPLICATION':
      return 'Duplication';
    default:
      return 'Pending';
  }
};

export function ActivityCard({ definition, status }: ActivityCardProps) {
  return (
    <div className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow bg-card">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-muted-foreground">{definition.activityId}</span>
            <Badge className={getActivityTypeColor(definition.activityType)}>
              {definition.activityType}
            </Badge>
          </div>
          <h4 className="text-card-foreground">{definition.activityName}</h4>
        </div>
        {status && (
          <div className="flex items-center gap-1">
            {status.activityStatus === 'RUNNING' ? (
              <PlayCircle className="size-5 text-blue-600 dark:text-blue-500 animate-pulse" />
            ) : (
              <CheckCircle2 className="size-5 text-muted-foreground" />
            )}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Expected Time:</span>
          <span className="text-card-foreground">
            {definition.expectedStartTime} - {definition.expectedEndTime}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Step ID:</span>
          <span className="text-card-foreground">{definition.businessStepID}</span>
        </div>

        {status && (
          <>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Status:</span>
              <Badge variant={status.activityStatus === 'RUNNING' ? 'default' : 'secondary'}>
                {status.activityStatus}
              </Badge>
            </div>

            <div className="flex items-center justify-between text-sm pt-2 border-t border-border">
              <span className="text-muted-foreground">SLA Status:</span>
              <div className="flex items-center gap-1">
                {getSLAStatusIcon(status.slaStatus)}
                <span className="text-card-foreground">{getSLAStatusLabel(status.slaStatus)}</span>
              </div>
            </div>

            {status.reportingTime && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Reporting Time:</span>
                <span className="text-card-foreground">
                  {new Date(status.reportingTime).toLocaleTimeString()}
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}