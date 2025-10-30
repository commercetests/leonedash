import { Eye, Target, TrendingUp, Users, Tv } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import ChartInfoTooltip from './ChartInfoTooltip';
import DSPFilterBar from './DSPFilterBar';
import '@/styles/DSPPage.css';

const DSPPage = () => {
  const performanceData = [
    { date: 'Week 1', impressions: 450, reach: 125, conversions: 850, spend: 15000 },
    { date: 'Week 2', impressions: 520, reach: 142, conversions: 920, spend: 16500 },
    { date: 'Week 3', impressions: 480, reach: 135, conversions: 880, spend: 15800 },
    { date: 'Week 4', impressions: 550, reach: 158, conversions: 1050, spend: 17200 },
  ];

  const audienceSegments = [
    { name: 'In-Market Shoppers', size: '2.4M', impressions: 1200000, clicks: 33600, ctr: 2.8, conversions: 4200, spend: 18000, performance: 'High' },
    { name: 'Brand Loyalists', size: '850K', impressions: 680000, clicks: 23800, ctr: 3.5, conversions: 2850, spend: 12000, performance: 'Very High' },
    { name: 'Competitor Audiences', size: '1.6M', impressions: 960000, clicks: 18240, ctr: 1.9, conversions: 2100, spend: 14500, performance: 'Medium' },
    { name: 'Lifestyle Segments', size: '3.2M', impressions: 1920000, clicks: 40320, ctr: 2.1, conversions: 4800, spend: 22000, performance: 'Medium' },
    { name: 'Retargeting Pool', size: '450K', impressions: 540000, clicks: 16200, ctr: 3.0, conversions: 2000, spend: 9500, performance: 'High' },
  ];

  const placementData = [
    { placement: 'Amazon Homepage', impressions: 1800000, clicks: 54000, ctr: 3.0, conversions: 6500, spend: 28000 },
    { placement: 'Product Detail Pages', impressions: 2200000, clicks: 66000, ctr: 3.0, conversions: 8200, spend: 32000 },
    { placement: 'Search Results', impressions: 1500000, clicks: 45000, ctr: 3.0, conversions: 5800, spend: 24000 },
    { placement: 'Category Pages', impressions: 980000, clicks: 29400, ctr: 3.0, conversions: 3700, spend: 16000 },
  ];

  const deviceData = [
    { device: 'Desktop', impressions: 2100, conversions: 8500, spend: 32000 },
    { device: 'Mobile', impressions: 3800, conversions: 12200, spend: 48000 },
    { device: 'Tablet', impressions: 800, conversions: 3500, spend: 12000 },
  ];

  const creativePerformance = [
    { name: 'Sensodyne - Sensitivity Relief', format: 'Display', impressions: 850000, ctr: 3.2, conversions: 3400, cpa: 8.50 },
    { name: 'Centrum - Daily Wellness', format: 'Video', impressions: 620000, ctr: 2.8, conversions: 2200, cpa: 9.20 },
    { name: 'Parodontax - Gum Health', format: 'Display', impressions: 720000, ctr: 3.0, conversions: 2800, cpa: 8.80 },
    { name: 'Voltaren - Pain Relief', format: 'Video', impressions: 580000, ctr: 2.6, conversions: 1900, cpa: 9.50 },
    { name: 'Corega - Denture Care', format: 'Display', impressions: 450000, ctr: 2.9, conversions: 1650, cpa: 8.70 },
  ];

  return (
    <div className="dsp-page">
      <DSPFilterBar />
      
      <div className="page-header">
        <div className="page-title-section">
          <Tv size={32} className="page-icon" />
          <div>
            <h1 className="page-title">Amazon DSP</h1>
            <p className="page-subtitle">Programmatic advertising performance and audience insights</p>
          </div>
        </div>
      </div>

      {/* Top KPIs */}
      <div className="kpi-row">
        <div className="kpi-card-large glass-card">
          <div className="kpi-icon-wrapper" style={{ background: 'rgba(34, 255, 0, 0.1)' }}>
            <Eye size={24} color="#22ff00" />
          </div>
          <div className="kpi-content">
            <div className="kpi-label">Total Impressions</div>
            <div className="kpi-value">6.7M</div>
            <div className="kpi-trend positive">+15.3% vs last month</div>
          </div>
        </div>

        <div className="kpi-card-large glass-card">
          <div className="kpi-icon-wrapper" style={{ background: 'rgba(34, 255, 0, 0.1)' }}>
            <Users size={24} color="#22ff00" />
          </div>
          <div className="kpi-content">
            <div className="kpi-label">Unique Reach</div>
            <div className="kpi-value">1.8M</div>
            <div className="kpi-trend positive">+11.2% vs last month</div>
          </div>
        </div>

        <div className="kpi-card-large glass-card">
          <div className="kpi-icon-wrapper" style={{ background: 'rgba(34, 255, 0, 0.1)' }}>
            <Target size={24} color="#22ff00" />
          </div>
          <div className="kpi-content">
            <div className="kpi-label">Total Conversions</div>
            <div className="kpi-value">16,150</div>
            <div className="kpi-trend positive">+18.5% vs last month</div>
          </div>
        </div>

        <div className="kpi-card-large glass-card">
          <div className="kpi-icon-wrapper" style={{ background: 'rgba(34, 255, 0, 0.1)' }}>
            <TrendingUp size={24} color="#22ff00" />
          </div>
          <div className="kpi-content">
            <div className="kpi-label">Average CPM</div>
            <div className="kpi-value">€11.25</div>
            <div className="kpi-trend positive">-8.2% vs last month</div>
          </div>
        </div>
      </div>

      {/* Performance Trends */}
      <div className="chart-section glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 className="section-title" style={{ margin: 0 }}>Performance Trends</h2>
          <ChartInfoTooltip
            title="DSP Performance Trends"
            description="Tracks weekly programmatic advertising performance including impressions, unique reach, and conversions across Amazon DSP campaigns."
            kpis={[
              'Weekly Impressions (K)',
              'Unique Reach (K)',
              'Total Conversions',
              'Conversion Rate (%)'
            ]}
            challenges={[
              'Scaling reach while maintaining conversion quality',
              'Optimizing frequency caps to avoid ad fatigue',
              'Balancing upper-funnel awareness with lower-funnel conversions',
              'Managing cross-device attribution'
            ]}
          />
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={performanceData}>
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
            <Line type="monotone" dataKey="impressions" stroke="#22ff00" strokeWidth={2} name="Impressions (K)" />
            <Line type="monotone" dataKey="reach" stroke="#3b82f6" strokeWidth={2} name="Reach (K)" />
            <Line type="monotone" dataKey="conversions" stroke="#ec4899" strokeWidth={2} name="Conversions" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Device Performance */}
      <div className="chart-section glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 className="section-title" style={{ margin: 0 }}>Performance by Device</h2>
          <ChartInfoTooltip
            title="Performance by Device"
            description="Compares DSP campaign performance across desktop, mobile, and tablet devices to optimize device-specific targeting strategies."
            kpis={[
              'Impressions by Device (K)',
              'Conversions by Device',
              'Device-specific CTR',
              'Cost per Conversion by Device'
            ]}
            challenges={[
              'Optimizing creative formats for each device type',
              'Managing device-specific bidding strategies',
              'Understanding cross-device customer journeys',
              'Allocating budget based on device performance'
            ]}
          />
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={deviceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
            <XAxis dataKey="device" stroke="#cccccc" fontSize={12} />
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
            <Bar dataKey="impressions" fill="#22ff00" radius={[4, 4, 0, 0]} name="Impressions (K)" />
            <Bar dataKey="conversions" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Conversions" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Audience Segments */}
      <div className="section-header">
        <h2 className="section-title">
          <Users size={20} />
          Audience Segments Performance
        </h2>
      </div>
      <div className="table-container glass-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Audience Segment</th>
              <th>Size</th>
              <th>Impressions</th>
              <th>Clicks</th>
              <th>CTR</th>
              <th>Conversions</th>
              <th>Spend</th>
              <th>Performance</th>
            </tr>
          </thead>
          <tbody>
            {audienceSegments.map((segment, index) => (
              <tr key={index}>
                <td className="segment-name">{segment.name}</td>
                <td>{segment.size}</td>
                <td>{(segment.impressions / 1000).toFixed(0)}K</td>
                <td>{(segment.clicks / 1000).toFixed(1)}K</td>
                <td>{segment.ctr}%</td>
                <td>{segment.conversions.toLocaleString()}</td>
                <td>€{(segment.spend / 1000).toFixed(1)}K</td>
                <td><span className={`performance-badge performance-${segment.performance.toLowerCase().replace(' ', '-')}`}>{segment.performance}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Placement Performance */}
      <div className="section-header">
        <h2 className="section-title">Placement Performance</h2>
      </div>
      <div className="table-container glass-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Placement</th>
              <th>Impressions</th>
              <th>Clicks</th>
              <th>CTR</th>
              <th>Conversions</th>
              <th>Spend</th>
            </tr>
          </thead>
          <tbody>
            {placementData.map((placement, index) => (
              <tr key={index}>
                <td className="placement-name">{placement.placement}</td>
                <td>{(placement.impressions / 1000000).toFixed(1)}M</td>
                <td>{(placement.clicks / 1000).toFixed(0)}K</td>
                <td>{placement.ctr}%</td>
                <td>{placement.conversions.toLocaleString()}</td>
                <td>€{(placement.spend / 1000).toFixed(0)}K</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Creative Performance */}
      <div className="section-header">
        <h2 className="section-title">Top Performing Creatives</h2>
      </div>
      <div className="table-container glass-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Creative Name</th>
              <th>Format</th>
              <th>Impressions</th>
              <th>CTR</th>
              <th>Conversions</th>
              <th>CPA</th>
            </tr>
          </thead>
          <tbody>
            {creativePerformance.map((creative, index) => (
              <tr key={index}>
                <td className="creative-name">{creative.name}</td>
                <td><span className="format-badge">{creative.format}</span></td>
                <td>{(creative.impressions / 1000).toFixed(0)}K</td>
                <td>{creative.ctr}%</td>
                <td>{creative.conversions.toLocaleString()}</td>
                <td>€{creative.cpa}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DSPPage;
