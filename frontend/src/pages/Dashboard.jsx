import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Briefcase, PlusCircle, User, Shield, LogOut, Activity, Clock, TrendingUp } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import './Dashboard.css';

export default function Dashboard() {
    const { user, permissions, isAuthenticated, logout, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !isAuthenticated) navigate('/login');
    }, [loading, isAuthenticated]);

    if (loading) {
        return (
            <div className="dashboard-loading">
                <div className="spinner-lg" />
                <p>Loading your dashboard...</p>
            </div>
        );
    }

    if (!user) return null;

    const quickActions = [
        { icon: Briefcase, label: 'Browse Jobs', path: '/jobs', color: 'var(--accent-primary)' },
        { icon: PlusCircle, label: 'Post a Job', path: '/create-job', color: 'var(--accent-secondary)' },
        { icon: User, label: 'My Profile', path: '/profile', color: 'var(--info)' },
    ];

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
        <div className="dashboard section">
            <div className="container">
                <div className="dashboard__header animate-fade-in-up">
                    <div>
                        <h1>Welcome back, <span className="gradient-text">{user.name}</span></h1>
                        <p className="dashboard__subtitle">Here's what's happening with your account today.</p>
                    </div>
                    <Button variant="ghost" icon={LogOut} onClick={() => { logout(); navigate('/'); }}>Logout</Button>
                </div>

                {/* Stats Cards */}
                <div className="dashboard__stats animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <Card className="stat-card">
                        <div className="stat-card__icon" style={{ background: 'var(--accent-soft)' }}>
                            <Activity size={22} color="var(--accent-primary)" />
                        </div>
                        <div>
                            <p className="stat-card__label">Status</p>
                            <p className="stat-card__value">{user.is_active ? 'Active' : 'Inactive'}</p>
                        </div>
                    </Card>
                    <Card className="stat-card">
                        <div className="stat-card__icon" style={{ background: 'var(--info-soft)' }}>
                            <Clock size={22} color="var(--info)" />
                        </div>
                        <div>
                            <p className="stat-card__label">Email</p>
                            <p className="stat-card__value stat-card__value--sm">{user.email}</p>
                        </div>
                    </Card>
                    <Card className="stat-card">
                        <div className="stat-card__icon" style={{ background: 'var(--success-soft)' }}>
                            <TrendingUp size={22} color="var(--success)" />
                        </div>
                        <div>
                            <p className="stat-card__label">Mobile</p>
                            <p className="stat-card__value">{user.mobile_number || 'N/A'}</p>
                        </div>
                    </Card>
                </div>

                {/* Role Badges */}
                <Card className="dashboard__roles animate-fade-in-up" style={{ animationDelay: '0.2s' }} hover={false}>
                    <h3><Shield size={18} /> Your Roles</h3>
                    <div className="dashboard__badges">
                        {getRoleBadges().map((b, i) => (
                            <Badge key={i} variant={b.variant}>{b.label}</Badge>
                        ))}
                        {getRoleBadges().length === 0 && <span className="dashboard__no-role">No roles assigned</span>}
                    </div>
                </Card>

                {/* Quick Actions */}
                <div className="dashboard__actions animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <h3>Quick Actions</h3>
                    <div className="dashboard__actions-grid">
                        {quickActions.map((a, i) => (
                            <Link to={a.path} key={i}>
                                <Card className="action-card">
                                    <div className="action-card__icon" style={{ color: a.color }}>
                                        <a.icon size={28} />
                                    </div>
                                    <span>{a.label}</span>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
