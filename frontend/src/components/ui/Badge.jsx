const variants = {
    default: 'bg-white/[0.08] text-text-secondary',
    accent: 'bg-accent-soft text-text-accent',
    info: 'bg-info-soft text-info',
    warning: 'bg-warning-soft text-warning',
    danger: 'bg-danger-soft text-danger',
    success: 'bg-success-soft text-success',
};

export default function Badge({ children, variant = 'default' }) {
    return (
        <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${variants[variant] || variants.default}`}>
            {children}
        </span>
    );
}
