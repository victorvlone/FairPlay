import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import Home from "./Pages/Home";
import Desempenho from "./Pages/Desempenho";
import Objetivos from "./Pages/Objetivos";
import { useEffect, useState } from "react";
import Aposta from "./Pages/Aposta";
import Autenticacao from "./components/autenticacao/Autenticacao";
import Ciclos from "./Pages/Ciclos";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [authConfig, setAuthConfig] = useState({
    isOpen: false,
    mode: "cadastro",
  });

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userBankroll");
    window.location.href = "/";
  };

  const openAuth = (mode) => {
    setAuthConfig((prev) => {

      if (prev.isOpen && prev.mode === mode) {
        return { ...prev, isOpen: false };
      }
      return { isOpen: true, mode };
    });
  };
  const closeAuth = () => setAuthConfig({ ...authConfig, isOpen: false });
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch("http://localhost:8080/auth/validate", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          handleLogout();
        }
      } catch (error) {
        console.error("Backend offline ou erro de rede");
        handleLogout();
      }
    };

    checkAuth();
  }, []);

  return (
    <Router>
      <Header onOpenAuth={openAuth} toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      <div className="content-wrapper-center row row_without_padding">
        {authConfig.isOpen && (
          <Autenticacao
            className="col-end-6 sm-12"
            initialMode={authConfig.mode}
            onClose={closeAuth}
          />
        )}
      </div>
      <Routes>
        <Route
          path="/"
          element={<Home authConfig={authConfig} closeAuth={closeAuth} />}
        />
        <Route path="/desempenho" element={<Desempenho />} />
        <Route path="/objetivos" element={<Objetivos />} />
        <Route path="/apostas" element={<Aposta />} />
        <Route path="/ciclos" element={<Ciclos />} />
      </Routes>
    </Router>
  );
}

export default App;
