import { Link } from 'react-router-dom';

export default function Button({ children, onClick, disabled, to, className = '', variant = 'primary' }) {
    // If 'to' is provided, render as Link
    const baseClass = variant === 'category' ? 'btn category-btn' : 'btn';
    const finalClass = `${baseClass} ${className}`.trim();

    if (to) {
        return (
            <Link className={finalClass} to={to}>
                {children}
            </Link>
        );
    }

    return (
        <button className={finalClass} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
}
