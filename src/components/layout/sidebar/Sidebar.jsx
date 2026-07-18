import { NavLink } from 'react-router-dom'
import {
    Home,
    Users,
    Truck,
    UtensilsCrossed,
    Megaphone,
    TicketPercent,
    ClipboardList,
    Wallet,
    LogOut
} from 'lucide-react'
import './Sidebar.css'

function Sidebar({ onClose }) {
    const links = [
        {
            title: 'الرئيسية',
            path: '/dashboard',
            icon: Home
        },
        {
            title: 'المستخدمين',
            path: '/users',
            icon: Users
        },
        {
            title: 'السائقين',
            path: '/drivers',
            icon: Truck
        },
        {
            title: 'المطاعم',
            path: '/restaurants',
            icon: UtensilsCrossed
        },
        {
            title: 'الإعلانات',
            path: '/ads',
            icon: Megaphone
        },
        {
            title: 'أكواد الخصم',
            path: '/promo-codes',
            icon: TicketPercent
        },
        {
            title: 'الطلبات',
            path: '/orders',
            icon: ClipboardList
        },
        // {
        //     title: 'المالية',
        //     path: '/finance',
        //     icon: Wallet
        // }
    ]

    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <h2>PRESTIGE LOGISTICS</h2>
                <p>لوحة التحكم</p>
            </div>

            <div className="sidebar-menu">
                {links.map((link) => {
                    const Icon = link.icon

                    return (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            onClick={onClose}
                            className={({ isActive }) =>
                                isActive ? 'sidebar-link active' : 'sidebar-link'
                            }
                        >
                            <Icon size={20} />
                            <span>{link.title}</span>
                        </NavLink>
                    )
                })}

                <NavLink
                    to="/login"
                    onClick={onClose}
                    className="logout-link"
                >
                    <LogOut size={20} />
                    <span>تسجيل الخروج</span>
                </NavLink>
            </div>
        </aside>
    )
}

export default Sidebar