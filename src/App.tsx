import { useEffect, useState } from 'react';
import { Activity, RefreshCw, Calendar } from 'lucide-react';
import { Button } from './components/ui/button';
import { ThemeToggle } from './components/ThemeToggle';
import { BusinessAreaCard } from './components/BusinessAreaCard';
import { BusinessAreaAppsView } from './components/BusinessAreaAppsView';
import { ApplicationView } from './components/ApplicationView';
import { BusinessAreaDetailGrid } from './components/BusinessAreaDetailGrid';
import {
  fetchActivityDefinitions,
  fetchActivityStatuses,
  ActivityDefinition,
  ActivityStatus,
} from './services/mockApi';

type ViewState =
  | { type: 'overview' }
  | { type: 'businessArea'; businessArea: string }
  | { type: 'application'; businessArea: string; appId: string };

export default function App() {
  const [definitions, setDefinitions] = useState<ActivityDefinition[]>([]);
  const [statuses, setStatuses] = useState<ActivityStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewState, setViewState] = useState<ViewState>({ type: 'overview' });
  const [selectedBusinessArea, setSelectedBusinessArea] = useState<string | null>(null);
  const [businessDate, setBusinessDate] = useState('2025-11-16');

  const loadData = async () => {
    setLoading(true);
    try {
      const [defs, stats] = await Promise.all([
        fetchActivityDefinitions(),
        fetchActivityStatuses(),
      ]);
      setDefinitions(defs);
      setStatuses(stats);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const businessAreas = [...new Set(definitions.map((def) => def.businessArea))].sort();

  const getTotalStats = () => {
    const total = definitions.length;
    const totalApps = [...new Set(definitions.map((def) => def.appId))].length;
    const success = statuses.filter((s) => s.slaStatus === 'SLA_SUCCESS').length;
    const violations = statuses.filter(
      (s) =>
        s.slaStatus === 'SLA_VIOLATION_MISSED_WINDOW' ||
        s.slaStatus === 'SLA_VIOLATION_DUPLICATION'
    ).length;
    const running = statuses.filter((s) => s.activityStatus === 'RUNNING').length;
    return { total, totalApps, success, violations, running };
  };

  const stats = getTotalStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="size-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading activity data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Activity className="size-8 text-primary" />
              <div>
                <h1 className="text-card-foreground">Capital Markets - Clean PNL View</h1>
                <p className="text-sm text-muted-foreground">Real-time activity and SLA tracking</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
                <Calendar className="size-4 text-muted-foreground" />
                <span className="text-sm text-card-foreground">{businessDate}</span>
              </div>
              <Button onClick={loadData} size="sm" variant="outline">
                <RefreshCw className="size-4 mr-2" />
                Refresh
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {viewState.type === 'overview' && (
          <>
            <div className="grid grid-cols-5 gap-4 mb-8">
              <div className="bg-card rounded-lg border border-border p-4 shadow-sm">
                <div className="text-sm text-muted-foreground mb-1">Total Activities</div>
                <div className="text-card-foreground">{stats.total}</div>
              </div>
              <div className="bg-card rounded-lg border border-border p-4 shadow-sm">
                <div className="text-sm text-muted-foreground mb-1">Total Apps</div>
                <div className="text-card-foreground">{stats.totalApps}</div>
              </div>
              <div className="bg-card rounded-lg border border-border p-4 shadow-sm">
                <div className="text-sm text-muted-foreground mb-1">Success</div>
                <div className="text-green-600 dark:text-green-500">{stats.success}</div>
              </div>
              <div className="bg-card rounded-lg border border-border p-4 shadow-sm">
                <div className="text-sm text-muted-foreground mb-1">Running</div>
                <div className="text-blue-600 dark:text-blue-500">{stats.running}</div>
              </div>
              <div className="bg-card rounded-lg border border-border p-4 shadow-sm">
                <div className="text-sm text-muted-foreground mb-1">Violations</div>
                <div className="text-red-600 dark:text-red-500">{stats.violations}</div>
              </div>
            </div>

            <div className="mb-4">
              <h2 className="text-card-foreground mb-2">Business Areas</h2>
              <p className="text-muted-foreground">
                Single-click to select, double-click to drill down
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {businessAreas.map((area) => (
                <BusinessAreaCard
                  key={area}
                  businessArea={area}
                  definitions={definitions}
                  statuses={statuses}
                  isSelected={selectedBusinessArea === area}
                  onClick={() => setSelectedBusinessArea(area)}
                  onDoubleClick={() => setViewState({ type: 'businessArea', businessArea: area })}
                />
              ))}
            </div>

            {selectedBusinessArea && (
              <BusinessAreaDetailGrid
                businessArea={selectedBusinessArea}
                definitions={definitions}
                statuses={statuses}
              />
            )}
          </>
        )}

        {viewState.type === 'businessArea' && (
          <BusinessAreaAppsView
            businessArea={viewState.businessArea}
            definitions={definitions}
            statuses={statuses}
            onBack={() => setViewState({ type: 'overview' })}
            onAppClick={(appId) =>
              setViewState({
                type: 'application',
                businessArea: viewState.businessArea,
                appId,
              })
            }
          />
        )}

        {viewState.type === 'application' && (
          <ApplicationView
            appId={viewState.appId}
            businessArea={viewState.businessArea}
            definitions={definitions}
            statuses={statuses}
            onBack={() =>
              setViewState({ type: 'businessArea', businessArea: viewState.businessArea })
            }
          />
        )}
      </div>
    </div>
  );
}