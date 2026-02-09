import { useEffect, useState } from "react";
import styles from "./Autenticacao.module.css";
import axios from "axios";

function Autenticacao({ className, initialMode, onClose }) {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [initialBankroll, setInitialBankroll] = useState("");

  useEffect(() => {
    setIsLogin(initialMode === 'login');
  }, [initialMode]);

  const toggleMode = (e) => {
    e.preventDefault();
    setIsLogin(!isLogin);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        email: email,
        senha: password 
      });
      localStorage.setItem("token", response.data.token);
      alert("Login realizado com sucesso!");
      onClose();
      window.location.reload();
    } catch (error) {
      alert("Erro ao fazer login. Verifique suas credenciais.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/auth/register", {
        firstName,
        lastName,
        email,
        password,
        role: "USER",
        initialBankroll: parseFloat(initialBankroll)
      });
      alert("Cadastro realizado! Agora faça o login.");
      setIsLogin(true);
    } catch (error) {
      alert("Erro ao cadastrar. Verifique os dados.");
    }
  };

  return (
    <section className={`${styles.aut_container} ${className}`}>
      <div className={`${styles.aut_wrapper} ${isLogin ? styles.show_login : ""}`}>
        
        {/* LADO DE CADASTRO */}
        <div className={styles.aut_content}>
          <h1>Cadastro</h1>
          <div className={styles.aut_nome_container}>
            <div className={styles.aut_input_container}>
              <label>Nome</label>
              <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Nome" />
            </div>
            <div className={styles.aut_input_container}>
              <label>Sobrenome</label>
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Sobrenome" />
            </div>
          </div>
          <div className={styles.aut_input_container}>
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          </div>
          <div className={styles.aut_input_container}>
            <label>Senha</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" />
          </div>
          <div className={styles.aut_input_container}>
            <label htmlFor="banca">Banca inicial</label>
            <select id="banca" value={initialBankroll} onChange={(e) => setInitialBankroll(e.target.value)}>
              <option value="" disabled>Selecione a banca</option>
              <option value="100">R$100,00</option>
              <option value="500">R$500,00</option>
              <option value="1000">R$1000,00</option>
            </select>
          </div>
          <div className={styles.aut_content_buttons}>
            <button onClick={handleRegister}>Cadastre-se</button>
            <p>Já possui uma conta? <a href="#" onClick={(e) => {e.preventDefault(); setIsLogin(true)}}>Faça login!</a></p>
          </div>
        </div>

        {/* LADO DE LOGIN */}
        <div className={styles.aut_content}>
          <h1>Login</h1>
          <div className={styles.aut_input_container}>
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          </div>
          <div className={styles.aut_input_container}>
            <label>Senha</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" />
          </div>
          <div className={styles.aut_content_buttons}>
            <button onClick={handleLogin}>Login</button>
            <p>Não possui uma conta? <a href="#" onClick={(e) => {e.preventDefault(); setIsLogin(false)}}>Cadastre-se!</a></p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Autenticacao;