import { useState } from 'react';
import './Input.css';

export default function Input({ label, icon: Icon, error, type = 'text', ...props }) {
    const [focused, setFocused] = useState(false);

    return (
        <div className={`input-group ${focused ? 'input-group--focused' : ''} ${error ? 'input-group--error' : ''}`}>
            {label && <label className="input-group__label">{label}</label>}
            <div className="input-group__wrapper">
                {Icon && <Icon size={18} className="input-group__icon" />}
                <input
                    type={type}
                    className="input-group__field"
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    {...props}
                />
            </div>
            {error && <span className="input-group__error">{error}</span>}
        </div>
    );
}
