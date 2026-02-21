import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Briefcase, DollarSign, Clock, MapPin, Users, Phone, Send } from 'lucide-react';
import { getJobs, applyJob } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import './JobDetail.css';

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

    useEffect(() => {
        fetchJob();
    }, [id]);

    const fetchJob = async () => {
        setLoading(true);
        try {
            const res = await getJobs({});
            const found = (res.details || []).find((j) => j.id === id);
            setJob(found || null);
        } catch {
            setJob(null);
        } finally {
            setLoading(false);
        }
    };

    const handleApply = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) return navigate('/login');
        setApplying(true);
        try {
            const res = await applyJob({ job_id: id, applicant_details_id: user?.employee_id, expection_rate: rate });
            if (res.success) {
                setMessage('Application submitted successfully!');
                setShowApply(false);
            } else {
                setMessage(res.error_message || 'Application failed');
            }
        } catch {
            setMessage('Network error');
        } finally {
            setApplying(false);
        }
    };

    const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'N/A';

    if (loading) {
        return (
            <div className="jobdetail-loading">
                <div className="spinner-lg" />
                <p>Loading job details...</p>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="jobdetail-loading">
                <Briefcase size={48} />
                <h3>Job not found</h3>
                <Link to="/jobs"><Button variant="secondary">Back to Jobs</Button></Link>
            </div>
        );
    }

    return (
        <div className="jobdetail section">
            <div className="container">
                <Link to="/jobs" className="jobdetail__back">
                    <ArrowLeft size={18} /> Back to Jobs
                </Link>

                <div className="jobdetail__grid">
                    <div className="jobdetail__main animate-fade-in-up">
                        <Card hover={false} className="jobdetail__card">
                            <div className="jobdetail__top">
                                <h1>{job.position}</h1>
                                <Badge variant="accent">{job.vacancies || '?'} openings</Badge>
                            </div>

                            <div className="jobdetail__meta">
                                <span><Briefcase size={16} /> {job.experience || 0}+ years experience</span>
                                <span><DollarSign size={16} /> Budget: ₹{job.budget || 'N/A'}</span>
                                <span><Clock size={16} /> Expires: {formatDate(job.expried_date)}</span>
                                <span><Users size={16} /> Ref: {job.reference_name || 'N/A'}</span>
                                {job.reference_no && <span><Phone size={16} /> {job.reference_no}</span>}
                            </div>

                            <div className="jobdetail__section">
                                <h3>Description</h3>
                                <p>{job.description || 'No description provided.'}</p>
                            </div>
                        </Card>
                    </div>

                    <div className="jobdetail__sidebar animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
                        <Card hover={false} className="jobdetail__apply-card">
                            <h3>Interested?</h3>
                            <p>Apply to this position and connect with the employer.</p>

                            {message && (
                                <div className={`jobdetail__message ${message.includes('success') ? 'jobdetail__message--success' : 'jobdetail__message--error'}`}>
                                    {message}
                                </div>
                            )}

                            {!showApply ? (
                                <Button fullWidth icon={Send} onClick={() => isAuthenticated ? setShowApply(true) : navigate('/login')}>
                                    Apply Now
                                </Button>
                            ) : (
                                <form onSubmit={handleApply} className="jobdetail__apply-form">
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
