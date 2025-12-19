import Navbar from './components/Navbar/Navbar';
import BangA from './pages/BangA';
import BangB from './pages/BangB';
import SkillLevel from './components/SkillLevel/SkillLevel';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="navbar-spacer"></div>
      <main className="app__main">
        <Routes>
          <Route path="/" element={<Navigate to="/bang-a" replace />} />
          <Route path="/bang-a" element={<BangA />} />
          <Route path="/bang-b" element={<BangB />} />
          <Route path="/skill-level-reference" element={<SkillLevel />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
