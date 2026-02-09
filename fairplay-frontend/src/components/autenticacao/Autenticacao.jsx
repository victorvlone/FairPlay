import { useEffect, useState } from "react";
import styles from "./Autenticacao.module.css";

function Autenticacao({ className, initialMode, onClose }) {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');

  useEffect(() => {
    setIsLogin(initialMode === 'login');
  }, [initialMode]);

  const toggleMode = (e) => {
    e.preventDefault();
    setIsLogin(!isLogin);
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
              <input type="text" placeholder="Nome" />
            </div>
            <div className={styles.aut_input_container}>
              <label>Sobrenome</label>
              <input type="text" placeholder="Sobrenome" />
            </div>
          </div>
          <div className={styles.aut_input_container}>
            <label>Email</label>
            <input type="email" placeholder="Email" />
          </div>
          <div className={styles.aut_input_container}>
            <label>Senha</label>
            <input type="password" placeholder="Senha" />
          </div>
          <div className={styles.aut_input_container}>
            <label>Confirme a senha</label>
            <input type="password" placeholder="Senha" />
          </div>
          <div className={styles.aut_input_container}>
            <label htmlFor="banca">Banca inicial</label>
            <select id="banca">
              <option value="" disabled selected>Selecione a banca</option>
              <option value="100">R$100,00</option>
              <option value="500">R$500,00</option>
            </select>
          </div>
          <div className={styles.aut_content_buttons}>
            <button>Cadastre-se</button>
            <p>Já possui uma conta? <a href="#" onClick={toggleMode}>Faça login!</a></p>
          </div>
        </div>

        {/* LADO DE LOGIN */}
        <div className={styles.aut_content}>
          <h1>Login</h1>
          <div className={styles.aut_input_container}>
            <label>Email</label>
            <input type="email" placeholder="Email" />
          </div>
          <div className={styles.aut_input_container}>
            <label>Senha</label>
            <input type="password" placeholder="Senha" />
          </div>
          <div className={styles.aut_content_buttons}>
            <button>Login</button>
            <p>Não possui uma conta? <a href="#" onClick={toggleMode}>Cadastre-se!</a></p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Autenticacao;