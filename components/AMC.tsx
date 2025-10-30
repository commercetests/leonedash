import { Brain, Database, TrendingUp, Users, Zap } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import ChartInfoTooltip from './ChartInfoTooltip';
import '@/styles/ModuleCard.css';

const AMC = () => {
  const pathToConversion = [
    { name: 'Display → Purchase', value: 35, color: '#22ff00' },
    { name: 'Search → Purchase', value: 28, color: '#3b82f6' },
    { name: 'Video → Purchase', value: 18, color: '#a855f7' },
    { name: 'Multi-Touch', value: 19, color: '#ec4899' },
  ];

  const insights = [
    {
      title: 'Cross-Device Journey',
      description: '68% of conversions involve multiple devices',
      impact: 'High',
      icon: <Zap size={18} />
    },
    {
      title: 'Optimal Frequency',
      description: '5-7 ad exposures yield highest conversion rate',
      impact: 'High',
      icon: <TrendingUp size={18} />
    },
    {
      title: 'Audience Overlap',
      description: '42% overlap between SP and DSP audiences',
      impact: 'Medium',
      icon: <Users size={18} />
    },
  ];

  const audienceInsights = [
    { metric: 'New-to-Brand', value: '34%', trend: '+5.2%' },
    { metric: 'Repeat Purchasers', value: '28%', trend: '+3.8%' },
    { metric: 'High-Value Customers', value: '18%', trend: '+2.1%' },
    { metric: 'At-Risk Customers', value: '12%', trend: '-1.5%' },
  ];

  return (
    <div className="module-card glass-card">
      <div className="module-header">
        <div className="module-title">
          <Brain className="module-icon" size={24} />
          <h2>Amazon Marketing Cloud</h2>
        </div>
        <div className="module-badge">
          <span className="status-dot active"></span>
          Analytics Active
        </div>
      </div>

      <div className="module-content">
        {/* AMC KPIs */}
        <div className="kpi-grid">
          <div className="kpi-card">
            <div className="kpi-label">Data Points Analyzed</div>
            <div className="kpi-value">12.4M</div>
            <div className="kpi-trend positive">
              <Database size={16} />
              Real-time
            </div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">Audience Segments</div>
            <div className="kpi-value">48</div>
            <div className="kpi-trend positive">
              <TrendingUp size={16} />
              +6 new
            </div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">Avg. Path Length</div>
            <div className="kpi-value">4.2</div>
            <div className="kpi-trend neutral">
              <TrendingUp size={16} />
              Stable
            </div>
          </div>
        </div>

        {/* Path to Conversion */}
        <div className="chart-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 className="chart-title" style={{ margin: 0 }}>Path to Conversion Analysis</h3>
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
          <ResponsiveContainer width="100%" height={220}>
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

        {/* Key Insights */}
        <div className="insights-section">
          <h3 className="section-title">
            <Brain size={18} />
            Key Insights
          </h3>
          <div className="insights-list">
            {insights.map((insight, index) => (
              <div key={index} className="insight-card">
                <div className="insight-icon">{insight.icon}</div>
                <div className="insight-content">
                  <div className="insight-title">{insight.title}</div>
                  <div className="insight-description">{insight.description}</div>
                </div>
                <div className={`impact-badge impact-${insight.impact.toLowerCase()}`}>
                  {insight.impact} Impact
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Audience Breakdown */}
        <div className="audience-breakdown">
          <h3 className="section-title">Audience Composition</h3>
          <div className="audience-metrics-grid">
            {audienceInsights.map((item, index) => (
              <div key={index} className="audience-metric-card">
                <div className="audience-metric-label">{item.metric}</div>
                <div className="audience-metric-value">{item.value}</div>
                <div className={`audience-metric-trend ${item.trend.startsWith('+') ? 'positive' : 'negative'}`}>
                  {item.trend}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AMC;
