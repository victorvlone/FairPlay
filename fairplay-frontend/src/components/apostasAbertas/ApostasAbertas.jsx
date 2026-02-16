import { useEffect, useState } from "react";
import styles from "./ApostasAbertas.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

function ApostasAbertas() {
  const [bets, setBets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [idApostaSendoEditada, setIdApostaSendoEditada] = useState(null);
  const [statusJogos, setStatusJogos] = useState({});

  const fetchBets = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/bets", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setBets(data);
    } catch (error) {
      console.error("Erro ao buscar apostas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBets();
  }, []);

  const abrirEdicaoRed = (betId) => {
    setIdApostaSendoEditada(idApostaSendoEditada === betId ? null : betId);
    if (idApostaSendoEditada !== betId) setStatusJogos({});
  };

  const marcarJogoIndividual = (matchId, status) => {
    setStatusJogos((prev) => ({ ...prev, [matchId]: status }));
  };

  const finalizarAposta = async (betId, resultadoGeral) => {
    try {
      const token = localStorage.getItem("token");
      const bet = bets.find((b) => b.id === betId);
      const valorFinal = resultadoGeral === "GREEN" ? bet.potentialReturn : 0;

      const response = await fetch(`http://localhost:8080/bets/${betId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: "FINALIZADA",
          actualReturn: valorFinal,
          jogosStatus: statusJogos,
        }),
      });

      if (response.ok) {
        setIdApostaSendoEditada(null);
        fetchBets();
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  if (loading) return <p>Carregando apostas...</p>;

  return (
    <section className={styles.apostasAbertas_container}>
      <h3>Apostas Abertas</h3>
      <div className={styles.apostaAberta_scroll}>
        {bets.length === 0 ? (
          <p>Nenhuma aposta encontrada.</p>
        ) : (
          bets.map((bet) => (
            <div key={bet.id} className={styles.apostaAberta_content}>
              <div className={styles.apostaAberta_status}>
                <h5>{bet.type}</h5>
                {/* Aqui ele aceita qualquer status para mostrar o card */}
                <p
                  style={{
                    color: bet.status === "EM_ABERTO" ? "#71aa80" : "#888",
                  }}
                >
                  {bet.status}
                </p>
              </div>

              <div className={styles.apostaAberta_info}>
                <p>
                  Data: <b>{new Date(bet.createdAt).toLocaleDateString()}</b>
                </p>
                <p>
                  Valor: <b>R$ {bet.betValue?.toFixed(2) || "0.00"}</b>
                </p>
                <p>
                  Possível retorno:{" "}
                  <b>R$ {bet.potentialReturn?.toFixed(2) || "0.00"}</b>
                </p>
              </div>

              {/* Botões principais: Só aparecem se estiver EM_ABERTO */}
              {bet.status === "EM_ABERTO" && (
                <div className={styles.apostaAberta_buttons}>
                  <button
                    className={styles.btn_green}
                    onClick={() => finalizarAposta(bet.id, "GREEN")}
                  >
                    Tudo Green
                  </button>
                  <button
                    className={styles.btn_red}
                    onClick={() => abrirEdicaoRed(bet.id)}
                  >
                    {idApostaSendoEditada === bet.id
                      ? "Cancelar"
                      : "Marcar Red"}
                  </button>
                </div>
              )}

              {/* Resultado Real: Só aparece se estiver FINALIZADA */}
              {bet.status === "FINALIZADA" && (
                <div className={styles.apostaAberta_resultado_final}>
                  <p>
                    Retorno Real:{" "}
                    <b
                      style={{ color: bet.actualReturn > 0 ? "green" : "red" }}
                    >
                      R$ {bet.actualReturn?.toFixed(2) || "0.00"}
                    </b>
                  </p>
                </div>
              )}

              {/* LISTA DE JOGOS: Só aparece se você clicou no botão "Marcar Red" */}
              {idApostaSendoEditada === bet.id && (
                <div className={styles.apostaFechada_container}>
                  {bet.matches?.map((match) => (
                    <div
                      key={match.id}
                      className={styles.apostaFechada_content}
                    >
                      <div className={styles.match_info}>
                        <p>
                          <p>
                            {/* Tentamos acessar .name, se não existir, tentamos a string direta, se não, 'Time A' */}
                            {match.homeTeam?.name ||
                              match.homeTeamName ||
                              "Time A"}
                            {" x "}
                            {match.awayTeam?.name ||
                              match.awayTeamName ||
                              "Time B"}
                          </p>
                        </p>
                      </div>
                      <div className={styles.apostaFechada_aposta}>
                        <span>
                          Aposta: <b>{match.betMade}</b>
                        </span>
                        <div className={styles.apostaFechada_buttons}>
                          <button
                            className={`${styles.btn_green} ${statusJogos[match.id] === "GREEN" ? styles.active_green : ""}`}
                            onClick={() =>
                              marcarJogoIndividual(match.id, "GREEN")
                            }
                          >
                            <FontAwesomeIcon icon={faCheck} />
                          </button>
                          <button
                            className={`${styles.btn_red} ${statusJogos[match.id] === "RED" ? styles.active_red : ""}`}
                            onClick={() =>
                              marcarJogoIndividual(match.id, "RED")
                            }
                          >
                            <FontAwesomeIcon icon={faXmark} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    className={styles.btn_confirmar_finalizacao}
                    onClick={() => finalizarAposta(bet.id, "RED")}
                  >
                    Confirmar Red
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default ApostasAbertas;
