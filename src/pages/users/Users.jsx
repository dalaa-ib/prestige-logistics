import { useState } from 'react'
import {
    Search,
    UserPlus,
    Eye,
    Pencil,
    Trash2,
    ChevronRight,
    ChevronLeft,
    X,
    Upload
} from 'lucide-react'
import './Users.css'

import user1 from '../../assets/images/user1.png'
import user2 from '../../assets/images/user2.png'
import user3 from '../../assets/images/user3.png'
import user4 from '../../assets/images/user4.png'

function Users() {
    const [search, setSearch] = useState('')
    const [city, setCity] = useState('الكل')
    const [status, setStatus] = useState('الكل')
    const [showForm, setShowForm] = useState(false)
    const [editId, setEditId] = useState(null)
    const [showUser, setShowUser] = useState(null)
    const [deleteId, setDeleteId] = useState(null)

    const [form, setForm] = useState({
        name: '',
        phone: '',
        email: '',
        city: 'الرياض',
        status: 'نشط',
        image: user1
    })

    const [users, setUsers] = useState([
        {
            id: 'USR-8821',
            name: 'محمد العتيبي',
            phone: '050XXXXX91',
            email: 'm.otaibi@example.com',
            city: 'الرياض',
            status: 'نشط',
            date: '12 يناير 2023',
            image: user1
        },
        {
            id: 'USR-9912',
            name: 'سارة الشمري',
            phone: '055XXXXX44',
            email: 's.shammari@example.com',
            city: 'جدة',
            status: 'معلق',
            date: '28 يناير 2023',
            image: user2
        },
        {
            id: 'USR-7734',
            name: 'خالد الغامدي',
            phone: '056XXXXX21',
            email: 'k.ghamdi@example.com',
            city: 'الدمام',
            status: 'نشط',
            date: '05 فبراير 2023',
            image: user3
        },
        {
            id: 'USR-6651',
            name: 'ريم القحطاني',
            phone: '054XXXXX32',
            email: 'r.qahtani@example.com',
            city: 'الرياض',
            status: 'نشط',
            date: '18 فبراير 2023',
            image: user4
        }
    ])

    const showUsers = users.filter((user) => {
        const searchOk =
            user.name.includes(search) ||
            user.phone.includes(search) ||
            user.email.toLowerCase().includes(search.toLowerCase())

        const cityOk = city === 'الكل' || user.city === city
        const statusOk = status === 'الكل' || user.status === status

        return searchOk && cityOk && statusOk
    })

    const clearFilter = () => {
        setSearch('')
        setCity('الكل')
        setStatus('الكل')
    }

    const openAddForm = () => {
        setEditId(null)
        setForm({
            name: '',
            phone: '',
            email: '',
            city: 'الرياض',
            status: 'نشط',
            image: user1
        })
        setShowForm(true)
    }

    const openEditForm = (user) => {
        setEditId(user.id)
        setForm({
            name: user.name,
            phone: user.phone,
            email: user.email,
            city: user.city,
            status: user.status,
            image: user.image
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

        const imageUrl = URL.createObjectURL(file)

        setForm((prevForm) => ({
            ...prevForm,
            image: imageUrl
        }))
    }

    const saveUser = (e) => {
        e.preventDefault()

        if (!form.name || !form.phone || !form.email) {
            return
        }

        if (editId) {
            setUsers((prevUsers) => prevUsers.map((user) =>
                user.id === editId
                    ? { ...user, ...form }
                    : user
            ))
        } else {
            const newUser = {
                id: `USR-${Math.floor(1000 + Math.random() * 9000)}`,
                name: form.name,
                phone: form.phone,
                email: form.email,
                city: form.city,
                status: form.status,
                date: 'اليوم',
                image: form.image
            }

            setUsers((prevUsers) => [newUser, ...prevUsers])
        }

        closeForm()
    }

    const confirmDelete = () => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== deleteId))
        setDeleteId(null)
    }

    return (
        <div className="users-page">
            <div className="users-head">
                <div>
                    <h1>إدارة المستخدمين</h1>
                    <p>إجمالي المستخدمين المسجلين: 1,284 مستخدم</p>
                </div>

                <button className="add-btn" onClick={openAddForm}>
                    <UserPlus size={18} />
                    إضافة مستخدم جديد
                </button>
            </div>

            <div className="filter-box1">
                <div className="search-box">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="البحث باسم المستخدم أو البريد الإلكتروني أو رقم الجوال..."
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
                    <option>معلق</option>
                </select>

                <button className="filter-btn" onClick={clearFilter}>
                    تصفية النتائج
                </button>
            </div>

            <div className="table-box">
                <table>
                    <thead>
                        <tr>
                            <th>الاسم</th>
                            <th>الهاتف</th>
                            <th>الإيميل</th>
                            <th>المدينة</th>
                            <th>الحالة</th>
                            <th>تاريخ التسجيل</th>
                            <th>العمليات</th>
                        </tr>
                    </thead>

                    <tbody>
                        {showUsers.map((user) => (
                            <tr key={user.id}>
                                <td>
                                    <div className="user-data">
                                        <img src={user.image} alt={user.name} />
                                        <div>
                                            <h4>{user.name}</h4>
                                            <p>{user.id}</p>
                                        </div>
                                    </div>
                                </td>

                                <td>{user.phone}</td>
                                <td>{user.email}</td>
                                <td>{user.city}</td>

                                <td>
                                    <span className={user.status === 'نشط' ? 'state active' : 'state stop'}>
                                        {user.status}
                                    </span>
                                </td>

                                <td>{user.date}</td>

                                <td>
                                    <div className="action-btns">
                                        <button onClick={() => setShowUser(user)}>
                                            <Eye size={16} />
                                        </button>
                                        <button onClick={() => openEditForm(user)}>
                                            <Pencil size={16} />
                                        </button>
                                        <button onClick={() => setDeleteId(user.id)}>
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="table-end">
                    <p>عرض 1 إلى 10 من أصل 1,284 مستخدم</p>

                    <div className="pages">
                        <button className="page-btn">
                            <ChevronRight size={16} />
                        </button>
                        <button className="active">1</button>
                        <button>2</button>
                        <button>3</button>
                        <button>...</button>
                        <button>129</button>
                        <button className="page-btn">
                            <ChevronLeft size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {showForm && (
                <div className="form-bg">
                    <form className="user-form" onSubmit={saveUser}>
                        <div className="form-head">
                            <h3>{editId ? 'تعديل المستخدم' : 'إضافة مستخدم جديد'}</h3>
                            <button type="button" onClick={closeForm}>
                                <X size={18} />
                            </button>
                        </div>

                        <div className="image-input">
                            <img src={form.image} alt="معاينة المستخدم" />
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
                            <label>الاسم</label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-input">
                            <label>الهاتف</label>
                            <input
                                type="text"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-input">
                            <label>الإيميل</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-input">
                            <label>المدينة</label>
                            <select name="city" value={form.city} onChange={handleChange}>
                                <option>الرياض</option>
                                <option>جدة</option>
                                <option>الدمام</option>
                            </select>
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
                                {editId ? 'حفظ التعديل' : 'إضافة المستخدم'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {showUser && (
                <div className="form-bg">
                    <div className="user-show">
                        <div className="form-head">
                            <h3>بيانات المستخدم</h3>
                            <button type="button" onClick={() => setShowUser(null)}>
                                <X size={18} />
                            </button>
                        </div>

                        <img src={showUser.image} alt={showUser.name} />

                        <h4>{showUser.name}</h4>
                        <p>{showUser.id}</p>

                        <div className="show-line">
                            <span>الهاتف</span>
                            <b>{showUser.phone}</b>
                        </div>

                        <div className="show-line">
                            <span>الإيميل</span>
                            <b>{showUser.email}</b>
                        </div>

                        <div className="show-line">
                            <span>المدينة</span>
                            <b>{showUser.city}</b>
                        </div>

                        <div className="show-line">
                            <span>الحالة</span>
                            <b>{showUser.status}</b>
                        </div>

                        <div className="show-line">
                            <span>تاريخ التسجيل</span>
                            <b>{showUser.date}</b>
                        </div>
                    </div>
                </div>
            )}

            {deleteId && (
                <div className="form-bg">
                    <div className="delete-box">
                        <h3>تأكيد الحذف</h3>
                        <p>هل أنت متأكد من حذف هذا المستخدم؟</p>

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

export default Users