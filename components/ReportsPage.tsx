import { FileText, Download, Calendar, TrendingUp, BarChart3, PieChart } from 'lucide-react';
import '@/styles/ReportsPage.css';

const ReportsPage = () => {
  const reports = [
    {
      id: 1,
      title: 'Monthly Performance Report',
      description: 'Comprehensive overview of all metrics across Vendor Central, Advertising, DSP, and AMC',
      date: 'October 2024',
      type: 'Performance',
      icon: TrendingUp,
      color: '#22ff00'
    },
    {
      id: 2,
      title: 'Advertising Campaign Analysis',
      description: 'Detailed breakdown of ad spend, ROAS, and campaign performance by format',
      date: 'October 2024',
      type: 'Advertising',
      icon: BarChart3,
      color: '#3b82f6'
    },
    {
      id: 3,
      title: 'DSP Performance Insights',
      description: 'Display and video advertising metrics including impressions, reach, and conversions',
      date: 'October 2024',
      type: 'DSP',
      icon: PieChart,
      color: '#a855f7'
    },
    {
      id: 4,
      title: 'AMC Attribution Report',
      description: 'Multi-touch attribution analysis and customer journey insights',
      date: 'October 2024',
      type: 'AMC',
      icon: FileText,
      color: '#ec4899'
    },
    {
      id: 5,
      title: 'Vendor Central Sales Report',
      description: 'Revenue, units sold, and inventory performance across all EU5 markets',
      date: 'October 2024',
      type: 'Vendor',
      icon: TrendingUp,
      color: '#22ff00'
    },
    {
      id: 6,
      title: 'Brand Performance Comparison',
      description: 'Comparative analysis of all Haleon brands across key metrics',
      date: 'October 2024',
      type: 'Performance',
      icon: BarChart3,
      color: '#3b82f6'
    }
  ];

  const scheduledReports = [
    { name: 'Weekly Performance Summary', frequency: 'Every Monday', nextRun: 'Oct 28, 2024' },
    { name: 'Monthly Executive Report', frequency: 'First of month', nextRun: 'Nov 1, 2024' },
    { name: 'Daily Ad Spend Alert', frequency: 'Daily at 9 AM', nextRun: 'Oct 22, 2024' }
  ];

  return (
    <div className="reports-page">
      <div className="reports-header">
        <div>
          <h1>Reports</h1>
          <p className="reports-subtitle">Generate and download comprehensive performance reports</p>
        </div>
        <button className="btn-primary">
          <FileText size={20} />
          Create Custom Report
        </button>
      </div>

      {/* Available Reports */}
      <div className="reports-section">
        <h2 className="section-title">Available Reports</h2>
        <div className="reports-grid">
          {reports.map(report => {
            const Icon = report.icon;
            return (
              <div key={report.id} className="report-card glass-card">
                <div className="report-header">
                  <div className="report-icon" style={{ backgroundColor: `${report.color}20`, color: report.color }}>
                    <Icon size={24} />
                  </div>
                  <span className="report-type" style={{ color: report.color }}>{report.type}</span>
                </div>
                <h3 className="report-title">{report.title}</h3>
                <p className="report-description">{report.description}</p>
                <div className="report-footer">
                  <div className="report-date">
                    <Calendar size={14} />
                    <span>{report.date}</span>
                  </div>
                  <button className="btn-download">
                    <Download size={16} />
                    Download
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scheduled Reports */}
      <div className="reports-section">
        <h2 className="section-title">Scheduled Reports</h2>
        <div className="scheduled-reports glass-card">
          {scheduledReports.map((report, index) => (
            <div key={index} className="scheduled-report-item">
              <div className="scheduled-report-info">
                <FileText size={20} className="scheduled-icon" />
                <div>
                  <h4>{report.name}</h4>
                  <p className="frequency">{report.frequency}</p>
                </div>
              </div>
              <div className="next-run">
                <span className="next-run-label">Next run:</span>
                <span className="next-run-date">{report.nextRun}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="reports-section">
        <h2 className="section-title">Quick Actions</h2>
        <div className="quick-actions-grid">
          <div className="quick-action-card glass-card">
            <TrendingUp size={32} style={{ color: '#22ff00' }} />
            <h3>Export All Data</h3>
            <p>Download complete dataset for all metrics</p>
            <button className="btn-secondary">Export CSV</button>
          </div>
          <div className="quick-action-card glass-card">
            <BarChart3 size={32} style={{ color: '#3b82f6' }} />
            <h3>Schedule Report</h3>
            <p>Set up automated report delivery</p>
            <button className="btn-secondary">Configure</button>
          </div>
          <div className="quick-action-card glass-card">
            <FileText size={32} style={{ color: '#a855f7' }} />
            <h3>Report Templates</h3>
            <p>Browse and customize report templates</p>
            <button className="btn-secondary">View Templates</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
