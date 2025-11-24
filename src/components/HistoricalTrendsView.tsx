import { useEffect, useState } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from './ui/button';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { fetchHistoricalTrends, HistoricalTrendData } from '../services/mockApi';

interface HistoricalTrendsViewProps {
  businessArea?: string;
  appId?: string;
  activityId?: string;
  activityName?: string;
  onBack: () => void;
}

export function HistoricalTrendsView({
  businessArea,
  appId,
  activityId,
  activityName,
  onBack,
}: HistoricalTrendsViewProps) {
  const [trends, setTrends] = useState<HistoricalTrendData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrends = async () => {
      setLoading(true);
      const data = await fetchHistoricalTrends(businessArea, appId, activityId);
      setTrends(data);
      setLoading(false);
    };
    loadTrends();
  }, [businessArea, appId, activityId]);

  const getTitle = () => {
    if (activityId && activityName) {
      return `Historical Trends - ${activityName} (${activityId})`;
    }
    if (appId) {
      return `Historical Trends - Application ${appId}`;
    }
    if (businessArea) {
      return `Historical Trends - ${businessArea}`;
    }
    return 'Historical Trends - All Activities';
  };

  const getSubtitle = () => {
    if (activityId) {
      return `Activity performance over the last 30 days`;
    }
    if (appId) {
      return `Application ${appId} performance over the last 30 days`;
    }
    if (businessArea) {
      return `${businessArea} business area performance over the last 30 days`;
    }
    return 'Overall system performance over the last 30 days';
  };

  // Calculate summary statistics
  const totalSuccess = trends.reduce((sum, t) => sum + t.success, 0);
  const totalViolations = trends.reduce((sum, t) => sum + t.violations, 0);
  const totalActivities = trends.reduce((sum, t) => sum + t.total, 0);
  const successRate = totalActivities > 0 ? ((totalSuccess / totalActivities) * 100).toFixed(1) : '0';

  // Calculate trend direction
  const recentViolations = trends.slice(-7).reduce((sum, t) => sum + t.violations, 0);
  const previousViolations = trends.slice(-14, -7).reduce((sum, t) => sum + t.violations, 0);
  const trendDirection = recentViolations < previousViolations ? 'improving' : recentViolations > previousViolations ? 'degrading' : 'stable';

  // Format data for charts
  const chartData = trends.map((t) => ({
    ...t,
    date: new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  }));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading trends...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={onBack}>
              <ArrowLeft className="size-4" />
            </Button>
            <div>
              <h2 className="text-card-foreground">{getTitle()}</h2>
              <p className="text-sm text-muted-foreground">{getSubtitle()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg border border-border p-4 shadow-sm">
          <div className="text-sm text-muted-foreground mb-1">Success Rate</div>
          <div className="text-2xl text-green-600 dark:text-green-500">{successRate}%</div>
          <div className="text-xs text-muted-foreground mt-1">
            {totalSuccess} / {totalActivities} activities
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-4 shadow-sm">
          <div className="text-sm text-muted-foreground mb-1">Total Violations</div>
          <div className="text-2xl text-red-600 dark:text-red-500">{totalViolations}</div>
          <div className="text-xs text-muted-foreground mt-1">Last 30 days</div>
        </div>

        <div className="bg-card rounded-lg border border-border p-4 shadow-sm">
          <div className="text-sm text-muted-foreground mb-1">Trend</div>
          <div className="flex items-center gap-2">
            {trendDirection === 'improving' ? (
              <>
                <TrendingDown className="size-5 text-green-600 dark:text-green-500" />
                <span className="text-green-600 dark:text-green-500">Improving</span>
              </>
            ) : trendDirection === 'degrading' ? (
              <>
                <TrendingUp className="size-5 text-red-600 dark:text-red-500" />
                <span className="text-red-600 dark:text-red-500">Degrading</span>
              </>
            ) : (
              <span className="text-muted-foreground">Stable</span>
            )}
          </div>
          <div className="text-xs text-muted-foreground mt-1">Last 7 vs previous 7 days</div>
        </div>

        <div className="bg-card rounded-lg border border-border p-4 shadow-sm">
          <div className="text-sm text-muted-foreground mb-1">Avg Daily Activities</div>
          <div className="text-2xl text-card-foreground">
            {(totalActivities / trends.length).toFixed(1)}
          </div>
          <div className="text-xs text-muted-foreground mt-1">Per day average</div>
        </div>
      </div>

      {/* Success vs Violations Trend - Area Chart */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
        <h3 className="text-card-foreground mb-4">Success vs Violations Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="date"
              className="text-xs"
              tick={{ fill: 'currentColor' }}
              stroke="currentColor"
            />
            <YAxis className="text-xs" tick={{ fill: 'currentColor' }} stroke="currentColor" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="success"
              stackId="1"
              stroke="#22c55e"
              fill="#22c55e"
              fillOpacity={0.6}
              name="Success"
            />
            <Area
              type="monotone"
              dataKey="violations"
              stackId="1"
              stroke="#ef4444"
              fill="#ef4444"
              fillOpacity={0.6}
              name="Violations"
            />
            <Area
              type="monotone"
              dataKey="running"
              stackId="1"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.6}
              name="Running"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Daily Activity Volume - Bar Chart */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
        <h3 className="text-card-foreground mb-4">Daily Activity Volume</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="date"
              className="text-xs"
              tick={{ fill: 'currentColor' }}
              stroke="currentColor"
            />
            <YAxis className="text-xs" tick={{ fill: 'currentColor' }} stroke="currentColor" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Bar dataKey="total" fill="#8b5cf6" name="Total Activities" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Violations Over Time - Line Chart */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
        <h3 className="text-card-foreground mb-4">SLA Violations Over Time</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="date"
              className="text-xs"
              tick={{ fill: 'currentColor' }}
              stroke="currentColor"
            />
            <YAxis className="text-xs" tick={{ fill: 'currentColor' }} stroke="currentColor" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="violations"
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ fill: '#ef4444' }}
              name="Violations"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
