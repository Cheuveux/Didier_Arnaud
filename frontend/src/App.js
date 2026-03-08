import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Articles from './components/articles';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Articles />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
