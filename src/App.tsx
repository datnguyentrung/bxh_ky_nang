import Navbar from './components/Navbar/Navbar';
import BxhKyNang from './components/BxhKyNang/BxhKyNang';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="navbar-spacer"></div>
      <main className="app__main">
        <BxhKyNang />
      </main>
    </div>
  );
}

export default App;
