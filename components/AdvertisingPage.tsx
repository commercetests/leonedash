import { DollarSign, TrendingUp, Target, Zap, Eye } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import ChartInfoTooltip from './ChartInfoTooltip';
import AdsFilterBar from './AdsFilterBar';
import '@/styles/AdvertisingPage.css';

const AdvertisingPage = () => {
  const performanceData = [
    { date: 'Jan 1', SP: 51000, SD: 38000, SB: 26000, SBV: 13000, sales: 350000 },
    { date: 'Jan 8', SP: 53000, SD: 39000, SB: 27000, SBV: 14000, sales: 362000 },
    { date: 'Jan 15', SP: 50000, SD: 37000, SB: 25000, SBV: 12000, sales: 340000 },
    { date: 'Jan 22', SP: 55000, SD: 41000, SB: 28000, SBV: 15000, sales: 378000 },
    { date: 'Jan 29', SP: 58000, SD: 44000, SB: 29000, SBV: 16000, sales: 404000 },
  ];

  const campaignData = [
    { name: 'Brand Awareness Q1', type: 'SB', spend: 88000, sales: 240000, impressions: 2400000, clicks: 36000, roas: 2.73, status: 'Active' },
    { name: 'Product Launch - Sensodyne', type: 'SP', spend: 110000, sales: 300000, impressions: 1800000, clicks: 28000, roas: 2.73, status: 'Active' },
    { name: 'Retargeting Campaign', type: 'SD', spend: 81000, sales: 220000, impressions: 1200000, clicks: 18000, roas: 2.72, status: 'Active' },
    { name: 'Video Brand Story', type: 'SBV', spend: 55000, sales: 150000, impressions: 950000, clicks: 15000, roas: 2.73, status: 'Active' },
    { name: 'Competitor Conquest', type: 'SP', spend: 70000, sales: 190000, impressions: 1100000, clicks: 16500, roas: 2.71, status: 'Paused' },
    { name: 'Holiday Promo', type: 'SB', spend: 62000, sales: 170000, impressions: 2100000, clicks: 32000, roas: 2.74, status: 'Completed' },
  ];

  const keywordData = [
    { keyword: 'sensitive teeth toothpaste', impressions: 450000, clicks: 18000, ctr: 4.0, cpc: 1.25, conversions: 2400, cvr: 13.3 },
    { keyword: 'gum health vitamins', impressions: 380000, clicks: 15200, ctr: 4.0, cpc: 1.10, conversions: 2050, cvr: 13.5 },
    { keyword: 'denture adhesive cream', impressions: 320000, clicks: 12800, ctr: 4.0, cpc: 0.95, conversions: 1680, cvr: 13.1 },
    { keyword: 'multivitamin supplements', impressions: 520000, clicks: 20800, ctr: 4.0, cpc: 1.35, conversions: 2850, cvr: 13.7 },
    { keyword: 'pain relief gel natural', impressions: 290000, clicks: 11600, ctr: 4.0, cpc: 1.05, conversions: 1520, cvr: 13.1 },
  ];

  // Total spend: €640K, Total sales: €1.75M, ROAS: 2.73x
  const adTypeMetrics = [
    { type: 'Sponsored Products', spend: 256000, sales: 700000, impressions: 4200000, clicks: 65000, roas: 2.73 },
    { type: 'Sponsored Display', spend: 192000, sales: 526000, impressions: 3100000, clicks: 48000, roas: 2.74 },
    { type: 'Sponsored Brands', spend: 128000, sales: 350000, impressions: 4500000, clicks: 68000, roas: 2.73 },
    { type: 'Sponsored Brand Video', spend: 64000, sales: 174000, impressions: 1900000, clicks: 30000, roas: 2.72 },
  ];

  return (
    <div className="advertising-page">
      <AdsFilterBar />
      
      <div className="page-header">
        <div className="page-title-section">
          <Target size={32} className="page-icon" />
          <div>
            <h1 className="page-title">Amazon Advertising</h1>
            <p className="page-subtitle">Comprehensive advertising performance across all ad types</p>
          </div>
        </div>
      </div>

      {/* Top KPIs */}
      <div className="kpi-row">
        <div className="kpi-card-large glass-card">
          <div className="kpi-icon-wrapper" style={{ background: 'rgba(34, 255, 0, 0.1)' }}>
            <DollarSign size={24} color="#22ff00" />
          </div>
          <div className="kpi-content">
            <div className="kpi-label">Total Ad Spend</div>
            <div className="kpi-value">€640K</div>
            <div className="kpi-trend positive">+5.2% vs last month</div>
          </div>
        </div>

        <div className="kpi-card-large glass-card">
          <div className="kpi-icon-wrapper" style={{ background: 'rgba(34, 255, 0, 0.1)' }}>
            <TrendingUp size={24} color="#22ff00" />
          </div>
          <div className="kpi-content">
            <div className="kpi-label">Ad Sales</div>
            <div className="kpi-value">€1.75M</div>
            <div className="kpi-trend positive">+12.8% vs last month</div>
          </div>
        </div>

        <div className="kpi-card-large glass-card">
          <div className="kpi-icon-wrapper" style={{ background: 'rgba(34, 255, 0, 0.1)' }}>
            <Zap size={24} color="#22ff00" />
          </div>
          <div className="kpi-content">
            <div className="kpi-label">ROAS</div>
            <div className="kpi-value">2.73x</div>
            <div className="kpi-trend positive">+0.3x vs last month</div>
          </div>
        </div>

        <div className="kpi-card-large glass-card">
          <div className="kpi-icon-wrapper" style={{ background: 'rgba(34, 255, 0, 0.1)' }}>
            <Eye size={24} color="#22ff00" />
          </div>
          <div className="kpi-content">
            <div className="kpi-label">Total Impressions</div>
            <div className="kpi-value">13.7M</div>
            <div className="kpi-trend positive">+8.5% vs last month</div>
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="chart-section glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 className="section-title" style={{ margin: 0 }}>Spend & Sales Trends</h2>
          <ChartInfoTooltip
            title="Advertising Spend & Sales Trends"
            description="Displays weekly advertising spend trends across all ad types (SP, SD, SB, SBV) to track budget allocation and spending patterns over time."
            kpis={[
              'Weekly Ad Spend by Type (€)',
              'Total Advertising Sales',
              'ROAS by Ad Type',
              'Spend Efficiency Trends'
            ]}
            challenges={[
              'Optimizing spend allocation for maximum ROAS',
              'Managing budget pacing throughout the month',
              'Responding to competitive pressure on bids',
              'Balancing short-term sales with long-term brand building'
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
            <Line type="monotone" dataKey="SP" stroke="#22ff00" strokeWidth={2} name="Sponsored Products" />
            <Line type="monotone" dataKey="SD" stroke="#3b82f6" strokeWidth={2} name="Sponsored Display" />
            <Line type="monotone" dataKey="SB" stroke="#a855f7" strokeWidth={2} name="Sponsored Brands" />
            <Line type="monotone" dataKey="SBV" stroke="#ec4899" strokeWidth={2} name="Sponsored Brand Video" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Ad Type Performance */}
      <div className="section-header">
        <h2 className="section-title">Performance by Ad Type</h2>
      </div>
      <div className="ad-type-grid">
        {adTypeMetrics.map((ad, index) => (
          <div key={index} className="ad-type-card glass-card">
            <h3 className="ad-type-title">{ad.type}</h3>
            <div className="metrics-grid">
              <div className="metric-item">
                <span className="metric-label">Spend</span>
                <span className="metric-value">€{(ad.spend / 1000).toFixed(0)}K</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Sales</span>
                <span className="metric-value">€{(ad.sales / 1000).toFixed(0)}K</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Impressions</span>
                <span className="metric-value">{(ad.impressions / 1000000).toFixed(1)}M</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Clicks</span>
                <span className="metric-value">{(ad.clicks / 1000).toFixed(0)}K</span>
              </div>
              <div className="metric-item highlight">
                <span className="metric-label">ROAS</span>
                <span className="metric-value">{ad.roas}x</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Active Campaigns */}
      <div className="section-header">
        <h2 className="section-title">Active Campaigns</h2>
      </div>
      <div className="table-container glass-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Campaign Name</th>
              <th>Type</th>
              <th>Spend</th>
              <th>Sales</th>
              <th>Impressions</th>
              <th>Clicks</th>
              <th>ROAS</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {campaignData.map((campaign, index) => (
              <tr key={index}>
                <td className="campaign-name">{campaign.name}</td>
                <td><span className="type-badge">{campaign.type}</span></td>
                <td>€{(campaign.spend / 1000).toFixed(1)}K</td>
                <td>€{(campaign.sales / 1000).toFixed(1)}K</td>
                <td>{(campaign.impressions / 1000000).toFixed(1)}M</td>
                <td>{(campaign.clicks / 1000).toFixed(1)}K</td>
                <td className="roas-value">{campaign.roas}x</td>
                <td><span className={`status-badge status-${campaign.status.toLowerCase()}`}>{campaign.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Top Keywords */}
      <div className="section-header">
        <h2 className="section-title">Top Performing Keywords</h2>
      </div>
      <div className="table-container glass-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Keyword</th>
              <th>Impressions</th>
              <th>Clicks</th>
              <th>CTR</th>
              <th>CPC</th>
              <th>Conversions</th>
              <th>CVR</th>
            </tr>
          </thead>
          <tbody>
            {keywordData.map((keyword, index) => (
              <tr key={index}>
                <td className="keyword-text">{keyword.keyword}</td>
                <td>{(keyword.impressions / 1000).toFixed(0)}K</td>
                <td>{(keyword.clicks / 1000).toFixed(1)}K</td>
                <td>{keyword.ctr}%</td>
                <td>€{keyword.cpc}</td>
                <td>{keyword.conversions.toLocaleString()}</td>
                <td>{keyword.cvr}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdvertisingPage;
