export interface ActivityStatus {
  id: {
    timestamp: number;
    date: string;
  };
  appId: string;
  businessStepID: string;
  activityId: string;
  activityType: string;
  activityDescription: string;
  activityStatus: 'RUNNING' | 'COMPLETED';
  businessDate: string;
  reportingTime: string;
  runId: string;
  slaStatus: 'SLA_SUCCESS' | 'SLA_VIOLATION_MISSED_WINDOW' | 'SLA_VIOLATION_DUPLICATION';
  businessArea: string;
}

export interface HistoricalTrendData {
  date: string;
  success: number;
  violations: number;
  running: number;
  total: number;
}

// Mock data - you can update this directly in the code or load from an external source
const mockActivityDefinitions: ActivityDefinition[] = [
  {
    id: {
      timestamp: 1763479237,
      date: "2025-11-18T15:20:37.000+00:00"
    },
    activityId: "1COM-01",
    expectedStartTime: "9:00 PM",
    expectedEndTime: "10:30 PM",
    businessArea: "COMMS",
    activityName: "EOD Trade Snapshot (T-1)",
    appId: "1COM",
    businessStepID: "Trade.PD",
    slaTimeOffset: "T-1",
    activityType: "TRADE",
    parsedExpectedEndTime: "22:30:00",
    parsedExpectedStartTime: "21:00:00"
  },
  {
    id: {
      timestamp: 1763479238,
      date: "2025-11-18T15:20:38.000+00:00"
    },
    activityId: "1COM-02",
    expectedStartTime: "10:30 PM",
    expectedEndTime: "11:00 PM",
    businessArea: "COMMS",
    activityName: "Risk Calculation",
    appId: "1COM",
    businessStepID: "Risk.Calc",
    slaTimeOffset: "T",
    activityType: "RISK",
    parsedExpectedEndTime: "23:00:00",
    parsedExpectedStartTime: "22:30:00"
  },
  {
    id: {
      timestamp: 1763479239,
      date: "2025-11-18T15:20:39.000+00:00"
    },
    activityId: "2COM-01",
    expectedStartTime: "8:00 PM",
    expectedEndTime: "9:00 PM",
    businessArea: "COMMS",
    activityName: "Market Data Feed",
    appId: "2COM",
    businessStepID: "Market.Feed",
    slaTimeOffset: "T-1",
    activityType: "MARKET_DATA",
    parsedExpectedEndTime: "21:00:00",
    parsedExpectedStartTime: "20:00:00"
  },
  {
    id: {
      timestamp: 1763479240,
      date: "2025-11-18T15:20:40.000+00:00"
    },
    activityId: "1FX-01",
    expectedStartTime: "7:00 PM",
    expectedEndTime: "8:30 PM",
    businessArea: "FX",
    activityName: "FX Trade Processing",
    appId: "1FX",
    businessStepID: "Trade.Process",
    slaTimeOffset: "T",
    activityType: "TRADE",
    parsedExpectedEndTime: "20:30:00",
    parsedExpectedStartTime: "19:00:00"
  },
  {
    id: {
      timestamp: 1763479241,
      date: "2025-11-18T15:20:41.000+00:00"
    },
    activityId: "1FX-02",
    expectedStartTime: "8:30 PM",
    expectedEndTime: "9:30 PM",
    businessArea: "FX",
    activityName: "FX PnL Calculation",
    appId: "1FX",
    businessStepID: "PnL.Calc",
    slaTimeOffset: "T",
    activityType: "PNL",
    parsedExpectedEndTime: "21:30:00",
    parsedExpectedStartTime: "20:30:00"
  },
  {
    id: {
      timestamp: 1763479242,
      date: "2025-11-18T15:20:42.000+00:00"
    },
    activityId: "2FX-01",
    expectedStartTime: "6:00 PM",
    expectedEndTime: "7:00 PM",
    businessArea: "FX",
    activityName: "FX Price Feed",
    appId: "2FX",
    businessStepID: "Price.Feed",
    slaTimeOffset: "T-1",
    activityType: "PRICE",
    parsedExpectedEndTime: "19:00:00",
    parsedExpectedStartTime: "18:00:00"
  },
  {
    id: {
      timestamp: 1763479243,
      date: "2025-11-18T15:20:43.000+00:00"
    },
    activityId: "1RATES-01",
    expectedStartTime: "5:00 PM",
    expectedEndTime: "6:30 PM",
    businessArea: "RATES",
    activityName: "Rates Trade Snapshot",
    appId: "1RATES",
    businessStepID: "Trade.Snap",
    slaTimeOffset: "T",
    activityType: "TRADE",
    parsedExpectedEndTime: "18:30:00",
    parsedExpectedStartTime: "17:00:00"
  },
  {
    id: {
      timestamp: 1763479244,
      date: "2025-11-18T15:20:44.000+00:00"
    },
    activityId: "1RATES-02",
    expectedStartTime: "6:30 PM",
    expectedEndTime: "8:00 PM",
    businessArea: "RATES",
    activityName: "Rates Position Update",
    appId: "1RATES",
    businessStepID: "Position.Update",
    slaTimeOffset: "T",
    activityType: "POSITION",
    parsedExpectedEndTime: "20:00:00",
    parsedExpectedStartTime: "18:30:00"
  },
  {
    id: {
      timestamp: 1763479245,
      date: "2025-11-18T15:20:45.000+00:00"
    },
    activityId: "1EQ-01",
    expectedStartTime: "4:00 PM",
    expectedEndTime: "5:00 PM",
    businessArea: "EQUITIES",
    activityName: "Equity Trade Processing",
    appId: "1EQ",
    businessStepID: "Trade.Process",
    slaTimeOffset: "T",
    activityType: "TRADE",
    parsedExpectedEndTime: "17:00:00",
    parsedExpectedStartTime: "16:00:00"
  },
  {
    id: {
      timestamp: 1763479246,
      date: "2025-11-18T15:20:46.000+00:00"
    },
    activityId: "1EQ-02",
    expectedStartTime: "5:00 PM",
    expectedEndTime: "6:00 PM",
    businessArea: "EQUITIES",
    activityName: "Equity Data Export",
    appId: "1EQ",
    businessStepID: "Data.Export",
    slaTimeOffset: "T",
    activityType: "DATA",
    parsedExpectedEndTime: "18:00:00",
    parsedExpectedStartTime: "17:00:00"
  },
  {
    id: {
      timestamp: 1763479247,
      date: "2025-11-18T15:20:47.000+00:00"
    },
    activityId: "2EQ-01",
    expectedStartTime: "3:00 PM",
    expectedEndTime: "4:00 PM",
    businessArea: "EQUITIES",
    activityName: "Kessel Feed Processing",
    appId: "2EQ",
    businessStepID: "Kessel.Feed",
    slaTimeOffset: "T-1",
    activityType: "KESSEL_FEED",
    parsedExpectedEndTime: "16:00:00",
    parsedExpectedStartTime: "15:00:00"
  }
];

const mockActivityStatuses: ActivityStatus[] = [
  {
    id: {
      timestamp: 1763643969,
      date: "2025-11-20T13:06:09.000+00:00"
    },
    appId: "1COM",
    businessStepID: "Trade.PD",
    activityId: "1COM-01",
    activityType: "TRADE",
    activityDescription: "EOD Trade Snapshot (T-1)",
    activityStatus: "COMPLETED",
    businessDate: "2025-11-16",
    reportingTime: "2025-11-16T03:10:00Z",
    runId: "001",
    slaStatus: "SLA_SUCCESS",
    businessArea: "COMMS"
  },
  {
    id: {
      timestamp: 1763643970,
      date: "2025-11-20T13:06:10.000+00:00"
    },
    appId: "1COM",
    businessStepID: "Risk.Calc",
    activityId: "1COM-02",
    activityType: "RISK",
    activityDescription: "Risk Calculation",
    activityStatus: "RUNNING",
    businessDate: "2025-11-16",
    reportingTime: "2025-11-16T03:15:00Z",
    runId: "001",
    slaStatus: "SLA_SUCCESS",
    businessArea: "COMMS"
  },
  {
    id: {
      timestamp: 1763643971,
      date: "2025-11-20T13:06:11.000+00:00"
    },
    appId: "2COM",
    businessStepID: "Market.Feed",
    activityId: "2COM-01",
    activityType: "MARKET_DATA",
    activityDescription: "Market Data Feed",
    activityStatus: "COMPLETED",
    businessDate: "2025-11-16",
    reportingTime: "2025-11-16T02:50:00Z",
    runId: "001",
    slaStatus: "SLA_VIOLATION_MISSED_WINDOW",
    businessArea: "COMMS"
  },
  {
    id: {
      timestamp: 1763643972,
      date: "2025-11-20T13:06:12.000+00:00"
    },
    appId: "1FX",
    businessStepID: "Trade.Process",
    activityId: "1FX-01",
    activityType: "TRADE",
    activityDescription: "FX Trade Processing",
    activityStatus: "COMPLETED",
    businessDate: "2025-11-16",
    reportingTime: "2025-11-16T02:30:00Z",
    runId: "001",
    slaStatus: "SLA_SUCCESS",
    businessArea: "FX"
  },
  {
    id: {
      timestamp: 1763643973,
      date: "2025-11-20T13:06:13.000+00:00"
    },
    appId: "1FX",
    businessStepID: "PnL.Calc",
    activityId: "1FX-02",
    activityType: "PNL",
    activityDescription: "FX PnL Calculation",
    activityStatus: "COMPLETED",
    businessDate: "2025-11-16",
    reportingTime: "2025-11-16T02:45:00Z",
    runId: "001",
    slaStatus: "SLA_SUCCESS",
    businessArea: "FX"
  },
  {
    id: {
      timestamp: 1763643974,
      date: "2025-11-20T13:06:14.000+00:00"
    },
    appId: "2FX",
    businessStepID: "Price.Feed",
    activityId: "2FX-01",
    activityType: "PRICE",
    activityDescription: "FX Price Feed",
    activityStatus: "COMPLETED",
    businessDate: "2025-11-16",
    reportingTime: "2025-11-16T02:20:00Z",
    runId: "001",
    slaStatus: "SLA_SUCCESS",
    businessArea: "FX"
  },
  {
    id: {
      timestamp: 1763643975,
      date: "2025-11-20T13:06:15.000+00:00"
    },
    appId: "1RATES",
    businessStepID: "Trade.Snap",
    activityId: "1RATES-01",
    activityType: "TRADE",
    activityDescription: "Rates Trade Snapshot",
    activityStatus: "COMPLETED",
    businessDate: "2025-11-16",
    reportingTime: "2025-11-16T02:00:00Z",
    runId: "001",
    slaStatus: "SLA_SUCCESS",
    businessArea: "RATES"
  },
  {
    id: {
      timestamp: 1763643976,
      date: "2025-11-20T13:06:16.000+00:00"
    },
    appId: "1RATES",
    businessStepID: "Position.Update",
    activityId: "1RATES-02",
    activityType: "POSITION",
    activityDescription: "Rates Position Update",
    activityStatus: "COMPLETED",
    businessDate: "2025-11-16",
    reportingTime: "2025-11-16T02:35:00Z",
    runId: "002",
    slaStatus: "SLA_VIOLATION_DUPLICATION",
    businessArea: "RATES"
  },
  {
    id: {
      timestamp: 1763643977,
      date: "2025-11-20T13:06:17.000+00:00"
    },
    appId: "1EQ",
    businessStepID: "Trade.Process",
    activityId: "1EQ-01",
    activityType: "TRADE",
    activityDescription: "Equity Trade Processing",
    activityStatus: "COMPLETED",
    businessDate: "2025-11-16",
    reportingTime: "2025-11-16T01:30:00Z",
    runId: "001",
    slaStatus: "SLA_SUCCESS",
    businessArea: "EQUITIES"
  },
  {
    id: {
      timestamp: 1763643978,
      date: "2025-11-20T13:06:18.000+00:00"
    },
    appId: "1EQ",
    businessStepID: "Data.Export",
    activityId: "1EQ-02",
    activityType: "DATA",
    activityDescription: "Equity Data Export",
    activityStatus: "COMPLETED",
    businessDate: "2025-11-16",
    reportingTime: "2025-11-16T01:45:00Z",
    runId: "001",
    slaStatus: "SLA_SUCCESS",
    businessArea: "EQUITIES"
  },
  {
    id: {
      timestamp: 1763643979,
      date: "2025-11-20T13:06:19.000+00:00"
    },
    appId: "2EQ",
    businessStepID: "Kessel.Feed",
    activityId: "2EQ-01",
    activityType: "KESSEL_FEED",
    activityDescription: "Kessel Feed Processing",
    activityStatus: "COMPLETED",
    businessDate: "2025-11-16",
    reportingTime: "2025-11-16T01:15:00Z",
    runId: "001",
    slaStatus: "SLA_SUCCESS",
    businessArea: "EQUITIES"
  }
];

export const fetchActivityDefinitions = async (): Promise<ActivityDefinition[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Try to fetch from JSON file first, fallback to mock data
  try {
    const response = await fetch('/activity-definitions.json');
    if (response.ok) {
      const data = await response.json();
      return data.activities || mockActivityDefinitions;
    }
  } catch (error) {
    console.log('Using embedded mock data for activity definitions');
  }
  
  return mockActivityDefinitions;
};

export const fetchActivityStatuses = async (): Promise<ActivityStatus[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Try to fetch from JSON file first, fallback to mock data
  try {
    const response = await fetch('/activity-statuses.json');
    if (response.ok) {
      const data = await response.json();
      return data.statuses || mockActivityStatuses;
    }
  } catch (error) {
    console.log('Using embedded mock data for activity statuses');
  }
  
  return mockActivityStatuses;
};

// Generate historical trend data for last 30 days
export const fetchHistoricalTrends = async (
  businessArea?: string,
  appId?: string,
  activityId?: string
): Promise<HistoricalTrendData[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));

  const days = 30;
  const endDate = new Date('2025-11-16');
  const trends: HistoricalTrendData[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(endDate);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];

    // Generate realistic trend data with patterns
    let baseSuccess = 8;
    let baseViolations = 1;
    let baseRunning = 1;

    // Add some patterns - weekends have fewer activities
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      baseSuccess = Math.floor(baseSuccess * 0.6);
      baseViolations = 0;
      baseRunning = 0;
    }

    // Simulate issues in COMMS and RATES business areas
    if (businessArea === 'COMMS') {
      // COMMS has more violations recently
      if (i < 10) {
        baseViolations = Math.floor(Math.random() * 2) + 1;
        baseSuccess = Math.max(5, baseSuccess - baseViolations);
      }
    } else if (businessArea === 'RATES') {
      // RATES had issues mid-period
      if (i >= 10 && i < 20) {
        baseViolations = Math.floor(Math.random() * 3) + 1;
        baseSuccess = Math.max(4, baseSuccess - baseViolations);
      }
    }

    // Adjust based on specific app or activity
    if (appId) {
      baseSuccess = Math.floor(baseSuccess * 0.3);
      baseViolations = Math.floor(baseViolations * 0.5);
      baseRunning = Math.floor(baseRunning * 0.3);
    }

    if (activityId) {
      // Single activity - binary success/failure
      baseSuccess = Math.random() > 0.2 ? 1 : 0;
      baseViolations = baseSuccess === 0 ? 1 : 0;
      baseRunning = 0;
    }

    const total = baseSuccess + baseViolations + baseRunning;

    trends.push({
      date: dateStr,
      success: baseSuccess,
      violations: baseViolations,
      running: baseRunning,
      total,
    });
  }

  return trends;
};