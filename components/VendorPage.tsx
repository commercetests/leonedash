import { Package, AlertCircle, CheckCircle, Truck, DollarSign, Box } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import ChartInfoTooltip from './ChartInfoTooltip';
import VendorFilterBar from './VendorFilterBar';
import '@/styles/VendorPage.css';

const VendorPage = () => {
  const performanceData = [
    { month: 'Jan', revenue: 180000, units: 3200, orders: 2400 },
    { month: 'Feb', revenue: 220000, units: 3800, orders: 2850 },
    { month: 'Mar', revenue: 195000, units: 3500, orders: 2600 },
    { month: 'Apr', revenue: 245000, units: 4200, orders: 3100 },
    { month: 'May', revenue: 280000, units: 4800, orders: 3550 },
    { month: 'Jun', revenue: 310000, units: 5200, orders: 3850 },
  ];

  const categoryPerformance = [
    { category: 'Oral Care', revenue: 125000, units: 2100, growth: 12.5 },
    { category: 'Vitamins', revenue: 98000, units: 1650, growth: 15.8 },
    { category: 'Pain Relief', revenue: 87000, units: 1450, growth: 8.3 },
  ];

  const shipments = [
    { id: 'SH-2024-001', status: 'Delivered', items: 1250, date: '2024-10-01', destination: 'FC-DE-01', carrier: 'DHL' },
    { id: 'SH-2024-002', status: 'In Transit', items: 890, date: '2024-10-02', destination: 'FC-FR-02', carrier: 'UPS' },
    { id: 'SH-2024-003', status: 'Processing', items: 1100, date: '2024-10-02', destination: 'FC-IT-01', carrier: 'DHL' },
    { id: 'SH-2024-004', status: 'Delivered', items: 1450, date: '2024-09-30', destination: 'FC-ES-01', carrier: 'FedEx' },
    { id: 'SH-2024-005', status: 'In Transit', items: 780, date: '2024-10-01', destination: 'FC-UK-03', carrier: 'DHL' },
    { id: 'SH-2024-006', status: 'Processing', items: 920, date: '2024-10-03', destination: 'FC-DE-02', carrier: 'UPS' },
  ];

  const purchaseOrders = [
    { poNumber: 'PO-2024-1234', product: 'Sensodyne Repair & Protect', quantity: 2400, value: 48000, status: 'Confirmed', dueDate: '2024-10-15' },
    { poNumber: 'PO-2024-1235', product: 'Centrum Multivitamin', quantity: 1800, value: 36000, status: 'Pending', dueDate: '2024-10-18' },
    { poNumber: 'PO-2024-1236', product: 'Parodontax Complete Protection', quantity: 2100, value: 42000, status: 'Confirmed', dueDate: '2024-10-20' },
    { poNumber: 'PO-2024-1237', product: 'Voltaren Gel', quantity: 1500, value: 45000, status: 'Confirmed', dueDate: '2024-10-22' },
    { poNumber: 'PO-2024-1238', product: 'Corega Denture Adhesive', quantity: 1200, value: 24000, status: 'Pending', dueDate: '2024-10-25' },
  ];

  const inventoryData = [
    { product: 'Sensodyne Repair & Protect', sku: 'SEN-RP-001', inStock: 4500, reserved: 1200, available: 3300, reorderPoint: 2000, status: 'Healthy' },
    { product: 'Centrum Multivitamin', sku: 'CEN-MV-001', inStock: 3200, reserved: 800, available: 2400, reorderPoint: 1500, status: 'Healthy' },
    { product: 'Parodontax Complete', sku: 'PAR-CP-001', inStock: 1800, reserved: 600, available: 1200, reorderPoint: 1800, status: 'Low' },
    { product: 'Voltaren Gel', sku: 'VOL-GEL-001', inStock: 2800, reserved: 900, available: 1900, reorderPoint: 1200, status: 'Healthy' },
    { product: 'Corega Adhesive', sku: 'COR-AD-001', inStock: 950, reserved: 400, available: 550, reorderPoint: 1000, status: 'Critical' },
  ];

  const invoices = [
    { invoiceNumber: 'INV-2024-5678', amount: 125000, status: 'Paid', dueDate: '2024-09-30', paidDate: '2024-09-28' },
    { invoiceNumber: 'INV-2024-5679', amount: 98000, status: 'Pending', dueDate: '2024-10-15', paidDate: null },
    { invoiceNumber: 'INV-2024-5680', amount: 87000, status: 'Paid', dueDate: '2024-09-25', paidDate: '2024-09-24' },
    { invoiceNumber: 'INV-2024-5681', amount: 112000, status: 'Overdue', dueDate: '2024-09-20', paidDate: null },
  ];

  return (
    <div className="vendor-page">
      <VendorFilterBar />
      
      <div className="page-header">
        <div className="page-title-section">
          <Package size={32} className="page-icon" />
          <div>
            <h1 className="page-title">Amazon Vendor Central</h1>
            <p className="page-subtitle">Vendor performance, shipments, inventory, and invoicing</p>
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
            <div className="kpi-label">Monthly Revenue</div>
            <div className="kpi-value">€310K</div>
            <div className="kpi-trend positive">+10.7% vs last month</div>
          </div>
        </div>

        <div className="kpi-card-large glass-card">
          <div className="kpi-icon-wrapper" style={{ background: 'rgba(34, 255, 0, 0.1)' }}>
            <Box size={24} color="#22ff00" />
          </div>
          <div className="kpi-content">
            <div className="kpi-label">Units Shipped</div>
            <div className="kpi-value">5.2K</div>
            <div className="kpi-trend positive">+8.3% vs last month</div>
          </div>
        </div>

        <div className="kpi-card-large glass-card">
          <div className="kpi-icon-wrapper" style={{ background: 'rgba(34, 255, 0, 0.1)' }}>
            <Truck size={24} color="#22ff00" />
          </div>
          <div className="kpi-content">
            <div className="kpi-label">Active Shipments</div>
            <div className="kpi-value">8</div>
            <div className="kpi-trend neutral">In transit</div>
          </div>
        </div>

        <div className="kpi-card-large glass-card">
          <div className="kpi-icon-wrapper" style={{ background: 'rgba(34, 255, 0, 0.1)' }}>
            <AlertCircle size={24} color="#22ff00" />
          </div>
          <div className="kpi-content">
            <div className="kpi-label">Open POs</div>
            <div className="kpi-value">12</div>
            <div className="kpi-trend neutral">Pending</div>
          </div>
        </div>
      </div>

      {/* Performance Charts */}
      <div className="charts-row">
        <div className="chart-section glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 className="section-title" style={{ margin: 0 }}>Revenue & Units Performance</h2>
            <ChartInfoTooltip
              title="Revenue & Units Performance"
              description="Tracks monthly revenue and units shipped trends, showing the relationship between sales volume and revenue growth over time."
              kpis={[
                'Monthly Revenue (€)',
                'Units Shipped',
                'Revenue per Unit',
                'Month-over-Month Growth (%)'
              ]}
              challenges={[
                'Maintaining consistent supply to meet demand',
                'Balancing inventory costs with stockout risks',
                'Managing seasonal demand fluctuations',
                'Improving forecasting accuracy'
              ]}
            />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="revenueGradientVendor" x1="0" y1="0" x2="0" y2="1">
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
              <Legend wrapperStyle={{ color: '#cccccc', fontSize: '12px' }} />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#22ff00" 
                strokeWidth={2}
                fill="url(#revenueGradientVendor)"
                name="Revenue"
              />
              <Area 
                type="monotone" 
                dataKey="units" 
                stroke="#3b82f6" 
                strokeWidth={2}
                fill="none"
                name="Units"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-section glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 className="section-title" style={{ margin: 0 }}>Category Performance</h2>
            <ChartInfoTooltip
              title="Category Performance"
              description="Compares revenue, units, and growth rates across different product categories to identify top performers and growth opportunities."
              kpis={[
                'Revenue by Category (€)',
                'Units Sold by Category',
                'Category Growth Rate (%)',
                'Market Share by Category'
              ]}
              challenges={[
                'Allocating resources to high-growth categories',
                'Managing category-specific compliance requirements',
                'Optimizing product mix for profitability',
                'Competing with category-specific competitors'
              ]}
            />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
              <XAxis dataKey="category" stroke="#cccccc" fontSize={12} />
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
              <Bar dataKey="revenue" fill="#22ff00" radius={[4, 4, 0, 0]} name="Revenue" />
              <Bar dataKey="units" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Units" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Shipments */}
      <div className="section-header">
        <h2 className="section-title">
          <Truck size={20} />
          Recent Shipments
        </h2>
      </div>
      <div className="table-container glass-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Shipment ID</th>
              <th>Items</th>
              <th>Date</th>
              <th>Destination</th>
              <th>Carrier</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {shipments.map((shipment, index) => (
              <tr key={index}>
                <td className="shipment-id">{shipment.id}</td>
                <td>{shipment.items}</td>
                <td>{shipment.date}</td>
                <td>{shipment.destination}</td>
                <td>{shipment.carrier}</td>
                <td>
                  <span className={`status-badge status-${shipment.status.toLowerCase().replace(' ', '-')}`}>
                    {shipment.status === 'Delivered' && <CheckCircle size={14} />}
                    {shipment.status === 'In Transit' && <Truck size={14} />}
                    {shipment.status === 'Processing' && <AlertCircle size={14} />}
                    {shipment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Purchase Orders */}
      <div className="section-header">
        <h2 className="section-title">Open Purchase Orders</h2>
      </div>
      <div className="table-container glass-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>PO Number</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Value</th>
              <th>Due Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {purchaseOrders.map((po, index) => (
              <tr key={index}>
                <td className="po-number">{po.poNumber}</td>
                <td>{po.product}</td>
                <td>{po.quantity.toLocaleString()}</td>
                <td>€{po.value.toLocaleString()}</td>
                <td>{po.dueDate}</td>
                <td>
                  <span className={`status-badge status-${po.status.toLowerCase()}`}>
                    {po.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Inventory */}
      <div className="section-header">
        <h2 className="section-title">Inventory Status</h2>
      </div>
      <div className="table-container glass-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>SKU</th>
              <th>In Stock</th>
              <th>Reserved</th>
              <th>Available</th>
              <th>Reorder Point</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {inventoryData.map((item, index) => (
              <tr key={index}>
                <td className="product-name">{item.product}</td>
                <td className="sku-code">{item.sku}</td>
                <td>{item.inStock.toLocaleString()}</td>
                <td>{item.reserved.toLocaleString()}</td>
                <td>{item.available.toLocaleString()}</td>
                <td>{item.reorderPoint.toLocaleString()}</td>
                <td>
                  <span className={`inventory-badge inventory-${item.status.toLowerCase()}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invoices */}
      <div className="section-header">
        <h2 className="section-title">Recent Invoices</h2>
      </div>
      <div className="table-container glass-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Invoice Number</th>
              <th>Amount</th>
              <th>Due Date</th>
              <th>Paid Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, index) => (
              <tr key={index}>
                <td className="invoice-number">{invoice.invoiceNumber}</td>
                <td className="amount-value">€{invoice.amount.toLocaleString()}</td>
                <td>{invoice.dueDate}</td>
                <td>{invoice.paidDate || '-'}</td>
                <td>
                  <span className={`status-badge status-${invoice.status.toLowerCase()}`}>
                    {invoice.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VendorPage;
