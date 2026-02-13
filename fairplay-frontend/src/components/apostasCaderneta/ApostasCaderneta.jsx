import { useEffect, useState } from "react";
import styles from "./ApostasCaderneta.module.css";

function ApostasCaderneta({ className, caderneta }) {
  const [oddsValores, setOddsValores] = useState({});
  const [oddTotal, setOddTotal] = useState(1.0);

  useEffect(() => {
    let total = 1.0;
    let temConteudo = false;

    caderneta.forEach((_, index) => {
      const valor = parseFloat(oddsValores[index]);
      if (!isNaN(valor) && valor > 0) {
        total *= valor;
        temConteudo = true;
      }
    });

    setOddTotal(temConteudo ? total.toFixed(2) : (1.0).toFixed(2));
  }, [oddsValores, caderneta]);

  const handleOddChange = (index, valor) => {
    setOddsValores((prev) => ({
      ...prev,
      [index]: valor,
    }));
  };

  const isFormValido = () => {
    if (caderneta.length === 0) return false;

    // Verifica se cada item da caderneta tem um valor de odd preenchido
    const todasOddsPreenchidas = caderneta.every((_, index) => {
      const v = oddsValores[index];
      return v && v !== "" && parseFloat(v) > 1;
    });

    return todasOddsPreenchidas;
  };

  const getTipoAposta = (quantidade) => {
    if (quantidade === 1) return "Simples";
    if (quantidade === 2) return "Dupla";
    if (quantidade === 3) return "Tripla";
    return "Múltipla";
  };

  const handleSalvarAposta = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token"); // PEGA O TOKEN SALVO

    if (!userId || !token) {
      alert("Você precisa estar logado para salvar uma aposta.");
      return;
    }

    const cards = document.querySelectorAll(`.${styles.caderneta_betSelect}`);

    const matchesData = caderneta.map((item, index) => {
      const card = cards[index];
      const selectAposta = card.querySelector("select").value;
      const inputOdd = card.querySelector("input").value;

      return {
        matchDate: new Date().toISOString(),
        oddOver15: item.porcentagens.over15,
        oddOver25: item.porcentagens.over25,
        oddOver05Ht: item.porcentagens.over05HT,
        oddBtts: item.porcentagens.btts,
        recommendBet: formatBetType(item.recomendacao),
        betMade: formatBetType(selectAposta),
        homeTeamName: item.equipeCasa,
        awayTeamName: item.equipeFora,
        leagueName: item.filtros.liga,
        countryName: item.filtros.pais,
      };
    });

    const payload = {
      userId: userId,
      oddTotal: parseFloat(oddTotal),
      status: "EM_ABERTO",
      type: getTipoAposta(caderneta.length)
        .toUpperCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, ""),
      matches: matchesData,
    };

    console.log("Enviando para o banco:", payload);

    try {
      const response = await fetch("http://localhost:8080/bets", {
        method: "POST",
        headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // ENVIA O TOKEN AQUI
      },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Aposta salva com sucesso!");
      } else {
        alert("Erro ao salvar aposta.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  const formatBetType = (val) => {
    if (!val || val === "—") return "UNDER_DEFINED"; // Ajuste conforme seus Enums
    return val.toUpperCase().replace(/\s+/g, "_").replace(/\./g, "");
  };

  const calcularOddTotal = (cards) => {
    let total = 1;
    cards.forEach((card) => {
      const val = parseFloat(card.querySelector("input").value);
      if (!isNaN(val)) total *= val;
    });
    return total.toFixed(2);
  };

  return (
    <section className={styles.caderneta_container}>
      <h3>Caderneta de apostas</h3>
      <div className={styles.caderneta_betsSelects}>
        {caderneta.length === 0 ? (
          <p style={{ textAlign: "center", color: "#888", padding: "20px" }}>
            Nenhuma seleção adicionada.
          </p>
        ) : (
          caderneta.map((item, index) => (
            <div key={index} className={styles.caderneta_betSelect}>
              <h4>
                {item.equipeCasa} x {item.equipeFora}
              </h4>

              <div className={styles.caderneta_bet_inputs}>
                <div className={styles.caderneta_select_input}>
                  <label>Aposta:</label>
                  <select
                    defaultValue={item.recomendacao}
                    id={`select-${index}`}
                  >
                    <option value="Over 0.5 HT">Over 0.5 HT</option>
                    <option value="Over 1.5">Over 1.5 Gols</option>
                    <option value="Over 2.5">Over 2.5 Gols</option>
                    <option value="Ambas marcam">Ambas Marcam</option>
                    <option value="—">—</option>
                  </select>
                </div>

                <div className={styles.caderneta_select_input}>
                  <label>Odd:</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="1.00"
                    value={oddsValores[index] || ""}
                    onChange={(e) => handleOddChange(index, e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {caderneta.length > 0 && (
        <div className={styles.caderneta_button_container}>
          <div className={styles.caderneta_button_details}>
            <h4>{getTipoAposta(caderneta.length)}</h4>
            <p>
              Odd total: <b>{oddTotal}</b>
            </p>
          </div>
          <button
            onClick={handleSalvarAposta}
            disabled={!isFormValido()}
            style={{
              opacity: isFormValido() ? 1 : 0.5,
              cursor: isFormValido() ? "pointer" : "not-allowed",
            }}
          >
            Salvar
          </button>
        </div>
      )}
    </section>
  );
}
export default ApostasCaderneta;
