import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import UmamiAnalytics from './components/Analytics/UmamiAnalytics';
import Articles from './components/articles';
import ArticlePage from './components/articlePage';
import APropos from './components/APropos';
import { CategoryPage } from './components/menu/categoryPage';
import { Sommaire } from './components/sommaire/sommaire'
import Seo from './components/SEO/SEO';
function App() {
  return (
    <BrowserRouter>
      <UmamiAnalytics />
      {/* SEO COMPONENT */}
      <Seo 
        title="Page d'accueil"
        description={"Page d'accueil du blog de Didier-Arnaud"}
        url="https://www.didier-arnaud.fr/a_proposs"
        type="website"
      />

     <header className="main-header">
        <h1>Par Monts et par Vaux.</h1>
        <h2> (Chroniques de la montagne, <br/>du voyage et du jazz)</h2>
      </header>
      <main className="content">
        <Routes>
          <Route path="/" element={<Articles />} />
          <Route path="/article/:id" element={<ArticlePage />} />
          <Route path="/a_proposs" element={<APropos />}/>
          <Route path="/categorie/:slug" element={<CategoryPage />} />
          <Route path="/sommaire" element={<Sommaire />}/>
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
