import { Check } from 'lucide-react';
import './OptionCard.css';

export default function OptionCard({
  label,
  value,
  selected = false,
  onClick,
  icon: IconComponent,
  description,
}) {
  return (
    <button
      type="button"
      className={`option-card ${selected ? 'selected' : ''}`}
      onClick={() => onClick(value)}
      aria-pressed={selected}
    >
      <div className="option-card-header">
        {IconComponent && (
          <div className="option-icon-box">
            <IconComponent size={24} />
          </div>
        )}
        <div className={`option-check-circle ${selected ? 'checked' : ''}`}>
          {selected && <Check size={14} strokeWidth={3} />}
        </div>
      </div>
      <div className="option-card-body">
        <h3 className="option-label">{label}</h3>
        {description && <p className="option-description">{description}</p>}
      </div>
    </button>
  );
}
