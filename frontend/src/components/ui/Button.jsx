const variants = {
    primary: 'bg-accent-primary hover:bg-accent-primary-hover text-white shadow-[0_2px_8px_rgba(37,99,235,0.25)] hover:shadow-[0_4px_16px_rgba(37,99,235,0.35)]',
    secondary: 'bg-white hover:bg-bg-input text-text-primary border border-border-subtle shadow-sm hover:border-accent-primary hover:text-accent-primary',
    ghost: 'bg-transparent hover:bg-bg-input text-text-secondary hover:text-text-primary',
    danger: 'bg-danger hover:bg-red-700 text-white',
};

const sizes = {
    sm: 'px-4 py-2 text-[13px] gap-1.5',
    md: 'px-6 py-2.5 text-sm gap-2',
    lg: 'px-8 py-3.5 text-base gap-2.5',
};

export default function Button({ children, variant = 'primary', size = 'md', loading, fullWidth, icon: Icon, className = '', ...props }) {
    return (
        <button
            className={`inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-250 cursor-pointer
                ${variants[variant] || variants.primary}
                ${sizes[size] || sizes.md}
                ${fullWidth ? 'w-full' : ''}
                ${loading ? 'opacity-60 pointer-events-none' : ''}
                ${className}`}
            disabled={loading || props.disabled}
            {...props}
        >
            {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
            {Icon && !loading && <Icon size={size === 'sm' ? 16 : 18} />}
            <span>{children}</span>
        </button>
    );
}
