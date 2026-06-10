import { useState } from 'react'
import {
    Search,
    Plus,
    Eye,
    Pencil,
    Trash2,
    X,
    ChevronRight,
    ChevronLeft,
    Users,
    CheckCircle,
    Truck,
    CalendarDays,
    Clock,
    FileText,
    Download
} from 'lucide-react'
import './Drivers.css'

import currentDriver from '../../assets/images/current_driver.png'

function Drivers() {
    const [search, setSearch] = useState('')
    const [city, setCity] = useState('الكل')
    const [status, setStatus] = useState('الكل')
    const [showForm, setShowForm] = useState(false)
    const [editIndex, setEditIndex] = useState(null)
    const [showDriver, setShowDriver] = useState(null)
    const [deleteIndex, setDeleteIndex] = useState(null)

    const [driverForm, setDriverForm] = useState({
        letter: '',
        name: '',
        phone: '',
        city: 'الرياض',
        car: '',
        status: 'نشط',
        rate: 'مهم'
    })

    const [drivers, setDrivers] = useState([
        {
            letter: 'ن',
            name: 'نبيل الغامدي',
            phone: '+966 50 123 4567',
            city: 'الرياض',
            car: 'شاحنة تويوتا L12',
            status: 'نشط',
            rate: 'مهم'
        },
        {
            letter: 'س',
            name: 'سعود الحربي',
            phone: '+966 55 987 6543',
            city: 'جدة',
            car: 'بيك أب تويوتا',
            status: 'نشط',
            rate: 'تم'
        },
        {
            letter: 'ع',
            name: 'خالد العتيبي',
            phone: '+966 54 321 0987',
            city: 'الدمام',
            car: 'شاحنة ثقيلة',
            status: 'غير نشط',
            rate: 'تم'
        },
        {
            letter: 'م',
            name: 'ماجد السبيعي',
            phone: '+966 56 111 2233',
            city: 'الرياض',
            car: 'فان ساكو',
            status: 'نشط',
            rate: 'مهم'
        }
    ])

    const cards = [
        {
            title: 'إجمالي السائقين',
            value: '1,284',
            text: '+12%',
            icon: Users,
            color: '#2563EB',
            bg: '#EEF2FF'
        },
        {
            title: 'السائقين النشطين',
            value: '1,120',
            text: 'متاح الآن',
            icon: CheckCircle,
            color: '#16A34A',
            bg: '#F0FDF4'
        },
        {
            title: 'الشحنات اليوم',
            value: '456',
            text: 'تم تسليمها',
            icon: Truck,
            color: '#2563EB',
            bg: '#EEF2FF'
        },
        {
            title: 'طلبات معلقة',
            value: '89',
            text: 'بانتظار المعالجة',
            icon: CalendarDays,
            color: '#EF4444',
            bg: '#FEF2F2'
        },
        {
            title: 'قيد التوصيل',
            value: '134',
            text: 'على الطريق',
            icon: Truck,
            color: '#785A2E',
            bg: '#FDD39E'
        },
        {
            title: 'اكتملت اليوم',
            value: '2,841',
            text: 'نجاح مرتفع',
            icon: CheckCircle,
            color: '#44474D',
            bg: '#E6E8EA'
        }
    ]

    const mainDriver = {
        letter: 'أ',
        name: 'أحمد محمد الشهري',
        phone: '+966 58 451 7789',
        city: 'الرياض',
        car: 'سيارة توصيل',
        status: 'نشط',
        rate: '4.9',
        orders: '87 طلب هذا الشهر'
    }

    const showDrivers = drivers.filter((driver) => {
        const searchOk =
            driver.name.includes(search) ||
            driver.phone.includes(search)

        const cityOk = city === 'الكل' || driver.city === city
        const statusOk = status === 'الكل' || driver.status === status

        return searchOk && cityOk && statusOk
    })

    const openAddForm = () => {
        setEditIndex(null)
        setDriverForm({
            letter: '',
            name: '',
            phone: '',
            city: 'الرياض',
            car: '',
            status: 'نشط',
            rate: 'مهم'
        })
        setShowForm(true)
    }

    const openEditForm = (driver, index) => {
        setEditIndex(index)
        setDriverForm(driver)
        setShowForm(true)
    }

    const closeForm = () => {
        setShowForm(false)
        setEditIndex(null)
    }

    const handleDriverChange = (e) => {
        const { name, value } = e.target

        setDriverForm((prevForm) => ({
            ...prevForm,
            [name]: value
        }))
    }

    const saveDriver = (e) => {
        e.preventDefault()

        if (!driverForm.letter || !driverForm.name || !driverForm.phone || !driverForm.car) {
            return
        }

        if (editIndex !== null) {
            setDrivers((prevDrivers) => prevDrivers.map((driver, index) =>
                index === editIndex ? driverForm : driver
            ))
        } else {
            setDrivers((prevDrivers) => [driverForm, ...prevDrivers])
        }

        closeForm()
    }

    const deleteDriver = () => {
        setDrivers((prevDrivers) => prevDrivers.filter((driver, index) => index !== deleteIndex))
        setDeleteIndex(null)
    }

    return (
        <div className="drivers-page">
            <div className="drivers-head">
                <div>
                    <h1>إدارة السائقين</h1>
                    <p>راقب أداء سائقينك وكل طلباتهم اليومية.</p>
                </div>

                <button className="add-btn" onClick={openAddForm}>
                    <Plus size={17} />
                    إضافة سائق جديد
                </button>
            </div>

            <div className="cards-box">
                {cards.map((card, index) => {
                    const Icon = card.icon

                    return (
                        <div className="info-card" key={index}>
                            <div
                                className="card-icon"
                                style={{ color: card.color, backgroundColor: card.bg }}
                            >
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
                        <h3>{mainDriver.name}</h3>
                        <span>في {mainDriver.city} - تقييم {mainDriver.rate} - {mainDriver.orders}</span>

                        <div className="driver-btns">
                            <button>إنشاء طلب جديد</button>
                            <button onClick={() => setShowDriver(mainDriver)}>
                                عرض الملف
                            </button>
                        </div>
                    </div>
                </div>

                <div className="report-box">
                    <h3>تقارير الأداء</h3>
                    <p>تحميل تقارير مفصلة لجميع السائقين والطلبات.</p>

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
                        <input
                            type="text"
                            placeholder="بحث باسم السائق أو الهاتف..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <select value={city} onChange={(e) => setCity(e.target.value)}>
                        <option>الكل</option>
                        <option>الرياض</option>
                        <option>جدة</option>
                        <option>الدمام</option>
                    </select>

                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option>الكل</option>
                        <option>نشط</option>
                        <option>غير نشط</option>
                    </select>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>اسم السائق</th>
                            <th>رقم الهاتف</th>
                            <th>المدينة</th>
                            <th>نوع المركبة</th>
                            <th>الحالة</th>
                            <th>معدل الأداء</th>
                            <th>الإجراءات</th>
                        </tr>
                    </thead>

                    <tbody>
                        {showDrivers.map((driver, index) => (
                            <tr key={index}>
                                <td>
                                    <div className="driver-name">
                                        <span>{driver.letter}</span>
                                        <b>{driver.name}</b>
                                    </div>
                                </td>

                                <td>{driver.phone}</td>
                                <td>{driver.city}</td>
                                <td>{driver.car}</td>

                                <td>
                                    <span className={driver.status === 'نشط' ? 'state active' : 'state stop'}>
                                        {driver.status}
                                    </span>
                                </td>

                                <td>
                                    <span className="rate">{driver.rate}</span>
                                </td>

                                <td>
                                    <div className="action-btns">
                                        <button onClick={() => setShowDriver(driver)}>
                                            <Eye size={16} />
                                        </button>

                                        <button onClick={() => openEditForm(driver, index)}>
                                            <Pencil size={16} />
                                        </button>

                                        <button onClick={() => setDeleteIndex(index)}>
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="table-end">
                    <p>عرض 1 إلى 10 من أصل 1,284 سائق</p>

                    <div className="pages">
                        <button className="page-btn">
                            <ChevronRight size={16} />
                        </button>
                        <button className="active">1</button>
                        <button>2</button>
                        <button>3</button>
                        <button className="page-btn">
                            <ChevronLeft size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {showForm && (
                <div className="form-bg">
                    <form className="driver-form" onSubmit={saveDriver}>
                        <div className="form-head">
                            <h3>{editIndex !== null ? 'تعديل السائق' : 'إضافة سائق جديد'}</h3>
                            <button type="button" onClick={closeForm}>
                                <X size={18} />
                            </button>
                        </div>

                        <div className="form-input">
                            <label>الحرف</label>
                            <input
                                type="text"
                                name="letter"
                                value={driverForm.letter}
                                onChange={handleDriverChange}
                                placeholder="ن"
                            />
                        </div>

                        <div className="form-input">
                            <label>اسم السائق</label>
                            <input
                                type="text"
                                name="name"
                                value={driverForm.name}
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
                            <label>المدينة</label>
                            <select name="city" value={driverForm.city} onChange={handleDriverChange}>
                                <option>الرياض</option>
                                <option>جدة</option>
                                <option>الدمام</option>
                            </select>
                        </div>

                        <div className="form-input">
                            <label>نوع المركبة</label>
                            <input
                                type="text"
                                name="car"
                                value={driverForm.car}
                                onChange={handleDriverChange}
                            />
                        </div>

                        <div className="form-input">
                            <label>الحالة</label>
                            <select name="status" value={driverForm.status} onChange={handleDriverChange}>
                                <option>نشط</option>
                                <option>غير نشط</option>
                            </select>
                        </div>

                        <div className="form-input">
                            <label>معدل الأداء</label>
                            <input
                                type="text"
                                name="rate"
                                value={driverForm.rate}
                                onChange={handleDriverChange}
                            />
                        </div>

                        <div className="form-btns">
                            <button type="button" onClick={closeForm}>
                                إلغاء
                            </button>
                            <button type="submit">
                                {editIndex !== null ? 'حفظ التعديل' : 'إضافة السائق'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

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
                            <b>{showDriver.name}</b>
                        </div>

                        <div className="show-line">
                            <span>الهاتف</span>
                            <b>{showDriver.phone}</b>
                        </div>

                        <div className="show-line">
                            <span>المدينة</span>
                            <b>{showDriver.city}</b>
                        </div>

                        <div className="show-line">
                            <span>المركبة</span>
                            <b>{showDriver.car}</b>
                        </div>

                        <div className="show-line">
                            <span>الحالة</span>
                            <b>{showDriver.status}</b>
                        </div>

                        <div className="show-line">
                            <span>معدل الأداء</span>
                            <b>{showDriver.rate}</b>
                        </div>
                    </div>
                </div>
            )}

            {deleteIndex !== null && (
                <div className="form-bg">
                    <div className="driver-form">
                        <h3>تأكيد الحذف</h3>
                        <p className="delete-text">هل أنت متأكد من حذف هذا السائق؟</p>

                        <div className="form-btns">
                            <button onClick={() => setDeleteIndex(null)}>
                                إلغاء
                            </button>
                            <button onClick={deleteDriver}>
                                حذف
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Drivers