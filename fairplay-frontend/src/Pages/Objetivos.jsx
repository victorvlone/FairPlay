import { useState } from "react";
import EvolucaoChart from "../components/evolucaoChart/EvolucaoChart";
import HeroPages from "../components/heroPages/HeroPages";
import ObjetivosTable from "../components/objetivosTable/ObjetivosTable";
import ComponentHeader from "../components/componentHeader/ComponentHeader";

function Objetivos() {
  const [chartData, setChartData] = useState([]);
  return (
    <>
      <HeroPages
        className="sm-12 col-6 col-7"
        titulo="Domine seus Resultados com Precisão"
        descricao={
          <>
            <p>
              Monitore sua evolução através de métricas detalhadas que revelam a
            </p>
          </>
        }
      />
      <div className="content-wrapper-center row row_align_top">
        <ComponentHeader titulo="Evolução da Banca" descricao="Acompanhe seu progresso mensal e a regra dos 10% de meta." className="col-12" />
        <ObjetivosTable className="sm-12 col-8" onDataGenerated={setChartData} />
        <EvolucaoChart className="sm-12 col-4" data={chartData} />
      </div>
    </>
  );
}
export default Objetivos;
