import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Mail,
    Phone,
    LockKeyhole,
    Eye,
    EyeOff,
    ArrowRight,
    ShieldCheck,
    Globe
} from 'lucide-react'
import './Login.css'
import logisticsImage from '../../assets/images/Logistics Visualization.png'
import api from '../../api/api'

function Login() {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        phone: '',
        password: '',
        remember: false
    })

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target

        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        })

        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.phone || !formData.password) {
            setError('يرجى إدخال رقم الهاتف وكلمة المرور')
            return
        }

        try {
            const response = await api.post('/adminlogin', {
                phone: formData.phone,
                password: formData.password
            })

            console.log(response.data)
            localStorage.setItem('token', response.data.token)
            navigate('/dashboard')

        } catch (error) {
            setError('رقم الهاتف أو كلمة المرور غير صحيحة')
            console.log(error.response.data)
        }
    }

    return (
        <main className="login-page">
            <div className="login-left">
                <div className="encryption">
                    <ShieldCheck size={20} />
                    <span>وصول طرفي مشفّر</span>
                </div>

                <div className="prestige-logix-container">
                    <div className="image-frame">
                        <img src={logisticsImage} alt="logistics" />
                    </div>

                    <h3>Prestige Logix</h3>
                    <p>
                        دقّة تشغيلية لإدارة المطاعم، الطلبات، السائقين،
                        والمراكز اللوجستية من لوحة تحكم واحدة.
                    </p>
                </div>
            </div>

            <section className="login-panel">
                <header className="login-top">
                    <button className="language-btn" type="button">
                        <Globe size={20} />
                        العربية
                    </button>
                    <a href="#" className="support-link">الدعم</a>
                </header>

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-heading">
                        <h1>مرحباً بعودتك</h1>
                        <p>.يرجى تسجيل الدخول للوصول إلى بوابة الإدارة</p>
                    </div>

                    <div className="field-group">
                        <label>رقم الهاتف</label>
                        <div className="input-box">
                            <Phone size={20} />
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                placeholder="09xxxxxxxx"
                                onChange={handleChange}
                                dir="ltr"
                            />
                        </div>
                    </div>

                    <div className="field-group">
                        <label>كلمة المرور</label>
                        <div className="input-box">
                            <LockKeyhole size={20} />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                placeholder="••••••••••••"
                                onChange={handleChange}
                                dir="ltr"
                            />
                            <button
                                type="button"
                                className="eye-btn"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <div className="form-options">
                        <label className="remember-box">
                            <input
                                type="checkbox"
                                name="remember"
                                checked={formData.remember}
                                onChange={handleChange}
                            />
                            <span>تذكرني</span>
                        </label>

                        <a href="#">نسيت كلمة المرور؟</a>
                    </div>

                    {error && <p className="login-error">{error}</p>}

                    <button className="submit-btn" type="submit">
                        تسجيل الدخول إلى البوابة
                        <ArrowRight size={17} />
                    </button>

                    <div className="security-note">
                        <ShieldCheck size={16} />
                        <span>تشفير 256-bit AES End-to-End فعال</span>
                    </div>

                    <div className="mini-blocks">
                        <span></span>
                        <span></span>
                    </div>
                </form>

                <footer className="login-footer">
                    <p>© 2024 Prestige Logix Solutions. دقّة تشغيلية.</p>
                    <div>
                        <a href="#">الأمان</a>
                        <a href="#">الشروط</a>
                        <a href="#">الخصوصية</a>
                    </div>
                </footer>
            </section>
        </main>
    )
}

export default Login