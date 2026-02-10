export default function QuestionCard({
    question,
    questionIndex,
    totalQuestions,
    selectedChoice,
    isAnswered,
    onSelect
}) {
    return (
        <>
            <div className="question-number">Вопрос {questionIndex + 1} из {totalQuestions}</div>
            <h2>{question.q}</h2>

            <div className="choices">
                {question.choices.map((text, i) => {
                    let className = 'choice';
                    if (isAnswered) {
                        if (i === question.correct) className += ' correct';
                        else if (i === selectedChoice) className += ' wrong';
                        else className += ' disabled';
                    } else if (selectedChoice === i) {
                        className += ' selected';
                    }

                    return (
                        <button
                            key={i}
                            className={className}
                            onClick={() => onSelect(i)}
                            disabled={isAnswered}
                        >
                            {text}
                        </button>
                    );
                })}
            </div>
        </>
    );
}
