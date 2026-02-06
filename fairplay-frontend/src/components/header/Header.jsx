import logo from "../../assets/logo_fairPlay.svg";
import { LogIn, Menu } from "lucide-react";
import styles from "./Header.module.css";

function Header() {
  return (
    <div className="content-wrapper-center">
      <header className={styles.header}>
        <h1>Fairplay</h1>
        <nav className={styles.header_nav}>
          <div className={styles.header_nav_list}>
            <ul>
              <li>Aposta</li>
              <li>Desempenho</li>
              <li>Objetivos</li>
              <li>Ciclos</li>
            </ul>
            <div className={styles.header_nav_buttons}>
              <button>Cadastrar</button>
              <button>Login</button>
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
