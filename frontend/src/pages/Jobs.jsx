import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Clock, Briefcase, DollarSign, Filter, X } from 'lucide-react';
import { getJobs } from '../services/api';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import './Jobs.css';

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
        <div className="jobs-page section">
            <div className="container">
                <div className="jobs-page__header animate-fade-in-up">
                    <h1>Find <span className="gradient-text">Opportunities</span></h1>
                    <p>Discover jobs that match your skills and experience</p>
                </div>

                {/* Search & Filters */}
                <form onSubmit={handleSearch} className="jobs-search animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <div className="jobs-search__bar">
                        <Search size={20} className="jobs-search__icon" />
                        <input
                            type="text"
                            placeholder="Search by position or description..."
                            value={filters.search}
                            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                            className="jobs-search__input"
                        />
                        <Button type="submit" size="sm">Search</Button>
                        <button type="button" className="jobs-search__filter-btn" onClick={() => setShowFilters(!showFilters)}>
                            <Filter size={18} />
                        </button>
                    </div>

                    {showFilters && (
                        <div className="jobs-filters animate-fade-in">
                            <Input label="City" placeholder="Filter by city" value={filters.city} onChange={(e) => setFilters({ ...filters, city: e.target.value })} icon={MapPin} />
                            <Input label="District" placeholder="Filter by district" value={filters.district} onChange={(e) => setFilters({ ...filters, district: e.target.value })} icon={MapPin} />
                            <Input label="Recent (days)" placeholder="e.g. 7" type="number" value={filters.recent_days} onChange={(e) => setFilters({ ...filters, recent_days: e.target.value })} icon={Clock} />
                            <div className="jobs-filters__actions">
                                <Button type="submit" size="sm">Apply Filters</Button>
                                <Button variant="ghost" size="sm" onClick={clearFilters} icon={X}>Clear</Button>
                            </div>
                        </div>
                    )}
                </form>

                {/* Job List */}
                {loading ? (
                    <div className="jobs-loading">
                        <div className="spinner-lg" />
                        <p>Finding jobs for you...</p>
                    </div>
                ) : jobs.length === 0 ? (
                    <div className="jobs-empty animate-fade-in">
                        <Briefcase size={48} />
                        <h3>No jobs found</h3>
                        <p>Try adjusting your search or filters</p>
                    </div>
                ) : (
                    <div className="jobs-grid">
                        {jobs.map((job, i) => (
                            <Card key={job.id || i} className="job-card animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
                                <div className="job-card__header">
                                    <h3 className="job-card__title">{job.position || 'Untitled Position'}</h3>
                                    <Badge variant="accent">{job.vacancies || '?'} openings</Badge>
                                </div>
                                <p className="job-card__desc">{job.description ? job.description.slice(0, 120) + (job.description.length > 120 ? '...' : '') : 'No description'}</p>
                                <div className="job-card__meta">
                                    <span><Briefcase size={14} /> {job.experience || 0}+ yrs exp</span>
                                    <span><DollarSign size={14} /> ₹{job.budget || 'N/A'}</span>
                                    {job.expried_date && <span><Clock size={14} /> {formatDate(job.expried_date)}</span>}
                                </div>
                                <div className="job-card__footer">
                                    <Link to={`/jobs/${job.id}`}>
                                        <Button variant="secondary" size="sm">View Details</Button>
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
