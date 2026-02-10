export default function Hud({ score, best, timer, current, total }) {
    const progressPct = total ? (current / total) * 100 : 0;

    return (
        <div className="hud">
            <div className="progress"><div className="bar" style={{ width: `${progressPct}%` }}></div></div>
            <div className="stats">
                Очки: <span>{score}</span> · Рекорд: <span>{best}</span> · Таймер: <span>{timer}</span>s
            </div>
        </div>
    );
}
