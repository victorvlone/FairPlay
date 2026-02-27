import CiclosColumns from "../components/ciclosColumns/CiclosColumns";
import CiclosDetails from "../components/CiclosDetails/CiclosDetails";
import ComponentHeader from "../components/componentHeader/ComponentHeader";
import HeroPages from "../components/heroPages/HeroPages";

function Ciclos() {
  return (
    <>
      <HeroPages
        className="sm-12 col-6 col-7 hero_home_custom"
        titulo="Otimize suas Entradas com Estatística"
        homePage={false}
        descricao={
          <>
            <p>
              Alimente nosso algoritmo com os dados das partidas e receba
              recomendações precisas de valor para os mercados de gols e BTTS.
            </p>
          </>
        }
      />
      <div className="content-wrapper-center row">
        <ComponentHeader
          titulo="Ranking de Lucratividade"
          descricao="Onde você tem mais lucro?"
          className="col-12"
        />
        <CiclosColumns className="sm-12 col-8" />
        <CiclosDetails className="sm-12 col-start-9"  />
      </div>
    </>
  );
}
export default Ciclos;
