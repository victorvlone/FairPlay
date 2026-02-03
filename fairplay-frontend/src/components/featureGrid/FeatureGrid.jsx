import styles from "./FeatureGrid.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShield,
  faEarthAfrica,
  faDice,
  faFutbol,
} from "@fortawesome/free-solid-svg-icons";

function FeatureGrid() {
  return (
    <div className="content-wrapper-center">
      <section className={`${styles.featureGrid_container} row`}>
        <h5 className="col-10">
          Acompanhe a performance das apostas de forma clara e organizada.
        </h5>
        <div className={`${styles.featureGrid_content} ${styles.col_12}`}>
          <div
            className={`${styles.featureGrid_content_option}`}
          >
            <h4>Times</h4>
            <FontAwesomeIcon icon={faShield} />
          </div>
          <div
            className={`${styles.featureGrid_content_option}`}
          >
            <h4>Campeonatos</h4>
            <FontAwesomeIcon icon={faFutbol} />
          </div>
          <div
            className={`${styles.featureGrid_content_option}`}
          >
            <h4>Países</h4>
            <FontAwesomeIcon icon={faEarthAfrica} />
          </div>
          <div
            className={`${styles.featureGrid_content_option}`}
          >
            <h4>Apostas</h4>
            <FontAwesomeIcon icon={faDice} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default FeatureGrid;
