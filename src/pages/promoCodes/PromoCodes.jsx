import { useState, useEffect } from 'react'
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
import api from '../../api/api'

import promotionalStrategy from '../../assets/images/promotionalStrategy.png'
import marketingSpecialist from '../../assets/images/marketingSpecialist.png'

function PromoCodes() {
    const [showForm, setShowForm] = useState(false)
    const [showCode, setShowCode] = useState(null)
    const [editIndex, setEditIndex] = useState(null)
    const [deleteIndex, setDeleteIndex] = useState(null)

    const [form, setForm] = useState({
        code: '',
        discount_type: 'percentage',
        discount_value: '',
        min_order_value: '',
        max_uses: '',
        expiry_date: ''
    })

    const [codes, setCodes] = useState([])
    const [promoStats, setPromoStats] = useState({
        total: 0,
        active: 0,
        usage: 0,
        conversion: 0
    })

    const cards = [
        {
            title: 'إجمالي الأكواد',
            value: promoStats.total,
            text: '',
        },
        {
            title: 'الأكواد النشطة',
            value: promoStats.active,
            text: '',
        },
        {
            title: 'إجمالي الاستخدام',
            value: promoStats.usage,
            text: '',
        },
        {
            title: 'معدل التحويل',
            value: `${promoStats.conversion}%`,
            text: '',
        }
    ]

    useEffect(() => {
        const getPromoCodes = async () => {
            try {
                const response = await api.get('/admin/getPromoCode')

                const data = Array.isArray(response.data)
                    ? response.data
                    : response.data.data || []

                console.log(response.data)

                setCodes(data)
                setPromoStats({
                    total: data.length,
                    active: data.filter((item) => item.is_active).length,
                    usage: data.reduce((sum, item) => sum + (item.used_count || 0), 0),
                    conversion: 0
                })

            } catch (error) {
                console.log(error)
            }
        }

        getPromoCodes()
    }, [])

    const openAddForm = () => {
        setEditIndex(null)
        setForm({
            code: '',
            discount_type: 'percentage',
            discount_value: '',
            min_order_value: '',
            max_uses: '',
            expiry_date: ''
        })
        setShowForm(true)
    }

    const openEditForm = (item, index) => {
        setEditIndex(item.id)

        setForm({
            code: item.code || '',
            discount_type: item.discount_type || 'percentage',
            discount_value: item.discount_value || '',
            min_order_value: item.min_order_value || '',
            max_uses: item.max_uses || '',
            expiry_date: item.expiry_date ? item.expiry_date.split(' ')[0] : ''
        })

        setShowForm(true)
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        setForm((prevForm) => ({
            ...prevForm,
            [name]: value
        }))
    }

    const saveCode = async (e) => {
        e.preventDefault()

        try {

            const data = {
                code: form.code,
                discount_type: form.discount_type,
                discount_value: Number(form.discount_value),
                min_order_value: Number(form.min_order_value),
                max_uses: Number(form.max_uses),
                expiry_date: form.expiry_date
            }
            if (editIndex !== null) {
                await api.post(
                    `/admin/UpdatePromoCode/${editIndex}`,
                    data
                )
            } else {
                await api.post(
                    '/admin/AddPromoCode',
                    data
                )
                console.log('updated')
            }

            const promoResponse = await api.get('/admin/getPromoCode')
            console.log(promoResponse.data)
            setCodes(promoResponse.data.data)

            setShowForm(false)
            setEditIndex(null)

        } catch (error) {
            console.log(error.response?.data)
        }
    }

    const deleteCode = async () => {
        try {
            await api.delete(`/admin/DeletePromoCode/${deleteIndex.id}`)
            const response = await api.get('/admin/getPromoCode')
            setCodes(response.data.data)
            setDeleteIndex(null)
        } catch (error) {
            console.log(error)
        }
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
                                <td>
                                    {item.discount_value}
                                    {item.discount_type === 'percentage' ? '%' : ''}
                                </td>
                                <td>{item.max_uses}</td>
                                <td>{item.expiry_date}</td>
                                <td>
                                    <span className={item.is_active ? 'promo-state active' : 'promo-state stop'}>
                                        {item.is_active ? 'نشط' : 'غير نشط'}
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
                                        <button onClick={() => setDeleteIndex(item)}>
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="promo-table-end">
                    <p>عرض {codes.length} من أصل {codes.length} كود خصم</p>

                    <div className="promo-pages">
                        <button>
                            <ChevronRight size={16} />
                        </button>
                        <button className="active">1</button>
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
                    </div>
                    <h3>نصيحة الخبير</h3>
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
                            <label>نوع الخصم</label>
                            <select
                                name="discount_type"
                                value={form.discount_type}
                                onChange={handleChange}
                            >
                                <option value="percentage">نسبة</option>
                                <option value="fixed">قيمة ثابتة</option>
                            </select>
                        </div>

                        <div className="promo-input">
                            <label>قيمة الخصم</label>
                            <input
                                type="text"
                                name="discount_value"
                                value={form.discount_value}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="promo-input">
                            <label>أقل قيمة طلب</label>
                            <input
                                type="text"
                                name="min_order_value"
                                value={form.min_order_value}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="promo-input">
                            <label>عدد الاستخدام</label>
                            <input
                                type="text"
                                name="max_uses"
                                value={form.max_uses}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="promo-input">
                            <label>تاريخ الانتهاء</label>
                            <input
                                type="date"
                                name="expiry_date"
                                min={new Date().toISOString().split('T')[0]}
                                value={form.expiry_date}
                                onChange={handleChange}
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
                            <b>
                                {showCode.discount_value}
                                {showCode.discount_type === 'percentage' ? '%' : ''}
                            </b>
                        </div>

                        <div className="promo-line">
                            <span>عدد الاستخدام</span>
                            <b>{showCode.max_uses}</b>
                        </div>

                        <div className="promo-line">
                            <span>تاريخ الانتهاء</span>
                            <b>{showCode.expiry_date}</b>
                        </div>

                        <div className="promo-line">
                            <span>الحالة</span>
                            <b>{showCode.is_active ? 'نشط' : 'غير نشط'}</b>
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