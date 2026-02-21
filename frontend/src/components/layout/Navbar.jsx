import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, Briefcase, LogOut, LayoutDashboard, User, PlusCircle } from 'lucide-react';
import Button from '../ui/Button';

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { isAuthenticated, user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        logout();
        setMobileOpen(false);
        navigate('/');
    };

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/jobs', label: 'Jobs' },
    ];

    const authLinks = [
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/create-job', label: 'Post Job', icon: PlusCircle },
        { path: '/profile', label: 'Profile', icon: User },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 h-[72px] bg-bg-primary/80 backdrop-blur-xl border-b border-border-subtle">
            <div className="max-w-[1280px] mx-auto px-6 h-full flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 text-text-primary font-bold text-xl" onClick={() => setMobileOpen(false)}>
                    <Briefcase size={24} className="text-accent-primary" />
                    <span className="gradient-text">Workforce</span>
                </Link>

                <div className={`
                    max-md:fixed max-md:top-[72px] max-md:left-0 max-md:right-0 max-md:bottom-0 max-md:bg-bg-primary/95 max-md:backdrop-blur-xl max-md:flex-col max-md:p-8 max-md:gap-4 max-md:border-t max-md:border-border-subtle
                    ${mobileOpen ? 'max-md:flex' : 'max-md:hidden'}
                    md:flex items-center gap-1
                `}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-250
                                ${isActive(link.path) ? 'text-text-primary bg-white/[0.08]' : 'text-text-secondary hover:text-text-primary hover:bg-white/[0.04]'}`}
                            onClick={() => setMobileOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}

                    {isAuthenticated && authLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-250
                                ${isActive(link.path) ? 'text-text-primary bg-white/[0.08]' : 'text-text-secondary hover:text-text-primary hover:bg-white/[0.04]'}`}
                            onClick={() => setMobileOpen(false)}
                        >
                            {link.icon && <link.icon size={16} />}
                            {link.label}
                        </Link>
                    ))}

                    <div className="max-md:mt-auto md:ml-4 flex items-center gap-3">
                        {isAuthenticated ? (
                            <div className="flex items-center gap-3">
                                <span className="text-sm text-text-secondary">Hi, {user?.name || 'User'}</span>
                                <Button variant="ghost" size="sm" onClick={handleLogout} icon={LogOut}>
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <>
                                <Link to="/login" onClick={() => setMobileOpen(false)}>
                                    <Button variant="ghost" size="sm">Log In</Button>
                                </Link>
                                <Link to="/register" onClick={() => setMobileOpen(false)}>
                                    <Button variant="primary" size="sm">Sign Up</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                <button className="md:hidden text-text-primary" onClick={() => setMobileOpen(!mobileOpen)}>
                    {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
        </nav>
    );
}
