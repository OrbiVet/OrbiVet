import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'

interface AppLayoutProps {
  breadcrumb?: string
  title: string
  actions?: ReactNode
  children: ReactNode
}

export function AppLayout({ breadcrumb, title, actions, children }: AppLayoutProps) {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="pl-62">
        <Topbar breadcrumb={breadcrumb} title={title} actions={actions} />
        <main className="px-10 pb-10">{children}</main>
      </div>
    </div>
  )
}
