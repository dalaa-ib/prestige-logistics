import { useState, useEffect } from 'react'
import {
    Search,
    Eye,
    Pencil,
    Trash2,
    ChevronRight,
    ChevronLeft,
    X
} from 'lucide-react'
import './Users.css'
import api from '../../api/api'

function Users() {
    const [search, setSearch] = useState('')
    const [status, setStatus] = useState('الكل')
    const [showUser, setShowUser] = useState(null)
    const [users, setUsers] = useState([])

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await api.get('/admin/getallcustomers')
                setUsers(response.data.data)
            } catch (error) {
                console.log(error)
            }
        }

        getUsers()
    }, [])

    const showUsers = users.filter((user) => {
        const searchText = search.toLowerCase()

        const searchOk =
            user.fullname?.toLowerCase().includes(searchText) ||
            user.phone?.includes(search)

        const statusOk =
            status === 'الكل' ||
            (status === 'نشط' && user.is_active) ||
            (status === 'معلق' && !user.is_active)

        return searchOk && statusOk
    })

    const clearFilter = () => {
        setSearch('')
        setStatus('الكل')
    }

    const updateStatus = async (user) => {
        try {
            await api.post(
                `/admin/users/${user.id}/updateuseractivation`
            )

            setUsers((prevUsers) =>
                prevUsers.map((item) =>
                    item.id === user.id
                        ? {
                            ...item,
                            is_active: !item.is_active
                        }
                        : item
                )
            )

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="users-page">
            <div className="users-head">
                <div>
                    <h1>إدارة المستخدمين</h1>
                    <p> إجمالي المستخدمين المسجلين: {users.length} مستخدم </p>
                </div>
            </div>

            <div className="filter-box1">
                <div className="search-box">
                    <Search size={18} />
                    <input type="text" placeholder="البحث باسم المستخدم أو رقم الجوال..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>

                <select value={status} onChange={(e) => setStatus(e.target.value)} >
                    <option>الكل</option>
                    <option>نشط</option>
                    <option>معلق</option>
                </select>

                <button className="filter-btn" onClick={clearFilter} >
                    تصفية النتائج
                </button>
            </div>

            <div className="table-box">
                <table>
                    <thead>
                        <tr>
                            <th>الاسم</th>
                            <th>الهاتف</th>
                            <th>الحالة</th>
                            <th>العمليات</th>
                        </tr>
                    </thead>

                    <tbody>
                        {showUsers.map((user) => (
                            <tr key={user.id}>
                                <td>
                                    <div className="user-data">
                                        <div>
                                            <h4>{user.fullname}</h4>
                                            <p>USR-{user.id}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>{user.phone}</td>
                                <td>
                                    <span
                                        className={
                                            user.is_active
                                                ? 'state active'
                                                : 'state stop'
                                        }
                                    >
                                        {
                                            user.is_active
                                                ? 'نشط'
                                                : 'معلق'
                                        }
                                    </span>
                                </td>

                                <td>
                                    <div className="action-btns">
                                        <button onClick={() => setShowUser(user)}>
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
                    <p>  عرض {showUsers.length} من أصل {users.length} مستخدم</p>
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

            {showUser && (
                <div className="form-bg">
                    <div className="user-show">
                        <div className="form-head">
                            <h3>بيانات المستخدم</h3>

                            <button type="button" onClick={() => setShowUser(null)} >
                                <X size={18} />
                            </button>
                        </div>

                        <h4>{showUser.fullname}</h4>

                        <p> USR-{showUser.id} </p>

                        <div className="show-line">
                            <span>الهاتف</span>
                            <b>{showUser.phone}</b>
                        </div>

                        <div className="show-line">
                            <span>الحالة</span>
                            <b> {showUser.is_active ? 'نشط' : 'معلق'} </b>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Users