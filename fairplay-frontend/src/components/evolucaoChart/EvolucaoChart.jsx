import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import styles from "./EvolucaoChart.module.css";

function EvolucaoChart({ className, data }) {
  // 1. Filtramos os 12 primeiros meses
  // 2. Para a barra de lucro, se isReal for false, mandamos null para a barra sumir
  const dadosFormatados = data
    ? data.slice(0, 12).map((item) => ({
        ...item,
        // Se o mês não for real (projeção), o profit vira null para não renderizar a barra
        profit: item.isReal ? item.profit : null,
      }))
    : [];

  return (
    <div className={`${styles.evolucaoChart_container} ${className}`}>
      <div className={styles.evolucaoChart_title}>
        <h2>Performance vs. Meta</h2>
        <p>Análise comparativa anual</p>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={dadosFormatados}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          barGap={8}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#444" />

          <XAxis
            dataKey="month"
            tick={{ fill: "#888", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis hide />

          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.05)" }}
            contentStyle={{
              backgroundColor: "#1a1a1a",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
            }}
            // Ajuste no tooltip para não mostrar "Lucro: 0" em meses futuros
            formatter={(value, name) => {
              if (value === null) return [null, null];
              return [
                `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
                name === "meta" ? "Meta" : "Lucro Real",
              ];
            }}
          />
          <Bar
            dataKey="meta"
            fill="var(--azul)"
            name="meta"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="profit"
            fill="#71aa80"
            fillOpacity={0.6}
            stroke="#71aa80"
            strokeWidth={1}
            name="profit"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default EvolucaoChart;
