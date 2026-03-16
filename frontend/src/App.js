import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Articles from './components/articles';
import ArticlePage from './components/articlePage';

function App() {
  return (
    <BrowserRouter>
     <header className="main-header">
        <h1>Par Monts et par Vaux, par Didier Arnaud.</h1>
        <h2> (Chroniques de la montagne, <br/>du voyage et du jazz)</h2>
      </header>
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/article/:id" element={<ArticlePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
