import { useNavigate } from 'react-router-dom';

export default function ResultScreen({ score, total, best, onRestart }) {
    const navigate = useNavigate();

    const percent = total ? (score / total) * 100 : 0;
    let emoji = '💪';
    if (percent === 100) emoji = '🏆';
    else if (percent >= 80) emoji = '🎉';
    else if (percent >= 60) emoji = '😊';
    else if (percent >= 40) emoji = '🤔';

    return (
        <section id="screen-result" className="screen">
            <h2>🎉 Результат</h2>
            <div className="emoji" id="resultEmoji">{emoji}</div>
            <div className="result-stats">
                <div>Ваш результат: <strong style={{ color: 'var(--accent)', fontSize: '1.5rem' }}>{score}</strong> из <span>{total}</span></div>
                <div>Лучший результат: <strong style={{ color: 'var(--ok)' }}>{best}</strong></div>
            </div>
            <button className="btn" onClick={onRestart}>🔄 Играть ещё</button>
            <button className="btn" onClick={() => navigate('/')}>⬅️ Назад к категориям</button>
        </section>
    );
}
