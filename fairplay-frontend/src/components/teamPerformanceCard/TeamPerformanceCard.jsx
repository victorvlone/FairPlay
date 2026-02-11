import styles from "./TeamPerformanceCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShield } from "@fortawesome/free-solid-svg-icons";

function TeamPerformanceCard({ className }) {
  return (
    <div className={`${styles.matches_button_container} ${className}`}>
      <div className={styles.home_away_container}>
        <div className={styles.matches_data_container}>
          <div className={styles.matches_container}>
            <p className={styles.team_name}>
              Ultimos 5 jogos do{" "}
              <input
                type="text"
                className={styles.input_team_name}
                placeholder="Nome"
                id="nome-time-casa"
              />{" "}
              <br />
              em casa na competição
            </p>
            <div className={styles.match_container} id="casa-jogo1">
              <div className={styles.result_container}>
                <div className={styles.match_iconName_container}>
                  <FontAwesomeIcon
                    icon={faShield}
                    className={styles.match_icons}
                  />
                  <p>Casa</p>
                </div>
                <input type="text" className={styles.ht_input} />
                <input type="text" className={styles.ft_input} />
              </div>
              <div className={styles.result_container}>
                <input type="text" className={styles.ft_input} />
                <input type="text" className={styles.ht_input} />
                <div className={styles.match_iconName_container}>
                  <FontAwesomeIcon
                    icon={faShield}
                    className={styles.match_icons}
                  />
                  <p>Casa</p>
                </div>
              </div>
            </div>
            <div className={styles.match_container} id="casa-jogo2">
              <div className={styles.result_container}>
                <div className={styles.match_iconName_container}>
                  <FontAwesomeIcon
                    icon={faShield}
                    className={styles.match_icons}
                  />
                  <p>Casa</p>
                </div>
                <input type="text" maxLength={1} className={styles.ht_input} />
                <input type="text" maxLength={1} className={styles.ft_input} />
              </div>
              <div className={styles.result_container}>
                <input type="text" maxLength={1} className={styles.ft_input} />
                <input type="text" maxLength={1} className={styles.ht_input} />
                <div className={styles.match_iconName_container}>
                  <FontAwesomeIcon
                    icon={faShield}
                    className={styles.match_icons}
                  />
                  <p>Casa</p>
                </div>
              </div>
            </div>
            <div className={styles.match_container} id="casa-jogo3">
              <div className={styles.result_container}>
                <div className={styles.match_iconName_container}>
                  <FontAwesomeIcon
                    icon={faShield}
                    className={styles.match_icons}
                  />
                  <p>Casa</p>
                </div>
                <input type="text" maxLength={1} className={styles.ht_input} />
                <input type="text" maxLength={1} className={styles.ft_input} />
              </div>
              <div className={styles.result_container}>
                <input type="text" maxLength={1} className={styles.ft_input} />
                <input type="text" maxLength={1} className={styles.ht_input} />
                <div className={styles.match_iconName_container}>
                  <FontAwesomeIcon
                    icon={faShield}
                    className={styles.match_icons}
                  />
                  <p>Casa</p>
                </div>
              </div>
            </div>
            <div className={styles.match_container} id="casa-jogo4">
              <div className={styles.result_container}>
                <div className={styles.match_iconName_container}>
                  <FontAwesomeIcon
                    icon={faShield}
                    className={styles.match_icons}
                  />
                  <p>Casa</p>
                </div>
                <input type="text" maxLength={1} className={styles.ht_input} />
                <input type="text" maxLength={1} className={styles.ft_input} />
              </div>
              <div className={styles.result_container}>
                <input type="text" maxLength={1} className={styles.ft_input} />
                <input type="text" maxLength={1} className={styles.ht_input} />
                <div className={styles.match_iconName_container}>
                  <FontAwesomeIcon
                    icon={faShield}
                    className={styles.match_icons}
                  />
                  <p>Casa</p>
                </div>
              </div>
            </div>
            <div className={styles.match_container} id="casa-jogo5">
              <div className={styles.result_container}>
                <div className={styles.match_iconName_container}>
                  <FontAwesomeIcon
                    icon={faShield}
                    className={styles.match_icons}
                  />
                  <p>Casa</p>
                </div>
                <input type="text" maxLength={1} className={styles.ht_input} />
                <input type="text" maxLength={1} className={styles.ft_input} />
              </div>
              <div className={styles.result_container}>
                <input type="text" maxLength={1} className={styles.ft_input} />
                <input type="text" maxLength={1} className={styles.ht_input} />
                <div className={styles.match_iconName_container}>
                  <FontAwesomeIcon
                    icon={faShield}
                    className={styles.match_icons}
                  />
                  <p>Casa</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.matches_data_container}>
          <div className={styles.matches_container}>
            <p className={styles.team_name}>
              Ultimos 5 jogos do{" "}
              <input
                type="text"
                className={styles.input_team_name}
                placeholder="Nome"
                id="nome-time-fora"
              />{" "}
              <br />
              em casa na competição
            </p>
            <div className={styles.match_container} id="fora-jogo1">
              <div className={styles.result_container}>
                <div className={styles.match_iconName_container}>
                  <FontAwesomeIcon
                    icon={faShield}
                    className={styles.match_icons}
                  />
                  <p>Casa</p>
                </div>
                <input type="text" className={styles.ht_input} />
                <input type="text" className={styles.ft_input} />
              </div>
              <div className={styles.result_container}>
                <input type="text" className={styles.ft_input} />
                <input type="text" className={styles.ht_input} />
                <div className={styles.match_iconName_container}>
                  <FontAwesomeIcon
                    icon={faShield}
                    className={styles.match_icons}
                  />
                  <p>Casa</p>
                </div>
              </div>
            </div>
            <div className={styles.match_container} id="fora-jogo2">
              <div className={styles.result_container}>
                <div className={styles.match_iconName_container}>
                  <FontAwesomeIcon
                    icon={faShield}
                    className={styles.match_icons}
                  />
                  <p>Casa</p>
                </div>
                <input type="text" className={styles.ht_input} />
                <input type="text" className={styles.ft_input} />
              </div>
              <div className={styles.result_container}>
                <input type="text" className={styles.ft_input} />
                <input type="text" className={styles.ht_input} />
                <div className={styles.match_iconName_container}>
                  <FontAwesomeIcon
                    icon={faShield}
                    className={styles.match_icons}
                  />
                  <p>Casa</p>
                </div>
              </div>
            </div>
            <div className={styles.match_container} id="fora-jogo3">
              <div className={styles.result_container}>
                <div className={styles.match_iconName_container}>
                  <FontAwesomeIcon
                    icon={faShield}
                    className={styles.match_icons}
                  />
                  <p>Casa</p>
                </div>
                <input type="text" className={styles.ht_input} />
                <input type="text" className={styles.ft_input} />
              </div>
              <div className={styles.result_container}>
                <input type="text" className={styles.ft_input} />
                <input type="text" className={styles.ht_input} />
                <div className={styles.match_iconName_container}>
                  <FontAwesomeIcon
                    icon={faShield}
                    className={styles.match_icons}
                  />
                  <p>Casa</p>
                </div>
              </div>
            </div>
            <div className={styles.match_container} id="fora-jogo4">
              <div className={styles.result_container}>
                <div className={styles.match_iconName_container}>
                  <FontAwesomeIcon
                    icon={faShield}
                    className={styles.match_icons}
                  />
                  <p>Casa</p>
                </div>
                <input type="text" className={styles.ht_input} />
                <input type="text" className={styles.ft_input} />
              </div>
              <div className={styles.result_container}>
                <input type="text" className={styles.ft_input} />
                <input type="text" className={styles.ht_input} />
                <div className={styles.match_iconName_container}>
                  <FontAwesomeIcon
                    icon={faShield}
                    className={styles.match_icons}
                  />
                  <p>Casa</p>
                </div>
              </div>
            </div>
            <div className={styles.match_container} id="fora-jogo5">
              <div className={styles.result_container}>
                <div className={styles.match_iconName_container}>
                  <FontAwesomeIcon
                    icon={faShield}
                    className={styles.match_icons}
                  />
                  <p>Casa</p>
                </div>
                <input type="text" className={styles.ht_input} />
                <input type="text" className={styles.ft_input} />
              </div>
              <div className={styles.result_container}>
                <input type="text" className={styles.ft_input} />
                <input type="text" className={styles.ht_input} />
                <div className={styles.match_iconName_container}>
                  <FontAwesomeIcon
                    icon={faShield}
                    className={styles.match_icons}
                  />
                  <p>Casa</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button>Adicionar</button>
      <p className={styles.error_message}>
        Preencha todos os nomes e todos os resultados de gols (HT e FT) para
        adicionar o jogo.
        <br />
      </p>
    </div>
  );
}
export default TeamPerformanceCard;
