import { useState, useEffect } from 'react'
import {
    Search,
    Eye,
    X,
    Pencil,
    Trash2,
    Users,
    CheckCircle,
    Truck,
    CalendarDays,
    Clock,
    FileText,
    Download,
    ChevronRight,
    ChevronLeft
} from 'lucide-react'
import './Drivers.css'
import currentDriver from '../../assets/images/current_driver.png'
import api from '../../api/api'

function Drivers() {
    const [search, setSearch] = useState('')
    const [status, setStatus] = useState('الكل')
    const [drivers, setDrivers] = useState([])
    const [activeDrivers, setActiveDrivers] = useState([])
    const [completedOrders, setCompletedOrders] = useState([])
    const [onDeliveryOrders, setOnDeliveryOrders] = useState([])
    const [pendingOrders, setPendingOrders] = useState([])
    const [showDriver, setShowDriver] = useState(null)
    const [showForm, setShowForm] = useState(false)

    const [driverForm, setDriverForm] = useState({
        fullname: '',
        phone: '',
        password: '',
        vehicle_type: '',
        vehicle_number: ''
    })

    useEffect(() => {
        const getDrivers = async () => {
            try {
                const response = await api.get('/admin/driver/desplayalldriver')
                setDrivers(response.data.data)
                console.log(response.data.data)
            } catch (error) {
                console.log(error)
            }
        }

        const getActiveDrivers = async () => {
            try {
                const response = await api.get('/admin/driver/desplayalldriverActive')
                setActiveDrivers(response.data.data)
            } catch (error) {
                console.log(error)
            }
        }

        const getOrders = async () => {
            try {
                const completed = await api.get('/admin/driver/today-deleveryorders/10')
                const onDelivery = await api.get('/admin/driver/today-ondeleveryorders/10')
                const pending = await api.get('/admin/driver/today-pendingorders/10')

                setCompletedOrders(completed.data.data)
                setOnDeliveryOrders(onDelivery.data.data)
                setPendingOrders(pending.data.data)
            } catch (error) {
                console.log(error)
            }
        }

        getDrivers()
        getActiveDrivers()
        getOrders()
    }, [])

    const handleDriverChange = (e) => {
        const { name, value } = e.target

        setDriverForm((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const openAddForm = () => {
        setDriverForm({
            fullname: '',
            phone: '',
            password: '',
            vehicle_type: '',
            vehicle_number: ''
        })

        setShowForm(true)
    }

    const saveDriver = async (e) => {
        e.preventDefault()

        try {
            const response = await api.post('/admin/driver/storeDriver', {
                fullname: driverForm.fullname,
                phone: driverForm.phone,
                password: driverForm.password,
                vehicle_type: driverForm.vehicle_type,
                vehicle_number: driverForm.vehicle_number,
                working_hours: [
                    {
                        day_of_week: "sunday",
                        start_time: "08:00",
                        end_time: "16:00"
                    }
                ]
            })

            console.log(response.data)

            setShowForm(false)

            const driversResponse = await api.get('/admin/driver/desplayalldriver')
            setDrivers(driversResponse.data.data)

        } catch (error) {
            console.log(error)
        }
    }

    const cards = [
        {
            title: 'إجمالي السائقين',
            value: drivers.length,
            text: 'جميع السائقين',
            icon: Users,
            color: '#2563EB',
            bg: '#EEF2FF'
        },
        {
            title: 'السائقين النشطين',
            value: activeDrivers.length,
            text: 'متاح الآن',
            icon: CheckCircle,
            color: '#16A34A',
            bg: '#F0FDF4'
        },
        {
            title: 'الشحنات اليوم',
            value: completedOrders.length,
            text: 'تم تسليمها',
            icon: Truck,
            color: '#2563EB',
            bg: '#EEF2FF'
        },
        {
            title: 'طلبات معلقة',
            value: pendingOrders.length,
            text: 'بانتظار المعالجة',
            icon: CalendarDays,
            color: '#EF4444',
            bg: '#FEF2F2'
        },
        {
            title: 'قيد التوصيل',
            value: onDeliveryOrders.length,
            text: 'على الطريق',
            icon: Truck,
            color: '#785A2E',
            bg: '#FDD39E'
        },
        {
            title: 'اكتملت اليوم',
            value: completedOrders.length,
            text: 'نجاح مرتفع',
            icon: CheckCircle,
            color: '#44474D',
            bg: '#E6E8EA'
        }
    ]

    const showDrivers = drivers.filter((driver) => {
        const searchOk =
            driver.fullname?.includes(search) ||
            driver.phone?.includes(search)

        const statusOk =
            status === 'الكل' ||
            (status === 'نشط' && driver.is_active) ||
            (status === 'غير نشط' && !driver.is_active)

        return searchOk && statusOk
    })

    const clearFilter = () => {
        setSearch('')
        setStatus('الكل')
    }

    const currentDriverData = drivers.length > 0 ? drivers[0] : null

    return (
        <div className="drivers-page">
            <div className="drivers-head">
                <div>
                    <h1>إدارة السائقين</h1>
                    <p>راقب أداء سائقينك وكل طلباتهم اليومية.</p>
                </div>

                <button className="add-btn" onClick={openAddForm}>إضافة سائق جديد</button>
            </div>
            <div className="cards-box">
                {cards.map((card, index) => {
                    const Icon = card.icon

                    return (
                        <div className="info-card" key={index}>
                            <div className="card-icon" style={{ color: card.color, backgroundColor: card.bg }}>
                                <Icon size={21} />
                            </div>

                            <div className="card-text">
                                <p>{card.title}</p>
                                <h3>{card.value}</h3>
                                <span>{card.text}</span>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="top-row">
                <div className="best-driver">
                    <img src={currentDriver} />

                    <div>
                        <p>السائق الحالي للأداء</p>

                        {currentDriverData ? (
                            <>
                                <h3>{currentDriverData.fullname}</h3>
                                <span>{currentDriverData.phone}</span>
                            </>
                        ) : (
                            <h3>لا يوجد سائق</h3>
                        )}
                    </div>
                </div>

                <div className="report-box">
                    <h3>تقارير الأداء</h3>
                    <p>تحميل تقارير مفصلة للسائقين.</p>

                    <button>
                        <FileText size={17} />
                        تقرير يومي
                        <Download size={15} />
                    </button>

                    <button>
                        <Clock size={17} />
                        تقرير شهري
                        <Download size={15} />
                    </button>
                </div>
            </div>

            <div className="table-box">
                <div className="filter-box">
                    <div className="search-box">
                        <Search size={18} />
                        <input type="text" placeholder="بحث باسم السائق أو الهاتف..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>

                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option>الكل</option>
                        <option>نشط</option>
                        <option>غير نشط</option>
                    </select>
                    <button
                        className="filter-btn"
                        onClick={clearFilter}
                    >
                        تصفية النتائج
                    </button>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>اسم السائق</th>
                            <th>رقم الهاتف</th>
                            <th>نوع المركبة</th>
                            <th>رقم المركبة</th>
                            <th>الحالة</th>
                            <th>الإجراءات</th>
                        </tr>
                    </thead>

                    <tbody>
                        {showDrivers.map((driver, index) => (
                            <tr key={index}>
                                <td>
                                    <div className="driver-name">
                                        <span>{driver.fullname?.charAt(0)}</span>
                                        <b>{driver.fullname}</b>
                                    </div>
                                </td>

                                <td>{driver.phone}</td>

                                <td>{driver.driver?.vehicle_type || 'غير محدد'}</td>

                                <td>{driver.driver?.vehicle_number || 'غير محدد'}</td>

                                <td>
                                    <span className={driver.is_active ? 'state active' : 'state stop'}>
                                        {driver.is_active ? 'نشط' : 'غير نشط'}
                                    </span>
                                </td>

                                <td>
                                    <div className="action-btns">
                                        <button onClick={() => setShowDriver(driver)}>
                                            <Eye size={16} />
                                        </button>

                                        {/* <button>
                                            <Pencil size={16} />
                                        </button>

                                        <button>
                                            <Trash2 size={16} />
                                        </button> */}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="table-end">
                    <p>عرض {showDrivers.length} من أصل {drivers.length} سائق</p>

                    <div className="pages">
                        <button className="page-btn">
                            <ChevronRight size={16} />
                        </button>

                        <button className="active">1</button>

                        <button className="page-btn">
                            <ChevronLeft size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {showDriver && (
                <div className="form-bg">
                    <div className="driver-form">
                        <div className="form-head">
                            <h3>بيانات السائق</h3>

                            <button onClick={() => setShowDriver(null)}>
                                <X size={18} />
                            </button>
                        </div>

                        <div className="show-line">
                            <span>الاسم</span>
                            <b>{showDriver.fullname}</b>
                        </div>

                        <div className="show-line">
                            <span>الهاتف</span>
                            <b>{showDriver.phone}</b>
                        </div>

                        <div className="show-line">
                            <span>نوع المركبة</span>
                            <b>{showDriver.driver?.vehicle_type || 'غير محدد'}</b>
                        </div>

                        <div className="show-line">
                            <span>رقم المركبة</span>
                            <b>{showDriver.driver?.vehicle_number || 'غير محدد'}</b>
                        </div>

                        <div className="show-line">
                            <span>الحالة</span>
                            <b>{showDriver.is_active ? 'نشط' : 'غير نشط'}</b>
                        </div>
                    </div>
                </div>
            )}
            {showForm && (
                <div className="form-bg">
                    <form className="driver-form" onSubmit={saveDriver}>

                        <div className="form-head">
                            <h3>إضافة سائق جديد</h3>

                            <button type="button" onClick={() => setShowForm(false)}>
                                <X size={18} />
                            </button>
                        </div>

                        <div className="form-input">
                            <label>اسم السائق</label>
                            <input
                                type="text"
                                name="fullname"
                                value={driverForm.fullname}
                                onChange={handleDriverChange}
                            />
                        </div>

                        <div className="form-input">
                            <label>رقم الهاتف</label>
                            <input
                                type="text"
                                name="phone"
                                value={driverForm.phone}
                                onChange={handleDriverChange}
                            />
                        </div>

                        <div className="form-input">
                            <label>كلمة المرور</label>
                            <input
                                type="password"
                                name="password"
                                value={driverForm.password}
                                onChange={handleDriverChange}
                            />
                        </div>

                        <div className="form-input">
                            <label>نوع المركبة</label>
                            <input
                                type="text"
                                name="vehicle_type"
                                value={driverForm.vehicle_type}
                                onChange={handleDriverChange}
                            />
                        </div>

                        <div className="form-input">
                            <label>رقم المركبة</label>
                            <input
                                type="text"
                                name="vehicle_number"
                                value={driverForm.vehicle_number}
                                onChange={handleDriverChange}
                            />
                        </div>

                        <div className="form-btns">
                            <button type="button" onClick={() => setShowForm(false)}>
                                إلغاء
                            </button>

                            <button type="submit">
                                إضافة السائق
                            </button>
                        </div>

                    </form>
                </div>
            )}
        </div>
    )
}

export default Drivers