import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Hud from '../ui/Hud';
import QuestionCard from '../ui/QuestionCard';
import ResultScreen from '../ui/ResultScreen';
import LoadingScreen from '../ui/LoadingScreen';
import ErrorScreen from '../ui/ErrorScreen';

const API_URL = "https://691475d53746c71fe0484dd7.mockapi.io/api/v1/questions";
const STORAGE_KEY = 'quiz-best';

export default function Quiz({ category, title }) {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [status, setStatus] = useState('loading'); // 'loading', 'error', 'playing', 'result'
    const [errorMsg, setErrorMsg] = useState('');

    const [idx, setIdx] = useState(0);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(20);
    const [best, setBest] = useState(0);

    // To handle answer selection and animations
    const [selectedChoice, setSelectedChoice] = useState(null); // index of selected choice
    const [isAnswered, setIsAnswered] = useState(false);

    const timerRef = useRef(null);

    useEffect(() => {
        loadBest();
        loadQuestions();
        return () => clearInterval(timerRef.current);
    }, [category]);

    useEffect(() => {
        if (status === 'playing') {
            startTimer();
        } else {
            clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current);
    }, [status, idx]);

    const loadBest = () => {
        const saved = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
        setBest(saved);
    };

    const saveBest = (newScore) => {
        if (newScore > best) {
            localStorage.setItem(STORAGE_KEY, newScore);
            setBest(newScore);
        }
    };

    const loadQuestions = async () => {
        setStatus('loading');
        setQuestions([]);
        setIdx(0);
        setScore(0);
        setTimer(20);

        try {
            const res = await fetch(API_URL);
            if (!res.ok) throw new Error(`Ошибка загрузки вопросов: ${res.status}`);
            const data = await res.json();

            const filtered = data.filter(q => q && q.category === category);
            if (!filtered.length) throw new Error("Нет вопросов для этой категории!");

            const formatted = filtered.map((r) => {
                let answersArr = Array.isArray(r.answers)
                    ? r.answers.map(a => String(a).trim())
                    : String(r.answers ?? '').split(',').map(a => a.trim()).filter(Boolean);

                let correctIndex = 0;
                if (typeof r.right_answer_id === 'number') {
                    correctIndex = r.right_answer_id;
                } else if (typeof r.right_answer_id === 'string' && /^\d+$/.test(r.right_answer_id)) {
                    correctIndex = parseInt(r.right_answer_id, 10);
                } else {
                    correctIndex = 0;
                }

                if (correctIndex < 0 || correctIndex >= answersArr.length) {
                    correctIndex = 0;
                }

                return {
                    q: r.question ?? '(без вопроса)',
                    choices: answersArr,
                    correct: correctIndex
                };
            });

            setQuestions(formatted);
            setStatus('playing');
        } catch (err) {
            console.error(err);
            setErrorMsg(err.message);
            setStatus('error');
        }
    };

    const startTimer = () => {
        clearInterval(timerRef.current);
        setTimer(20);
        timerRef.current = setInterval(() => {
            setTimer(prev => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    handleTimeOut();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handleTimeOut = () => {
        if (isAnswered) return;
        setIsAnswered(true);
        // Reveal correct answer without specific selection
    };

    const handleSelect = (i) => {
        if (isAnswered) return;
        setIsAnswered(true);
        setSelectedChoice(i);
        clearInterval(timerRef.current);

        if (questions[idx] && i === questions[idx].correct) {
            setScore(s => s + 1);
        }
    };

    const handleNext = () => {
        if (idx + 1 >= questions.length) {
            handleFinish();
        } else {
            setIdx(i => i + 1);
            setIsAnswered(false);
            setSelectedChoice(null);
        }
    };

    const handleFinish = () => {
        saveBest(score);
        setStatus('result');
    };

    const handleRestart = () => {
        loadQuestions();
    };

    if (status === 'loading') {
        return (
            <main className="container quiz">
                <h1>🎯 Викторина · {title}</h1>
                <LoadingScreen />
            </main>
        );
    }

    if (status === 'error') {
        return (
            <main className="container quiz">
                <h1>🎯 Викторина · {title}</h1>
                <ErrorScreen message={errorMsg} />
            </main>
        );
    }

    if (status === 'result') {
        return (
            <main className="container quiz">
                <h1>🎯 Викторина · {title}</h1>
                <ResultScreen
                    score={score}
                    total={questions.length}
                    best={best}
                    onRestart={handleRestart}
                />
            </main>
        );
    }

    // Playing state
    const currentQ = questions[idx];

    return (
        <main className="container quiz">
            <h1>🎯 Викторина · {title}</h1>

            <section id="screen-question" className="screen">
                <Hud
                    score={score}
                    best={best}
                    timer={timer}
                    current={idx}
                    total={questions.length}
                />

                <QuestionCard
                    question={currentQ}
                    questionIndex={idx}
                    totalQuestions={questions.length}
                    selectedChoice={selectedChoice}
                    isAnswered={isAnswered}
                    onSelect={handleSelect}
                />

                <button className="btn" disabled={!isAnswered} onClick={handleNext}>
                    Дальше →
                </button>
            </section>
        </main>
    );
}
