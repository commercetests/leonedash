import { Tv, Users, TrendingUp, Target } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import ChartInfoTooltip from './ChartInfoTooltip';
import '@/styles/ModuleCard.css';

const DSP = () => {
  const dspData = [
    { date: 'Oct 1', impressions: 450000, reach: 125000, conversions: 850 },
    { date: 'Oct 2', impressions: 520000, reach: 142000, conversions: 920 },
    { date: 'Oct 3', impressions: 480000, reach: 135000, conversions: 880 },
    { date: 'Oct 4', impressions: 550000, reach: 158000, conversions: 1050 },
    { date: 'Oct 5', impressions: 590000, reach: 168000, conversions: 1120 },
    { date: 'Oct 6', impressions: 620000, reach: 175000, conversions: 1200 },
  ];

  const audiences = [
    { name: 'In-Market Shoppers', size: '2.4M', performance: 'High', ctr: '2.8%' },
    { name: 'Brand Loyalists', size: '850K', performance: 'Very High', ctr: '3.5%' },
    { name: 'Competitor Audiences', size: '1.6M', performance: 'Medium', ctr: '1.9%' },
    { name: 'Lifestyle Segments', size: '3.2M', performance: 'Medium', ctr: '2.1%' },
  ];

  return (
    <div className="module-card glass-card">
      <div className="module-header">
        <div className="module-title">
          <Tv className="module-icon" size={24} />
          <h2>Amazon DSP</h2>
        </div>
        <div className="module-badge">
          <span className="status-dot active"></span>
          Programmatic Active
        </div>
      </div>

      <div className="module-content">
        {/* DSP KPIs */}
        <div className="kpi-grid">
          <div className="kpi-card">
            <div className="kpi-label">Total Impressions</div>
            <div className="kpi-value">3.2M</div>
            <div className="kpi-trend positive">
              <TrendingUp size={16} />
              +15.3%
            </div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">Unique Reach</div>
            <div className="kpi-value">903K</div>
            <div className="kpi-trend positive">
              <TrendingUp size={16} />
              +11.2%
            </div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">Total Conversions</div>
            <div className="kpi-value">6,020</div>
            <div className="kpi-trend positive">
              <TrendingUp size={16} />
              +18.5%
            </div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">CPM</div>
            <div className="kpi-value">€4.85</div>
            <div className="kpi-trend positive">
              <TrendingUp size={16} />
              -8.2%
            </div>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="chart-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 className="chart-title" style={{ margin: 0 }}>DSP Performance Trends</h3>
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
          <ResponsiveContainer width="100%" height={200}>
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

        {/* Audience Segments */}
        <div className="audiences-section">
          <h3 className="section-title">
            <Users size={18} />
            Active Audience Segments
          </h3>
          <div className="audiences-list">
            {audiences.map((audience, index) => (
              <div key={index} className="audience-item">
                <div className="audience-info">
                  <div className="audience-name">{audience.name}</div>
                  <div className="audience-size">{audience.size} users</div>
                </div>
                <div className="audience-metrics">
                  <div className={`performance-badge performance-${audience.performance.toLowerCase().replace(' ', '-')}`}>
                    {audience.performance}
                  </div>
                  <div className="audience-ctr">
                    <Target size={14} />
                    CTR: {audience.ctr}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DSP;
