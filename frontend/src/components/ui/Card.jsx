import './Card.css';

export default function Card({ children, className = '', hover = true, glow = false, ...props }) {
    return (
        <div className={`card ${hover ? 'card--hover' : ''} ${glow ? 'card--glow' : ''} ${className}`} {...props}>
            {children}
        </div>
    );
}
