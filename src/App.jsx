import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Quiz from './components/pages/Quiz';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dnd" element={<Quiz category="DnD" title="DnD" />} />
        <Route path="/games" element={<Quiz category="Games" title="Games" />} />
        <Route path="/web-programming" element={<Quiz category="Web programming" title="Web Programming" />} />
        <Route path="/cinema" element={<Quiz category="Cinema" title="Cinema" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
