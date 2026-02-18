import ComponentHeader from "../components/componentHeader/ComponentHeader";
import DesempenhoTable from "../components/desempenhoTable/DesempenhoTable";
import HeroPages from "../components/heroPages/HeroPages";

function Desempenho() {
  return (
    <>
      <HeroPages
        className="sm-12 col-6 col-7"
        titulo="O refino analítico da sua performance"
        descricao={
          <>
            <p>Utilize nossos filtros para identificar quais times, países e</p>
          </>
        }
      />
      <div className="content-wrapper-center row">
        <ComponentHeader titulo="Ranking de Lucratividade" descricao="Onde você tem mais lucro?" className="col-12" />
        <DesempenhoTable className="sm-12 col-6" />
      </div>
    </>
  );
}
export default Desempenho;
