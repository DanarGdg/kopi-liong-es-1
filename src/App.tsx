// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import './App.css';
import SurahDetail from './pages/SurahDetail';
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/surat/:nomor" element={<SurahDetail />} />
    </Routes>
  );
}

export default App;