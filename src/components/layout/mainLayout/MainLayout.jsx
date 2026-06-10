import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../sidebar/Sidebar'
import Topbar from '../topbar/Topbar'
import './MainLayout.css'

function MainLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className={sidebarOpen ? 'main-layout sidebar-open' : 'main-layout'}>
            <Topbar onMenuClick={() => setSidebarOpen(true)} />
            <Sidebar onClose={() => setSidebarOpen(false)} />

            <button
                type="button"
                className="sidebar-overlay"
                onClick={() => setSidebarOpen(false)}
                aria-label="إغلاق القائمة"
            />

            <main className="page-content">
                <Outlet />
            </main>
        </div>
    )
}

export default MainLayout