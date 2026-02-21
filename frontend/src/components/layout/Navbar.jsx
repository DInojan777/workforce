import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, Briefcase, LogOut, LayoutDashboard, User, PlusCircle } from 'lucide-react';
import Button from '../ui/Button';
import './Navbar.css';

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
        <nav className="navbar">
            <div className="navbar__inner container">
                <Link to="/" className="navbar__logo" onClick={() => setMobileOpen(false)}>
                    <Briefcase size={24} />
                    <span>Workforce</span>
                </Link>

                <div className={`navbar__links ${mobileOpen ? 'navbar__links--open' : ''}`}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`navbar__link ${isActive(link.path) ? 'navbar__link--active' : ''}`}
                            onClick={() => setMobileOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}

                    {isAuthenticated && authLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`navbar__link ${isActive(link.path) ? 'navbar__link--active' : ''}`}
                            onClick={() => setMobileOpen(false)}
                        >
                            {link.icon && <link.icon size={16} />}
                            {link.label}
                        </Link>
                    ))}

                    <div className="navbar__actions">
                        {isAuthenticated ? (
                            <div className="navbar__user">
                                <span className="navbar__greeting">Hi, {user?.name || 'User'}</span>
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

                <button className="navbar__toggle" onClick={() => setMobileOpen(!mobileOpen)}>
                    {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
        </nav>
    );
}
