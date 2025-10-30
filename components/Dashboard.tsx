import { useState } from 'react';
import { TrendingUp, Package, DollarSign, Target, Zap } from 'lucide-react';
import VendorCentral from './VendorCentral';
import Advertising from './Advertising';
import DSP from './DSP';
import AMC from './AMC';
import FilterBar from './FilterBar';
import SideMenu from './SideMenu';
import ChartsSection from './ChartsSection';
import VendorPage from './VendorPage';
import AdvertisingPage from './AdvertisingPage';
import DSPPage from './DSPPage';
import AMCPage from './AMCPage';
import AnalyticsPage from './AnalyticsPage';
import ReportsPage from './ReportsPage';
import InsightsPage from './InsightsPage';
import AudiencesPage from './AudiencesPage';
import SettingsPage from './SettingsPage';
import '@/styles/Dashboard.css';

const Dashboard = () => {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'vendor':
        return <VendorPage />;
      case 'advertising':
        return <AdvertisingPage />;
      case 'dsp':
        return <DSPPage />;
      case 'amc':
        return <AMCPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'reports':
        return <ReportsPage />;
      case 'insights':
        return <InsightsPage />;
      case 'audiences':
        return <AudiencesPage />;
      case 'settings':
        return <SettingsPage />;
      case 'dashboard':
      default:
        return (
          <>
            {/* Filter Bar */}
            <FilterBar />

            {/* Quick Stats */}
            <div className="quick-stats">
              <div className="stat-card">
                <div className="stat-icon" style={{ background: 'rgba(163, 230, 53, 0.2)' }}>
                  <DollarSign size={24} color="#a3e635" />
                </div>
                <div className="stat-content">
                  <div className="stat-label">Total Revenue</div>
                  <div className="stat-value">€2.4M</div>
                  <div className="stat-change positive">+12.5%</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon" style={{ background: 'rgba(59, 130, 246, 0.2)' }}>
                  <Package size={24} color="#3b82f6" />
                </div>
                <div className="stat-content">
                  <div className="stat-label">Units Sold</div>
                  <div className="stat-value">48.2K</div>
                  <div className="stat-change positive">+8.3%</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon" style={{ background: 'rgba(168, 85, 247, 0.2)' }}>
                  <Target size={24} color="#a855f7" />
                </div>
                <div className="stat-content">
                  <div className="stat-label">Ad Spend</div>
                  <div className="stat-value">€640K</div>
                  <div className="stat-change positive">+5.2%</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon" style={{ background: 'rgba(236, 72, 153, 0.2)' }}>
                  <TrendingUp size={24} color="#ec4899" />
                </div>
                <div className="stat-content">
                  <div className="stat-label">ROAS</div>
                  <div className="stat-value">2.73x</div>
                  <div className="stat-change positive">+0.3x</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon" style={{ background: 'rgba(251, 191, 36, 0.2)' }}>
                  <Zap size={24} color="#fbbf24" />
                </div>
                <div className="stat-content">
                  <div className="stat-label">Conversion Rate</div>
                  <div className="stat-value">14.2%</div>
                  <div className="stat-change positive">+2.1%</div>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <ChartsSection />

            {/* Detailed Data Section */}
            <h2 className="section-main-title">Detailed Metrics</h2>
            <div className="dashboard-grid">
              <VendorCentral />
              <Advertising />
              <DSP />
              <AMC />
            </div>
          </>
        );
    }
  };

  return (
    <>
      <SideMenu activeView={currentView} onViewChange={setCurrentView} />
      <div className="dashboard">
        {renderView()}
      </div>
    </>
  );
};

export default Dashboard;
