import { useEffect } from 'react';

export default function LoadingScreen({ title }) {
    return (
        <section id="screen-category" className="screen">
            <h2>Загружаем вопросы...</h2>
            <p className="lead">Подождите пару секунд — мы готовим вашу игру.</p>
        </section>
    );
}
