import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import Home from "./Pages/Home"
import Desempenho from "./Pages/Desempenho";
import Objetivos from "./Pages/Objetivos";
import { useState } from "react";
import Aposta from "./Pages/Aposta";
function App() {
  const [authConfig, setAuthConfig] = useState({ isOpen: false, mode: 'cadastro' });

  const openAuth = (mode) => setAuthConfig({ isOpen: true, mode });
  const closeAuth = () => setAuthConfig({ ...authConfig, isOpen: false });
  return (
    <Router>
      <Header onOpenAuth={openAuth} />
      <Routes>
        <Route 
          path="/" 
          element={<Home authConfig={authConfig} closeAuth={closeAuth} />} 
        />
        <Route path="/desempenho" element={<Desempenho />} />
        <Route path="/objetivos" element={<Objetivos />} />
        <Route path="/apostas" element={<Aposta />} />
      </Routes>
    </Router>
  );
}

export default App;
