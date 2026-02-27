import { LogIn, Menu } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faMoon } from "@fortawesome/free-solid-svg-icons";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Header({ onOpenAuth, toggleDarkMode, isDarkMode }) {
  const token = localStorage.getItem("token");
  const [userData, setUserData] = useState({
    nome: "Usuário",
    banca: 0,
  });

  useEffect(() => {
    if (token) {
      // Pegamos os dados salvos no localStorage no momento do login
      const nomeSalvo = localStorage.getItem("userName");
      const bancaSalva = localStorage.getItem("userBankroll");

      setUserData({
        nome: nomeSalvo || "Usuário",
        banca: bancaSalva ? parseFloat(bancaSalva) : 0,
      });
    }
  }, [token]);

  return (
    <div className="content-wrapper-center">
      <header className={styles.header}>
        <Link to="/">
          <h1>Fairplay</h1>
        </Link>
        <nav className={styles.header_nav}>
          <div className={styles.header_nav_list}>
            <ul>
              <li>
                <Link to="/apostas">Aposta</Link>
              </li>
              <li>
                <Link to="/desempenho">Desempenho</Link>
              </li>
              <li>
                <Link to="/objetivos">Objetivos</Link>
              </li>
              <li>
                <Link to="/ciclos">Ciclos</Link>
              </li>
              <li>
                <FontAwesomeIcon
                  icon={faMoon}
                  className={`${styles.icon_darkMode} ${isDarkMode ? styles.active : ""}`}
                  onClick={toggleDarkMode} // Chama a função ao clicar
                />
              </li>
            </ul>
            <div className={styles.header_nav_buttons}>
              {!token ? (
                <>
                  <button onClick={() => onOpenAuth("cadastro")}>
                    Cadastrar
                  </button>
                  <button onClick={() => onOpenAuth("login")}>Login</button>
                </>
              ) : (
                <div className={styles.header_nav_login}>
                  <div className={styles.header_nav_login_data}>
                    <h5>{userData.nome}</h5>
                    <h6>
                      R${" "}
                      {userData.banca.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </h6>
                  </div>
                  <FontAwesomeIcon
                    icon={faCircleUser}
                    className={styles.icon_user}
                  />
                </div>
              )}
            </div>
          </div>
          <div className={styles.header_nav_icons}>
            <Menu size={24} />
            <LogIn size={24} />
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Header;
