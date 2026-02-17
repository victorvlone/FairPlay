import { useEffect, useState } from "react";
import styles from "./ObjetivosTable.module.css";

function ObjetivosTable({ className }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Função para formatar os números: 15555.00 -> 15.555,00
  const formatCurrency = (value) => {
    return value.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const fetchHistory = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:8080/bankroll/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setHistory(data);
    } catch (error) {
      console.error("Erro ao buscar histórico:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchHistory(); }, []);

  const gerarLinhasTabela = () => {
    if (history.length === 0) return [];
    const TOTAL_MESES = 48;
    let linhasCompletas = [];
    
    history.forEach((item, index) => {
      const initial = index === 0 ? item.initialBankroll : linhasCompletas[index - 1].final;
      const deposit = item.month === 1 ? 0 : 100;
      const operacional = initial + deposit;
      
      linhasCompletas.push({
        id: item.id,
        month: item.month,
        initial: initial,
        deposit: deposit,
        operacional: operacional,
        profit: item.realProfit,
        final: item.finalBankroll,
        isReal: true
      });
    });

    const ultimoMesReal = history[history.length - 1].month;
    for (let m = ultimoMesReal + 1; m <= TOTAL_MESES; m++) {
      const lastItem = linhasCompletas[linhasCompletas.length - 1];
      const initial = lastItem.final;
      const deposit = 100;
      const operacional = initial + deposit;
      const projectedProfit = operacional * 0.10; 
      const final = operacional + projectedProfit;

      linhasCompletas.push({
        id: `proj-${m}`,
        month: m,
        initial: initial,
        deposit: deposit,
        operacional: operacional,
        profit: projectedProfit,
        final: final,
        isReal: false
      });
    }
    return linhasCompletas;
  };

  if (loading) return <p>Carregando histórico...</p>;

  const todasAsLinhas = gerarLinhasTabela();

  return (
    <div className={`table_container ${className}`}>
      <table className={`custom_table ${styles.ObjetivosTable_container}`}>
        <thead>
          <tr>
            <th>Mês</th>
            <th>Banca Inicial</th>
            <th>Aporte</th>
            <th>Banca Op.</th>
            <th>Stake (5%)</th>
            <th>Meta (10%)</th>
            <th>Lucro</th>
            <th>Saldo Final</th>
          </tr>
        </thead>
        <tbody>
          {todasAsLinhas.map((item) => (
            <tr key={item.id} className={!item.isReal ? styles.row_projection : ""}>
              <td>Mês {item.month}</td>
              {/* Agora usamos a função formatCurrency em todos os valores */}
              <td>R$ {formatCurrency(item.initial)}</td>
              <td>R$ {formatCurrency(item.deposit)}</td>
              <td>R$ {formatCurrency(item.operacional)}</td>
              <td>R$ {formatCurrency(item.operacional * 0.05)}</td>
              <td>R$ {formatCurrency(item.operacional * 0.10)}</td>
              <td style={{ 
                color: item.isReal ? (item.profit >= 0 ? "#71aa80" : "#e52121") : "#aaa", 
                fontStyle: item.isReal ? "normal" : "italic" 
              }}>
                R$ {formatCurrency(item.profit)} {!item.isReal}
              </td>
              <td style={{ opacity: item.isReal ? 1 : 0.7 }}>
                <b>R$ {formatCurrency(item.final)}</b>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ObjetivosTable;