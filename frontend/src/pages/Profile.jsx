import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Shield, Camera, Upload, Briefcase, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { uploadPortfolio } from '../services/api';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

export default function Profile() {
    const { user, permissions, isAuthenticated, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const [uploading, setUploading] = useState(false);
    const [uploadMsg, setUploadMsg] = useState('');

    useEffect(() => { if (!authLoading && !isAuthenticated) navigate('/login'); }, [authLoading, isAuthenticated]);

    const handlePhotoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true); setUploadMsg('');
        try {
            const formData = new FormData();
            formData.append('portfolio_photo', file);
            formData.append('user_info_id', user?.employee_id || '');
            const res = await uploadPortfolio(formData);
            setUploadMsg(res.success ? 'Portfolio photo uploaded successfully!' : (res.error_message || 'Upload failed'));
        } catch { setUploadMsg('Network error'); }
        finally { setUploading(false); }
    };

    if (authLoading) return <div className="min-h-screen flex items-center justify-center"><div className="spinner-lg" /></div>;
    if (!user) return null;

    const getRoleBadges = () => {
        const badges = [];
        if (permissions?.is_admin) badges.push({ label: 'Admin', variant: 'danger' });
        if (permissions?.is_job_seeker) badges.push({ label: 'Job Seeker', variant: 'info' });
        if (permissions?.is_client) badges.push({ label: 'Client', variant: 'accent' });
        if (permissions?.is_contractor) badges.push({ label: 'Contractor', variant: 'warning' });
        if (permissions?.is_guest) badges.push({ label: 'Guest', variant: 'default' });
        return badges;
    };

    const infoItems = [
        { icon: Mail, label: 'Email', value: user.email },
        { icon: Phone, label: 'Mobile', value: user.mobile_number || 'Not set' },
        { icon: User, label: 'Gender', value: user.gender === 'M' ? 'Male' : user.gender === 'F' ? 'Female' : user.gender || 'Not set' },
        { icon: Shield, label: 'Account Status', value: user.is_active ? '✅ Active' : '❌ Inactive' },
    ];

    return (
        <div className="py-16 pt-28">
            <div className="max-w-[1280px] mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 flex flex-col gap-6 animate-fade-in-up">
                        <Card hover={false}>
                            <div className="flex items-center gap-5 mb-6">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center shrink-0">
                                    <User size={36} className="text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl">{user.name || 'User'}</h2>
                                    <p className="text-sm text-text-secondary">{user.email}</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {getRoleBadges().map((b, i) => <Badge key={i} variant={b.variant}>{b.label}</Badge>)}
                            </div>
                        </Card>

                        <Card hover={false}>
                            <h3 className="text-base mb-5">Personal Information</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                {infoItems.map((item, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <span className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center text-text-muted shrink-0">
                                            <item.icon size={16} />
                                        </span>
                                        <div>
                                            <p className="text-xs text-text-muted">{item.label}</p>
                                            <p className="text-sm font-medium">{item.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>

                    <div className="flex flex-col gap-6 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
                        <Card hover={false}>
                            <h3 className="flex items-center gap-2 text-base mb-2"><Camera size={18} /> Portfolio</h3>
                            <p className="text-sm text-text-secondary mb-5">Upload photos to showcase your work. Max 2 per day.</p>
                            <label className="block cursor-pointer">
                                <input type="file" accept="image/*" onChange={handlePhotoUpload} hidden disabled={uploading} />
                                <Button variant="secondary" fullWidth icon={Upload} loading={uploading} onClick={() => { }}>
                                    {uploading ? 'Uploading...' : 'Upload Photo'}
                                </Button>
                            </label>
                            {uploadMsg && (
                                <div className={`text-sm rounded-lg px-4 py-2.5 mt-4 ${uploadMsg.includes('success') ? 'text-success bg-success-soft' : 'text-danger bg-danger-soft'}`}>
                                    {uploadMsg}
                                </div>
                            )}
                        </Card>

                        <Card hover={false}>
                            <h3 className="flex items-center gap-2 text-base mb-4"><Briefcase size={18} /> Quick Links</h3>
                            <div className="flex flex-col gap-1">
                                <a href="/jobs" className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-text-secondary hover:text-text-accent hover:bg-white/[0.04] transition-all">
                                    <Briefcase size={16} /> Browse Jobs
                                </a>
                                <a href="/create-job" className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-text-secondary hover:text-text-accent hover:bg-white/[0.04] transition-all">
                                    <Star size={16} /> Post a Job
                                </a>
                                <a href="/dashboard" className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-text-secondary hover:text-text-accent hover:bg-white/[0.04] transition-all">
                                    <Shield size={16} /> Dashboard
                                </a>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
