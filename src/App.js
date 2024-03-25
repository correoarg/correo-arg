import './App.css';
import Formulario from './Formulario/Formulario';
import Principal from './Principal/Principal';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Principal/>} />
        <Route path="/formulario" element={<Formulario/>} />
      </Routes>
    </Router>
  );
}

export default App;
