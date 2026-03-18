import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Articles from './components/articles';
import ArticlePage from './components/articlePage';
import APropos from './components/APropos';

function App() {
  return (
    <BrowserRouter>
     <header className="main-header">
        <h1>Par Monts et par Vaux.</h1>
        <h2> (Chroniques de la montagne, <br/>du voyage et du jazz)</h2>
      </header>
      <main className="content">
        <Routes>
          <Route path="/" element={<Articles />} />
          <Route path="/article/:id" element={<ArticlePage />} />
          <Route path="/a_proposs" element={<APropos />}/>
        </Routes>
      </main>
      <footer>
        <div className="a-propos-link">
          <Link  to="/a_proposs">par Didier Arnaud</Link> 
        </div>
      </footer>

    </BrowserRouter>
  );
}

export default App;
