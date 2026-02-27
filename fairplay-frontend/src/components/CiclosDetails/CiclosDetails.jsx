import styles from "./CiclosDetails.module.css"

function CiclosDetails({ className }){
    return(
        <div className={`${styles.cycle_data_container} ${className}`}>
        <div className={styles.cycle_data_div}>
          <div className={styles.cycle_content}>
            <h4>Stake Inicial</h4>
            <h2>R$5,00</h2>
          </div>
          <div className={styles.cycle_content}>
            <h4>Obj. Jogo</h4>
          </div>
        </div>
        <div className={styles.cycle_data_div}>
          <div className={styles.cycle_content}>
            <h4>Lucro Teórico</h4>
          </div>
          <div className={styles.cycle_content}>
            <h4>Lucro Teórico %</h4>
          </div>
        </div>
        <div className={styles.cycle_data_div}>
          <div className={styles.cycle_content}>
            <h4>Lucro Atual</h4>
          </div>
          <div className={styles.cycle_content}>
            <h4>Lucro Final</h4>
          </div>
        </div>
      </div>
    )
}
export default CiclosDetails;