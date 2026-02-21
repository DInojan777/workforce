import './Button.css';

export default function Button({ children, variant = 'primary', size = 'md', loading, fullWidth, icon: Icon, ...props }) {
    return (
        <button
            className={`btn btn--${variant} btn--${size} ${fullWidth ? 'btn--full' : ''} ${loading ? 'btn--loading' : ''}`}
            disabled={loading || props.disabled}
            {...props}
        >
            {loading && <span className="btn__spinner" />}
            {Icon && !loading && <Icon size={size === 'sm' ? 16 : 18} />}
            <span>{children}</span>
        </button>
    );
}
