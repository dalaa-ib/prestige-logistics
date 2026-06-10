import { useState } from 'react'
import {
    Plus,
    Eye,
    Pencil,
    Trash2,
    X,
    ChevronRight,
    ChevronLeft,
    Download,
    Filter,
    BadgeCheck
} from 'lucide-react'
import './PromoCodes.css'

import promotionalStrategy from '../../assets/images/promotionalStrategy.png'
import marketingSpecialist from '../../assets/images/marketingSpecialist.png'

function PromoCodes() {
    const [showForm, setShowForm] = useState(false)
    const [showCode, setShowCode] = useState(null)
    const [editIndex, setEditIndex] = useState(null)
    const [deleteIndex, setDeleteIndex] = useState(null)

    const [form, setForm] = useState({
        code: '',
        discount: '',
        uses: '',
        endDate: '',
        status: 'نشط'
    })

    const [codes, setCodes] = useState([
        {
            code: 'SUMMER20',
            discount: '20%',
            uses: '450 / 500',
            endDate: '2024/09/30',
            status: 'نشط'
        },
        {
            code: 'PRESTIGE50',
            discount: '50%',
            uses: '1,200 / 1,200',
            endDate: '2024/12/31',
            status: 'نشط'
        },
        {
            code: 'FIRSTORDER',
            discount: '15%',
            uses: '890 / 1,000',
            endDate: '2024/01/01',
            status: 'غير نشط'
        }
    ])

    const cards = [
        {
            title: 'إجمالي الأكواد',
            value: '124',
            text: '+12%',
        },
        {
            title: 'الأكواد النشطة',
            value: '86',
            text: '',
        },
        {
            title: 'إجمالي الاستخدام',
            value: '1,420',
            text: '',
        },
        {
            title: 'معدل التحويل',
            value: '24.5%',
            text: '',
        }
    ]

    const openAddForm = () => {
        setEditIndex(null)
        setForm({
            code: '',
            discount: '',
            uses: '',
            endDate: '',
            status: 'نشط'
        })
        setShowForm(true)
    }

    const openEditForm = (item, index) => {
        setEditIndex(index)
        setForm(item)
        setShowForm(true)
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        setForm((prevForm) => ({
            ...prevForm,
            [name]: value
        }))
    }

    const saveCode = (e) => {
        e.preventDefault()

        if (!form.code || !form.discount || !form.uses || !form.endDate) {
            return
        }

        if (editIndex !== null) {
            setCodes((prevCodes) => prevCodes.map((item, index) =>
                index === editIndex ? form : item
            ))
        } else {
            setCodes((prevCodes) => [form, ...prevCodes])
        }

        setShowForm(false)
        setEditIndex(null)
    }

    const deleteCode = () => {
        setCodes((prevCodes) => prevCodes.filter((item, index) => index !== deleteIndex))
        setDeleteIndex(null)
    }

    return (
        <div className="promo-page">
            <div className="promo-head">
                <button className="promo-add-btn" onClick={openAddForm}>
                    <Plus size={17} />
                    إضافة كود جديد
                </button>

                <div>
                    <h1>إدارة أكواد الخصم</h1>
                    <p>إدارة وتتبع فعالية الحملات الترويجية وقسائم الشراء</p>
                </div>
            </div>

            <div className="promo-cards">
                {cards.map((card, index) => (
                    <div className="promo-card" key={index}>
                        <p>{card.title}</p>
                        <h3>{card.value}</h3>
                        {card.text && <span>{card.text}</span>}
                    </div>
                ))}
            </div>

            <div className="promo-table-box">
                <div className="promo-table-top">
                    <h3>قائمة الأكواد</h3>

                    <div className="promo-small-btns">
                        <button>
                            <Download size={16} />
                        </button>
                        <button>
                            <Filter size={16} />
                        </button>
                    </div>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>الكود</th>
                            <th>نسبة الخصم</th>
                            <th>عدد الاستخدام</th>
                            <th>تاريخ الانتهاء</th>
                            <th>الحالة</th>
                            <th>العمليات</th>
                        </tr>
                    </thead>

                    <tbody>
                        {codes.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <span className="promo-code-name">
                                        {item.code}
                                    </span>
                                </td>
                                <td>{item.discount}</td>
                                <td>{item.uses}</td>
                                <td>{item.endDate}</td>
                                <td>
                                    <span className={item.status === 'نشط' ? 'promo-state active' : 'promo-state stop'}>
                                        {item.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="promo-actions">
                                        <button onClick={() => setShowCode(item)}>
                                            <Eye size={16} />
                                        </button>
                                        <button onClick={() => openEditForm(item, index)}>
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

                <div className="promo-table-end">
                    <p>عرض 1 إلى 10 من أصل 124 كود خصم</p>

                    <div className="promo-pages">
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

            <div className="promo-bottom">
                <div className="promo-note">
                    <div className="note-icon">
                        <BadgeCheck size={18} />
                    </div>                    <h3>نصيحة الخبير</h3>
                    <p>"تفعيل الأكواد لفترات محدودة (Flash Sales) يرفع معدل التحويل بنسبة تصل إلى 40% مقارنة بالأكواد
                        الدائمة."</p>
                    <div className="note-user">
                        <img src={marketingSpecialist} alt="أخصائي التسويق" />
                        <div>
                            <h4>أحمد سامي</h4>
                            <span>مختص تسويق رقمي</span>
                        </div>
                    </div>
                </div>

                <div className="promo-image">
                    <img src={promotionalStrategy} alt="استراتيجية العروض" />
                    <div>
                        <h3>تحليل أداء الحملات</h3>
                        <p>اكتشف أي الأكواد تحقق أعلى نسبة مبيعات وأفضل وصول للعملاء.</p>
                        <button>مشاهدة التقرير</button>
                    </div>
                </div>
            </div>

            {showForm && (
                <div className="promo-bg">
                    <form className="promo-form" onSubmit={saveCode}>
                        <div className="promo-form-head">
                            <h3>{editIndex !== null ? 'تعديل كود الخصم' : 'إضافة كود جديد'}</h3>
                            <button type="button" onClick={() => setShowForm(false)}>
                                <X size={18} />
                            </button>
                        </div>

                        <div className="promo-input">
                            <label>الكود</label>
                            <input
                                type="text"
                                name="code"
                                value={form.code}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="promo-input">
                            <label>نسبة الخصم</label>
                            <input
                                type="text"
                                name="discount"
                                value={form.discount}
                                onChange={handleChange}
                                placeholder="20%"
                            />
                        </div>

                        <div className="promo-input">
                            <label>عدد الاستخدام</label>
                            <input
                                type="text"
                                name="uses"
                                value={form.uses}
                                onChange={handleChange}
                                placeholder="450 / 500"
                            />
                        </div>

                        <div className="promo-input">
                            <label>تاريخ الانتهاء</label>
                            <input
                                type="text"
                                name="endDate"
                                value={form.endDate}
                                onChange={handleChange}
                                placeholder="2024/09/30"
                            />
                        </div>

                        <div className="promo-input">
                            <label>الحالة</label>
                            <select name="status" value={form.status} onChange={handleChange}>
                                <option>نشط</option>
                                <option>غير نشط</option>
                            </select>
                        </div>

                        <div className="promo-form-btns">
                            <button type="button" onClick={() => setShowForm(false)}>
                                إلغاء
                            </button>
                            <button type="submit">
                                {editIndex !== null ? 'حفظ التعديل' : 'إضافة الكود'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {showCode && (
                <div className="promo-bg">
                    <div className="promo-form">
                        <div className="promo-form-head">
                            <h3>بيانات الكود</h3>
                            <button onClick={() => setShowCode(null)}>
                                <X size={18} />
                            </button>
                        </div>

                        <div className="promo-line">
                            <span>الكود</span>
                            <b>{showCode.code}</b>
                        </div>

                        <div className="promo-line">
                            <span>نسبة الخصم</span>
                            <b>{showCode.discount}</b>
                        </div>

                        <div className="promo-line">
                            <span>عدد الاستخدام</span>
                            <b>{showCode.uses}</b>
                        </div>

                        <div className="promo-line">
                            <span>تاريخ الانتهاء</span>
                            <b>{showCode.endDate}</b>
                        </div>

                        <div className="promo-line">
                            <span>الحالة</span>
                            <b>{showCode.status}</b>
                        </div>
                    </div>
                </div>
            )}

            {deleteIndex !== null && (
                <div className="promo-bg">
                    <div className="promo-form">
                        <h3>تأكيد الحذف</h3>
                        <p className="promo-delete-text">هل أنت متأكد من حذف هذا الكود؟</p>

                        <div className="promo-form-btns">
                            <button onClick={() => setDeleteIndex(null)}>
                                إلغاء
                            </button>
                            <button onClick={deleteCode}>
                                حذف
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PromoCodes