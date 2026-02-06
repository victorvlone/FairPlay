import DesempenhoTable from "../components/desempenhoTable/DesempenhoTable";
import HeroPages from "../components/heroPages/HeroPages";

function Desempenho() {
  return (
    <div className="content-wrapper-center row">
      <HeroPages
        titulo="O Refino Analítico da sua Performance"
        descricao={
          <>
            <p>
              Utilize nossos filtros para identificar quais times, países e
              mercados lideram sua lucratividade. Isole variáveis e descubra
              exatamente onde sua estratégia possui vantagem real sobre o
              mercado.
            </p>
            <br />
            <p>
              Acesse o ranking detalhado de performance por campeonato e tipo de
              aposta. Identifique padrões vencedores e elimine mercados
              deficitários para garantir um crescimento sustentável.
            </p>
            <br />
            <p>
              Compare a eficácia entre ligas e mercados de gols em um ranking
              intuitivo. Entenda sua zona de especialidade e concentre seus
              aportes onde os números confirmam sua lucratividade.
            </p>
          </>
        }
      />
      <DesempenhoTable />
    </div>
  );
}
export default Desempenho;
