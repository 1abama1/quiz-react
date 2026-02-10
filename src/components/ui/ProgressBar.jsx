export default function ProgressBar({ current, total }) {
    const progressPct = total ? (current / total) * 100 : 0;

    return (
        <div className="progress">
            <div
                className="bar"
                style={{ width: `${progressPct}%` }}
            ></div>
        </div>
    );
}
