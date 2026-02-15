import { useEffect, useState } from "react";
import styles from "./ApostasAbertas.module.css";

function ApostasAbertas() {
  const [bets, setBets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [valoresRetorno, setValoresRetorno] = useState({});

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

  const finalizarAposta = async (betId, resultado) => {
    // Pegamos o valor do input. Se for Red, o valor é 0.
    const valorDigitado = valoresRetorno[betId] || 0;
    const valorFinal = resultado === "GREEN" ? parseFloat(valorDigitado) : 0;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8080/bets/${betId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: "FINALIZADA",
          actualReturn: valorFinal,
        }),
      });

      if (response.ok) {
        fetchBets(); // Agora ao recarregar, ela continua na lista, mas com status FINALIZADA
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  if (loading) return <p>Carregando apostas...</p>;

  const handleInputChange = (betId, valor) => {
    setValoresRetorno((prev) => ({
      ...prev,
      [betId]: valor,
    }));
  };

  return (
    <section className={styles.apostasAbertas_container}>
      <h3>Apostas Abertas</h3>
      <div className={styles.apostaAberta_scroll}>
        {bets.length === 0 ? (
          <p>Nenhuma aposta aberta no momento.</p>
        ) : (
          bets.map((bet) => (
            <div key={bet.id} className={styles.apostaAberta_content}>
              <div className={styles.apostaAberta_status}>
                <h5>{bet.type}</h5>
                <p>{bet.status}</p>
              </div>
              <p>
                Data: <b>{bet.createdAt || "Hoje"}</b>
              </p>
              <p>
                Valor: <b>R$ {bet.betValue.toFixed(2)}</b>
              </p>
              <p>
                Possível retorno: <b>R$ {bet.potentialReturn.toFixed(2)}</b>
              </p>

              {bet.status === "EM_ABERTO" ? (
                <div className={styles.apostaAberta_retorno}>
                  <input
                    type="number"
                    placeholder="R$ 0,00"
                    value={valoresRetorno[bet.id] || ""}
                    onChange={(e) => handleInputChange(bet.id, e.target.value)}
                  />
                  <div className={styles.apostaAberta_buttons}>
                    <button className={styles.btn_green} onClick={() => finalizarAposta(bet.id, "GREEN")}>Green</button>
                    <button className={styles.btn_red} onClick={() => finalizarAposta(bet.id, "RED")}>Red</button>
                  </div>
                </div>
              ) : (
                // O que aparece quando a aposta está FINALIZADA
                <div className={styles.apostaAberta_resultado_final}>
                  <p>Retorno Real: <b style={{ color: bet.actualReturn > 0 ? "green" : "red" }}>
                    R$ {bet.actualReturn.toFixed(2)}
                  </b></p>
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
