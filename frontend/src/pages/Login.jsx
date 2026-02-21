import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Phone, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/api';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import './Login.css';

export default function Login() {
    const [mode, setMode] = useState('email');
    const [form, setForm] = useState({ email: '', mobile_number: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const payload = { password: form.password };
        if (mode === 'email') payload.email = form.email;
        else payload.mobile_number = form.mobile_number;

        try {
            const res = await loginUser(payload);
            if (res.success && res.details?.token) {
                login(res.details.token);
                navigate('/dashboard');
            } else {
                setError(res.error_message || res.errors || 'Login failed');
            }
        } catch {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-page__bg-orb" />
            <div className="container login-page__container">
                <Card className="login-card animate-fade-in-up" hover={false}>
                    <div className="login-card__header">
                        <h2>Welcome Back</h2>
                        <p>Sign in to your account to continue</p>
                    </div>

                    <div className="login-card__toggle">
                        <button
                            className={`toggle-btn ${mode === 'email' ? 'toggle-btn--active' : ''}`}
                            onClick={() => setMode('email')}
                        >
                            <Mail size={16} /> Email
                        </button>
                        <button
                            className={`toggle-btn ${mode === 'mobile' ? 'toggle-btn--active' : ''}`}
                            onClick={() => setMode('mobile')}
                        >
                            <Phone size={16} /> Mobile
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="login-card__form">
                        {mode === 'email' ? (
                            <Input
                                label="Email Address"
                                name="email"
                                type="email"
                                icon={Mail}
                                placeholder="you@example.com"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        ) : (
                            <Input
                                label="Mobile Number"
                                name="mobile_number"
                                icon={Phone}
                                placeholder="10-digit mobile number"
                                value={form.mobile_number}
                                onChange={handleChange}
                                required
                            />
                        )}

                        <Input
                            label="Password"
                            name="password"
                            type="password"
                            icon={Lock}
                            placeholder="Enter your password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />

                        {error && <div className="login-card__error">{error}</div>}

                        <Button type="submit" fullWidth loading={loading} icon={ArrowRight}>
                            Sign In
                        </Button>
                    </form>

                    <div className="login-card__footer">
                        <p>Don't have an account? <Link to="/register" className="login-card__link">Sign up</Link></p>
                    </div>
                </Card>
            </div>
        </div>
    );
}
