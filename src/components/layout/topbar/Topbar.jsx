import { Search, Bell, Settings, Menu } from 'lucide-react'
import adminImage from '../../../assets/images/admin.png'
import './Topbar.css'

function Topbar({ onMenuClick }) {
    return (
        <header className="topbar">
            <div className="admin-info">
                <button type="button" className="menu-button" onClick={onMenuClick}>
                    <Menu size={22} />
                </button>

                <img src={adminImage} alt="صورة مدير النظام" />

                <div>
                    <h4>مدير النظام</h4>
                    <p>مسؤول الإدارة</p>
                </div>
            </div>

            <div className="topbar-actions">
                <button type="button">
                    <Settings size={20} />
                </button>

                <button type="button">
                    <Bell size={20} />
                </button>

                <div className="topbar-search-box">
                    <Search size={18} />
                    <input type="text" placeholder="البحث في العمليات، الطلبات، الزبائن..." />
                </div>
            </div>
        </header>
    )
}

export default Topbar