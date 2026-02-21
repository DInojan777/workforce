import { Link } from 'react-router-dom';
import { Briefcase, Github, Mail, Heart } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="border-t border-border-subtle bg-bg-secondary/50 pt-12 pb-6">
            <div className="max-w-[1280px] mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
                    <div className="md:col-span-1">
                        <Link to="/" className="flex items-center gap-2 text-text-primary font-bold text-lg mb-3">
                            <Briefcase size={22} className="text-accent-primary" />
                            <span className="gradient-text">Workforce</span>
                        </Link>
                        <p className="text-sm text-text-muted leading-relaxed">
                            Connecting talented professionals with great opportunities. Find your next career move with us.
                        </p>
                    </div>

                    <div className="flex flex-col gap-2.5">
                        <h4 className="text-sm font-semibold text-text-primary mb-1">Platform</h4>
                        <Link to="/jobs" className="text-sm text-text-muted hover:text-text-accent transition-colors duration-200">Browse Jobs</Link>
                        <Link to="/create-job" className="text-sm text-text-muted hover:text-text-accent transition-colors duration-200">Post a Job</Link>
                        <Link to="/register" className="text-sm text-text-muted hover:text-text-accent transition-colors duration-200">Sign Up</Link>
                    </div>

                    <div className="flex flex-col gap-2.5">
                        <h4 className="text-sm font-semibold text-text-primary mb-1">Company</h4>
                        <a href="#" className="text-sm text-text-muted hover:text-text-accent transition-colors duration-200">About Us</a>
                        <a href="#" className="text-sm text-text-muted hover:text-text-accent transition-colors duration-200">Privacy Policy</a>
                        <a href="#" className="text-sm text-text-muted hover:text-text-accent transition-colors duration-200">Terms of Service</a>
                    </div>

                    <div className="flex flex-col gap-2.5">
                        <h4 className="text-sm font-semibold text-text-primary mb-1">Connect</h4>
                        <a href="#" className="flex items-center gap-2 text-sm text-text-muted hover:text-text-accent transition-colors duration-200">
                            <Mail size={14} /> support@workforce.com
                        </a>
                        <a href="#" className="flex items-center gap-2 text-sm text-text-muted hover:text-text-accent transition-colors duration-200">
                            <Github size={14} /> GitHub
                        </a>
                    </div>
                </div>

                <div className="border-t border-border-subtle pt-6 text-center">
                    <p className="text-sm text-text-muted flex items-center justify-center gap-1">
                        © 2026 Workforce. Made with <Heart size={14} className="text-danger fill-danger" /> All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
