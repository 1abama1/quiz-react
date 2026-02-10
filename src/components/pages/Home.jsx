import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <main className="container">
            <h1>🎯 Викторина</h1>
            <p className="lead">Выберите категорию, чтобы начать игру</p>

            <div className="category-list">
                <Link className="btn" to="/dnd">⚔️ DnD</Link>
                <Link className="btn" to="/web-programming">💻 Web Programming</Link>
                <Link className="btn" to="/games">🎮 Games</Link>
                <Link className="btn" to="/cinema">🎬 Cinema</Link>
            </div>
        </main>
    );
}
