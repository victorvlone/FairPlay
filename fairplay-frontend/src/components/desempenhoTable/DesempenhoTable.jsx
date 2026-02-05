import styles from "./DesempenhoTable.module.css";

function DesempenhoTable() {
  return (
    <div className="content-wrapper-center">
      <section className={styles.desempenhoTable_section}>
        <h5>
          A tabela abaixo consolida os resultados das apostas realizadas por
          time, campeonato, país e tipos de aposta.
        </h5>
        <div className={styles.desempenhoTable_buttons}>
          <button>Time</button>
          <button>Campeonato</button>
          <button>Pais</button>
          <button>Aposta</button>
        </div>
        <div className="table_container">
          <table className="custom_table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Acertos</th>
                <th>Erros</th>
                <th>Balanço</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Flamengo</td>
                <td>1</td>
                <td>2</td>
                <td>-1</td>
              </tr>
              <tr>
                <td>Real Madrid</td>
                <td>3</td>
                <td>1</td>
                <td>2</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
export default DesempenhoTable;
