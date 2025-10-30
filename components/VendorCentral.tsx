import { Package, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ChartInfoTooltip from './ChartInfoTooltip';
import '@/styles/ModuleCard.css';

const VendorCentral = () => {
  const performanceData = [
    { month: 'Jan', revenue: 180000, units: 3200 },
    { month: 'Feb', revenue: 220000, units: 3800 },
    { month: 'Mar', revenue: 195000, units: 3500 },
    { month: 'Apr', revenue: 245000, units: 4200 },
    { month: 'May', revenue: 280000, units: 4800 },
    { month: 'Jun', revenue: 310000, units: 5200 },
  ];

  const shipments = [
    { id: 'SH-2024-001', status: 'Delivered', items: 1250, date: '2024-10-01' },
    { id: 'SH-2024-002', status: 'In Transit', items: 890, date: '2024-10-02' },
    { id: 'SH-2024-003', status: 'Processing', items: 1100, date: '2024-10-02' },
  ];

  return (
    <div className="module-card glass-card">
      <div className="module-header">
        <div className="module-title">
          <Package className="module-icon" size={24} />
          <h2>Amazon Vendor Central</h2>
        </div>
        <div className="module-badge">
          <span className="status-dot active"></span>
          Active
        </div>
      </div>

      <div className="module-content">
        {/* KPIs */}
        <div className="kpi-grid">
          <div className="kpi-card">
            <div className="kpi-label">Monthly Revenue</div>
            <div className="kpi-value">€310K</div>
            <div className="kpi-trend positive">
              <TrendingUp size={16} />
              +10.7%
            </div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">Units Shipped</div>
            <div className="kpi-value">5.2K</div>
            <div className="kpi-trend positive">
              <TrendingUp size={16} />
              +8.3%
            </div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">Open POs</div>
            <div className="kpi-value">12</div>
            <div className="kpi-trend neutral">
              <AlertCircle size={16} />
              Pending
            </div>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="chart-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 className="chart-title" style={{ margin: 0 }}>Revenue Performance</h3>
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
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={performanceData}>
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

        {/* Recent Shipments */}
        <div className="shipments-section">
          <h3 className="section-title">Recent Shipments</h3>
          <div className="shipments-list">
            {shipments.map((shipment) => (
              <div key={shipment.id} className="shipment-item">
                <div className="shipment-info">
                  <div className="shipment-id">{shipment.id}</div>
                  <div className="shipment-meta">{shipment.items} items • {shipment.date}</div>
                </div>
                <div className={`shipment-status status-${shipment.status.toLowerCase().replace(' ', '-')}`}>
                  {shipment.status === 'Delivered' && <CheckCircle size={16} />}
                  {shipment.status === 'In Transit' && <TrendingUp size={16} />}
                  {shipment.status === 'Processing' && <AlertCircle size={16} />}
                  {shipment.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorCentral;
