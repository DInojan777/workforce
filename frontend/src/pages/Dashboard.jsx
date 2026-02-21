import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Briefcase, PlusCircle, User, Shield, LogOut, Activity, Clock, TrendingUp } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

export default function Dashboard() {
    const { user, permissions, isAuthenticated, logout, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => { if (!loading && !isAuthenticated) navigate('/login'); }, [loading, isAuthenticated]);

    if (loading) return <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-text-secondary"><div className="spinner-lg" /><p>Loading your dashboard...</p></div>;
    if (!user) return null;

    const quickActions = [
        { icon: Briefcase, label: 'Browse Jobs', path: '/jobs', color: 'text-accent-primary' },
        { icon: PlusCircle, label: 'Post a Job', path: '/create-job', color: 'text-accent-secondary' },
        { icon: User, label: 'My Profile', path: '/profile', color: 'text-info' },
    ];

    const getRoleBadges = () => {
        const b = [];
        if (permissions?.is_admin) b.push({ label: 'Admin', variant: 'danger' });
        if (permissions?.is_job_seeker) b.push({ label: 'Job Seeker', variant: 'info' });
        if (permissions?.is_client) b.push({ label: 'Client', variant: 'accent' });
        if (permissions?.is_contractor) b.push({ label: 'Contractor', variant: 'warning' });
        if (permissions?.is_guest) b.push({ label: 'Guest', variant: 'default' });
        return b;
    };

    return (
        <div className="py-16 pt-28">
            <div className="max-w-[1280px] mx-auto px-6">
                <div className="flex items-start justify-between gap-4 mb-10 animate-fade-in-up flex-wrap">
                    <div>
                        <h1>Welcome back, <span className="gradient-text">{user.name}</span></h1>
                        <p className="text-text-secondary mt-2">Here's what's happening with your account today.</p>
                    </div>
                    <Button variant="ghost" icon={LogOut} onClick={() => { logout(); navigate('/'); }}>Logout</Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <Card className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl bg-accent-soft flex items-center justify-center"><Activity size={22} className="text-accent-primary" /></div>
                        <div><p className="text-xs text-text-muted">Status</p><p className="text-lg font-semibold">{user.is_active ? 'Active' : 'Inactive'}</p></div>
                    </Card>
                    <Card className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl bg-info-soft flex items-center justify-center"><Clock size={22} className="text-info" /></div>
                        <div><p className="text-xs text-text-muted">Email</p><p className="text-sm font-semibold truncate max-w-[180px]">{user.email}</p></div>
                    </Card>
                    <Card className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl bg-success-soft flex items-center justify-center"><TrendingUp size={22} className="text-success" /></div>
                        <div><p className="text-xs text-text-muted">Mobile</p><p className="text-lg font-semibold">{user.mobile_number || 'N/A'}</p></div>
                    </Card>
                </div>

                <Card className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }} hover={false}>
                    <h3 className="flex items-center gap-2 mb-4 text-base"><Shield size={18} /> Your Roles</h3>
                    <div className="flex flex-wrap gap-2">
                        {getRoleBadges().map((b, i) => <Badge key={i} variant={b.variant}>{b.label}</Badge>)}
                        {getRoleBadges().length === 0 && <span className="text-sm text-text-muted">No roles assigned</span>}
                    </div>
                </Card>

                <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <h3 className="mb-4 text-base">Quick Actions</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {quickActions.map((a, i) => (
                            <Link to={a.path} key={i}>
                                <Card className="flex flex-col items-center gap-3 text-center py-8">
                                    <div className={a.color}><a.icon size={28} /></div>
                                    <span className="text-sm font-medium">{a.label}</span>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
