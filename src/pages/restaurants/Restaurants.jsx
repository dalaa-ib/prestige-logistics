import { useState, useEffect } from 'react'
import {
    Plus,
    Power,
    Store,
    CheckCircle,
    Bike,
    CalendarDays,
    Utensils,
    Eye,
    Pencil,
    Trash2,
    X,
    ChevronRight,
    ChevronLeft,
    FileText
} from 'lucide-react'
import './Restaurants.css'
import api from '../../api/api'

import resturant1 from '../../assets/images/resturant1.png'

function Restaurants() {
    const [showForm, setShowForm] = useState(false)
    const [editIndex, setEditIndex] = useState(null)
    const [showData, setShowData] = useState(null)
    const [restaurantMeals, setRestaurantMeals] = useState([])
    const [deleteIndex, setDeleteIndex] = useState(null)
    const [selectedRestaurant, setSelectedRestaurant] = useState('')
    const [form, setForm] = useState({
        code: '',
        name: '',
        phone: '',
        status: 'نشط'
    })

    const [settings, setSettings] = useState({
        commission: '15',
        deliveryTime: '10'
    })

    const [restaurants, setRestaurants] = useState([])
    const [showMealForm, setShowMealForm] = useState(false)

    const [mealForm, setMealForm] = useState({
        restaurant_id: '',
        name: '',
        original_price: '',
        category_name: '',
    })

    useEffect(() => {
        const getRestaurants = async () => {
            try {
                const response = await api.get('/admin/resturant/getAllRestaurants')

                console.log(response.data.data)

                setRestaurants(response.data.data)

            } catch (error) {
                console.log(error)
            }
        }

        getRestaurants()
    }, [])

    const cards = [
        {
            title: 'إجمالي المطاعم',
            value: restaurants.length,
            text: ' ',
            icon: Store,
            color: '#39475F',
            bg: '#D6E3FF'
        },
        {
            title: 'المطاعم النشطة',
            value: restaurants.filter(item => item.status === 'open').length,
            text: ' ',
            icon: CheckCircle,
            color: '#16A34A',
            bg: '#F0FDF4'
        },
        {
            title: 'الطلبات المستلمة اليوم',
            value: '0',
            text: ' ',
            icon: Bike,
            color: '#785A2E',
            bg: '#FDD39E'
        },
        {
            title: 'الطلبات الشهرية',
            value: '0',
            text: ' ',
            icon: CalendarDays,
            color: '#44474D',
            bg: '#E6E8EA'
        }
    ]

    const openAddForm = () => {
        setEditIndex(null)
        setForm({
            code: '',
            name: '',
            status: 'نشط'
        })
        setShowForm(true)
    }

    const openEditForm = (item, index) => {
        setEditIndex(index)
        setForm({
            code: item.id,
            name: item.user?.fullname || '',
            phone: item.user?.phone || '',
            status: item.status === 'open' ? 'نشط' : 'غير نشط'
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

    const handleSettings = (e) => {
        const { name, value } = e.target

        setSettings({
            ...settings,
            [name]: value
        })
    }

    const saveRestaurant = async (e) => {
        e.preventDefault()

        try {
            const item = restaurants[editIndex]

            const response = await api.post(
                `/admin/resturant/updateRestaurant/${item.id}`,
                {
                    fullname: form.name,
                    phone: form.phone,
                    description: form.description || '',
                    commission_type: 'fixed',
                    commission_value: 0
                }
            )

            console.log(response.data)

            setRestaurants((prevRestaurants) =>
                prevRestaurants.map((restaurant, index) =>
                    index === editIndex
                        ? {
                            ...restaurant,
                            user: {
                                ...restaurant.user,
                                fullname: form.name,
                                phone: form.phone
                            },
                            status: form.status === 'نشط' ? 'open' : 'closed'
                        }
                        : restaurant
                )
            )

            setShowForm(false)
            setEditIndex(null)

        } catch (error) {
            console.log(error.response?.data || error)
        }
    }

    // const deleteRestaurant = () => {
    //     setRestaurants((prevRestaurants) => prevRestaurants.filter((item, index) => index !== deleteIndex))
    //     setDeleteIndex(null)
    // }

    const saveSettings = () => {
        alert('تم حفظ التغييرات')
    }

    const openRestaurantDetails = async (item) => {
        try {
            const response = await api.get(
                `/admin/resturant/getRestaurantDetailsWithMeals/${item.id}`
            )

            console.log(response.data)

            setShowData(response.data.data)
            setRestaurantMeals(response.data.data.meals || [])

        } catch (error) {
            console.log(error)
        }
    }
    const handleMealChange = (e) => {
        const { name, value } = e.target

        setMealForm((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    const addMeal = async (e) => {
        e.preventDefault()

        try {
            const response = await api.post(
                `/admin/meal/AddMeal/${mealForm.restaurant_id}`,
                {
                    name: mealForm.name,
                    original_price: mealForm.original_price,
                    category_name: mealForm.category_name
                }
            )

            console.log(response.data)

            setShowMealForm(false)

            setMealForm({
                restaurant_id: '',
                name: '',
                original_price: '',
                category_name: ''
            })

        } catch (error) {
            console.log(error.response?.data || error)
        }
    }
    return (
        <div className="restaurants-page">
            <div className="restaurants-head">
                <div className="head-btns">
                    <button className="dark-btn" onClick={openAddForm}>
                        <Plus size={17} />
                        إضافة مطعم
                    </button>

                    <button className="light-btn">
                        <Power size={17} />
                        إعادة تعيين كلمة المرور
                    </button>
                </div>

                <div className="head-title">
                    <h1>إدارة المطاعم</h1>
                    <p>نظرة عامة والتحكم في شركاء الطعام والخدمات اللوجستية</p>
                </div>
            </div>

            <div className="cards-box2">
                {cards.map((card, index) => {
                    const Icon = card.icon

                    return (
                        <div
                            className="info-card"
                            key={index}
                            style={{ borderBottomColor: card.color }}
                        >
                            <div className="card-text">
                                <p>{card.title}</p>
                                <h3>{card.value}</h3>
                                <span>{card.text}</span>
                            </div>

                            <div
                                className="card-icon"
                                style={{ color: card.color, backgroundColor: card.bg }}
                            >
                                <Icon size={22} />
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="restaurants-content">
                <div className="side-box">
                    <div className="box-title">
                        <h3>تفاصيل المطعم والإدارة</h3>
                    </div>

                    <p className="small-title">إدارة الوجبات</p>

                    <div className="manage-grid">
                        <button onClick={() => setShowMealForm(true)}>
                            <Plus size={18} />
                            إضافة وجبة
                        </button>

                        <button>
                            <Utensils size={18} />
                            قائمة الوجبات
                        </button>
                    </div>

                    <p className="small-title">الطلبات الأخيرة</p>

                    <div className="order-head">
                        <span>الطلبات حسب الحالة</span>
                        <ChevronRight size={16} />
                    </div>

                    <div className="order-grid">
                        <button>
                            <FileText size={16} />
                            تقرير يومي
                        </button>

                        <button>
                            <CalendarDays size={16} />
                            تقرير شهري
                        </button>
                    </div>

                    <p className="small-title">إعدادات الخدمة والتوصيل</p>

                    <label className="input-label">نسبة العمولة</label>
                    <input
                        className="side-input"
                        type="text"
                        name="commission"
                        value={settings.commission}
                        onChange={handleSettings}
                    />

                    <label className="input-label">إعدادات مدة التوصيل رقم</label>
                    <input
                        className="side-input"
                        type="text"
                        name="deliveryTime"
                        value={settings.deliveryTime}
                        onChange={handleSettings}
                    />

                    <button className="save-btn" onClick={saveSettings}>
                        حفظ التغييرات
                    </button>

                    <div className="food-image">
                        <img src={resturant1} alt="صورة الوجبة" />
                        <div>
                            <h4>توسيع نطاق الخدمات اللوجستية</h4>
                            <p> انضم إلى برنامج برستيج بلس لزيادة المبيعات بنسبة 25%</p>
                        </div>
                    </div>
                </div>

                <div className="table-box">
                    <div className="table-title">
                        <h3>قائمة المطاعم الشريكة</h3>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th>اسم المطعم</th>
                                <th>رقم الهاتف</th>
                                <th>الحالة</th>
                                <th>العمليات</th>
                            </tr>
                        </thead>

                        <tbody>
                            {restaurants.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className="food-name">
                                            <span>{item.user?.fullname?.charAt(0)}</span>
                                            <b>{item.user?.fullname}</b>
                                        </div>
                                    </td>
                                    <td>{item.user?.phone}</td>
                                    <td>
                                        <span className={item.status === 'open' ? 'state active' : 'state stop'}>
                                            {item.status === 'open' ? 'نشط' : 'غير نشط'}
                                        </span>
                                    </td>

                                    <td>
                                        <div className="action-btns">
                                            <button onClick={() => openRestaurantDetails(item)}>
                                                <Eye size={16} />
                                            </button>

                                            <button onClick={() => openEditForm(item, index)}>
                                                <Pencil size={16} />
                                            </button>

                                            {/* <button onClick={() => setDeleteIndex(index)}>
                                                <Trash2 size={16} />
                                            </button> */}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="table-end">
                        <p>عرض {restaurants.length} من أصل {restaurants.length} مطعم</p>

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
            </div>

            {showForm && (
                <div className="form-bg">
                    <form className="food-form" onSubmit={saveRestaurant}>
                        <div className="form-head">
                            <h3>{editIndex !== null ? 'تعديل المطعم' : 'إضافة مطعم'}</h3>
                            <button type="button" onClick={() => setShowForm(false)}>
                                <X size={18} />
                            </button>
                        </div>

                        <div className="form-input">
                            <label>رمز المطعم</label>
                            <input
                                type="text"
                                name="code"
                                value={form.code}
                                onChange={handleChange}
                                placeholder="LU"
                            />
                        </div>

                        <div className="form-input">
                            <label>اسم المطعم</label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-input">
                            <label>رقم الهاتف</label>
                            <input
                                type="text"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-input">
                            <label>الحالة</label>
                            <select name="status" value={form.status} onChange={handleChange}>
                                <option>نشط</option>
                                <option>غير نشط</option>
                            </select>
                        </div>

                        <div className="form-btns">
                            <button type="button" onClick={() => setShowForm(false)}>
                                إلغاء
                            </button>
                            <button type="submit">
                                {editIndex !== null ? 'حفظ التعديل' : 'إضافة المطعم'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {showData && (
                <div className="form-bg">
                    <div className="show-box">
                        <div className="form-head">
                            <h3>بيانات المطعم</h3>
                            <button onClick={() => setShowData(null)}>
                                <X size={18} />
                            </button>
                        </div>

                        <div className="show-line">
                            <span>اسم المطعم</span>
                            <b>{showData.user?.fullname}</b>
                        </div>

                        <div className="show-line">
                            <span>رقم الهاتف</span>
                            <b>{showData.user?.phone}</b>
                        </div>

                        <div className="show-line">
                            <span>الوصف</span>
                            <b>{showData.description}</b>
                        </div>

                        <div className="show-line">
                            <span>وقت العمل</span>
                            <b> {showData.working_hours_start} - {showData.working_hours_end} </b>
                        </div>

                        <div className="show-line">
                            <span>الحالة</span>
                            <b>{showData.status === 'open' ? 'نشط' : 'غير نشط'}</b>
                        </div>
                        <h3 style={{ marginTop: '20px' }}>الوجبات</h3>

                        {
                            restaurantMeals.length > 0 ? (
                                restaurantMeals.map((meal) => (
                                    <div className="show-line" key={meal.id}>
                                        <span>{meal.name}</span>
                                        <b>{meal.original_price}</b>
                                    </div>
                                ))
                            ) : (
                                <p>لا يوجد وجبات حالياً</p>
                            )
                        }

                    </div>
                </div>
            )}

            {deleteIndex !== null && (
                <div className="form-bg">
                    <div className="delete-box">
                        <h3>تأكيد الحذف</h3>
                        <p>هل أنت متأكد من حذف هذا المطعم؟</p>

                        <div className="form-btns">
                            <button onClick={() => setDeleteIndex(null)}>
                                إلغاء
                            </button>
                            <button onClick={deleteRestaurant}>
                                حذف
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showMealForm && (
                <div className="form-bg">
                    <form className="food-form" onSubmit={addMeal}>

                        <div className="form-head">
                            <h3>إضافة وجبة</h3>

                            <button
                                type="button"
                                onClick={() => setShowMealForm(false)}
                            >
                                <X size={18} />
                            </button>
                        </div>
                        <div className="form-input">
                            <label>اسم الوجبة</label>

                            <input
                                value={mealForm.name}
                                onChange={(e) => setMealForm({
                                    ...mealForm,
                                    name: e.target.value
                                })}
                            />
                        </div>


                        <div className="form-input">
                            <label>السعر</label>

                            <input
                                value={mealForm.original_price}
                                onChange={(e) => setMealForm({
                                    ...mealForm,
                                    original_price: e.target.value
                                })}
                            />
                        </div>
                        <div className="form-input">
                            <label>المطعم</label>

                            <select
                                name="restaurant_id"
                                value={mealForm.restaurant_id}
                                onChange={handleMealChange}
                            >
                                <option value="">اختر المطعم</option>

                                {restaurants.map((restaurant) => (
                                    <option key={restaurant.id} value={restaurant.id}>
                                        {restaurant.user?.fullname}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-input">
                            <label>التصنيف</label>

                            <input
                                value={mealForm.category_name}
                                onChange={(e) => setMealForm({
                                    ...mealForm,
                                    category_name: e.target.value
                                })}
                            />
                        </div>


                        <div className="form-btns">
                            <button
                                type="button"
                                onClick={() => setShowMealForm(false)}
                            >
                                إلغاء
                            </button>

                            <button type="submit">
                                إضافة
                            </button>
                        </div>

                    </form>
                </div>
            )}

        </div>
    )
}

export default Restaurants