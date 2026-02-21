import { useState } from 'react';

export default function Input({ label, icon: Icon, error, type = 'text', className = '', ...props }) {
    const [focused, setFocused] = useState(false);

    return (
        <div className={`flex flex-col gap-1.5 ${className}`}>
            {label && <label className="text-sm font-medium text-text-secondary">{label}</label>}
            <div className={`flex items-center gap-2.5 bg-bg-input border rounded-xl px-4 py-3 transition-all duration-250
                ${focused ? 'border-accent-primary shadow-[0_0_0_3px_rgba(37,99,235,0.1)] bg-white' : 'border-border-subtle'}
                ${error ? 'border-danger shadow-[0_0_0_3px_rgba(220,38,38,0.1)]' : ''}`}
            >
                {Icon && <Icon size={18} className={`shrink-0 ${focused ? 'text-accent-primary' : 'text-text-muted'}`} />}
                <input
                    type={type}
                    className="flex-1 bg-transparent text-text-primary text-sm placeholder:text-text-muted outline-none"
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    {...props}
                />
            </div>
            {error && <span className="text-xs text-danger">{error}</span>}
        </div>
    );
}
