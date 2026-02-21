import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, Users, Shield, TrendingUp, Search, MapPin, Zap } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import './Home.css';

export default function Home() {
    const features = [
        { icon: Search, title: 'Smart Search', desc: 'Filter jobs by location, experience, skills and more with powerful search tools.' },
        { icon: Shield, title: 'Verified Employers', desc: 'All companies are vetted to ensure safe and legitimate job opportunities.' },
        { icon: Zap, title: 'Quick Apply', desc: 'Apply to positions instantly with your saved profile and portfolio.' },
        { icon: TrendingUp, title: 'Career Growth', desc: 'Access opportunities that match your skills and advance your career.' },
    ];

    const stats = [
        { value: '10K+', label: 'Active Jobs' },
        { value: '5K+', label: 'Companies' },
        { value: '50K+', label: 'Job Seekers' },
        { value: '95%', label: 'Success Rate' },
    ];

    return (
        <div className="home">
            {/* Hero */}
            <section className="hero">
                <div className="hero__bg-orb hero__bg-orb--1" />
                <div className="hero__bg-orb hero__bg-orb--2" />
                <div className="container hero__content">
                    <div className="hero__text animate-fade-in-up">
                        <span className="hero__badge">🚀 #1 Job Platform</span>
                        <h1>Find Your <span className="gradient-text">Dream Career</span> Today</h1>
                        <p className="hero__subtitle">
                            Connect with top employers, discover exciting opportunities, and take the next step in your professional journey.
                        </p>
                        <div className="hero__actions">
                            <Link to="/jobs">
                                <Button size="lg" icon={Search}>Browse Jobs</Button>
                            </Link>
                            <Link to="/register">
                                <Button variant="secondary" size="lg" icon={ArrowRight}>Get Started</Button>
                            </Link>
                        </div>
                    </div>
                    <div className="hero__visual animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <div className="hero__card glass">
                            <Briefcase size={48} className="hero__card-icon" />
                            <h3>Ready to hire?</h3>
                            <p>Post your job listings and find the perfect candidates</p>
                            <Link to="/register">
                                <Button variant="secondary" size="sm">Post a Job</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="stats section">
                <div className="container">
                    <div className="stats__grid">
                        {stats.map((s, i) => (
                            <div key={i} className="stats__item animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                                <span className="stats__value gradient-text">{s.value}</span>
                                <span className="stats__label">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="features section">
                <div className="container">
                    <div className="features__header">
                        <h2>Why Choose <span className="gradient-text">Workforce</span></h2>
                        <p>Everything you need to find your perfect job or hire the best talent.</p>
                    </div>
                    <div className="features__grid">
                        {features.map((f, i) => (
                            <Card key={i} className="feature-card animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                                <div className="feature-card__icon">
                                    <f.icon size={24} />
                                </div>
                                <h3>{f.title}</h3>
                                <p>{f.desc}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="cta section">
                <div className="container">
                    <Card className="cta__card" hover={false}>
                        <h2>Ready to Start Your Journey?</h2>
                        <p>Join thousands of professionals who've found their dream job through Workforce.</p>
                        <div className="cta__actions">
                            <Link to="/register"><Button size="lg">Create Account</Button></Link>
                            <Link to="/jobs"><Button variant="secondary" size="lg">Explore Jobs</Button></Link>
                        </div>
                    </Card>
                </div>
            </section>
        </div>
    );
}
