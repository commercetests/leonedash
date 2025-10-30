import { Lightbulb, TrendingUp, AlertCircle, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import '@/styles/InsightsPage.css';

const InsightsPage = () => {
  const insights = [
    {
      id: 1,
      type: 'opportunity',
      priority: 'high',
      title: 'Sensodyne showing 22% growth in Germany',
      description: 'Sensodyne products are experiencing exceptional growth in the German market. Consider increasing ad spend by 15-20% to capitalize on this momentum.',
      impact: 'Revenue increase potential: €45K/month',
      action: 'Increase budget allocation',
      icon: TrendingUp,
      color: '#22ff00'
    },
    {
      id: 2,
      type: 'alert',
      priority: 'high',
      title: 'Parodontax conversion rate declining',
      description: 'Parodontax products showing a 5% decrease in conversion rate over the past 2 weeks. Product page optimization recommended.',
      impact: 'Potential revenue loss: €12K/month',
      action: 'Optimize product listings',
      icon: AlertCircle,
      color: '#ef4444'
    },
    {
      id: 3,
      type: 'opportunity',
      priority: 'medium',
      title: 'Video ads outperforming display by 35%',
      description: 'Video advertising formats are showing significantly higher engagement and conversion rates compared to display ads.',
      impact: 'ROAS improvement potential: +0.8x',
      action: 'Shift budget to video',
      icon: Sparkles,
      color: '#3b82f6'
    },
    {
      id: 4,
      type: 'success',
      priority: 'low',
      title: 'Centrum achieving target ROAS',
      description: 'Centrum multivitamin campaigns are consistently meeting and exceeding the 2.5x ROAS target across all markets.',
      impact: 'On track for Q4 goals',
      action: 'Maintain current strategy',
      icon: CheckCircle,
      color: '#22ff00'
    },
    {
      id: 5,
      type: 'opportunity',
      priority: 'medium',
      title: 'Spain market underutilized',
      description: 'Spanish market showing lower ad spend compared to market size. Opportunity to expand presence and capture market share.',
      impact: 'Growth potential: €28K/month',
      action: 'Increase Spain investment',
      icon: TrendingUp,
      color: '#a855f7'
    },
    {
      id: 6,
      type: 'alert',
      priority: 'medium',
      title: 'High cart abandonment on mobile',
      description: 'Mobile users showing 38% cart abandonment rate, 12% higher than desktop. Mobile checkout experience needs improvement.',
      impact: 'Recovery potential: €18K/month',
      action: 'Optimize mobile checkout',
      icon: AlertCircle,
      color: '#f59e0b'
    }
  ];

  const trendData = [
    { month: 'May', revenue: 1.8, target: 2.0 },
    { month: 'Jun', revenue: 1.9, target: 2.0 },
    { month: 'Jul', revenue: 2.1, target: 2.0 },
    { month: 'Aug', revenue: 2.2, target: 2.0 },
    { month: 'Sep', revenue: 2.3, target: 2.0 },
    { month: 'Oct', revenue: 2.4, target: 2.0 }
  ];

  const categoryPerformance = [
    { category: 'Oral Care', score: 92 },
    { category: 'Pain Relief', score: 78 },
    { category: 'Vitamins', score: 88 },
    { category: 'Digestive', score: 71 }
  ];

  const aiRecommendations = [
    {
      title: 'Optimize Bid Strategy',
      description: 'AI suggests increasing bids for "sensitive teeth" keywords by 12% during evening hours',
      confidence: 94
    },
    {
      title: 'Audience Expansion',
      description: 'Similar audiences to your top converters identified in France and Italy markets',
      confidence: 87
    },
    {
      title: 'Creative Refresh',
      description: 'Product images with lifestyle context showing 28% higher CTR than plain product shots',
      confidence: 91
    }
  ];

  return (
    <div className="insights-page">
      <div className="insights-header">
        <div>
          <h1>
            <Lightbulb size={32} className="header-icon" />
            Insights
            <span className="new-badge">New</span>
          </h1>
          <p className="insights-subtitle">AI-powered recommendations and actionable insights</p>
        </div>
      </div>

      {/* Key Insights Grid */}
      <div className="insights-grid">
        {insights.map(insight => {
          const Icon = insight.icon;
          return (
            <div key={insight.id} className={`insight-card glass-card ${insight.type}`}>
              <div className="insight-header">
                <div className="insight-icon" style={{ backgroundColor: `${insight.color}20`, color: insight.color }}>
                  <Icon size={24} />
                </div>
                <span className={`priority-badge ${insight.priority}`}>
                  {insight.priority} priority
                </span>
              </div>
              <h3 className="insight-title">{insight.title}</h3>
              <p className="insight-description">{insight.description}</p>
              <div className="insight-impact">{insight.impact}</div>
              <button className="insight-action">
                {insight.action}
                <ArrowRight size={16} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Performance Trends */}
      <div className="insights-row">
        <div className="chart-section glass-card">
          <h2 className="section-title">Revenue Trend vs Target</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(20, 20, 20, 0.95)', 
                  border: '1px solid rgba(34, 255, 0, 0.2)',
                  borderRadius: '8px'
                }} 
              />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#22ff00" strokeWidth={3} name="Actual Revenue (M€)" />
              <Line type="monotone" dataKey="target" stroke="#888" strokeWidth={2} strokeDasharray="5 5" name="Target" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-section glass-card">
          <h2 className="section-title">Category Performance Score</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryPerformance} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis type="number" stroke="#888" domain={[0, 100]} />
              <YAxis dataKey="category" type="category" stroke="#888" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(20, 20, 20, 0.95)', 
                  border: '1px solid rgba(34, 255, 0, 0.2)',
                  borderRadius: '8px'
                }} 
              />
              <Bar dataKey="score" fill="#22ff00" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="ai-section glass-card">
        <div className="ai-header">
          <Sparkles size={24} className="ai-icon" />
          <h2 className="section-title">AI-Powered Recommendations</h2>
        </div>
        <div className="ai-recommendations">
          {aiRecommendations.map((rec, index) => (
            <div key={index} className="ai-recommendation">
              <div className="ai-rec-content">
                <h4>{rec.title}</h4>
                <p>{rec.description}</p>
              </div>
              <div className="ai-confidence">
                <div className="confidence-label">Confidence</div>
                <div className="confidence-value">{rec.confidence}%</div>
                <div className="confidence-bar">
                  <div className="confidence-fill" style={{ width: `${rec.confidence}%` }}></div>
                </div>
              </div>
              <button className="btn-apply">Apply</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InsightsPage;
