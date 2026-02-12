import styles from "./ApostasTable.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

function ApostasTable({ className, jogos }) {
  const calcularApostaRecomendada = (over05HT, over15, over25, ambasMarcam) => {
    // Se quiser manter os critérios de gols que você mandou:
    if (over25 >= 90 && ambasMarcam >= 80 && over05HT >= 90) {
      return "Ambas Marcam";
    }
    if (over15 >= 90 && ambasMarcam >= 70 && over05HT >= 80 && over25 >= 70) {
      return "Over 1.5 Gols";
    }
    if (over05HT >= 80 && over25 >= 80 && ambasMarcam >= 80) {
      return "Over 2.5 Gols";
    }

    return "—"; // Caso não atinja nenhum critério
  };

  const getStyle = (valor) => {
    if (valor > 70) return styles.green; // Acima de 70: Verde
    if (valor === 70) return styles.yellow; // Exatamente 70: Amarelo
    return styles.red; // Abaixo de 70: Vermelho
  };

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
          {jogos.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                Nenhuma análise adicionada.
              </td>
            </tr>
          ) : (
            jogos.map((jogo, index) => {
              // Convertendo contagem para porcentagem
              const pOver15 = jogo.estatisticas.over15FT * 10;
              const pOver25 = jogo.estatisticas.over25FT * 10;
              const pBtts = jogo.estatisticas.btts * 10;
              const pOver05HT = jogo.estatisticas.over05HT * 10;

              const recomendacao = calcularApostaRecomendada(
                pOver05HT,
                pOver15,
                pOver25,
                pBtts,
              );

              return (
                <tr key={index}>
                  <td className={styles.team_cell}>
                    {`${jogo.equipes.casa} x ${jogo.equipes.fora}`}
                    <br />
                  </td>
                  <td className={getStyle(pOver15)}>{pOver15}%</td>
                  <td className={getStyle(pOver25)}>{pOver25}%</td>
                  <td className={getStyle(pBtts)}>{pBtts}%</td>
                  <td className={getStyle(pOver05HT)}>{pOver05HT}%</td>
                  <td
                    className={
                      recomendacao !== "—" ? styles.recommended_cell : ""
                    }
                  >
                    {recomendacao}
                  </td>
                  <td>
                    <FontAwesomeIcon
                      icon={faCircleXmark}
                      className={styles.apostasTable_icon}
                    />
                    <FontAwesomeIcon
                      icon={faSquarePlus}
                      className={styles.apostasTable_icon}
                    />
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
export default ApostasTable;
