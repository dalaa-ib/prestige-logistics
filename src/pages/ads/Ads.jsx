import { useState, useEffect } from 'react'
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
import api from '../../api/api'

function Ads() {
    const [search, setSearch] = useState('')
    const [status, setStatus] = useState('الكل')
    const [showForm, setShowForm] = useState(false)
    const [editId, setEditId] = useState(null)
    const [showAd, setShowAd] = useState(null)
    const [deleteId, setDeleteId] = useState(null)
    const [ads, setAds] = useState([])

    const [stats, setStats] = useState({
        total: 0,
        active: 0,
        views: 0,
        clicks: 0
    })

    const [form, setForm] = useState({
        title: '',
        description: '',
        status: 'نشط',
        image: ad1
    })

    const getAds = async () => {
        try {
            const response = await api.get('/admin/all-ads')

            const data = Array.isArray(response.data)
                ? response.data
                : response.data.data || []

            console.log(data[0])
            setAds(data)

            setStats({
                total: data.length,
                active: data.length,
                views: 0,
                clicks: 0
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAds()
    }, [])

    const cards = [
        {
            title: 'إجمالي الإعلانات',
            value: stats.total,
            text: 'جميع الإعلانات',
            icon: Megaphone,
            color: '#2563EB',
            bg: '#EEF2FF'
        },
        {
            title: 'الحملات النشطة',
            value: stats.active,
            text: 'غير متوفر',
            icon: Radio,
            color: '#059669',
            bg: '#ECFDF5'
        },
        {
            title: 'مرات الظهور',
            value: stats.views,
            text: 'غير متوفر',
            icon: BarChart3,
            color: '#4F46E5',
            bg: '#EEF2FF'
        },
        {
            title: 'معدل النقرات',
            value: stats.clicks,
            text: 'غير متوفر',
            icon: MousePointerClick,
            color: '#D97706',
            bg: '#FFFBEB'
        }
    ]

    const showAds = ads.filter((ad) => {
        const searchValue = search.toLowerCase()

        const searchOk =
            ad.title?.toLowerCase().includes(searchValue) ||
            String(ad.id).includes(searchValue)

        const statusOk =
            status === 'الكل' ||
            ad.status === status

        return searchOk && statusOk
    })

    const openAddForm = () => {
        setEditId(null)

        setForm({
            title: '',
            description: '',
            status: 'نشط',
            image: ad1
        })

        setShowForm(true)
    }

    const openEditForm = ad => {
        setEditId(ad.id)

        setForm({
            title: ad.title || '',
            description: ad.description || '',
            status: ad.status || 'نشط',
            image: ad.image || ad1
        })

        setShowForm(true)
    }

    const closeForm = () => {
        setShowForm(false)
        setEditId(null)
    }

    const handleImage = e => {
        const file = e.target.files[0]
        if (!file) {
            return
        }
        setForm(prev => ({
            ...prev,
            image: file
        }))
    }

    const handleChange = e => {
        const { name, value } = e.target

        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const saveAd = async e => {
        e.preventDefault()

        try {
            const formData = new FormData()

            formData.append('title', form.title)
            formData.append('description', form.description)
            formData.append('image', form.image)

            if (form.image instanceof File) {
                formData.append('image', form.image)
            }
            else {
                formData.append('image', ad1)
            }

            if (editId) {
                await api.post(
                    `/admin/ads/update-ads/${editId}`,
                    formData
                )
            } else {
                await api.post(
                    '/admin/ads/store-ads',
                    formData
                )
            }
            await getAds()
            closeForm()
        } catch (error) {
            console.log(error.response.data)
        }
    }

    const confirmDelete = async () => {
        try {
            await api.delete(`/admin/ads/delete-ads/${deleteId}`)
            await getAds()
            setDeleteId(null)
        } catch (error) {
            console.log(error)
        }
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
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="الكل">الكل</option>
                    <option value="نشط">نشط</option>
                    <option value="معلق">معلق</option>
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
                <table>
                    <thead>
                        <tr>
                            <th>الصورة</th>
                            <th>العنوان</th>
                            <th>الوصف</th>
                            <th>الحالة</th>
                            <th>العمليات</th>
                        </tr>
                    </thead>

                    <tbody>
                        {showAds.map((ad) => (

                            <tr key={ad.id}>
                                <td>
                                    <img
                                        className="ad-img"
                                        // src={ad.image || ad1}
                                        src={ad.image}
                                        alt={ad.title}
                                        onError={() => console.log(ad.image)}
                                    />
                                </td>

                                <td>
                                    <div className="ad-data">
                                        <h4>{ad.title}</h4>
                                        <p>AD-{ad.id}</p>
                                    </div>
                                </td>

                                <td>{ad.description}</td>

                                <td>
                                    <span className="state active">
                                        نشط
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
                    <p>
                        عرض {showAds.length} من أصل {ads.length} إعلان
                    </p>

                    <div className="pages">
                        <button className="page-btn">
                            <ChevronRight size={16} />
                        </button>

                        <button className="active">
                            1
                        </button>

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
                            <h3>
                                {editId ? 'تعديل الإعلان' : 'إضافة إعلان جديد'}
                            </h3>

                            <button type="button" onClick={closeForm}>
                                <X size={18} />
                            </button>
                        </div>

                        <div className="image-input">
                            <img
                                src={
                                    form.image instanceof File
                                        ? URL.createObjectURL(form.image)
                                        : form.image
                                }
                                alt="معاينة الإعلان"
                            />
                            <label>
                                <Upload size={16} />
                                اختيار صورة
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImage}
                                />
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
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <div className="form-input">
                            <label>الحالة</label>

                            <select
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                            >
                                <option value="نشط">
                                    نشط
                                </option>

                                <option value="معلق">
                                    معلق
                                </option>
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

                            <button
                                type="button"
                                onClick={() => setShowAd(null)}
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <h4>{showAd.title}</h4>

                        <p>{showAd.description}</p>

                        <div className="show-line">
                            <span>رقم الإعلان</span>
                            <b>AD-{showAd.id}</b>
                        </div>

                        <div className="show-line">
                            <span>الحالة</span>
                            <b>نشط</b>
                        </div>
                    </div>
                </div>
            )}

            {deleteId && (
                <div className="form-bg">
                    <div className="delete-box">
                        <h3>تأكيد الحذف</h3>

                        <p>
                            هل أنت متأكد من حذف هذا الإعلان؟
                        </p>

                        <div className="form-btns">
                            <button
                                type="button"
                                onClick={() => setDeleteId(null)}
                            >
                                إلغاء
                            </button>

                            <button
                                type="button"
                                onClick={confirmDelete}
                            >
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