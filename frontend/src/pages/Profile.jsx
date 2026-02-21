import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Shield, Camera, Upload, Briefcase, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { uploadPortfolio } from '../services/api';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import './Profile.css';

export default function Profile() {
    const { user, permissions, isAuthenticated, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const [uploading, setUploading] = useState(false);
    const [uploadMsg, setUploadMsg] = useState('');

    useEffect(() => {
        if (!authLoading && !isAuthenticated) navigate('/login');
    }, [authLoading, isAuthenticated]);

    const handlePhotoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);
        setUploadMsg('');
        try {
            const formData = new FormData();
            formData.append('portfolio_photo', file);
            formData.append('user_info_id', user?.employee_id || '');
            const res = await uploadPortfolio(formData);
            if (res.success) {
                setUploadMsg('Portfolio photo uploaded successfully!');
            } else {
                setUploadMsg(res.error_message || 'Upload failed');
            }
        } catch {
            setUploadMsg('Network error');
        } finally {
            setUploading(false);
        }
    };

    if (authLoading) {
        return (
            <div className="profile-loading">
                <div className="spinner-lg" />
            </div>
        );
    }

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

    return (
        <div className="profile section">
            <div className="container">
                <div className="profile__grid">
                    {/* Profile Card */}
                    <div className="profile__main animate-fade-in-up">
                        <Card hover={false} className="profile__hero-card">
                            <div className="profile__avatar">
                                <div className="profile__avatar-circle">
                                    <User size={48} />
                                </div>
                                <div className="profile__avatar-info">
                                    <h2>{user.name || 'User'}</h2>
                                    <p>{user.email}</p>
                                </div>
                            </div>

                            <div className="profile__badges">
                                {getRoleBadges().map((b, i) => (
                                    <Badge key={i} variant={b.variant}>{b.label}</Badge>
                                ))}
                            </div>
                        </Card>

                        <Card hover={false} className="profile__details-card">
                            <h3>Personal Information</h3>
                            <div className="profile__info-grid">
                                <div className="profile__info-item">
                                    <span className="profile__info-icon"><Mail size={16} /></span>
                                    <div>
                                        <p className="profile__info-label">Email</p>
                                        <p className="profile__info-value">{user.email}</p>
                                    </div>
                                </div>
                                <div className="profile__info-item">
                                    <span className="profile__info-icon"><Phone size={16} /></span>
                                    <div>
                                        <p className="profile__info-label">Mobile</p>
                                        <p className="profile__info-value">{user.mobile_number || 'Not set'}</p>
                                    </div>
                                </div>
                                <div className="profile__info-item">
                                    <span className="profile__info-icon"><User size={16} /></span>
                                    <div>
                                        <p className="profile__info-label">Gender</p>
                                        <p className="profile__info-value">{user.gender === 'M' ? 'Male' : user.gender === 'F' ? 'Female' : user.gender || 'Not set'}</p>
                                    </div>
                                </div>
                                <div className="profile__info-item">
                                    <span className="profile__info-icon"><Shield size={16} /></span>
                                    <div>
                                        <p className="profile__info-label">Account Status</p>
                                        <p className="profile__info-value">{user.is_active ? '✅ Active' : '❌ Inactive'}</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="profile__sidebar animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
                        <Card hover={false} className="profile__portfolio-card">
                            <h3><Camera size={18} /> Portfolio</h3>
                            <p>Upload photos to showcase your work. Max 2 per day.</p>

                            <label className="profile__upload-btn">
                                <input type="file" accept="image/*" onChange={handlePhotoUpload} hidden disabled={uploading} />
                                <Button variant="secondary" fullWidth icon={Upload} loading={uploading} onClick={() => { }}>
                                    {uploading ? 'Uploading...' : 'Upload Photo'}
                                </Button>
                            </label>

                            {uploadMsg && (
                                <div className={`profile__upload-msg ${uploadMsg.includes('success') ? 'profile__upload-msg--success' : 'profile__upload-msg--error'}`}>
                                    {uploadMsg}
                                </div>
                            )}
                        </Card>

                        <Card hover={false} className="profile__quick-card">
                            <h3><Briefcase size={18} /> Quick Links</h3>
                            <div className="profile__quick-links">
                                <a href="/jobs" className="profile__quick-link">
                                    <Briefcase size={16} /> Browse Jobs
                                </a>
                                <a href="/create-job" className="profile__quick-link">
                                    <Star size={16} /> Post a Job
                                </a>
                                <a href="/dashboard" className="profile__quick-link">
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
