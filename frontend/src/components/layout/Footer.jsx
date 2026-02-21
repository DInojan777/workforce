import { Link } from 'react-router-dom';
import { Briefcase } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-border-subtle">
            <div className="max-w-[1280px] mx-auto px-6 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    <div>
                        <Link to="/" className="flex items-center gap-2 font-bold text-lg mb-3">
                            <Briefcase size={20} className="text-accent-primary" />
                            <span className="gradient-text">Workforce</span>
                        </Link>
                        <p className="text-sm text-text-secondary leading-relaxed">Connecting talent with opportunity. Find your dream career or hire the best talent.</p>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider mb-3">For Seekers</h4>
                        <div className="flex flex-col gap-2">
                            <Link to="/jobs" className="text-sm text-text-secondary hover:text-accent-primary transition-colors">Browse Jobs</Link>
                            <Link to="/register" className="text-sm text-text-secondary hover:text-accent-primary transition-colors">Create Account</Link>
                            <Link to="/profile" className="text-sm text-text-secondary hover:text-accent-primary transition-colors">My Profile</Link>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider mb-3">For Employers</h4>
                        <div className="flex flex-col gap-2">
                            <Link to="/create-job" className="text-sm text-text-secondary hover:text-accent-primary transition-colors">Post a Job</Link>
                            <Link to="/register" className="text-sm text-text-secondary hover:text-accent-primary transition-colors">Register</Link>
                            <Link to="/dashboard" className="text-sm text-text-secondary hover:text-accent-primary transition-colors">Dashboard</Link>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider mb-3">Company</h4>
                        <div className="flex flex-col gap-2">
                            <span className="text-sm text-text-secondary">About Us</span>
                            <span className="text-sm text-text-secondary">Contact</span>
                            <span className="text-sm text-text-secondary">Privacy Policy</span>
                        </div>
                    </div>
                </div>
                <div className="pt-6 border-t border-border-subtle flex flex-wrap justify-between items-center gap-4">
                    <p className="text-xs text-text-muted">© 2024 Workforce. All rights reserved.</p>
                    <div className="flex gap-6">
                        <span className="text-xs text-text-muted hover:text-accent-primary cursor-pointer transition-colors">Terms</span>
                        <span className="text-xs text-text-muted hover:text-accent-primary cursor-pointer transition-colors">Privacy</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
