import { useEffect, useState, useMemo } from "react";
import styles from "./DesempenhoTable.module.css";

function DesempenhoTable({ className }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("team"); // 'teamName', 'league', 'country', 'market'

  // 1. Busca os dados do Banco (Igual você fez na outra tabela)
  const fetchHistory = async () => {
    const token = localStorage.getItem("token");

    try {
      // Não precisa passar o userId na URL, o @AuthenticationPrincipal cuida disso
      const response = await fetch(`http://localhost:8080/bets`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Erro ao buscar histórico");

      const data = await response.json();
      console.log("Dados que vieram do banco:", data);
      setHistory(data);
    } catch (error) {
      console.error("Erro no fetch do desempenho:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // 2. Lógica que transforma a lista de apostas em um Ranking
  const ranking = useMemo(() => {
  const counts = {};

  history.forEach((bet) => {
    // 1. Filtro de Tipo de Aposta (Ainda usa o resultado do bilhete como um todo)
    if (filter === "type") {
      const isWin = bet.actualReturn > bet.betValue;
      const isLoss = bet.actualReturn === 0;
      const key = bet.type;
      
      if (key) {
        if (!counts[key]) counts[key] = { name: key, wins: 0, losses: 0 };
        if (isWin) counts[key].wins += 1;
        if (isLoss) counts[key].losses += 1;
      }
    } 
    // 2. Filtros de Time, Liga e País (Olham o resultado INDIVIDUAL de cada match)
    else {
      bet.matches?.forEach((match) => {
        // Pega o resultado específico daquela seleção/match
        const isMatchGreen = match.result === "GREEN";
        const isMatchRed = match.result === "RED";

        let keys = [];
        if (filter === "team") {
          keys = [match.homeTeam?.name, match.awayTeam?.name];
        } else if (filter === "league") {
          keys = [match.league?.name];
        } else if (filter === "country") {
          keys = [match.league?.country?.name || "País não informado"];
        }

        keys.forEach((key) => {
          if (!key) return;
          if (!counts[key]) counts[key] = { name: key, wins: 0, losses: 0 };
          
          if (isMatchGreen) counts[key].wins += 1;
          if (isMatchRed) counts[key].losses += 1;
        });
      });
    }
  });

  return Object.values(counts)
    .map((item) => ({ ...item, balance: item.wins - item.losses }))
    .sort((a, b) => b.balance - a.balance);
}, [history, filter]);

  if (loading) return <p>Carregando ranking...</p>;

  return (
    <section className={`${styles.desempenhoTable_section} ${className}`}>
      <div className={styles.desempenhoTable_buttons}>
        <div className={styles.desempenhoTable_buttons}>
          <button
            className={filter === "team" ? styles.active : ""}
            onClick={() => setFilter("team")}
          >
            Time
          </button>
          <button
            className={filter === "league" ? styles.active : ""}
            onClick={() => setFilter("league")}
          >
            Campeonato
          </button>
          <button
            className={filter === "country" ? styles.active : ""}
            onClick={() => setFilter("country")}
          >
            País
          </button>
          <button
            className={filter === "type" ? styles.active : ""}
            onClick={() => setFilter("type")}
          >
            Aposta
          </button>
        </div>
      </div>

      <div className="table_container">
        <table className={`custom_table ${styles.DesempenhoTable_container}`}>
          <thead>
            <tr>
              <th>
                {filter === "team"
                  ? "Time"
                  : filter === "league"
                    ? "Liga"
                    : filter === "country"
                      ? "País"
                      : "Categoria"}
              </th>
              <th>Acertos</th>
              <th>Erros</th>
              <th>Balanço</th>
            </tr>
          </thead>
          <tbody>
            {ranking.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.wins}</td>
                <td>{item.losses}</td>
                <td
                  style={{
                    color: item.balance >= 0 ? "#71aa80" : "#e52121",
                    fontWeight: "bold",
                  }}
                >
                  {item.balance > 0 ? `+${item.balance}` : item.balance}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default DesempenhoTable;
