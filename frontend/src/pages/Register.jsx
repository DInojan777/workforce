import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Phone, User, ArrowRight, Building2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { registerJobSeeker, registerClient } from '../services/api';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import './Register.css';

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
        <div className="register-page">
            <div className="register-page__bg-orb" />
            <div className="container register-page__container">
                <Card className="register-card animate-fade-in-up" hover={false}>
                    <div className="register-card__header">
                        <h2>Create Account</h2>
                        <p>Join Workforce and start your journey</p>
                    </div>

                    <div className="register-card__tabs">
                        <button className={`toggle-btn ${tab === 'jobseeker' ? 'toggle-btn--active' : ''}`} onClick={() => { setTab('jobseeker'); setError(''); }}>
                            <User size={16} /> Job Seeker
                        </button>
                        <button className={`toggle-btn ${tab === 'client' ? 'toggle-btn--active' : ''}`} onClick={() => { setTab('client'); setError(''); }}>
                            <Building2 size={16} /> Client / Contractor
                        </button>
                    </div>

                    {tab === 'jobseeker' ? (
                        <form onSubmit={handleSeekerSubmit} className="register-form">
                            <div className="register-form__row">
                                <Input label="First Name" name="first_name" icon={User} placeholder="First name" value={seekerForm.first_name} onChange={handleSeekerChange} required />
                                <Input label="Last Name" name="last_name" icon={User} placeholder="Last name" value={seekerForm.last_name} onChange={handleSeekerChange} required />
                            </div>
                            <Input label="Email" name="email" type="email" icon={Mail} placeholder="you@example.com" value={seekerForm.email} onChange={handleSeekerChange} required />
                            <Input label="Mobile Number" name="mobile_number" icon={Phone} placeholder="10-digit number" value={seekerForm.mobile_number} onChange={handleSeekerChange} required />
                            <Input label="Password" name="password" type="password" icon={Lock} placeholder="Min 8 characters" value={seekerForm.password} onChange={handleSeekerChange} required />
                            <div className="register-form__gender">
                                <label>Gender</label>
                                <div className="gender-options">
                                    {['M', 'F', 'O'].map(g => (
                                        <button key={g} type="button" className={`gender-btn ${seekerForm.gender === g ? 'gender-btn--active' : ''}`} onClick={() => setSeekerForm({ ...seekerForm, gender: g })}>
                                            {g === 'M' ? 'Male' : g === 'F' ? 'Female' : 'Other'}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            {error && <div className="register-form__error">{error}</div>}
                            <Button type="submit" fullWidth loading={loading} icon={ArrowRight}>Create Account</Button>
                        </form>
                    ) : (
                        <form onSubmit={handleClientSubmit} className="register-form">
                            <div className="register-form__row">
                                <Input label="First Name" name="first_name" icon={User} placeholder="First name" value={clientForm.first_name} onChange={handleClientChange} required />
                                <Input label="Last Name" name="last_name" icon={User} placeholder="Last name" value={clientForm.last_name} onChange={handleClientChange} required />
                            </div>
                            <Input label="Email" name="email" type="email" icon={Mail} placeholder="you@example.com" value={clientForm.email} onChange={handleClientChange} required />
                            <Input label="Mobile" name="mobile_number" icon={Phone} placeholder="10-digit number" value={clientForm.mobile_number} onChange={handleClientChange} required />
                            <Input label="Password" name="password" type="password" icon={Lock} placeholder="Min 8 characters" value={clientForm.password} onChange={handleClientChange} required />
                            <div className="register-form__section-title">Company Details</div>
                            <div className="register-form__row">
                                <Input label="Brand Name" name="brand_name" icon={Building2} placeholder="Company brand" value={clientForm.brand_name} onChange={handleClientChange} required />
                                <Input label="Display Name" name="display_name" icon={Building2} placeholder="Display name" value={clientForm.display_name} onChange={handleClientChange} required />
                            </div>
                            <Input label="Contact Number" name="mobile_number_01" icon={Phone} placeholder="Company phone" value={clientForm.mobile_number_01} onChange={handleClientChange} required />
                            <Input label="Address" name="communication_address" placeholder="Full address" value={clientForm.communication_address} onChange={handleClientChange} required />
                            <div className="register-form__row">
                                <Input label="City" name="city" placeholder="City" value={clientForm.city} onChange={handleClientChange} required />
                                <Input label="District" name="district" placeholder="District" value={clientForm.district} onChange={handleClientChange} required />
                            </div>
                            <div className="register-form__row">
                                <Input label="State" name="state" placeholder="State" value={clientForm.state} onChange={handleClientChange} required />
                                <Input label="Pincode" name="pincode" placeholder="Pincode" value={clientForm.pincode} onChange={handleClientChange} required />
                            </div>
                            <Input label="Country" name="country" placeholder="Country" value={clientForm.country} onChange={handleClientChange} required />
                            <div className="register-form__check-row">
                                <label className="register-form__checkbox">
                                    <input type="checkbox" name="is_client" checked={clientForm.is_client} onChange={handleClientChange} />
                                    <span>I am a Client</span>
                                </label>
                                <label className="register-form__checkbox">
                                    <input type="checkbox" name="is_contractor" checked={clientForm.is_contractor} onChange={handleClientChange} />
                                    <span>I am a Contractor</span>
                                </label>
                            </div>
                            {error && <div className="register-form__error">{error}</div>}
                            <Button type="submit" fullWidth loading={loading} icon={ArrowRight}>Create Account</Button>
                        </form>
                    )}

                    <div className="register-card__footer">
                        <p>Already have an account? <Link to="/login" className="register-card__link">Sign in</Link></p>
                    </div>
                </Card>
            </div>
        </div>
    );
}
