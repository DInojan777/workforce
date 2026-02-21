import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, MapPin, Phone, DollarSign, Users, Calendar, FileText, Send } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { createJob } from '../services/api';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import './CreateJob.css';

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

    useEffect(() => {
        if (!authLoading && !isAuthenticated) navigate('/login');
    }, [authLoading, isAuthenticated]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const payload = {
                ...form,
                provider_info_id: user?.employee_id || permissions?.company_info,
                experience: parseInt(form.experience) || 0,
            };
            const res = await createJob(payload);
            if (res.success) {
                setSuccess('Job posted successfully!');
                setTimeout(() => navigate('/jobs'), 1500);
            } else {
                setError(res.error_message || 'Failed to create job');
            }
        } catch {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (authLoading) {
        return (
            <div className="createjob-loading">
                <div className="spinner-lg" />
            </div>
        );
    }

    return (
        <div className="createjob section">
            <div className="container">
                <div className="createjob__header animate-fade-in-up">
                    <h1>Post a <span className="gradient-text">New Job</span></h1>
                    <p>Fill in the details to create a job listing</p>
                </div>

                <Card className="createjob__card animate-fade-in-up" hover={false} style={{ animationDelay: '0.1s' }}>
                    <form onSubmit={handleSubmit} className="createjob__form">
                        <div className="createjob__section">
                            <h3><Briefcase size={18} /> Job Information</h3>
                            <Input label="Position / Title" name="position" placeholder="e.g. Full Stack Developer" icon={Briefcase} value={form.position} onChange={handleChange} required />
                            <div className="createjob__textarea-group">
                                <label>Description</label>
                                <textarea name="description" placeholder="Describe the role, responsibilities, and requirements..." value={form.description} onChange={handleChange} rows={5} required />
                            </div>
                            <div className="createjob__row">
                                <Input label="Experience (years)" name="experience" type="number" placeholder="e.g. 3" icon={Briefcase} value={form.experience} onChange={handleChange} required />
                                <Input label="Vacancies" name="vacancies" placeholder="e.g. 5" icon={Users} value={form.vacancies} onChange={handleChange} required />
                            </div>
                            <div className="createjob__row">
                                <Input label="Budget" name="budget" placeholder="e.g. 50000" icon={DollarSign} value={form.budget} onChange={handleChange} required />
                                <Input label="Expiry Date" name="expried_date" type="datetime-local" icon={Calendar} value={form.expried_date} onChange={handleChange} required />
                            </div>
                            <div className="createjob__row">
                                <Input label="Reference Name" name="reference_name" placeholder="Contact person" icon={FileText} value={form.reference_name} onChange={handleChange} />
                                <Input label="Reference Phone" name="reference_no" placeholder="Phone number" icon={Phone} value={form.reference_no} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="createjob__section">
                            <h3><MapPin size={18} /> Job Location</h3>
                            <Input label="Contact Number" name="mobile_number_01" placeholder="Location contact" icon={Phone} value={form.mobile_number_01} onChange={handleChange} required />
                            <Input label="Address" name="address_line_01" placeholder="Street address" icon={MapPin} value={form.address_line_01} onChange={handleChange} required />
                            <div className="createjob__row">
                                <Input label="City" name="city" placeholder="City" value={form.city} onChange={handleChange} required />
                                <Input label="District" name="district" placeholder="District" value={form.district} onChange={handleChange} required />
                            </div>
                            <div className="createjob__row">
                                <Input label="State" name="state" placeholder="State" value={form.state} onChange={handleChange} required />
                                <Input label="Pincode" name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange} required />
                            </div>
                            <Input label="Country" name="country" placeholder="Country" value={form.country} onChange={handleChange} required />
                        </div>

                        {error && <div className="createjob__error">{error}</div>}
                        {success && <div className="createjob__success">{success}</div>}

                        <Button type="submit" fullWidth size="lg" loading={loading} icon={Send}>
                            Publish Job
                        </Button>
                    </form>
                </Card>
            </div>
        </div>
    );
}
