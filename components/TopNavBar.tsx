'use client'

import { useState, useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { createPortal } from 'react-dom'
import { 
  Search, 
  Bell, 
  User, 
  RefreshCw, 
  Download,
  Moon,
  Sun,
  Maximize2,
  Minimize2,
  ChevronRight
} from 'lucide-react'
import { useUI } from '@/context/UIContext'
import '@/styles/TopNavBar.css'

export default function TopNavBar() {
  const pathname = usePathname()
  const { theme, toggleTheme, compactMode, toggleCompactMode } = useUI()
  const [searchOpen, setSearchOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  const searchRef = useRef<HTMLDivElement>(null)
  const notifRef = useRef<HTMLDivElement>(null)
  const userRef = useRef<HTMLDivElement>(null)
  const searchButtonRef = useRef<HTMLButtonElement>(null)
  const notifButtonRef = useRef<HTMLButtonElement>(null)
  const userButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false)
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false)
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Generate breadcrumbs from pathname
  const getBreadcrumbs = () => {
    const paths = pathname.split('/').filter(Boolean)
    const breadcrumbs = [{ label: 'Dashboard', path: '/' }]
    
    const pathMap: Record<string, string> = {
      'vendor': 'Vendor Central',
      'advertising': 'Advertising',
      'dsp': 'DSP',
      'amc': 'AMC',
      'analytics': 'Analytics',
      'reports': 'Reports',
      'insights': 'Insights',
      'audiences': 'Audiences',
      'settings': 'Settings'
    }

    paths.forEach((path) => {
      breadcrumbs.push({
        label: pathMap[path] || path,
        path: `/${path}`
      })
    })

    return breadcrumbs
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    setLastUpdated(new Date())
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    })
  }

  const breadcrumbs = getBreadcrumbs()
  const notifications = [
    { id: 1, type: 'alert', message: 'Sensodyne ad spend increased by 15%', time: '5m ago' },
    { id: 2, type: 'success', message: 'Weekly report generated', time: '1h ago' },
    { id: 3, type: 'info', message: 'New DSP campaign approved', time: '2h ago' },
  ]

  return (
    <nav className="top-nav-bar">
      <div className="top-nav-content">
        {/* Left: Breadcrumbs */}
        <div className="breadcrumbs">
          {breadcrumbs.map((crumb, index) => (
            <div key={crumb.path} className="breadcrumb-item">
              <a href={crumb.path} className="breadcrumb-link">
                {crumb.label}
              </a>
              {index < breadcrumbs.length - 1 && (
                <ChevronRight size={16} className="breadcrumb-separator" />
              )}
            </div>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="top-nav-actions">
          {/* Last Updated */}
          <div className="last-updated">
            Updated {formatTime(lastUpdated)}
          </div>

          {/* Refresh Button */}
          <button 
            className={`nav-action-btn ${isRefreshing ? 'refreshing' : ''}`}
            onClick={handleRefresh}
            title="Refresh data"
          >
            <RefreshCw size={18} />
          </button>

          {/* Compact Mode Toggle */}
          <button 
            className="nav-action-btn"
            onClick={toggleCompactMode}
            title={compactMode ? 'Detailed view' : 'Compact view'}
          >
            {compactMode ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
          </button>

          {/* Export */}
          <button className="nav-action-btn" title="Export data">
            <Download size={18} />
          </button>

          {/* Search */}
          <div className="search-container" ref={searchRef}>
            <button 
              className="nav-action-btn"
              onClick={() => setSearchOpen(!searchOpen)}
              title="Search (Press /)"
            >
              <Search size={18} />
            </button>
            {searchOpen && (
              <div className="search-dropdown">
                <input 
                  type="text" 
                  placeholder="Search metrics, brands, campaigns..."
                  className="search-input"
                  autoFocus
                />
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="notifications-container" ref={notifRef}>
            <button 
              className="nav-action-btn"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              title="Notifications"
            >
              <Bell size={18} />
              <span className="notification-badge">3</span>
            </button>
            {notificationsOpen && (
              <div className="notifications-dropdown">
                <div className="dropdown-header">Notifications</div>
                {notifications.map(notif => (
                  <div key={notif.id} className={`notification-item ${notif.type}`}>
                    <div className="notification-message">{notif.message}</div>
                    <div className="notification-time">{notif.time}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button 
            className="nav-action-btn"
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* User Menu */}
          <div className="user-menu-container" ref={userRef}>
            <button 
              ref={userButtonRef}
              className="user-menu-btn"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            >
              <User size={18} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Portal Dropdowns */}
      {mounted && userMenuOpen && userButtonRef.current && createPortal(
        <div 
          ref={userRef}
          className="user-dropdown-portal"
          style={{
            position: 'fixed',
            top: userButtonRef.current.getBoundingClientRect().bottom + 8,
            right: window.innerWidth - userButtonRef.current.getBoundingClientRect().right,
          }}
        >
          <div className="user-info">
            <div className="user-name">Admin User</div>
            <div className="user-email">admin@haleon.com</div>
          </div>
          <div className="dropdown-divider" />
          <a href="/settings" className="dropdown-item">Settings</a>
          <a href="#" className="dropdown-item">Help & Support</a>
          <div className="dropdown-divider" />
          <a href="#" className="dropdown-item logout">Logout</a>
        </div>,
        document.body
      )}
    </nav>
  )
}
