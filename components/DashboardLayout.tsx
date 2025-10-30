'use client'

import { usePathname } from 'next/navigation'
import SideMenu from './SideMenu'
import TopNavBar from './TopNavBar'
import { useUI } from '@/context/UIContext'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { sidebarCollapsed } = useUI()
  
  // Map pathname to view name for SideMenu
  const getViewFromPath = (path: string) => {
    if (path === '/') return 'dashboard'
    return path.substring(1) // Remove leading slash
  }

  return (
    <>
      <TopNavBar />
      <SideMenu activeView={getViewFromPath(pathname)} onViewChange={() => {}} />
      <main 
        className="main-content"
        style={{
          marginLeft: sidebarCollapsed ? '70px' : '260px',
          marginTop: '64px',
          transition: 'margin-left 0.25s ease'
        }}
      >
        {children}
      </main>
    </>
  )
}
