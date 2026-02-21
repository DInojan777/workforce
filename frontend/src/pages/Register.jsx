import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Phone, User, ArrowRight, Building2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { registerJobSeeker, registerClient } from '../services/api';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';

export default function Register() {
    const [tab, setTab] = useState('jobseeker');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const [seekerForm, setSeekerForm] = useState({
        first_name: '', last_name: '', email: '', password: '', mobile_number: '', gender: 'M',
    });

    const [clientForm, setClientForm] = useState({
        first_name: '', last_name: '', email: '', password: '', mobile_number: '', gender: 'M',
        brand_name: '', display_name: '', type_is_provider: false,
        is_client: true, is_contractor: false,
        mobile_number_01: '', address_id: '', communication_address: '',
        city: '', district: '', state: '', pincode: '', country: '', dob: '',
    });

    const handleSeekerChange = (e) => {
        setSeekerForm({ ...seekerForm, [e.target.name]: e.target.value });
        setError('');
    };

    const handleClientChange = (e) => {
        const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setClientForm({ ...clientForm, [e.target.name]: val });
        setError('');
    };

    const handleSeekerSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await registerJobSeeker(seekerForm);
            if (res.success && res.details?.token) {
                login(res.details.token);
                navigate('/dashboard');
            } else {
                setError(res.error_message || 'Registration failed');
            }
        } catch { setError('Network error'); }
        finally { setLoading(false); }
    };

    const handleClientSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await registerClient(clientForm);
            if (res.success && res.details?.token) {
                login(res.details.token);
                navigate('/dashboard');
            } else {
                setError(res.error_message || 'Registration failed');
            }
        } catch { setError('Network error'); }
        finally { setLoading(false); }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center py-20">
            <div className="absolute top-[10%] left-[10%] w-[400px] h-[400px] bg-accent-secondary/15 rounded-full blur-[120px] pointer-events-none" />
            <div className="max-w-[1280px] mx-auto px-6 w-full flex justify-center">
                <Card className="animate-fade-in-up w-full max-w-2xl p-8" hover={false}>
                    <div className="text-center mb-8">
                        <h2 className="mb-2">Create Account</h2>
                        <p className="text-text-secondary">Join Workforce and start your journey</p>
                    </div>

                    <div className="flex rounded-xl bg-white/[0.04] p-1 mb-6">
                        <button
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                                ${tab === 'jobseeker' ? 'bg-accent-primary text-white' : 'text-text-secondary hover:text-text-primary'}`}
                            onClick={() => { setTab('jobseeker'); setError(''); }}
                        >
                            <User size={16} /> Job Seeker
                        </button>
                        <button
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                                ${tab === 'client' ? 'bg-accent-primary text-white' : 'text-text-secondary hover:text-text-primary'}`}
                            onClick={() => { setTab('client'); setError(''); }}
                        >
                            <Building2 size={16} /> Client / Contractor
                        </button>
                    </div>

                    {tab === 'jobseeker' ? (
                        <form onSubmit={handleSeekerSubmit} className="flex flex-col gap-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Input label="First Name" name="first_name" icon={User} placeholder="First name" value={seekerForm.first_name} onChange={handleSeekerChange} required />
                                <Input label="Last Name" name="last_name" icon={User} placeholder="Last name" value={seekerForm.last_name} onChange={handleSeekerChange} required />
                            </div>
                            <Input label="Email" name="email" type="email" icon={Mail} placeholder="you@example.com" value={seekerForm.email} onChange={handleSeekerChange} required />
                            <Input label="Mobile Number" name="mobile_number" icon={Phone} placeholder="10-digit number" value={seekerForm.mobile_number} onChange={handleSeekerChange} required />
                            <Input label="Password" name="password" type="password" icon={Lock} placeholder="Min 8 characters" value={seekerForm.password} onChange={handleSeekerChange} required />
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-text-secondary">Gender</label>
                                <div className="flex gap-2">
                                    {['M', 'F', 'O'].map(g => (
                                        <button
                                            key={g}
                                            type="button"
                                            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                                                ${seekerForm.gender === g ? 'bg-accent-primary text-white' : 'bg-white/[0.04] text-text-secondary hover:bg-white/[0.08]'}`}
                                            onClick={() => setSeekerForm({ ...seekerForm, gender: g })}
                                        >
                                            {g === 'M' ? 'Male' : g === 'F' ? 'Female' : 'Other'}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            {error && <div className="text-sm text-danger bg-danger-soft rounded-lg px-4 py-2.5">{error}</div>}
                            <Button type="submit" fullWidth loading={loading} icon={ArrowRight}>Create Account</Button>
                        </form>
                    ) : (
                        <form onSubmit={handleClientSubmit} className="flex flex-col gap-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Input label="First Name" name="first_name" icon={User} placeholder="First name" value={clientForm.first_name} onChange={handleClientChange} required />
                                <Input label="Last Name" name="last_name" icon={User} placeholder="Last name" value={clientForm.last_name} onChange={handleClientChange} required />
                            </div>
                            <Input label="Email" name="email" type="email" icon={Mail} placeholder="you@example.com" value={clientForm.email} onChange={handleClientChange} required />
                            <Input label="Mobile" name="mobile_number" icon={Phone} placeholder="10-digit number" value={clientForm.mobile_number} onChange={handleClientChange} required />
                            <Input label="Password" name="password" type="password" icon={Lock} placeholder="Min 8 characters" value={clientForm.password} onChange={handleClientChange} required />

                            <div className="text-sm font-semibold text-text-accent pt-4 border-t border-border-subtle">Company Details</div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Input label="Brand Name" name="brand_name" icon={Building2} placeholder="Company brand" value={clientForm.brand_name} onChange={handleClientChange} required />
                                <Input label="Display Name" name="display_name" icon={Building2} placeholder="Display name" value={clientForm.display_name} onChange={handleClientChange} required />
                            </div>
                            <Input label="Contact Number" name="mobile_number_01" icon={Phone} placeholder="Company phone" value={clientForm.mobile_number_01} onChange={handleClientChange} required />
                            <Input label="Address" name="communication_address" placeholder="Full address" value={clientForm.communication_address} onChange={handleClientChange} required />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Input label="City" name="city" placeholder="City" value={clientForm.city} onChange={handleClientChange} required />
                                <Input label="District" name="district" placeholder="District" value={clientForm.district} onChange={handleClientChange} required />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Input label="State" name="state" placeholder="State" value={clientForm.state} onChange={handleClientChange} required />
                                <Input label="Pincode" name="pincode" placeholder="Pincode" value={clientForm.pincode} onChange={handleClientChange} required />
                            </div>
                            <Input label="Country" name="country" placeholder="Country" value={clientForm.country} onChange={handleClientChange} required />
                            <div className="flex gap-6 items-center">
                                <label className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
                                    <input type="checkbox" name="is_client" checked={clientForm.is_client} onChange={handleClientChange} className="accent-accent-primary w-4 h-4" />
                                    <span>I am a Client</span>
                                </label>
                                <label className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
                                    <input type="checkbox" name="is_contractor" checked={clientForm.is_contractor} onChange={handleClientChange} className="accent-accent-primary w-4 h-4" />
                                    <span>I am a Contractor</span>
                                </label>
                            </div>
                            {error && <div className="text-sm text-danger bg-danger-soft rounded-lg px-4 py-2.5">{error}</div>}
                            <Button type="submit" fullWidth loading={loading} icon={ArrowRight}>Create Account</Button>
                        </form>
                    )}

                    <div className="text-center mt-6 pt-6 border-t border-border-subtle">
                        <p className="text-sm text-text-secondary">Already have an account? <Link to="/login" className="text-text-accent hover:underline font-medium">Sign in</Link></p>
                    </div>
                </Card>
            </div>
        </div>
    );
}
