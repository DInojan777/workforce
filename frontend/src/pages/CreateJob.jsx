import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, MapPin, Phone, DollarSign, Users, Calendar, FileText, Send } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { createJob } from '../services/api';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

export default function CreateJob() {
    const { isAuthenticated, user, permissions, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [form, setForm] = useState({
        position: '', description: '', experience: '', reference_name: '', reference_no: '',
        vacancies: '', budget: '', expried_date: '',
        mobile_number_01: '', address_line_01: '', city: '', district: '', state: '', pincode: '', country: '',
    });

    useEffect(() => { if (!authLoading && !isAuthenticated) navigate('/login'); }, [authLoading, isAuthenticated]);

    const handleChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value }); setError(''); };

    const handleSubmit = async (e) => {
        e.preventDefault(); setLoading(true); setError(''); setSuccess('');
        try {
            const payload = { ...form, provider_info_id: user?.employee_id || permissions?.company_info, experience: parseInt(form.experience) || 0 };
            const res = await createJob(payload);
            if (res.success) { setSuccess('Job posted successfully!'); setTimeout(() => navigate('/jobs'), 1500); }
            else setError(res.error_message || 'Failed to create job');
        } catch { setError('Network error. Please try again.'); }
        finally { setLoading(false); }
    };

    if (authLoading) return <div className="min-h-screen flex items-center justify-center"><div className="spinner-lg" /></div>;

    return (
        <div className="py-16 pt-28">
            <div className="max-w-[1280px] mx-auto px-6">
                <div className="text-center mb-10 animate-fade-in-up">
                    <h1 className="mb-3">Post a <span className="gradient-text">New Job</span></h1>
                    <p className="text-text-secondary">Fill in the details to create a job listing</p>
                </div>
                <Card className="max-w-3xl mx-auto animate-fade-in-up" hover={false} style={{ animationDelay: '0.1s' }}>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="flex flex-col gap-5">
                            <h3 className="flex items-center gap-2 text-base pb-2 border-b border-border-subtle"><Briefcase size={18} className="text-accent-primary" /> Job Information</h3>
                            <Input label="Position / Title" name="position" placeholder="e.g. Full Stack Developer" icon={Briefcase} value={form.position} onChange={handleChange} required />
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-text-secondary">Description</label>
                                <textarea name="description" placeholder="Describe the role..." value={form.description} onChange={handleChange} rows={5} required className="bg-bg-input border border-border-subtle rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted resize-y transition-all duration-250 focus:border-accent-primary focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)] outline-none" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Input label="Experience (years)" name="experience" type="number" placeholder="e.g. 3" icon={Briefcase} value={form.experience} onChange={handleChange} required />
                                <Input label="Vacancies" name="vacancies" placeholder="e.g. 5" icon={Users} value={form.vacancies} onChange={handleChange} required />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Input label="Budget" name="budget" placeholder="e.g. 50000" icon={DollarSign} value={form.budget} onChange={handleChange} required />
                                <Input label="Expiry Date" name="expried_date" type="datetime-local" icon={Calendar} value={form.expried_date} onChange={handleChange} required />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Input label="Reference Name" name="reference_name" placeholder="Contact person" icon={FileText} value={form.reference_name} onChange={handleChange} />
                                <Input label="Reference Phone" name="reference_no" placeholder="Phone number" icon={Phone} value={form.reference_no} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-5">
                            <h3 className="flex items-center gap-2 text-base pb-2 border-b border-border-subtle"><MapPin size={18} className="text-accent-primary" /> Job Location</h3>
                            <Input label="Contact Number" name="mobile_number_01" placeholder="Location contact" icon={Phone} value={form.mobile_number_01} onChange={handleChange} required />
                            <Input label="Address" name="address_line_01" placeholder="Street address" icon={MapPin} value={form.address_line_01} onChange={handleChange} required />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Input label="City" name="city" placeholder="City" value={form.city} onChange={handleChange} required />
                                <Input label="District" name="district" placeholder="District" value={form.district} onChange={handleChange} required />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Input label="State" name="state" placeholder="State" value={form.state} onChange={handleChange} required />
                                <Input label="Pincode" name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange} required />
                            </div>
                            <Input label="Country" name="country" placeholder="Country" value={form.country} onChange={handleChange} required />
                        </div>
                        {error && <div className="text-sm text-danger bg-danger-soft rounded-lg px-4 py-2.5">{error}</div>}
                        {success && <div className="text-sm text-success bg-success-soft rounded-lg px-4 py-2.5">{success}</div>}
                        <Button type="submit" fullWidth size="lg" loading={loading} icon={Send}>Publish Job</Button>
                    </form>
                </Card>
            </div>
        </div>
    );
}
