import { LogIn, Menu } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

function Header({ onOpenAuth }) {
  const token = localStorage.getItem("token");
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
                <FontAwesomeIcon
                  icon={faCircleUser}
                  className={styles.icon_user}
                />
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
