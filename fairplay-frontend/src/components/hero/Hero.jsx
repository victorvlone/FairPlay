import styles from "./Hero.module.css";

function Hero() {
  return (
    <main className={styles.hero_main}>
      <div className="content-wrapper-center hero_main_content row">
        <h1 className={`${styles.col_10} ${styles.col_8} ${styles.col_12}`}>
          Análise preditiva aplicada a apostas esportivas.
        </h1>
        <h5 className={`${styles.col_6} ${styles.col_12}`}>
          Transforme estatísticas em decisões mais seguras e bem fundamentadas.
        </h5>
      </div>
    </main>
  );
}
export default Hero;
