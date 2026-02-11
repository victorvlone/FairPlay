import styles from "./HeroPages.module.css";
import line from "../../assets/line.png";

function HeroPages({ titulo, descricao, className, homePage = true }) {
  return (
    <div className={`${styles.text_section} ${className}`}>
      <h2 className={styles.titulo}>{titulo}</h2>
      {homePage && <img src={line} alt="" />}
      <p className={styles.descricao}>{descricao}</p>
      {!homePage && <button>Cadastre-se</button>}
    </div>
  );
}

export default HeroPages;
