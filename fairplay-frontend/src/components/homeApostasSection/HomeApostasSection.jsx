import apostasImg from "../../assets/apostasPage_img.png";
import ciclosImg from "../../assets/ciclosPage_img.png";
import styles from "./HomeApostasSection.module.css";

function HomeApostasSection() {
  return (
    <div className="content-wrapper-center">
      <section className={`${styles.HomeApostasSection_container} row`}>
        <div className={`${styles.HomeApostasSection_content} ${styles.text_first}`}>
          <h2>apostas</h2>
          <p>
            Acompanhe a performance das apostas de forma clara e organizada.
            Aqui você visualiza acertos, erros e o balanço final por time,
            permitindo analisar consistência, evolução e identificar padrões ao
            longo do tempo.
          </p>
        </div>
        <img src={apostasImg} className={styles.img_first} alt="" />
        <div className={`${styles.HomeApostasSection_content} ${styles.text_second}`}>
          <h2>Ciclos</h2>
          <p>
            Acompanhe a performance das Ciclos de forma clara e organizada. Aqui
            você visualiza acertos, erros e o balanço final por time, permitindo
            analisar consistência, evolução e identificar padrões ao longo do
            tempo.
          </p>
        </div>
        <img src={ciclosImg} alt="" className={styles.img_second}/>
      </section>
    </div>
  );
}

export default HomeApostasSection;
