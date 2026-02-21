export default function Card({ children, className = '', hover = true, glow = false, ...props }) {
    return (
        <div
            className={`bg-bg-card border border-border-subtle rounded-2xl p-6 shadow-sm transition-all duration-250
                ${hover ? 'hover:shadow-md hover:border-accent-primary hover:-translate-y-0.5' : ''}
                ${glow ? 'animate-pulse-glow' : ''}
                ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}
