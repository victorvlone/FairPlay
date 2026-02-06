import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import Home from "./Pages/Home"
import Desempenho from "./Pages/Desempenho";
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/desempenho" element={<Desempenho />} />
      </Routes>
    </Router>
  );
}

export default App;
