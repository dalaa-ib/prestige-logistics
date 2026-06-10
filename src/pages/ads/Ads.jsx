import { useState } from 'react'
import {
    Search,
    Plus,
    Eye,
    Pencil,
    Trash2,
    X,
    Upload,
    Megaphone,
    MousePointerClick,
    BarChart3,
    Radio,
    ChevronRight,
    ChevronLeft
} from 'lucide-react'
import './Ads.css'

import ad1 from '../../assets/images/ad1.png'
import ad2 from '../../assets/images/ad2.png'

function Ads() {
    const [search, setSearch] = useState('')
    const [status, setStatus] = useState('الكل')
    const [showForm, setShowForm] = useState(false)
    const [editId, setEditId] = useState(null)
    const [showAd, setShowAd] = useState(null)
    const [deleteId, setDeleteId] = useState(null)

    const [form, setForm] = useState({
        title: '',
        text: '',
        start: '',
        end: '',
        status: 'نشط',
        image: ad1
    })

    const [ads, setAds] = useState([
        {
            id: 'AD-99210',
            title: 'عرض الصيف للمطاعم',
            text: 'حملة ترويجية لزيادة طلبات المطاعم خلال موسم الصيف.',
            start: '15 يونيو 2024',
            end: '15 يوليو 2024',
            status: 'نشط',
            image: ad1
        },
        {
            id: 'AD-99211',
            title: 'تخفيضات أسبوع اللوجستيات',
            text: 'إعلان خاص بعروض التوصيل وخدمات الشحن داخل المدن.',
            start: '01 يوليو 2024',
            end: '07 يوليو 2024',
            status: 'معلق',
            image: ad2
        }
    ])

    const cards = [
        {
            title: 'إجمالي الإعلانات',
            value: '24',
            text: '+4 هذا الشهر',
            icon: Megaphone,
            color: '#2563EB',
            bg: '#EEF2FF'
        },
        {
            title: 'الحملات النشطة',
            value: '12',
            text: '5 تنتهي قريباً',
            icon: Radio,
            color: '#059669',
            bg: '#ECFDF5'
        },
        {
            title: 'مرات الظهور',
            value: '1.2M',
            text: '+12.4% زيادة',
            icon: BarChart3,
            color: '#4F46E5',
            bg: '#EEF2FF'
        },
        {
            title: 'معدل النقرات',
            value: '4.8%',
            text: 'متوسط الحملات',
            icon: MousePointerClick,
            color: '#D97706',
            bg: '#FFFBEB'
        }
    ]

    const showAds = ads.filter((ad) => {
        const searchOk = ad.title.includes(search)
        const statusOk = status === 'الكل' || ad.status === status

        return searchOk && statusOk
    })

    const openAddForm = () => {
        setEditId(null)
        setForm({
            title: '',
            text: '',
            start: '',
            end: '',
            status: 'نشط',
            image: ad1
        })
        setShowForm(true)
    }

    const openEditForm = (ad) => {
        setEditId(ad.id)
        setForm({
            title: ad.title,
            text: ad.text,
            start: ad.start,
            end: ad.end,
            status: ad.status,
            image: ad.image
        })
        setShowForm(true)
    }

    const closeForm = () => {
        setShowForm(false)
        setEditId(null)
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        setForm((prevForm) => ({
            ...prevForm,
            [name]: value
        }))
    }

    const handleImage = (e) => {
        const file = e.target.files[0]

        if (!file) {
            return
        }

        setForm((prevForm) => ({
            ...prevForm,
            image: URL.createObjectURL(file)
        }))
    }

    const saveAd = (e) => {
        e.preventDefault()

        if (!form.title || !form.start || !form.end) {
            return
        }

        if (editId) {
            setAds((prevAds) => prevAds.map((ad) =>
                ad.id === editId
                    ? { ...ad, ...form }
                    : ad
            ))
        } else {
            const newAd = {
                id: ads.length + 1,
                title: form.title,
                text: form.text,
                start: form.start,
                end: form.end,
                status: form.status,
                image: form.image
            }

            setAds((prevAds) => [newAd, ...prevAds])
        }

        closeForm()
    }

    const confirmDelete = () => {
        setAds((prevAds) => prevAds.filter((ad) => ad.id !== deleteId))
        setDeleteId(null)
    }

    return (
        <div className="ads-page">
            <div className="ads-head">
                <div>
                    <h1>إدارة الإعلانات</h1>
                    <p>تتبع وتحكم في جميع الحملات الإعلانية النشطة والمجدولة.</p>
                </div>

                <button className="add-btn" onClick={openAddForm}>
                    <Plus size={18} />
                    إضافة إعلان جديد
                </button>
            </div>

            <div className="cards-box3">
                {cards.map((card, index) => {
                    const Icon = card.icon

                    return (
                        <div className="info-card" key={index}>
                            <div
                                className="card-icon"
                                style={{
                                    color: card.color,
                                    backgroundColor: card.bg
                                }}
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

            <div className="filter-box">
                <div className="search-box">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="البحث عن إعلان..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option>الكل</option>
                    <option>نشط</option>
                    <option>معلق</option>
                </select>

                <button
                    className="filter-btn"
                    onClick={() => {
                        setSearch('')
                        setStatus('الكل')
                    }}
                >
                    تصفية النتائج
                </button>
            </div>

            <div className="table-box">
                <div className="table-title">
                    <h3>قائمة الإعلانات</h3>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>الصورة</th>
                            <th>العنوان</th>
                            <th>تاريخ البداية</th>
                            <th>تاريخ النهاية</th>
                            <th>الحالة</th>
                            <th>العمليات</th>
                        </tr>
                    </thead>

                    <tbody>
                        {showAds.map((ad) => (
                            <tr key={ad.id}>
                                <td>
                                    <img className="ad-img" src={ad.image} alt={ad.title} />
                                </td>

                                <td>
                                    <div className="ad-data">
                                        <h4>{ad.title}</h4>
                                        <p>{ad.id}</p>
                                    </div>
                                </td>

                                <td>{ad.start}</td>
                                <td>{ad.end}</td>

                                <td>
                                    <span className={ad.status === 'نشط' ? 'state active' : 'state stop'}>
                                        {ad.status}
                                    </span>
                                </td>

                                <td>
                                    <div className="action-btns">
                                        <button onClick={() => setShowAd(ad)}>
                                            <Eye size={16} />
                                        </button>
                                        <button onClick={() => openEditForm(ad)}>
                                            <Pencil size={16} />
                                        </button>
                                        <button onClick={() => setDeleteId(ad.id)}>
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="table-end">
                    <p>عرض 1 إلى 10 من أصل 24 إعلان</p>

                    <div className="pages">
                        <button className="page-btn">
                            <ChevronRight size={16} />
                        </button>

                        <button className="active">1</button>
                        <button>2</button>
                        <button>3</button>
                        <button>...</button>
                        <button>24</button>

                        <button className="page-btn">
                            <ChevronLeft size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {showForm && (
                <div className="form-bg">
                    <form className="ad-form" onSubmit={saveAd}>
                        <div className="form-head">
                            <h3>{editId ? 'تعديل الإعلان' : 'إضافة إعلان جديد'}</h3>
                            <button type="button" onClick={closeForm}>
                                <X size={18} />
                            </button>
                        </div>

                        <div className="image-input">
                            <img src={form.image} alt="معاينة الإعلان" />
                            <label>
                                <Upload size={16} />
                                اختيار صورة
                                <input type="file" accept="image/*" onChange={handleImage} />
                            </label>
                        </div>

                        <div className="form-input">
                            <label>عنوان الإعلان</label>
                            <input
                                type="text"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-input">
                            <label>الوصف</label>
                            <textarea
                                name="text"
                                value={form.text}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <div className="two-inputs">
                            <div className="form-input">
                                <label>تاريخ البداية</label>
                                <input
                                    type="text"
                                    name="start"
                                    value={form.start}
                                    onChange={handleChange}
                                    placeholder="15 يونيو 2024"
                                />
                            </div>

                            <div className="form-input">
                                <label>تاريخ النهاية</label>
                                <input
                                    type="text"
                                    name="end"
                                    value={form.end}
                                    onChange={handleChange}
                                    placeholder="15 يوليو 2024"
                                />
                            </div>
                        </div>

                        <div className="form-input">
                            <label>الحالة</label>
                            <select name="status" value={form.status} onChange={handleChange}>
                                <option>نشط</option>
                                <option>معلق</option>
                            </select>
                        </div>

                        <div className="form-btns">
                            <button type="button" onClick={closeForm}>
                                إلغاء
                            </button>
                            <button type="submit">
                                {editId ? 'حفظ التعديل' : 'إضافة الإعلان'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {showAd && (
                <div className="form-bg">
                    <div className="ad-show">
                        <div className="form-head">
                            <h3>بيانات الإعلان</h3>
                            <button type="button" onClick={() => setShowAd(null)}>
                                <X size={18} />
                            </button>
                        </div>

                        <img src={showAd.image} alt={showAd.title} />

                        <h4>{showAd.title}</h4>
                        <p>{showAd.text}</p>

                        <div className="show-line">
                            <span>رقم الإعلان</span>
                            <b>{showAd.id}</b>
                        </div>

                        <div className="show-line">
                            <span>تاريخ البداية</span>
                            <b>{showAd.start}</b>
                        </div>

                        <div className="show-line">
                            <span>تاريخ النهاية</span>
                            <b>{showAd.end}</b>
                        </div>

                        <div className="show-line">
                            <span>الحالة</span>
                            <b>{showAd.status}</b>
                        </div>
                    </div>
                </div>
            )}

            {deleteId && (
                <div className="form-bg">
                    <div className="delete-box">
                        <h3>تأكيد الحذف</h3>
                        <p>هل أنت متأكد من حذف هذا الإعلان؟</p>

                        <div className="form-btns">
                            <button type="button" onClick={() => setDeleteId(null)}>
                                إلغاء
                            </button>
                            <button type="button" onClick={confirmDelete}>
                                حذف
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Ads