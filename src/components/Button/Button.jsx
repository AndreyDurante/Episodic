import './Button.css';

export default function Button({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  type = 'button',
  className = '',
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`custom-btn btn-${variant} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
