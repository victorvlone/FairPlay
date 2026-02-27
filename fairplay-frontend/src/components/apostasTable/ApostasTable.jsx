import styles from "./ApostasTable.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

function ApostasTable({
  className,
  jogos,
  onEnviarParaCaderneta,
  onRemoverAnalise,
}) {
  const handleMandarProPai = (jogo) => {
    const pOver15 = jogo.estatisticas.over15FT * 10;
    const pOver25 = jogo.estatisticas.over25FT * 10;
    const pBtts = jogo.estatisticas.btts * 10;
    const pOver05HT = jogo.estatisticas.over05HT * 10;

    const rec = calcularApostaRecomendada(pOver05HT, pOver15, pOver25, pBtts);

    // Criamos o objeto "Turbinado"
    const jogoProcessado = {
      equipeCasa: jogo.equipes.casa,
      equipeFora: jogo.equipes.fora,
      porcentagens: {
        over15: pOver15,
        over25: pOver25,
        btts: pBtts,
        over05HT: pOver05HT,
      },
      recomendacao: rec,
      filtros: jogo.filtros,
      idOriginal: jogo.geradoEm,
    };

    if (onEnviarParaCaderneta) {
      onEnviarParaCaderneta(jogoProcessado);
    }
  };

  const calcularApostaRecomendada = (over05HT, over15, over25, ambasMarcam) => {
    if (over25 >= 90 && ambasMarcam >= 80 && over05HT >= 90) {
      return "Ambas Marcam";
    }
    if (over05HT >= 80 && over25 >= 80 && ambasMarcam >= 80) {
      return "Over 2.5";
    }
    if (over15 >= 90 && ambasMarcam >= 70 && over05HT >= 80 && over25 >= 70) {
      return "Over 1.5";
    }

    return "—";
  };

  const getStyle = (valor) => {
    if (valor > 70) return styles.green;
    if (valor === 70) return styles.yellow;
    return styles.red;
  };

  const jogosUnicos = [];
  const chavesVistas = new Set();

  // Criamos uma versão invertida e filtramos as duplicatas de confronto
  [...jogos].reverse().forEach((jogo) => {
    const nomeCasa = jogo.isPersisted
      ? jogo.homeTeam?.name
      : jogo.equipes?.casa;
    const nomeFora = jogo.isPersisted
      ? jogo.awayTeam?.name
      : jogo.equipes?.fora;

    // Criamos uma chave única baseada nos dois times
    const chaveConfronto = `${nomeCasa}-${nomeFora}`;

    if (!chavesVistas.has(chaveConfronto)) {
      chavesVistas.add(chaveConfronto);
      jogosUnicos.push(jogo);
    }
  });
  return (
    <div className={`${className} table_container`}>
      <table className="custom_table">
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
          {jogosUnicos.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                Nenhuma análise encontrada.
              </td>
            </tr>
          ) : (
            jogosUnicos.map((jogo, index) => {
              const rowKey = jogo.isPersisted
                ? `db-${jogo.id}`
                : `local-${index}`;
              const nomeCasa = jogo.isPersisted
                ? jogo.homeTeam?.name
                : jogo.equipes?.casa;
              const nomeFora = jogo.isPersisted
                ? jogo.awayTeam?.name
                : jogo.equipes?.fora;
              const pOver15 = jogo.isPersisted
                ? jogo.over15
                : jogo.estatisticas?.over15FT * 10;

              const pOver25 = jogo.isPersisted
                ? jogo.over25
                : jogo.estatisticas?.over25FT * 10;

              const pBtts = jogo.isPersisted
                ? jogo.btts
                : jogo.estatisticas?.btts * 10;

              const pOver05HT = jogo.isPersisted
                ? jogo.over05Ht // Note o 't' minúsculo conforme sua Entity!
                : jogo.estatisticas?.over05HT * 10;

              const recomendacao = calcularApostaRecomendada(
                pOver05HT,
                pOver15,
                pOver25,
                pBtts,
              );

              return (
                <tr
                  key={rowKey}
                  className={jogo.isPersisted ? styles.row_db : ""}
                >
                  <td className={styles.team_cell}>
                    {`${nomeCasa} x ${nomeFora}`}
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
                    {/* SÓ MOSTRA OS ÍCONES SE O JOGO NÃO ESTIVER NO BANCO */}
                    {!jogo.isPersisted && (
                      <>
                        <FontAwesomeIcon
                          icon={faCircleXmark}
                          className={styles.apostasTable_icon}
                          onClick={() => onRemoverAnalise(index)}
                        />
                        <FontAwesomeIcon
                          icon={faSquarePlus}
                          className={styles.apostasTable_icon}
                          onClick={() => handleMandarProPai(jogo)}
                        />
                      </>
                    )}
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
