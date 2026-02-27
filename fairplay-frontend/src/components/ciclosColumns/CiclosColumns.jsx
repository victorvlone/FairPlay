import styles from "./CiclosColumns.module.css";

function CiclosColumns({ className }) {
  return (
    <div className={`${styles.cycles_content} ${className}`}>
      <div className={styles.cycles_container}>
        <div className={styles.cycles_names}>
          <p>Stake Inicial de Cada Ciclo:</p>
          <p>Objetivo jogo por jogo:</p>
          <p>Parar com % de lucro:</p>
          <p>Objetivo do Ciclo Chegar ate:</p>
          <p>Saldo Atual do Ciclo:</p>
          <p>Lucro do Ciclo:</p>
          <p>Saque Teórico:</p>
        </div>
        <div className={styles.cycles_columns_list}>
          <div className={styles.cycle_number}>

            <p>100%</p>
            <p>100%</p>
            <p>100%</p>
            <p>100%</p>
            <p>100%</p>
            <p>100%</p>
            <p>100%</p>
          </div>
          <div className={styles.cycle_number}>
            <p>100%</p>
            <p>100%</p>
            <p>100%</p>
            <p>100%</p>
            <p>100%</p>
            <p>100%</p>
            <p>100%</p>
          </div>
          <div className={styles.cycle_number}>
            <p>100%</p>
            <p>100%</p>
            <p>100%</p>
            <p>100%</p>
            <p>100%</p>
            <p>100%</p>
            <p>100%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CiclosColumns;
