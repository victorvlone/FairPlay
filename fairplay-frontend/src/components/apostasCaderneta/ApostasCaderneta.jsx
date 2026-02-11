import styles from "./ApostasCaderneta.module.css";

function ApostasCaderneta({ className }) {
  return (
    <section className={styles.caderneta_container}>
        <h3>Caderneta de apostas</h3>
        <div className={styles.caderneta_betsSelects}>
          <div className={styles.caderneta_betSelect}>
            <h4>Real Madrid x Barcelona</h4>
            <div className={styles.caderneta_bet_inputs}>
              <div className={styles.caderneta_select_input}>
                <label htmlFor="">Aposta:</label>
                <select name="" id=""></select>
              </div>
              <div className={styles.caderneta_select_input}>
                <label htmlFor="">Odd:</label>
                <input type="text" />
              </div>
            </div>
          </div>
          <div className={styles.caderneta_betSelect}>
            <h4>Real Madrid x Barcelona</h4>
            <div className={styles.caderneta_bet_inputs}>
              <div className={styles.caderneta_select_input}>
                <label htmlFor="">Aposta:</label>
                <select name="" id=""></select>
              </div>
              <div className={styles.caderneta_select_input}>
                <label htmlFor="">Odd:</label>
                <input type="text" />
              </div>
            </div>
          </div>
          <div className={styles.caderneta_betSelect}>
            <h4>Real Madrid x Barcelona</h4>
            <div className={styles.caderneta_bet_inputs}>
              <div className={styles.caderneta_select_input}>
                <label htmlFor="">Aposta:</label>
                <select name="" id=""></select>
              </div>
              <div className={styles.caderneta_select_input}>
                <label htmlFor="">Odd:</label>
                <input type="text" />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.caderneta_button_container}>
          <div className={styles.caderneta_button_details}>
            <h4>Tripla</h4>
            <p>
              Odd total: <b>1.72</b>
            </p>
          </div>
          <button>Salvar</button>
        </div>
    </section>
  );
}
export default ApostasCaderneta;
