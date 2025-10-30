import { Target, TrendingUp, Eye, MousePointer } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import ChartInfoTooltip from './ChartInfoTooltip';
import '@/styles/ModuleCard.css';

const Advertising = () => {
  const adTypeData = [
    { type: 'SP', spend: 45000, sales: 225000, impressions: 1200000, clicks: 18000 },
    { type: 'SD', spend: 32000, sales: 144000, impressions: 950000, clicks: 12500 },
    { type: 'SB', spend: 28000, sales: 168000, impressions: 850000, clicks: 14200 },
    { type: 'SBV', spend: 18000, sales: 108000, impressions: 620000, clicks: 9800 },
  ];

  const performanceData = [
    { week: 'W1', SP: 42000, SD: 28000, SB: 25000, SBV: 15000 },
    { week: 'W2', SP: 45000, SD: 30000, SB: 27000, SBV: 16000 },
    { week: 'W3', SP: 43000, SD: 31000, SB: 26000, SBV: 17000 },
    { week: 'W4', SP: 48000, SD: 33000, SB: 29000, SBV: 19000 },
  ];

  const totalSpend = adTypeData.reduce((sum, ad) => sum + ad.spend, 0);
  const totalSales = adTypeData.reduce((sum, ad) => sum + ad.sales, 0);
  const roas = (totalSales / totalSpend).toFixed(2);

  return (
    <div className="module-card glass-card">
      <div className="module-header">
        <div className="module-title">
          <Target className="module-icon" size={24} />
          <h2>Amazon Advertising</h2>
        </div>
        <div className="module-badge">
          <span className="status-dot active"></span>
          All Campaigns Active
        </div>
      </div>

      <div className="module-content">
        {/* Overall KPIs */}
        <div className="kpi-grid">
          <div className="kpi-card">
            <div className="kpi-label">Total Ad Spend</div>
            <div className="kpi-value">€{(totalSpend / 1000).toFixed(0)}K</div>
            <div className="kpi-trend positive">
              <TrendingUp size={16} />
              +5.2%
            </div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">Ad Sales</div>
            <div className="kpi-value">€{(totalSales / 1000).toFixed(0)}K</div>
            <div className="kpi-trend positive">
              <TrendingUp size={16} />
              +12.8%
            </div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">ROAS</div>
            <div className="kpi-value">{roas}x</div>
            <div className="kpi-trend positive">
              <TrendingUp size={16} />
              +0.4x
            </div>
          </div>
        </div>

        {/* Ad Type Performance */}
        <div className="ad-types-section">
          <h3 className="section-title">Performance by Ad Type</h3>
          <div className="ad-types-grid">
            {adTypeData.map((ad) => (
              <div key={ad.type} className="ad-type-card">
                <div className="ad-type-header">
                  <div className="ad-type-name">
                    {ad.type === 'SP' && 'Sponsored Products'}
                    {ad.type === 'SD' && 'Sponsored Display'}
                    {ad.type === 'SB' && 'Sponsored Brands'}
                    {ad.type === 'SBV' && 'Sponsored Brand Video'}
                  </div>
                  <div className="ad-type-badge">{ad.type}</div>
                </div>
                <div className="ad-type-metrics">
                  <div className="metric">
                    <div className="metric-icon">
                      <Eye size={14} />
                    </div>
                    <div className="metric-info">
                      <div className="metric-label">Impressions</div>
                      <div className="metric-value">{(ad.impressions / 1000).toFixed(0)}K</div>
                    </div>
                  </div>
                  <div className="metric">
                    <div className="metric-icon">
                      <MousePointer size={14} />
                    </div>
                    <div className="metric-info">
                      <div className="metric-label">Clicks</div>
                      <div className="metric-value">{(ad.clicks / 1000).toFixed(1)}K</div>
                    </div>
                  </div>
                  <div className="metric">
                    <div className="metric-icon">
                      <Target size={14} />
                    </div>
                    <div className="metric-info">
                      <div className="metric-label">ROAS</div>
                      <div className="metric-value">{(ad.sales / ad.spend).toFixed(1)}x</div>
                    </div>
                  </div>
                </div>
                <div className="ad-type-spend">
                  Spend: €{(ad.spend / 1000).toFixed(0)}K | Sales: €{(ad.sales / 1000).toFixed(0)}K
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Trend Chart */}
        <div className="chart-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 className="chart-title" style={{ margin: 0 }}>Weekly Spend by Ad Type</h3>
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
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={performanceData}>
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
      </div>
    </div>
  );
};

export default Advertising;
