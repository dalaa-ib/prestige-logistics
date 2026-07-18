import { useState, useEffect } from 'react'
import {
    PackageCheck,
    Clock,
    AlertCircle,
    ReceiptText,
    Download,
    Eye,
    Pencil,
    Trash2,
    X,
    ChevronRight,
    ChevronLeft,
    User,
    Utensils,
    Truck,
    Star
} from 'lucide-react'
import './Orders.css'
import api from '../../api/api'

function Orders() {
    const [showOrder, setShowOrder] = useState(null)
    const [editIndex, setEditIndex] = useState(null)
    const [deleteIndex, setDeleteIndex] = useState(null)

    const [orderForm, setOrderForm] = useState({
        number: '',
        customer: '',
        restaurant: '',
        driver: '',
        price: '',
        status: 'قيد التوصيل'
    })

    const [orders, setOrders] = useState([])
    const totalOrders = orders.length

    const pendingOrders = orders.filter(
        item => item.status === 'pending'
    ).length

    const deliveringOrders = orders.filter(
        item => item.status === 'delivering'
    ).length

    const completedOrders = orders.filter(
        item => item.status === 'completed'
    ).length
    useEffect(() => {
        const getOrders = async () => {
            try {
                const response = await api.get('/admin/AllOrders')

                console.log(response.data.data)

                setOrders(response.data.data)

            } catch (error) {
                console.log(error.response?.data || error)
            }
        }

        getOrders()
    }, [])
    const cards = [
        {
            title: 'إجمالي الطلبات',
            value: totalOrders,
            text: 'كل الطلبات',
            icon: ReceiptText,
            color: '#0D1C32',
            bg: '#EEF2FF'
        },

        {
            title: 'طلبات معلقة',
            value: pendingOrders,
            text: 'بانتظار المعالجة',
            icon: AlertCircle,
            color: '#D97706',
            bg: '#FFFBEB'
        },

        {
            title: 'قيد التوصيل',
            value: deliveringOrders,
            text: 'طلبات نشطة',
            icon: Clock,
            color: '#2563EB',
            bg: '#EFF6FF'
        },

        {
            title: 'مكتملة اليوم',
            value: completedOrders,
            text: 'تم التسليم',
            icon: PackageCheck,
            color: '#059669',
            bg: '#ECFDF5'
        }
    ]

    const openEdit = (item, index) => {
        setEditIndex(index)
        setOrderForm(item)
    }

    const closeEdit = () => {
        setEditIndex(null)
        setOrderForm({
            number: '',
            customer: '',
            restaurant: '',
            driver: '',
            price: '',
            status: 'قيد التوصيل'
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setOrderForm((prevForm) => ({
            ...prevForm,
            [name]: value
        }))
    }

    const saveEdit = (e) => {
        e.preventDefault()

        setOrders((prevOrders) => prevOrders.map((item, index) =>
            index === editIndex ? orderForm : item
        ))

        closeEdit()
    }

    const deleteOrder = () => {
        setOrders((prevOrders) => prevOrders.filter((item, index) => index !== deleteIndex))
        setDeleteIndex(null)
    }

    return (
        <div className="orders-page">
            <div className="orders-head">
                <div className="orders-actions">
                    <button className="orders-export-btn">
                        <Download size={17} />
                        تصدير التقرير
                    </button>
                </div>

                <div className="orders-title">
                    <h1>إدارة الطلبات</h1>
                    <p>متابعة حالة الطلبات اليومية وإدارة تفاصيلها.</p>
                </div>
            </div>

            <div className="orders-cards">
                {cards.map((card, index) => {
                    const Icon = card.icon

                    return (
                        <div className="orders-card" key={index}>
                            <div className="orders-card-text">
                                <p>{card.title}</p>
                                <h3>{card.value}</h3>
                                <span>{card.text}</span>
                            </div>

                            <div
                                className="orders-card-icon"
                                style={{ color: card.color, backgroundColor: card.bg }}
                            >
                                <Icon size={21} />
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="orders-content">
                <div className="orders-side">
                    <div className="order-top">
                        <div className="order-top-line">
                            <span>#ORD-9021</span>
                            <b>قيد التوصيل</b>
                        </div>

                        <h2>تفاصيل الطلب</h2>
                        <p>تم الإنشاء: 11:30 • التوصيل المتوقع: 12:15</p>
                    </div>

                    <div className="order-status">
                        <p className="side-label">حالة التتبع</p>

                        <div className="status-step green">
                            <span></span>
                            <div>
                                <h4>تم تجهيز الطلب</h4>
                                <p>11:45</p>
                            </div>
                        </div>

                        <div className="status-step blue">
                            <span></span>
                            <div>
                                <h4>السائق في الطريق للمطعم</h4>
                                <p>11:52</p>
                            </div>
                        </div>

                        <div className="status-step gray">
                            <span></span>
                            <div>
                                <h4>تم الاستلام من المطعم</h4>
                                <p>--:--</p>
                            </div>
                        </div>
                    </div>

                    <div className="side-section">
                        <div className="info-row">
                            <div className="info-icon"><User size={19} /></div>
                            <div>
                                <span>العميل</span>
                                <h4>جاسم السعيد</h4>
                                <p>حي النخيل، شارع الأمير نايف، الرياض</p>
                            </div>
                        </div>

                        <div className="info-row">
                            <div className="info-icon"><Utensils size={19} /></div>
                            <div>
                                <span>المطعم</span>
                                <h4>برجر ستيشن - فرع التخصصي</h4>
                            </div>
                        </div>

                        <div className="info-row">
                            <div className="info-icon"><Truck size={19} /></div>
                            <div>
                                <span>السائق</span>
                                <h4>فهد المطيري</h4>
                                <p className="rating">4.9 <Star size={13} fill="#FBBF24" /></p>
                            </div>
                        </div>
                    </div>

                    <div className="side-section">
                        <p className="side-label">قائمة الوجبات</p>

                        <div className="meal-row">
                            <span>2x وجبة برجر دبل كلاسيك</span>
                            <b>180.00 SAR</b>
                        </div>

                        <div className="meal-row">
                            <span>1x بطاطس بالجبنة - حجم كبير</span>
                            <b>35.00 SAR</b>
                        </div>

                        <div className="meal-row">
                            <span>2x كوكاكولا</span>
                            <b>10.00 SAR</b>
                        </div>
                    </div>

                    <div className="price-box">
                        <div>
                            <span>المجموع الفرعي</span>
                            <b>225.00 SAR</b>
                        </div>

                        <div>
                            <span>رسوم التوصيل</span>
                            <b>20.00 SAR</b>
                        </div>
                    </div>

                    <div className="total-box">
                        <span>الإجمالي</span>
                        <b>245.00 SAR</b>
                    </div>

                    <button className="orders-update-btn">
                        <Pencil size={17} />
                        تحديث الحالة
                    </button>
                </div>

                <div className="orders-table-box">
                    <div className="orders-table-title">
                        <h3>قائمة الطلبات الأخيرة</h3>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th>رقم الطلب</th>
                                <th>العميل</th>
                                <th>المطعم</th>
                                <th>السائق</th>
                                <th>المبلغ</th>
                                <th>الحالة</th>
                                <th>العمليات</th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map((item, index) => (
                                <tr key={index}>
                                    <td><b>{item.id}</b></td>
                                    <td>{item.user?.fullname || '-'}</td>
                                    <td>{item.restaurant?.name || '-'}</td>
                                    <td>{item.driver?.fullname || '-'}</td>
                                    <td>{item.total || item.price || '-'}</td>
                                    <td>
                                        <span className="orders-state delivery">
                                            {item.status || '-'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="orders-btns">
                                            <button onClick={() => setShowOrder(item)}>
                                                <Eye size={16} />
                                            </button>

                                            <button>
                                                <Pencil size={16} />
                                            </button>

                                            <button>
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="orders-table-end">
                        <p>عرض {orders.length} من أصل {orders.length} طلب</p>

                        <div className="orders-pages">
                            <button><ChevronRight size={16} /></button>
                            <button className="active">1</button>
                            <button><ChevronLeft size={16} /></button>
                        </div>
                    </div>
                </div>
            </div>

            {showOrder && (
                <div className="orders-bg">
                    <div className="orders-form">
                        <div className="orders-form-head">
                            <h3>بيانات الطلب</h3>
                            <button onClick={() => setShowOrder(null)}>
                                <X size={18} />
                            </button>
                        </div>

                        <div className="orders-line"><span>رقم الطلب</span><b>{showOrder.number}</b></div>
                        <div className="orders-line"><span>العميل</span><b>{showOrder.customer}</b></div>
                        <div className="orders-line"><span>المطعم</span><b>{showOrder.restaurant}</b></div>
                        <div className="orders-line"><span>السائق</span><b>{showOrder.driver}</b></div>
                        <div className="orders-line"><span>المبلغ</span><b>{showOrder.price}</b></div>
                        <div className="orders-line"><span>الحالة</span><b>{showOrder.status}</b></div>
                    </div>
                </div>
            )}

            {editIndex !== null && (
                <div className="orders-bg">
                    <form className="orders-form" onSubmit={saveEdit}>
                        <div className="orders-form-head">
                            <h3>تعديل الطلب</h3>
                            <button type="button" onClick={closeEdit}>
                                <X size={18} />
                            </button>
                        </div>

                        <div className="orders-input">
                            <label>رقم الطلب</label>
                            <input name="number" value={orderForm.number} onChange={handleChange} />
                        </div>

                        <div className="orders-input">
                            <label>العميل</label>
                            <input name="customer" value={orderForm.customer} onChange={handleChange} />
                        </div>

                        <div className="orders-input">
                            <label>المطعم</label>
                            <input name="restaurant" value={orderForm.restaurant} onChange={handleChange} />
                        </div>

                        <div className="orders-input">
                            <label>السائق</label>
                            <input name="driver" value={orderForm.driver} onChange={handleChange} />
                        </div>

                        <div className="orders-input">
                            <label>المبلغ</label>
                            <input name="price" value={orderForm.price} onChange={handleChange} />
                        </div>

                        <div className="orders-input">
                            <label>الحالة</label>
                            <select name="status" value={orderForm.status} onChange={handleChange}>
                                <option>قيد التوصيل</option>
                                <option>تحضير</option>
                                <option>مكتمل</option>
                            </select>
                        </div>

                        <div className="orders-form-btns">
                            <button type="button" onClick={closeEdit}>إلغاء</button>
                            <button type="submit">حفظ التعديل</button>
                        </div>
                    </form>
                </div>
            )}

            {deleteIndex !== null && (
                <div className="orders-bg">
                    <div className="orders-form">
                        <h3>تأكيد الحذف</h3>
                        <p className="orders-delete-text">هل أنت متأكد من حذف هذا الطلب؟</p>

                        <div className="orders-form-btns">
                            <button onClick={() => setDeleteIndex(null)}>إلغاء</button>
                            <button onClick={deleteOrder}>حذف</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Orders