import styles from "./HeroPages.module.css";

function HeroPages({ titulo, descricao, imagem }) {
  return (
    <div className="content-wrapper-center">
      <main className={`${styles.hero_container} row`}>
        <div className={`${styles.text_section} ${styles.col_6}`}>
          <h2 className={styles.titulo}>{titulo}</h2>
          <p className={styles.descricao}>{descricao}</p>
        </div>
        <img className={styles.col_6} src={imagem} alt={titulo} />
      </main>
    </div>
  );
}

export default HeroPages;
