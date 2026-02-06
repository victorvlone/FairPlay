import styles from "./HeroPages.module.css";
import line from "../../assets/line.png"

function HeroPages({ titulo, descricao, className }) {
  return (
    <div className={`${styles.text_section} ${className}`}>
      <h2 className={styles.titulo}>{titulo}</h2>
      <img src={line} alt="" />
      <p className={styles.descricao}>{descricao}</p>
    </div>
  );
}

export default HeroPages;
