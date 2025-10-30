import { TrendingUp, Users, ShoppingCart, DollarSign, ArrowUp, ArrowDown } from 'lucide-react';
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import '@/styles/AnalyticsPage.css';

const AnalyticsPage = () => {
  // Sample data
  const trafficData = [
    { date: 'Oct 1', sessions: 45000, pageViews: 125000, bounceRate: 42 },
    { date: 'Oct 5', sessions: 52000, pageViews: 145000, bounceRate: 39 },
    { date: 'Oct 10', sessions: 48000, pageViews: 135000, bounceRate: 41 },
    { date: 'Oct 15', sessions: 58000, pageViews: 165000, bounceRate: 37 },
    { date: 'Oct 20', sessions: 62000, pageViews: 178000, bounceRate: 35 },
    { date: 'Oct 25', sessions: 67000, pageViews: 192000, bounceRate: 33 }
  ];

  const conversionData = [
    { category: 'Oral Care', rate: 4.2, revenue: 285000 },
    { category: 'Pain Relief', rate: 3.8, revenue: 245000 },
    { category: 'Vitamins', rate: 5.1, revenue: 320000 },
    { category: 'Digestive', rate: 3.5, revenue: 198000 }
  ];

  const customerSegments = [
    { segment: 'New Customers', value: 35, change: 12 },
    { segment: 'Returning', value: 45, change: 8 },
    { segment: 'Loyal', value: 20, change: -3 }
  ];

  const topProducts = [
    { name: 'Sensodyne Repair & Protect', sales: 15420, revenue: '€92.5K', growth: 15 },
    { name: 'Centrum Multivitamin', sales: 12850, revenue: '€77.1K', growth: 22 },
    { name: 'Voltaren Natura', sales: 11200, revenue: '€89.6K', growth: 8 },
    { name: 'Parodontax Complete', sales: 9800, revenue: '€58.8K', growth: -5 },
    { name: 'Corega Denture Care', sales: 8500, revenue: '€51.0K', growth: 12 }
  ];

  const metrics = [
    {
      title: 'Total Sessions',
      value: '342K',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: '#22ff00'
    },
    {
      title: 'Conversion Rate',
      value: '4.2%',
      change: '+0.8%',
      trend: 'up',
      icon: TrendingUp,
      color: '#3b82f6'
    },
    {
      title: 'Avg Order Value',
      value: '€67.50',
      change: '+5.2%',
      trend: 'up',
      icon: DollarSign,
      color: '#a855f7'
    },
    {
      title: 'Cart Abandonment',
      value: '28.3%',
      change: '-3.1%',
      trend: 'down',
      icon: ShoppingCart,
      color: '#ec4899'
    }
  ];

  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <div>
          <h1>Analytics</h1>
          <p className="analytics-subtitle">Deep dive into customer behavior and performance metrics</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="metrics-grid">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const isPositive = metric.trend === 'up';
          return (
            <div key={index} className="metric-card glass-card">
              <div className="metric-header">
                <div className="metric-icon" style={{ backgroundColor: `${metric.color}20`, color: metric.color }}>
                  <Icon size={24} />
                </div>
                <div className={`metric-change ${isPositive ? 'positive' : 'negative'}`}>
                  {isPositive ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                  {metric.change}
                </div>
              </div>
              <div className="metric-value">{metric.value}</div>
              <div className="metric-title">{metric.title}</div>
            </div>
          );
        })}
      </div>

      {/* Traffic Overview */}
      <div className="chart-section glass-card">
        <h2 className="chart-title">Traffic Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={trafficData}>
            <defs>
              <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22ff00" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#22ff00" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorPageViews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="date" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(20, 20, 20, 0.95)', 
                border: '1px solid rgba(34, 255, 0, 0.2)',
                borderRadius: '8px'
              }} 
            />
            <Legend />
            <Area type="monotone" dataKey="sessions" stroke="#22ff00" fillOpacity={1} fill="url(#colorSessions)" />
            <Area type="monotone" dataKey="pageViews" stroke="#3b82f6" fillOpacity={1} fill="url(#colorPageViews)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="analytics-grid">
        {/* Conversion by Category */}
        <div className="chart-section glass-card">
          <h2 className="chart-title">Conversion by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={conversionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="category" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(20, 20, 20, 0.95)', 
                  border: '1px solid rgba(34, 255, 0, 0.2)',
                  borderRadius: '8px'
                }} 
              />
              <Legend />
              <Bar dataKey="rate" fill="#22ff00" name="Conversion Rate %" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Customer Segments */}
        <div className="segments-section glass-card">
          <h2 className="chart-title">Customer Segments</h2>
          <div className="segments-list">
            {customerSegments.map((segment, index) => (
              <div key={index} className="segment-item">
                <div className="segment-info">
                  <div className="segment-name">{segment.segment}</div>
                  <div className="segment-value">{segment.value}%</div>
                </div>
                <div className="segment-bar">
                  <div className="segment-fill" style={{ width: `${segment.value}%` }}></div>
                </div>
                <div className={`segment-change ${segment.change >= 0 ? 'positive' : 'negative'}`}>
                  {segment.change >= 0 ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                  {Math.abs(segment.change)}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="top-products-section glass-card">
        <h2 className="chart-title">Top Performing Products</h2>
        <div className="products-table">
          <div className="table-header">
            <div>Product</div>
            <div>Sales</div>
            <div>Revenue</div>
            <div>Growth</div>
          </div>
          {topProducts.map((product, index) => (
            <div key={index} className="table-row">
              <div className="product-name">
                <span className="product-rank">{index + 1}</span>
                {product.name}
              </div>
              <div>{product.sales.toLocaleString()}</div>
              <div className="revenue">{product.revenue}</div>
              <div className={`growth ${product.growth >= 0 ? 'positive' : 'negative'}`}>
                {product.growth >= 0 ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                {Math.abs(product.growth)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
