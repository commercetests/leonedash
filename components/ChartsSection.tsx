import { useMemo } from 'react';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import ChartInfoTooltip from './ChartInfoTooltip';
import { useFilters } from '../context/FilterContext';
import { calculateMultiplier, getDataPointsCount, generateMonthLabels, generateWeekLabels } from '../utils/dataGenerator';
import '@/styles/ChartsSection.css';

const ChartsSection = () => {
  const filters = useFilters();
  const multiplier = useMemo(() => calculateMultiplier(filters), [filters]);
  const dataPoints = useMemo(() => getDataPointsCount(filters.selectedDateRange), [filters.selectedDateRange]);
  const monthLabels = useMemo(() => generateMonthLabels(dataPoints, filters.selectedDateRange), [dataPoints, filters.selectedDateRange]);
  const weekLabels = useMemo(() => generateWeekLabels(Math.min(dataPoints, 4)), [dataPoints]);

  // Vendor Central Data - Dynamic based on filters
  const vendorData = useMemo(() => {
    const baseRevenues = [180000, 220000, 195000, 245000, 280000, 310000];
    const baseUnits = [3200, 3800, 3500, 4200, 4800, 5200];
    
    return monthLabels.map((month, i) => ({
      month,
      revenue: Math.round(baseRevenues[i % baseRevenues.length] * multiplier),
      units: Math.round(baseUnits[i % baseUnits.length] * multiplier),
    }));
  }, [monthLabels, multiplier]);

  // Advertising Data - Dynamic based on filters
  const adPerformanceData = useMemo(() => {
    const baseSP = [42000, 45000, 43000, 48000];
    const baseSD = [28000, 30000, 31000, 33000];
    const baseSB = [25000, 27000, 26000, 29000];
    const baseSBV = [15000, 16000, 17000, 19000];
    
    return weekLabels.map((week, i) => ({
      week,
      SP: Math.round(baseSP[i % baseSP.length] * multiplier),
      SD: Math.round(baseSD[i % baseSD.length] * multiplier),
      SB: Math.round(baseSB[i % baseSB.length] * multiplier),
      SBV: Math.round(baseSBV[i % baseSBV.length] * multiplier),
    }));
  }, [weekLabels, multiplier]);

  // DSP Data - Dynamic based on filters
  const dspData = useMemo(() => {
    const baseImpressions = [45, 52, 48, 55, 59, 62];
    const baseReach = [12.5, 14.2, 13.5, 15.8, 16.8, 17.5];
    const baseConversions = [850, 920, 880, 1050, 1120, 1200];
    
    return monthLabels.slice(0, 6).map((date, i) => ({
      date,
      impressions: Math.round(baseImpressions[i % baseImpressions.length] * multiplier),
      reach: Math.round(baseReach[i % baseReach.length] * multiplier * 10) / 10,
      conversions: Math.round(baseConversions[i % baseConversions.length] * multiplier),
    }));
  }, [monthLabels, multiplier]);

  // AMC Data
  const pathToConversion = [
    { name: 'Display → Purchase', value: 35, color: '#22ff00' },
    { name: 'Search → Purchase', value: 28, color: '#3b82f6' },
    { name: 'Video → Purchase', value: 18, color: '#a855f7' },
    { name: 'Multi-Touch', value: 19, color: '#ec4899' },
  ];

  return (
    <div className="charts-section">
      <h2 className="section-main-title">Performance Overview</h2>
      
      <div className="charts-grid">
        {/* Vendor Central Revenue Chart */}
        <div className="chart-card glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 className="chart-card-title" style={{ margin: 0 }}>Vendor Central - Revenue Performance</h3>
            <ChartInfoTooltip
              title="Vendor Central Revenue Performance"
              description="Tracks monthly revenue trends from direct sales to Amazon as a vendor, showing wholesale performance and order fulfillment."
              kpis={[
                'Monthly Revenue (€)',
                'Units Shipped',
                'Revenue Growth Rate (%)',
                'Average Order Value'
              ]}
              challenges={[
                'Managing inventory levels to meet Amazon\'s demand',
                'Negotiating favorable wholesale pricing terms',
                'Reducing chargebacks and compliance issues',
                'Optimizing fill rates and on-time delivery'
              ]}
            />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={vendorData}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22ff00" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#22ff00" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
              <XAxis dataKey="month" stroke="#cccccc" fontSize={12} />
              <YAxis stroke="#cccccc" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(20, 20, 20, 0.95)', 
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: '#ffffff'
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#22ff00" 
                strokeWidth={2}
                fill="url(#revenueGradient)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Advertising Weekly Spend Chart */}
        <div className="chart-card glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 className="chart-card-title" style={{ margin: 0 }}>Advertising - Weekly Spend by Ad Type</h3>
            <ChartInfoTooltip
              title="Advertising Spend by Ad Type"
              description="Compares weekly advertising spend across Sponsored Products (SP), Sponsored Display (SD), Sponsored Brands (SB), and Sponsored Brand Video (SBV) campaigns."
              kpis={[
                'Ad Spend by Type (€)',
                'Return on Ad Spend (ROAS)',
                'Impressions & Click-through Rate',
                'Cost per Click (CPC)'
              ]}
              challenges={[
                'Optimizing budget allocation across ad types',
                'Improving ROAS while maintaining visibility',
                'Managing competitive keyword bidding',
                'Balancing brand awareness vs. conversion campaigns'
              ]}
            />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={adPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
              <XAxis dataKey="week" stroke="#cccccc" fontSize={12} />
              <YAxis stroke="#cccccc" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(20, 20, 20, 0.95)', 
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: '#ffffff'
                }} 
              />
              <Legend wrapperStyle={{ color: '#cccccc', fontSize: '12px' }} />
              <Bar dataKey="SP" fill="#22ff00" radius={[4, 4, 0, 0]} />
              <Bar dataKey="SD" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="SB" fill="#a855f7" radius={[4, 4, 0, 0]} />
              <Bar dataKey="SBV" fill="#ec4899" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* DSP Performance Trends Chart */}
        <div className="chart-card glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 className="chart-card-title" style={{ margin: 0 }}>DSP - Performance Trends</h3>
            <ChartInfoTooltip
              title="Amazon DSP Performance Trends"
              description="Displays programmatic advertising performance including impressions, unique reach, and conversions across display and video campaigns on and off Amazon."
              kpis={[
                'Total Impressions',
                'Unique Reach',
                'Conversions',
                'CPM (Cost per Thousand Impressions)'
              ]}
              challenges={[
                'Expanding reach beyond Amazon-owned properties',
                'Optimizing audience targeting and segmentation',
                'Reducing CPM while maintaining quality placements',
                'Measuring cross-channel attribution and incrementality'
              ]}
            />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={dspData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
              <XAxis dataKey="date" stroke="#cccccc" fontSize={12} />
              <YAxis stroke="#cccccc" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(20, 20, 20, 0.95)', 
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: '#ffffff'
                }} 
              />
              <Legend wrapperStyle={{ color: '#cccccc', fontSize: '12px' }} />
              <Line 
                type="monotone" 
                dataKey="impressions" 
                stroke="#22ff00" 
                strokeWidth={2}
                dot={{ fill: '#22ff00', r: 4 }}
                name="Impressions"
              />
              <Line 
                type="monotone" 
                dataKey="reach" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6', r: 4 }}
                name="Reach"
              />
              <Line 
                type="monotone" 
                dataKey="conversions" 
                stroke="#ec4899" 
                strokeWidth={2}
                dot={{ fill: '#ec4899', r: 4 }}
                name="Conversions"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* AMC Path to Conversion Chart */}
        <div className="chart-card glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 className="chart-card-title" style={{ margin: 0 }}>AMC - Path to Conversion Analysis</h3>
            <ChartInfoTooltip
              title="Path to Conversion Analysis"
              description="Analyzes customer journey patterns showing which advertising touchpoints (Display, Search, Video) lead to conversions, including multi-touch attribution."
              kpis={[
                'Conversion Path Distribution (%)',
                'Average Path Length',
                'Multi-Touch Attribution',
                'Time to Conversion'
              ]}
              challenges={[
                'Understanding complex multi-touch customer journeys',
                'Attributing value across multiple touchpoints',
                'Identifying optimal frequency and sequencing',
                'Leveraging insights for campaign optimization'
              ]}
            />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pathToConversion}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {pathToConversion.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(20, 20, 20, 0.95)', 
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: '#ffffff'
                }} 
              />
              <Legend 
                wrapperStyle={{ color: '#cccccc', fontSize: '12px' }}
                iconType="circle"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ChartsSection;
