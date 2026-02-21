export default function Card({ children, className = '', hover = true, glow = false, ...props }) {
    return (
        <div
            className={`bg-bg-card border border-border-subtle rounded-2xl p-6 transition-all duration-250
                ${hover ? 'hover:bg-bg-card-hover hover:border-border-active hover:-translate-y-0.5' : ''}
                ${glow ? 'animate-pulse-glow' : ''}
                ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}
