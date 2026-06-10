import { useState } from 'react'
import {
    Wallet,
    TrendingUp,
    CreditCard,
    ReceiptText,
    Download,
    Eye,
    Pencil,
    Trash2,
    X,
    ChevronRight,
    ChevronLeft
} from 'lucide-react'
import './Finance.css'

function Finance() {
    const [filter, setFilter] = useState('الكل')
    const [showItem, setShowItem] = useState(null)
    const [editIndex, setEditIndex] = useState(null)
    const [deleteIndex, setDeleteIndex] = useState(null)

    const [form, setForm] = useState({
        id: '',
        type: '',
        source: '',
        amount: '',
        date: '',
        status: 'مكتمل'
    })

    const [items, setItems] = useState([
        {
            id: '#PAY-1001',
            type: 'دفعة مطعم',
            source: 'برجر هاوس',
            amount: '2,450.00 SAR',
            date: '2024/07/15',
            status: 'مكتمل'
        },
        {
            id: '#PAY-1002',
            type: 'رسوم توصيل',
            source: 'طلب #ORD-9021',
            amount: '245.00 SAR',
            date: '2024/07/16',
            status: 'قيد المعالجة'
        },
        {
            id: '#PAY-1003',
            type: 'استرداد',
            source: 'طلب #ORD-9019',
            amount: '120.50 SAR',
            date: '2024/07/18',
            status: 'معلق'
        }
    ])

    const cards = [
        {
            title: 'إجمالي الإيرادات',
            value: '420,000 SAR',
            text: '+15% هذا الشهر',
            icon: Wallet,
            color: '#0D1C32',
            bg: '#EEF2FF'
        },
        {
            title: 'أرباح اليوم',
            value: '15,400 SAR',
            text: 'نشاط جيد',
            icon: TrendingUp,
            color: '#059669',
            bg: '#ECFDF5'
        },
        {
            title: 'مدفوعات معلقة',
            value: '42',
            text: 'تحتاج مراجعة',
            icon: CreditCard,
            color: '#D97706',
            bg: '#FFFBEB'
        },
        {
            title: 'عدد العمليات',
            value: '2,963',
            text: 'هذا الشهر',
            icon: ReceiptText,
            color: '#2563EB',
            bg: '#EFF6FF'
        }
    ]

    const showItems = items.filter((item) => {
        return filter === 'الكل' || item.status === filter
    })

    const openEdit = (item, index) => {
        setEditIndex(index)
        setForm(item)
    }

    const closeEdit = () => {
        setEditIndex(null)
        setForm({
            id: '',
            type: '',
            source: '',
            amount: '',
            date: '',
            status: 'مكتمل'
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        setForm((prevForm) => ({
            ...prevForm,
            [name]: value
        }))
    }

    const saveEdit = (e) => {
        e.preventDefault()

        setItems((prevItems) => prevItems.map((item, index) =>
            index === editIndex ? form : item
        ))

        closeEdit()
    }

    const deleteItem = () => {
        setItems((prevItems) => prevItems.filter((item, index) => index !== deleteIndex))
        setDeleteIndex(null)
    }

    return (
        <div className="finance-page">
            <div className="finance-head">
                <button className="finance-export-btn">
                    <Download size={17} />
                    تصدير التقرير
                </button>

                <div className="finance-title">
                    <h1>الإدارة المالية</h1>
                    <p>متابعة الإيرادات والمدفوعات والعمليات المالية اليومية.</p>
                </div>
            </div>

            <div className="finance-cards">
                {cards.map((card, index) => {
                    const Icon = card.icon

                    return (
                        <div className="finance-card" key={index}>
                            <div className="finance-card-text">
                                <p>{card.title}</p>
                                <h3>{card.value}</h3>
                                <span>{card.text}</span>
                            </div>

                            <div
                                className="finance-card-icon"
                                style={{ color: card.color, backgroundColor: card.bg }}
                            >
                                <Icon size={21} />
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="finance-box">
                <div className="finance-filter">
                    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option>الكل</option>
                        <option>مكتمل</option>
                        <option>قيد المعالجة</option>
                        <option>معلق</option>
                    </select>

                    <h3>قائمة العمليات المالية</h3>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>رقم العملية</th>
                            <th>النوع</th>
                            <th>المصدر</th>
                            <th>المبلغ</th>
                            <th>التاريخ</th>
                            <th>الحالة</th>
                            <th>العمليات</th>
                        </tr>
                    </thead>

                    <tbody>
                        {showItems.map((item, index) => (
                            <tr key={index}>
                                <td><b>{item.id}</b></td>
                                <td>{item.type}</td>
                                <td>{item.source}</td>
                                <td>{item.amount}</td>
                                <td>{item.date}</td>
                                <td>
                                    <span className={
                                        item.status === 'مكتمل'
                                            ? 'finance-state done'
                                            : item.status === 'قيد المعالجة'
                                                ? 'finance-state work'
                                                : 'finance-state wait'
                                    }>
                                        {item.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="finance-btns">
                                        <button onClick={() => setShowItem(item)}>
                                            <Eye size={16} />
                                        </button>
                                        <button onClick={() => openEdit(item, index)}>
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

                <div className="finance-table-end">
                    <p>عرض 1 إلى 10 من أصل 2,963 عملية</p>

                    <div className="finance-pages">
                        <button>
                            <ChevronRight size={16} />
                        </button>
                        <button className="active">1</button>
                        <button>2</button>
                        <button>3</button>
                        <button>
                            <ChevronLeft size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {showItem && (
                <div className="finance-bg">
                    <div className="finance-form">
                        <div className="finance-form-head">
                            <h3>بيانات العملية</h3>
                            <button onClick={() => setShowItem(null)}>
                                <X size={18} />
                            </button>
                        </div>

                        <div className="finance-line"><span>رقم العملية</span><b>{showItem.id}</b></div>
                        <div className="finance-line"><span>النوع</span><b>{showItem.type}</b></div>
                        <div className="finance-line"><span>المصدر</span><b>{showItem.source}</b></div>
                        <div className="finance-line"><span>المبلغ</span><b>{showItem.amount}</b></div>
                        <div className="finance-line"><span>التاريخ</span><b>{showItem.date}</b></div>
                        <div className="finance-line"><span>الحالة</span><b>{showItem.status}</b></div>
                    </div>
                </div>
            )}

            {editIndex !== null && (
                <div className="finance-bg">
                    <form className="finance-form" onSubmit={saveEdit}>
                        <div className="finance-form-head">
                            <h3>تعديل العملية</h3>
                            <button type="button" onClick={closeEdit}>
                                <X size={18} />
                            </button>
                        </div>

                        <div className="finance-input">
                            <label>رقم العملية</label>
                            <input name="id" value={form.id} onChange={handleChange} />
                        </div>

                        <div className="finance-input">
                            <label>النوع</label>
                            <input name="type" value={form.type} onChange={handleChange} />
                        </div>

                        <div className="finance-input">
                            <label>المصدر</label>
                            <input name="source" value={form.source} onChange={handleChange} />
                        </div>

                        <div className="finance-input">
                            <label>المبلغ</label>
                            <input name="amount" value={form.amount} onChange={handleChange} />
                        </div>

                        <div className="finance-input">
                            <label>التاريخ</label>
                            <input name="date" value={form.date} onChange={handleChange} />
                        </div>

                        <div className="finance-input">
                            <label>الحالة</label>
                            <select name="status" value={form.status} onChange={handleChange}>
                                <option>مكتمل</option>
                                <option>قيد المعالجة</option>
                                <option>معلق</option>
                            </select>
                        </div>

                        <div className="finance-form-btns">
                            <button type="button" onClick={closeEdit}>إلغاء</button>
                            <button type="submit">حفظ التعديل</button>
                        </div>
                    </form>
                </div>
            )}

            {deleteIndex !== null && (
                <div className="finance-bg">
                    <div className="finance-form">
                        <h3>تأكيد الحذف</h3>
                        <p className="finance-delete-text">هل أنت متأكد من حذف هذه العملية؟</p>

                        <div className="finance-form-btns">
                            <button onClick={() => setDeleteIndex(null)}>إلغاء</button>
                            <button onClick={deleteItem}>حذف</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Finance