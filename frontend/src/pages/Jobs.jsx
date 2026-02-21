import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Clock, Briefcase, DollarSign, Filter, X } from 'lucide-react';
import { getJobs } from '../services/api';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

export default function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({ search: '', city: '', district: '', recent_days: '' });

    const fetchJobs = async (f = filters) => {
        setLoading(true);
        try {
            const payload = {};
            if (f.search) payload.search = f.search;
            if (f.city) payload.city = f.city;
            if (f.district) payload.district = f.district;
            if (f.recent_days) payload.recent_days = f.recent_days;
            const res = await getJobs(payload);
            setJobs(res.details || []);
        } catch {
            setJobs([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchJobs(); }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchJobs();
    };

    const clearFilters = () => {
        const cleared = { search: '', city: '', district: '', recent_days: '' };
        setFilters(cleared);
        fetchJobs(cleared);
    };

    const formatDate = (d) => {
        if (!d) return '';
        return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <div className="py-16 pt-28">
            <div className="max-w-[1280px] mx-auto px-6">
                <div className="text-center mb-10 animate-fade-in-up">
                    <h1 className="mb-3">Find <span className="gradient-text">Opportunities</span></h1>
                    <p className="text-text-secondary">Discover jobs that match your skills and experience</p>
                </div>

                {/* Search & Filters */}
                <form onSubmit={handleSearch} className="mb-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <div className="flex items-center gap-3 bg-bg-card border border-border-subtle rounded-2xl px-5 py-3">
                        <Search size={20} className="text-text-muted shrink-0" />
                        <input
                            type="text"
                            placeholder="Search by position or description..."
                            value={filters.search}
                            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                            className="flex-1 bg-transparent text-text-primary text-sm placeholder:text-text-muted outline-none"
                        />
                        <Button type="submit" size="sm">Search</Button>
                        <button type="button" className="text-text-muted hover:text-text-primary transition-colors p-2 rounded-lg hover:bg-white/[0.06]" onClick={() => setShowFilters(!showFilters)}>
                            <Filter size={18} />
                        </button>
                    </div>

                    {showFilters && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 p-5 bg-bg-card border border-border-subtle rounded-2xl animate-fade-in">
                            <Input label="City" placeholder="Filter by city" value={filters.city} onChange={(e) => setFilters({ ...filters, city: e.target.value })} icon={MapPin} />
                            <Input label="District" placeholder="Filter by district" value={filters.district} onChange={(e) => setFilters({ ...filters, district: e.target.value })} icon={MapPin} />
                            <Input label="Recent (days)" placeholder="e.g. 7" type="number" value={filters.recent_days} onChange={(e) => setFilters({ ...filters, recent_days: e.target.value })} icon={Clock} />
                            <div className="sm:col-span-3 flex gap-3 justify-end">
                                <Button type="submit" size="sm">Apply Filters</Button>
                                <Button variant="ghost" size="sm" onClick={clearFilters} icon={X}>Clear</Button>
                            </div>
                        </div>
                    )}
                </form>

                {/* Job List */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4 text-text-secondary">
                        <div className="spinner-lg" />
                        <p>Finding jobs for you...</p>
                    </div>
                ) : jobs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4 text-text-muted animate-fade-in">
                        <Briefcase size={48} />
                        <h3>No jobs found</h3>
                        <p className="text-sm">Try adjusting your search or filters</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {jobs.map((job, i) => (
                            <Card key={job.id || i} className="flex flex-col animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
                                <div className="flex items-start justify-between gap-3 mb-3">
                                    <h3 className="text-base font-semibold leading-snug">{job.position || 'Untitled Position'}</h3>
                                    <Badge variant="accent">{job.vacancies || '?'} openings</Badge>
                                </div>
                                <p className="text-sm text-text-secondary mb-4 flex-1">
                                    {job.description ? job.description.slice(0, 120) + (job.description.length > 120 ? '...' : '') : 'No description'}
                                </p>
                                <div className="flex flex-wrap gap-3 text-xs text-text-muted mb-4">
                                    <span className="flex items-center gap-1"><Briefcase size={14} /> {job.experience || 0}+ yrs exp</span>
                                    <span className="flex items-center gap-1"><DollarSign size={14} /> ₹{job.budget || 'N/A'}</span>
                                    {job.expried_date && <span className="flex items-center gap-1"><Clock size={14} /> {formatDate(job.expried_date)}</span>}
                                </div>
                                <div className="pt-4 border-t border-border-subtle">
                                    <Link to={`/jobs/${job.id}`}>
                                        <Button variant="secondary" size="sm" fullWidth>View Details</Button>
                                    </Link>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
