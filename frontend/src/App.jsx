import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddDoctor from './components/AddDoctor';
import DoctorsPage from './components/DoctorsPage';
import './App.css'; // or './App.css' depending on where you put the styles

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to Doctor Directory</h1>
      <p>Find trusted doctors by specialization and location, or add your own listings to help others connect with quality care.</p>
    </div>
  );
}
function App() {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <Link to="/"><button>Home</button></Link>
          <Link to="/add-doctor"><button>Add Doctor</button></Link>
          <Link to="/doctors"><button>Doctor List</button></Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/doctors" element={<DoctorsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
