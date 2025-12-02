// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import './App.css';
import SurahDetail from './pages/SurahDetail';
import Home from './pages/Home';
import Navbar from './components/ui/navbar';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/surat/:nomor" element={<SurahDetail />} />
      </Routes>
    </>
  );
}

export default App;