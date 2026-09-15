import OptionCard from '../OptionCard/OptionCard';
import './QuizQuestion.css';

export default function QuizQuestion({
  question,
  description,
  options = [],
  selectedOption,
  onSelect,
}) {
  return (
    <section className="quiz-question-container">
      <div className="quiz-question-header">
        <h2 className="quiz-question-title">{question}</h2>
        {description && <p className="quiz-question-description">{description}</p>}
      </div>

      <div className="quiz-options-grid">
        {options.map((opt) => (
          <OptionCard
            key={opt.value}
            label={opt.label}
            value={opt.value}
            selected={selectedOption === opt.value}
            onClick={onSelect}
            icon={opt.icon}
            description={opt.description}
          />
        ))}
      </div>
    </section>
  );
}
