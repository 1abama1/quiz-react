import { useNavigate } from 'react-router-dom';

export default function ErrorScreen({ message }) {
    const navigate = useNavigate();
    return (
        <section className="screen">
            <h2>Ошибка</h2>
            <p className="lead">{message}</p>
            <button className="btn" onClick={() => navigate('/')}>⬅️ Назад к категориям</button>
        </section>
    );
}
