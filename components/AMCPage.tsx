import { Brain, Database, TrendingUp, Users, Zap, Code, Play, Copy, Check } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useState } from 'react';
import ChartInfoTooltip from './ChartInfoTooltip';
import FilterBar from './FilterBar';
import '@/styles/AMCPage.css';

const AMCPage = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const pathToConversion = [
    { name: 'Display → Purchase', value: 35, color: '#22ff00' },
    { name: 'Search → Purchase', value: 28, color: '#3b82f6' },
    { name: 'Video → Purchase', value: 18, color: '#a855f7' },
    { name: 'Multi-Touch', value: 19, color: '#ec4899' },
  ];

  const audienceComposition = [
    { segment: 'New-to-Brand', percentage: 34, trend: '+5.2%', value: 425000 },
    { segment: 'Repeat Purchasers', percentage: 28, trend: '+3.8%', value: 350000 },
    { segment: 'High-Value Customers', percentage: 18, trend: '+2.1%', value: 225000 },
    { segment: 'At-Risk Customers', percentage: 12, trend: '-1.5%', value: 150000 },
    { segment: 'Lapsed Customers', percentage: 8, trend: '-0.8%', value: 100000 },
  ];

  const touchpointData = [
    { touchpoints: '1-2', conversions: 2800, avgOrderValue: 28.50 },
    { touchpoints: '3-4', conversions: 4200, avgOrderValue: 32.80 },
    { touchpoints: '5-7', conversions: 5800, avgOrderValue: 38.20 },
    { touchpoints: '8-10', conversions: 4500, avgOrderValue: 42.50 },
    { touchpoints: '11+', conversions: 2900, avgOrderValue: 45.80 },
  ];

  const sqlTemplates = [
    {
      title: 'New-to-Brand Customers',
      description: 'Identify customers who made their first purchase in the last 30 days',
      category: 'Audience Analysis',
      sql: `SELECT 
  user_id,
  first_purchase_date,
  product_category,
  order_value
FROM user_purchases
WHERE first_purchase_date >= CURRENT_DATE - INTERVAL '30' DAY
  AND purchase_count = 1
GROUP BY user_id
ORDER BY first_purchase_date DESC;`
    },
    {
      title: 'Multi-Touch Attribution',
      description: 'Analyze the customer journey with multiple touchpoints before conversion',
      category: 'Attribution',
      sql: `SELECT 
  user_id,
  COUNT(DISTINCT touchpoint_type) as touchpoint_count,
  LISTAGG(touchpoint_type, ' → ') as journey_path,
  conversion_date,
  revenue
FROM user_touchpoints
WHERE conversion_date >= CURRENT_DATE - INTERVAL '90' DAY
GROUP BY user_id, conversion_date, revenue
HAVING COUNT(DISTINCT touchpoint_type) >= 3
ORDER BY touchpoint_count DESC;`
    },
    {
      title: 'High-Value Customer Segments',
      description: 'Identify customers with lifetime value above €500',
      category: 'Segmentation',
      sql: `SELECT 
  user_id,
  SUM(order_value) as lifetime_value,
  COUNT(order_id) as purchase_frequency,
  AVG(order_value) as avg_order_value,
  MAX(order_date) as last_purchase_date
FROM orders
GROUP BY user_id
HAVING SUM(order_value) > 500
ORDER BY lifetime_value DESC;`
    },
    {
      title: 'Cross-Device Journey Analysis',
      description: 'Track customer interactions across multiple devices',
      category: 'Device Analysis',
      sql: `SELECT 
  user_id,
  COUNT(DISTINCT device_type) as device_count,
  LISTAGG(DISTINCT device_type, ', ') as devices_used,
  COUNT(session_id) as total_sessions,
  conversion_flag
FROM user_sessions
WHERE session_date >= CURRENT_DATE - INTERVAL '60' DAY
GROUP BY user_id, conversion_flag
HAVING COUNT(DISTINCT device_type) > 1
ORDER BY device_count DESC;`
    },
    {
      title: 'Optimal Frequency Analysis',
      description: 'Determine the optimal ad exposure frequency for conversions',
      category: 'Frequency',
      sql: `SELECT 
  CASE 
    WHEN impression_count BETWEEN 1 AND 3 THEN '1-3'
    WHEN impression_count BETWEEN 4 AND 7 THEN '4-7'
    WHEN impression_count BETWEEN 8 AND 12 THEN '8-12'
    ELSE '13+'
  END as frequency_bucket,
  COUNT(DISTINCT user_id) as users,
  SUM(conversion_flag) as conversions,
  ROUND(SUM(conversion_flag) * 100.0 / COUNT(DISTINCT user_id), 2) as cvr
FROM user_impressions
WHERE impression_date >= CURRENT_DATE - INTERVAL '30' DAY
GROUP BY frequency_bucket
ORDER BY frequency_bucket;`
    },
    {
      title: 'Audience Overlap Analysis',
      description: 'Find overlap between different campaign audiences',
      category: 'Audience Analysis',
      sql: `SELECT 
  a.campaign_id as campaign_a,
  b.campaign_id as campaign_b,
  COUNT(DISTINCT a.user_id) as overlap_count,
  ROUND(COUNT(DISTINCT a.user_id) * 100.0 / 
    (SELECT COUNT(DISTINCT user_id) FROM campaign_audience WHERE campaign_id = a.campaign_id), 2) as overlap_percentage
FROM campaign_audience a
INNER JOIN campaign_audience b 
  ON a.user_id = b.user_id 
  AND a.campaign_id < b.campaign_id
GROUP BY a.campaign_id, b.campaign_id
HAVING COUNT(DISTINCT a.user_id) > 1000
ORDER BY overlap_count DESC;`
    },
    {
      title: 'Time to Conversion',
      description: 'Calculate average time from first touchpoint to conversion',
      category: 'Attribution',
      sql: `SELECT 
  product_category,
  AVG(DATEDIFF(day, first_touchpoint_date, conversion_date)) as avg_days_to_conversion,
  PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY DATEDIFF(day, first_touchpoint_date, conversion_date)) as median_days,
  COUNT(DISTINCT user_id) as converters
FROM (
  SELECT 
    user_id,
    product_category,
    MIN(touchpoint_date) as first_touchpoint_date,
    MAX(CASE WHEN conversion_flag = 1 THEN touchpoint_date END) as conversion_date
  FROM user_journey
  WHERE touchpoint_date >= CURRENT_DATE - INTERVAL '180' DAY
  GROUP BY user_id, product_category
  HAVING conversion_date IS NOT NULL
)
GROUP BY product_category
ORDER BY avg_days_to_conversion;`
    },
    {
      title: 'Incremental Reach Analysis',
      description: 'Measure incremental reach from DSP campaigns',
      category: 'Reach Analysis',
      sql: `SELECT 
  campaign_type,
  COUNT(DISTINCT CASE WHEN dsp_exposed = 1 AND sponsored_exposed = 0 THEN user_id END) as dsp_only,
  COUNT(DISTINCT CASE WHEN dsp_exposed = 0 AND sponsored_exposed = 1 THEN user_id END) as sponsored_only,
  COUNT(DISTINCT CASE WHEN dsp_exposed = 1 AND sponsored_exposed = 1 THEN user_id END) as both,
  COUNT(DISTINCT user_id) as total_reach
FROM user_exposure
WHERE exposure_date >= CURRENT_DATE - INTERVAL '30' DAY
GROUP BY campaign_type;`
    }
  ];

  const insights = [
    {
      title: 'Cross-Device Journey',
      description: '68% of conversions involve multiple devices, with mobile being the primary research device',
      impact: 'High',
      icon: <Zap size={18} />
    },
    {
      title: 'Optimal Frequency',
      description: '5-7 ad exposures yield the highest conversion rate at 13.8%',
      impact: 'High',
      icon: <TrendingUp size={18} />
    },
    {
      title: 'Audience Overlap',
      description: '42% overlap between SP and DSP audiences, indicating opportunity for frequency capping',
      impact: 'Medium',
      icon: <Users size={18} />
    },
    {
      title: 'Time to Conversion',
      description: 'Average 14 days from first touchpoint to conversion for health & wellness products',
      impact: 'Medium',
      icon: <TrendingUp size={18} />
    },
  ];

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="amc-page">
      <FilterBar />
      
      <div className="page-header">
        <div className="page-title-section">
          <Brain size={32} className="page-icon" />
          <div>
            <h1 className="page-title">Amazon Marketing Cloud</h1>
            <p className="page-subtitle">Advanced analytics, audience insights, and SQL query templates</p>
          </div>
        </div>
      </div>

      {/* Top KPIs */}
      <div className="kpi-row">
        <div className="kpi-card-large glass-card">
          <div className="kpi-icon-wrapper" style={{ background: 'rgba(34, 255, 0, 0.1)' }}>
            <Database size={24} color="#22ff00" />
          </div>
          <div className="kpi-content">
            <div className="kpi-label">Data Points Analyzed</div>
            <div className="kpi-value">24.8M</div>
            <div className="kpi-trend positive">Real-time processing</div>
          </div>
        </div>

        <div className="kpi-card-large glass-card">
          <div className="kpi-icon-wrapper" style={{ background: 'rgba(34, 255, 0, 0.1)' }}>
            <Users size={24} color="#22ff00" />
          </div>
          <div className="kpi-content">
            <div className="kpi-label">Active Segments</div>
            <div className="kpi-value">68</div>
            <div className="kpi-trend positive">+12 new segments</div>
          </div>
        </div>

        <div className="kpi-card-large glass-card">
          <div className="kpi-icon-wrapper" style={{ background: 'rgba(34, 255, 0, 0.1)' }}>
            <TrendingUp size={24} color="#22ff00" />
          </div>
          <div className="kpi-content">
            <div className="kpi-label">Avg. Path Length</div>
            <div className="kpi-value">4.2</div>
            <div className="kpi-trend neutral">Stable</div>
          </div>
        </div>

        <div className="kpi-card-large glass-card">
          <div className="kpi-icon-wrapper" style={{ background: 'rgba(34, 255, 0, 0.1)' }}>
            <Zap size={24} color="#22ff00" />
          </div>
          <div className="kpi-content">
            <div className="kpi-label">Query Executions</div>
            <div className="kpi-value">1,247</div>
            <div className="kpi-trend positive">This month</div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="charts-row">
        <div className="chart-section glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 className="section-title" style={{ margin: 0 }}>Path to Conversion Analysis</h2>
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
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pathToConversion}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
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

        <div className="chart-section glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 className="section-title" style={{ margin: 0 }}>Conversions by Touchpoint Frequency</h2>
            <ChartInfoTooltip
              title="Conversions by Touchpoint Frequency"
              description="Shows the relationship between the number of advertising touchpoints and conversion rates, helping identify the optimal frequency for ad exposure."
              kpis={[
                'Conversions by Frequency Bucket',
                'Average Order Value by Frequency',
                'Optimal Frequency Range',
                'Diminishing Returns Threshold'
              ]}
              challenges={[
                'Finding the balance between frequency and ad fatigue',
                'Avoiding over-exposure that wastes budget',
                'Determining optimal frequency caps by audience',
                'Measuring incremental value of each touchpoint'
              ]}
            />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={touchpointData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
              <XAxis dataKey="touchpoints" stroke="#cccccc" fontSize={12} />
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
              <Bar dataKey="conversions" fill="#22ff00" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Key Insights */}
      <div className="section-header">
        <h2 className="section-title">
          <Brain size={20} />
          Key Insights
        </h2>
      </div>
      <div className="insights-grid">
        {insights.map((insight, index) => (
          <div key={index} className="insight-card glass-card">
            <div className="insight-icon-wrapper">{insight.icon}</div>
            <div className="insight-content">
              <h3 className="insight-title">{insight.title}</h3>
              <p className="insight-description">{insight.description}</p>
            </div>
            <div className={`impact-badge impact-${insight.impact.toLowerCase()}`}>
              {insight.impact} Impact
            </div>
          </div>
        ))}
      </div>

      {/* Audience Composition */}
      <div className="section-header">
        <h2 className="section-title">Audience Composition</h2>
      </div>
      <div className="table-container glass-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Segment</th>
              <th>Percentage</th>
              <th>Users</th>
              <th>Trend</th>
            </tr>
          </thead>
          <tbody>
            {audienceComposition.map((segment, index) => (
              <tr key={index}>
                <td className="segment-name">{segment.segment}</td>
                <td><span className="percentage-value">{segment.percentage}%</span></td>
                <td>{segment.value.toLocaleString()}</td>
                <td className={segment.trend.startsWith('+') ? 'trend-positive' : 'trend-negative'}>
                  {segment.trend}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* SQL Templates */}
      <div className="section-header">
        <h2 className="section-title">
          <Code size={20} />
          SQL Query Templates
        </h2>
        <p className="section-description">Ready-to-use SQL templates for common AMC analyses</p>
      </div>
      <div className="sql-templates-grid">
        {sqlTemplates.map((template, index) => (
          <div key={index} className="sql-template-card glass-card">
            <div className="template-header">
              <div>
                <h3 className="template-title">{template.title}</h3>
                <span className="template-category">{template.category}</span>
              </div>
              <div className="template-actions">
                <button className="action-btn" title="Copy SQL">
                  {copiedIndex === index ? (
                    <Check size={18} color="#22ff00" />
                  ) : (
                    <Copy size={18} onClick={() => copyToClipboard(template.sql, index)} />
                  )}
                </button>
                <button className="action-btn run-btn" title="Run Query">
                  <Play size={18} />
                </button>
              </div>
            </div>
            <p className="template-description">{template.description}</p>
            <div className="sql-code-block">
              <code>{template.sql}</code>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AMCPage;
