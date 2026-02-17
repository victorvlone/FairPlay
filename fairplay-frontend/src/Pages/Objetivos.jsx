import HeroPages from "../components/heroPages/HeroPages";
import ObjetivosTable from "../components/objetivosTable/ObjetivosTable";

function Objetivos() {
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
          <div className="content-wrapper-center row">
      <ObjetivosTable className="sm-12 col-8" />
    </div>
    </>
  );
}
export default Objetivos;
