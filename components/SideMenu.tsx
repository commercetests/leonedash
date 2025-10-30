'use client'

import Link from 'next/link'
import { 
  LayoutDashboard, 
  Package, 
  Target, 
  Tv, 
  Brain, 
  BarChart3, 
  Settings, 
  FileText,
  TrendingUp,
  Users,
  Menu,
  X
} from 'lucide-react';
import { useUI } from '@/context/UIContext'
import '@/styles/SideMenu.css';

interface SideMenuProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const SideMenu = ({ activeView, onViewChange }: SideMenuProps) => {
  const { sidebarCollapsed, toggleSidebar } = useUI();

  const menuItems = [
    { id: 'dashboard', href: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard', badge: null },
    { id: 'vendor', href: '/vendor', icon: <Package size={20} />, label: 'Vendor Central', badge: null },
    { id: 'advertising', href: '/advertising', icon: <Target size={20} />, label: 'Advertising', badge: '4' },
    { id: 'dsp', href: '/dsp', icon: <Tv size={20} />, label: 'DSP', badge: null },
    { id: 'amc', href: '/amc', icon: <Brain size={20} />, label: 'AMC', badge: null },
  ];

  const secondaryItems = [
    { id: 'analytics', href: '/analytics', icon: <BarChart3 size={20} />, label: 'Analytics', badge: null },
    { id: 'reports', href: '/reports', icon: <FileText size={20} />, label: 'Reports', badge: null },
    { id: 'insights', href: '/insights', icon: <TrendingUp size={20} />, label: 'Insights', badge: 'New' },
    { id: 'audiences', href: '/audiences', icon: <Users size={20} />, label: 'Audiences', badge: null },
  ];

  return (
    <aside className={`side-menu ${sidebarCollapsed ? 'collapsed' : ''}`}>
      <div className="side-menu-content">
        {/* Toggle Button */}
        <button className="sidebar-toggle" onClick={toggleSidebar} title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
          {sidebarCollapsed ? <Menu size={20} /> : <X size={20} />}
        </button>

        {/* Logo Section */}
        <div className="menu-logo">
          <img src="/logos/haleon.png" alt="Haleon" className="haleon-logo" />
        </div>

        {/* Main Navigation */}
        <nav className="menu-nav">
          <div className="menu-section">
            <div className="menu-section-title">Main</div>
            {menuItems.map(item => (
              <Link
                key={item.id}
                href={item.href}
                className={`menu-item ${activeView === item.id ? 'active' : ''}`}
              >
                <span className="menu-item-icon">{item.icon}</span>
                <span className="menu-item-label">{item.label}</span>
                {item.badge && <span className="menu-badge">{item.badge}</span>}
              </Link>
            ))}
          </div>

          <div className="menu-section">
            <div className="menu-section-title">Tools</div>
            {secondaryItems.map(item => (
              <Link
                key={item.id}
                href={item.href}
                className={`menu-item ${activeView === item.id ? 'active' : ''}`}
              >
                <span className="menu-item-icon">{item.icon}</span>
                <span className="menu-item-label">{item.label}</span>
                {item.badge && (
                  <span className={`menu-badge ${item.badge === 'New' ? 'badge-new' : ''}`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </nav>

        {/* Settings at Bottom */}
        <div className="menu-footer">
          <Link
            href="/settings"
            className={`menu-item ${activeView === 'settings' ? 'active' : ''}`}
          >
            <span className="menu-item-icon"><Settings size={20} /></span>
            <span className="menu-item-label">Settings</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default SideMenu;
