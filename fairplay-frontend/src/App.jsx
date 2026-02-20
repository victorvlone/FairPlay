import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import Home from "./Pages/Home";
import Desempenho from "./Pages/Desempenho";
import Objetivos from "./Pages/Objetivos";
import { useEffect, useState } from "react";
import Aposta from "./Pages/Aposta";
import Autenticacao from "./components/autenticacao/Autenticacao";
function App() {
  const [authConfig, setAuthConfig] = useState({
    isOpen: false,
    mode: "cadastro",
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userBankroll");
    // Redireciona para o login
    window.location.href = "/";
  };

  const openAuth = (mode) => {
    setAuthConfig((prev) => {
      // Se já estiver aberto E o modo for o mesmo, a gente fecha (onClose)
      if (prev.isOpen && prev.mode === mode) {
        return { ...prev, isOpen: false };
      }
      // Caso contrário, abre ou troca o modo (login <-> cadastro)
      return { isOpen: true, mode };
    });
  };
  const closeAuth = () => setAuthConfig({ ...authConfig, isOpen: false });

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
      <Header onOpenAuth={openAuth} />
      <div className="content-wrapper-center row row_align_top">
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
      </Routes>
    </Router>
  );
}

export default App;
