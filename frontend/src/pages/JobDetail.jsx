import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Briefcase, DollarSign, Clock, Users, Phone, Send } from 'lucide-react';
import { getJobs, applyJob } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

export default function JobDetail() {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState(false);
    const [showApply, setShowApply] = useState(false);
    const [rate, setRate] = useState('');
    const [message, setMessage] = useState('');
    const { isAuthenticated, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => { fetchJob(); }, [id]);

    const fetchJob = async () => {
        setLoading(true);
        try { const res = await getJobs({}); setJob((res.details || []).find((j) => j.id === id) || null); }
        catch { setJob(null); } finally { setLoading(false); }
    };

    const handleApply = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) return navigate('/login');
        setApplying(true);
        try {
            const res = await applyJob({ job_id: id, applicant_details_id: user?.employee_id, expection_rate: rate });
            setMessage(res.success ? 'Application submitted successfully!' : (res.error_message || 'Application failed'));
            if (res.success) setShowApply(false);
        } catch { setMessage('Network error'); }
        finally { setApplying(false); }
    };

    const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'N/A';

    if (loading) return <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-text-secondary"><div className="spinner-lg" /><p>Loading job details...</p></div>;
    if (!job) return <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-text-muted"><Briefcase size={48} /><h3>Job not found</h3><Link to="/jobs"><Button variant="secondary">Back to Jobs</Button></Link></div>;

    return (
        <div className="py-16 pt-28">
            <div className="max-w-[1280px] mx-auto px-6">
                <Link to="/jobs" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent-primary transition-colors mb-8"><ArrowLeft size={18} /> Back to Jobs</Link>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 animate-fade-in-up">
                        <Card hover={false}>
                            <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
                                <h1 className="text-2xl">{job.position}</h1>
                                <Badge variant="accent">{job.vacancies || '?'} openings</Badge>
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm text-text-secondary mb-8 pb-6 border-b border-border-subtle">
                                <span className="flex items-center gap-1.5"><Briefcase size={16} /> {job.experience || 0}+ years</span>
                                <span className="flex items-center gap-1.5"><DollarSign size={16} /> ₹{job.budget || 'N/A'}</span>
                                <span className="flex items-center gap-1.5"><Clock size={16} /> {formatDate(job.expried_date)}</span>
                                <span className="flex items-center gap-1.5"><Users size={16} /> {job.reference_name || 'N/A'}</span>
                                {job.reference_no && <span className="flex items-center gap-1.5"><Phone size={16} /> {job.reference_no}</span>}
                            </div>
                            <h3 className="text-base mb-3">Description</h3>
                            <p className="text-text-secondary leading-relaxed">{job.description || 'No description provided.'}</p>
                        </Card>
                    </div>
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
                        <Card hover={false}>
                            <h3 className="text-base mb-2">Interested?</h3>
                            <p className="text-sm text-text-secondary mb-6">Apply and connect with the employer.</p>
                            {message && <div className={`text-sm rounded-lg px-4 py-2.5 mb-4 ${message.includes('success') ? 'text-success bg-success-soft' : 'text-danger bg-danger-soft'}`}>{message}</div>}
                            {!showApply ? (
                                <Button fullWidth icon={Send} onClick={() => isAuthenticated ? setShowApply(true) : navigate('/login')}>Apply Now</Button>
                            ) : (
                                <form onSubmit={handleApply} className="flex flex-col gap-4">
                                    <Input label="Expected Rate" placeholder="e.g. ₹25000/month" value={rate} onChange={(e) => setRate(e.target.value)} icon={DollarSign} required />
                                    <Button type="submit" fullWidth loading={applying}>Submit Application</Button>
                                    <Button variant="ghost" fullWidth onClick={() => setShowApply(false)}>Cancel</Button>
                                </form>
                            )}
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
