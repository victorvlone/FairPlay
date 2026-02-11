import styles from "./ApostasTable.module.css";

function ApostasTable({className}){

    return (
    <div className={`${styles.table_container} ${className}`}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Jogo</th>
            <th>Over 1.5</th>
            <th>Over 2.5</th>
            <th>BTTS</th>
            <th>Over 0.5 HT</th>
            <th>Recomendado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ajax x PSV</td>
            <td className={styles.green}>100%</td>
            <td className={styles.red}>50%</td>
            <td className={styles.green}>70%</td>
            <td className={styles.green}>100%</td>
            <td>Over 0.5 HT</td>
          </tr>
          <tr>
            <td>Real Madrid x Barcelona</td>
            <td className={styles.green}>100%</td>
            <td className={styles.red}>50%</td>
            <td className={styles.green}>70%</td>
            <td className={styles.green}>100%</td>
            <td>Over 0.5 HT</td>
          </tr>
          <tr>
            <td>Bahia x Vitória</td>
            <td className={styles.green}>100%</td>
            <td className={styles.red}>50%</td>
            <td className={styles.green}>70%</td>
            <td className={styles.green}>100%</td>
            <td>Over 0.5 HT</td>
          </tr>
          <tr>
            <td>Botafogo x Flamengo</td>
            <td className={styles.green}>100%</td>
            <td className={styles.red}>50%</td>
            <td className={styles.green}>70%</td>
            <td className={styles.green}>100%</td>
            <td>Over 0.5 HT</td>
          </tr>
          <tr>
            <td>Benfica x Porto</td>
            <td className={styles.green}>100%</td>
            <td className={styles.red}>50%</td>
            <td className={styles.green}>70%</td>
            <td className={styles.green}>100%</td>
            <td>Over 0.5 HT</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
export default ApostasTable;