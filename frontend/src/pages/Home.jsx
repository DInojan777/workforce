import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, Users, Shield, TrendingUp, Search, MapPin, Zap } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

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
        <div>
            {/* Hero */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-accent-primary/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-accent-secondary/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="max-w-[1280px] mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 relative z-10">
                    <div className="flex-1 animate-fade-in-up">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-soft text-text-accent text-sm font-medium mb-6">
                            🚀 #1 Job Platform
                        </span>
                        <h1 className="mb-6">Find Your <span className="gradient-text">Dream Career</span> Today</h1>
                        <p className="text-lg text-text-secondary max-w-lg mb-8 leading-relaxed">
                            Connect with top employers, discover exciting opportunities, and take the next step in your professional journey.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link to="/jobs">
                                <Button size="lg" icon={Search}>Browse Jobs</Button>
                            </Link>
                            <Link to="/register">
                                <Button variant="secondary" size="lg" icon={ArrowRight}>Get Started</Button>
                            </Link>
                        </div>
                    </div>
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <div className="glass rounded-2xl p-8 text-center max-w-xs animate-float">
                            <Briefcase size={48} className="text-accent-primary mx-auto mb-4" />
                            <h3 className="mb-2">Ready to hire?</h3>
                            <p className="text-sm text-text-secondary mb-6">Post your job listings and find the perfect candidates</p>
                            <Link to="/register">
                                <Button variant="secondary" size="sm">Post a Job</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-16">
                <div className="max-w-[1280px] mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((s, i) => (
                            <div key={i} className="text-center animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                                <span className="gradient-text text-3xl md:text-4xl font-bold block mb-1">{s.value}</span>
                                <span className="text-sm text-text-muted">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-16">
                <div className="max-w-[1280px] mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="mb-3">Why Choose <span className="gradient-text">Workforce</span></h2>
                        <p className="text-text-secondary max-w-lg mx-auto">Everything you need to find your perfect job or hire the best talent.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((f, i) => (
                            <Card key={i} className="animate-fade-in-up text-center" style={{ animationDelay: `${i * 0.1}s` }}>
                                <div className="w-12 h-12 rounded-xl bg-accent-soft flex items-center justify-center text-accent-primary mx-auto mb-4">
                                    <f.icon size={24} />
                                </div>
                                <h3 className="text-base font-semibold mb-2">{f.title}</h3>
                                <p className="text-sm text-text-secondary">{f.desc}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16">
                <div className="max-w-[1280px] mx-auto px-6">
                    <Card className="text-center py-12 px-8 bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10" hover={false}>
                        <h2 className="mb-3">Ready to Start Your Journey?</h2>
                        <p className="text-text-secondary max-w-lg mx-auto mb-8">Join thousands of professionals who've found their dream job through Workforce.</p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link to="/register"><Button size="lg">Create Account</Button></Link>
                            <Link to="/jobs"><Button variant="secondary" size="lg">Explore Jobs</Button></Link>
                        </div>
                    </Card>
                </div>
            </section>
        </div>
    );
}
