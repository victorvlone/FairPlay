import styles from "./ApostasAbertas.module.css";

function ApostasAbertas() {
  return (
    <section className={styles.apostasAbertas_container}>
      <h3>Apostas Abertas</h3>
      <div className={styles.apostaAberta_scroll}>
        <div className={styles.apostaAberta_content}>
          <div className={styles.apostaAberta_status}>
            <h5>Multipla</h5>
            <p>Aberta</p>
          </div>
          <p>
            Data: <b>26 jan 2026</b>
          </p>
          <p>
            Valor: <b>R$50,00</b>
          </p>
          <div className={styles.apostaAberta_retorno}>
            <p>
              Possivel retorno: <b>R$ 312,00</b>
            </p>
            <div className={styles.apostaAberta_buttons}>
              <button className={styles.btn_green}>Green</button>
              <button className={styles.btn_red}>Red</button>
            </div>
          </div>
        </div>
        <div className={styles.apostaAberta_content}>
          <div className={styles.apostaAberta_status}>
            <h5>Multipla</h5>
            <p>Aberta</p>
          </div>
          <p>
            Data: <b>26 jan 2026</b>
          </p>
          <p>
            Valor: <b>R$50,00</b>
          </p>
          <div className={styles.apostaAberta_retorno}>
            <p>
              Possivel retorno: <b>R$ 312,00</b>
            </p>
            <div className={styles.apostaAberta_buttons}>
              <button className={styles.btn_green}>Green</button>
              <button className={styles.btn_red}>Red</button>
            </div>
          </div>
        </div>
        <div className={styles.apostaAberta_content}>
          <div className={styles.apostaAberta_status}>
            <h5>Multipla</h5>
            <p>Aberta</p>
          </div>
          <p>
            Data: <b>26 jan 2026</b>
          </p>
          <p>
            Valor: <b>R$50,00</b>
          </p>
          <div className={styles.apostaAberta_retorno}>
            <p>
              Possivel retorno: <b>R$ 312,00</b>
            </p>
            <div className={styles.apostaAberta_buttons}>
              <button className={styles.btn_green}>Green</button>
              <button className={styles.btn_red}>Red</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default ApostasAbertas;
