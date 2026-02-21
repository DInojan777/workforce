import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Phone, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/api';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';

export default function Login() {
    const [mode, setMode] = useState('email');
    const [form, setForm] = useState({ email: '', mobile_number: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value }); setError(''); };

    const handleSubmit = async (e) => {
        e.preventDefault(); setLoading(true); setError('');
        const payload = { password: form.password };
        if (mode === 'email') payload.email = form.email;
        else payload.mobile_number = form.mobile_number;
        try {
            const res = await loginUser(payload);
            if (res.success && res.details?.token) { login(res.details.token); navigate('/dashboard'); }
            else setError(res.error_message || res.errors || 'Login failed');
        } catch { setError('Network error. Please try again.'); }
        finally { setLoading(false); }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center py-20 bg-gradient-to-b from-bg-primary to-[#eef2ff]">
            <div className="absolute top-[10%] right-[10%] w-[400px] h-[400px] bg-accent-primary/[0.05] rounded-full blur-[120px] pointer-events-none" />
            <div className="max-w-[1280px] mx-auto px-6 w-full flex justify-center">
                <Card className="animate-fade-in-up w-full max-w-md p-8" hover={false}>
                    <div className="text-center mb-8">
                        <h2 className="mb-2">Welcome Back</h2>
                        <p className="text-text-secondary">Sign in to your account to continue</p>
                    </div>

                    <div className="flex rounded-xl bg-bg-input p-1 mb-6">
                        <button onClick={() => setMode('email')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                            ${mode === 'email' ? 'bg-accent-primary text-white' : 'text-text-secondary hover:text-text-primary'}`}
                        ><Mail size={16} /> Email</button>
                        <button onClick={() => setMode('mobile')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                            ${mode === 'mobile' ? 'bg-accent-primary text-white' : 'text-text-secondary hover:text-text-primary'}`}
                        ><Phone size={16} /> Mobile</button>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        {mode === 'email'
                            ? <Input label="Email Address" name="email" type="email" icon={Mail} placeholder="you@example.com" value={form.email} onChange={handleChange} required />
                            : <Input label="Mobile Number" name="mobile_number" icon={Phone} placeholder="10-digit mobile number" value={form.mobile_number} onChange={handleChange} required />}
                        <Input label="Password" name="password" type="password" icon={Lock} placeholder="Enter your password" value={form.password} onChange={handleChange} required />
                        {error && <div className="text-sm text-danger bg-danger-soft rounded-lg px-4 py-2.5">{error}</div>}
                        <Button type="submit" fullWidth loading={loading} icon={ArrowRight}>Sign In</Button>
                    </form>

                    <div className="text-center mt-6 pt-6 border-t border-border-subtle">
                        <p className="text-sm text-text-secondary">Don't have an account? <Link to="/register" className="text-accent-primary hover:underline font-semibold">Sign up</Link></p>
                    </div>
                </Card>
            </div>
        </div>
    );
}
