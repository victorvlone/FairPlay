import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/header/Header";
import Home from "./Pages/Home";
function App() {
  return (
    <>
      <Header />
      <Home />
    </>
  );
}

export default App;
