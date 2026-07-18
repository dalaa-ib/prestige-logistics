import { useState, useEffect } from 'react'
import {
    Users,
    CheckCircle,
    Utensils,
    ClipboardList,
    TrendingUp
} from 'lucide-react'
import './Dashboard.css'
import api from '../../api/api'

import driver1 from '../../assets/images/driver1.png'
import driver2 from '../../assets/images/driver2.png'
import driver3 from '../../assets/images/driver3.png'
import driver4 from '../../assets/images/driver4.png'
import { NavLink } from 'react-router-dom'

function Dashboard() {
    const [chartType, setChartType] = useState('monthly')
    const [admin, setAdmin] = useState(null)
    const [restaurants, setRestaurants] = useState([])
    const [orders, setOrders] = useState([])

    useEffect(() => {

        const getDashboardData = async () => {
            try {

                const restaurantsRes = await api.get(
                    '/admin/resturant/getAllRestaurants'
                )

                const ordersRes = await api.get(
                    '/admin/AllOrders'
                )

                console.log("ORDERS:", ordersRes.data.data)

                setRestaurants(restaurantsRes.data.data)
                setOrders(ordersRes.data.data)

            } catch (error) {
                console.log("ERROR:", error.response?.data)
            }
        }

        getDashboardData()

    }, [])

    const totalRestaurants = restaurants.length
    const totalOrders = orders.length
    const totalRevenue = orders.reduce(
        (sum, order) => sum + Number(order.total_price || 0),
        0
    )
    const cards = [
        {
            title: 'إجمالي الزبائن',
            value: 0,
            note: 'مستخدمين مسجلين',
            icon: Users,
            color: '#2563EB',
            bg: '#EEF2FF'
        },
        {
            title: 'السائقين النشطين',
            value: 0,
            note: 'سائقين متاحين',
            icon: CheckCircle,
            color: '#059669',
            bg: '#ECFDF5'
        },
        {
            title: 'إجمالي المطاعم',
            value: totalRestaurants,
            note: 'مطاعم مسجلة',
            icon: Utensils,
            color: '#D97706',
            bg: '#FFFBEB'
        },
        {
            title: 'طلبات اليوم',
            value: totalOrders,
            note: 'إجمالي الطلبات',
            icon: ClipboardList,
            color: '#4F46E5',
            bg: '#EEF2FF'
        },
        {
            title: 'طلبات معلقة',
            value: 0,
            note: 'تحتاج متابعة',
            dot: '#EF4444'
        },
        {
            title: 'قيد التوصيل',
            value: 0,
            note: 'طلب نشط',
            dot: '#3B82F6'
        },
        {
            title: 'اكتملت اليوم',
            value: 0,
            note: 'نجاح عالي',
            dot: '#10B981'
        }
    ]

    const monthlyBars = [
        { day: '30 يوليو', value: 76, light: 95 },
        { day: '21 يوليو', value: 52, light: 80 },
        { day: '14 يوليو', value: 85, light: 100 },
        { day: '7 يوليو', value: 60, light: 84 },
        { day: '1 يوليو', value: 34, light: 60 }
    ]

    const weeklyBars = [
        { day: 'السبت', value: 42, light: 62 },
        { day: 'الأحد', value: 58, light: 76 },
        { day: 'الإثنين', value: 65, light: 84 },
        { day: 'الثلاثاء', value: 48, light: 70 },
        { day: 'الأربعاء', value: 72, light: 92 },
        { day: 'الخميس', value: 54, light: 78 },
        { day: 'الجمعة', value: 36, light: 56 }
    ]

    const bars = chartType === 'monthly' ? monthlyBars : weeklyBars

    const drivers = [
        {
            name: 'أحمد محمد',
            orders: '112 طلب',
            rate: '4.9',
            price: '$185.00',
            image: driver1
        },
        {
            name: 'سامي سعيد',
            orders: '96 طلب',
            rate: '4.8',
            price: '$142.50',
            image: driver2
        },
        {
            name: 'خالد إبراهيم',
            orders: '84 طلب',
            rate: '5.0',
            price: '$130.20',
            image: driver3
        },
        {
            name: 'ليث يوسف',
            orders: '78 طلب',
            rate: '4.7',
            price: '$115.00',
            image: driver4
        }
    ]


    const getStatusClass = (status) => {
        if (status === 'قيد التوصيل') return 'status delivering'
        if (status === 'مكتمل') return 'status completed'
        if (status === 'تحضير') return 'status preparing'
        return 'status canceled'
    }

    return (
        <div className="dashboard-page">
            <div className="dashboard-header">
                <h1>نظرة عامة على العمليات</h1>
                <p>أهلاً بك مجدداً {admin?.fullname || ''}، إليك ملخص نشاط Prestige Logistics اليوم. </p>
            </div>

            <div className="cards-grid">
                {cards.map((card, index) => {
                    const Icon = card.icon

                    return (
                        <div className="stat-card" key={index}>
                            {Icon ? (
                                <div
                                    className="stat-icon"
                                    style={{ color: card.color, backgroundColor: card.bg }}
                                >
                                    <Icon size={22} />
                                </div>
                            ) : (
                                <span
                                    className="stat-dot"
                                    style={{ backgroundColor: card.dot }}
                                ></span>
                            )}

                            <span>{card.note}</span>
                            <p>{card.title}</p>
                            <h3>{card.value}</h3>
                        </div>
                    )
                })}

                <div className="revenue-card">
                    <TrendingUp size={22} />
                    <p>الإيرادات الشهرية</p>
                    <h3>${totalRevenue}</h3>
                    <span>حسب الطلبات الحالية</span>
                </div>
            </div>

            <div className="dashboard-row">
                <div className="orders-chart card-box">
                    <div className="box-title">
                        <h3>تحليل الإيرادات</h3>
                        <p>
                            {chartType === 'monthly'
                                ? 'آخر 30 يوم من العمليات التجارية'
                                : 'تفاصيل الإيرادات خلال الأسبوع الحالي'}
                        </p>
                    </div>

                    <div className="chart-buttons">
                        <button
                            className={chartType === 'weekly' ? 'active' : ''}
                            onClick={() => setChartType('weekly')}
                        >
                            أسبوعي
                        </button>

                        <button
                            className={chartType === 'monthly' ? 'active' : ''}
                            onClick={() => setChartType('monthly')}
                        >
                            شهري
                        </button>
                    </div>

                    <div className="bar-chart">
                        {bars.map((bar, index) => (
                            <div className="bar-item" key={index}>
                                <div className="bar-wrapper">
                                    <div
                                        className="bar-light"
                                        style={{ height: `${bar.light}%` }}
                                    ></div>

                                    <div
                                        className="bar-blue"
                                        style={{ height: `${bar.value}%` }}
                                    ></div>

                                    <div className="bar-info">
                                        الإيرادات: ${bar.value * 5200}
                                    </div>
                                </div>

                                <span>{bar.day}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="delivery-card card-box">
                    <div className="box-title">
                        <h3>توزيع الطلبات</h3>
                        <p>حسب كفاءة التوصيل اليومية</p>
                    </div>

                    <div className="circle-progress">
                        <span className="progress-top"></span>
                        <span className="progress-right"></span>
                        <span className="progress-bottom"></span>
                        <span className="progress-left"></span>

                        <div>
                            <h3>92%</h3>
                            <p>نجاح</p>
                        </div>
                    </div>
                    <div className="delivery-list">
                        <div>
                            <p><span className="blue-dot"></span>في الوقت المحدد</p>
                            <b>75%</b>
                        </div>
                        <div>
                            <p><span className="green-dot"></span>تسليم مبكر</p>
                            <b>15%</b>
                        </div>
                        <div>
                            <p><span className="red-dot"></span>متأخر</p>
                            <b>10%</b>
                        </div>
                    </div>
                </div>
            </div>

            <div className="dashboard-row bottom-row">
                <div className="orders-table card-box">
                    <div className="table-head">
                        <h3>آخر الطلبات</h3>
                        <a href="#">عرض الكل</a>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th>رقم الطلب</th>
                                <th>المطعم</th>
                                <th>السائق</th>
                                <th>المبلغ</th>
                                <th>الحالة</th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.length > 0 ? (
                                orders.map((order) => (
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>{order.restaurant?.name || '-'}</td>
                                        <td>{order.driver?.name || '-'}</td>
                                        <td>{order.total_price || '-'}</td>
                                        <td>
                                            <span className={getStatusClass(order.status)}>
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center' }}>
                                        لا يوجد طلبات حالياً
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="drivers-card card-box">
                    <h3>سائقون متميزون اليوم</h3>

                    <div className="drivers-list">
                        {drivers.map((driver, index) => (
                            <div className="driver-item" key={index}>
                                <img src={driver.image} alt={driver.name} />
                                <div>
                                    <h4>{driver.name}</h4>
                                    <p>{driver.orders} - تقييم {driver.rate}</p>
                                </div>
                                <span>{driver.price}</span>
                            </div>
                        ))}
                    </div>
                    <NavLink
                        to="/drivers"
                        className="logout-link"
                    >
                        <button>مراقبة جميع السائقين</button>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default Dashboard