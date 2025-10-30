import type { Metadata } from 'next'
import { FilterProvider } from '@/context/FilterContext'
import { UIProvider } from '@/context/UIContext'
import DashboardLayout from '@/components/DashboardLayout'
import '@/styles/globals.css'
import '@/styles/compact-mode.css'
import '@/styles/design-refinement.css'

export const metadata: Metadata = {
  title: 'Haleon Insight - Amazon Dashboard',
  description: 'Comprehensive Amazon analytics dashboard for Haleon brands across EU5 markets',
  icons: {
    icon: '/haleon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <UIProvider>
          <FilterProvider>
            <DashboardLayout>
              {children}
            </DashboardLayout>
          </FilterProvider>
        </UIProvider>
      </body>
    </html>
  )
}
