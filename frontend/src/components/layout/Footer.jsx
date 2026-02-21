import { Link } from 'react-router-dom';
import { Briefcase, Github, Mail, Heart } from 'lucide-react';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__grid">
                    <div className="footer__brand">
                        <Link to="/" className="footer__logo">
                            <Briefcase size={22} />
                            <span>Workforce</span>
                        </Link>
                        <p className="footer__desc">
                            Connecting talented professionals with great opportunities. Find your next career move with us.
                        </p>
                    </div>

                    <div className="footer__col">
                        <h4 className="footer__title">Platform</h4>
                        <Link to="/jobs" className="footer__link">Browse Jobs</Link>
                        <Link to="/create-job" className="footer__link">Post a Job</Link>
                        <Link to="/register" className="footer__link">Sign Up</Link>
                    </div>

                    <div className="footer__col">
                        <h4 className="footer__title">Company</h4>
                        <a href="#" className="footer__link">About Us</a>
                        <a href="#" className="footer__link">Privacy Policy</a>
                        <a href="#" className="footer__link">Terms of Service</a>
                    </div>

                    <div className="footer__col">
                        <h4 className="footer__title">Connect</h4>
                        <a href="#" className="footer__link"><Mail size={14} /> support@workforce.com</a>
                        <a href="#" className="footer__link"><Github size={14} /> GitHub</a>
                    </div>
                </div>

                <div className="footer__bottom">
                    <p>© 2026 Workforce. Made with <Heart size={14} className="footer__heart" /> All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
