import HeroPages from "../components/heroPages/HeroPages";
import ObjetivosTable from "../components/objetivosTable/ObjetivosTable";

function Objetivos() {
  return (
    <div className="content-wrapper-center row">
      <HeroPages
        className="sm-12 col-5"
        titulo="Domine seus Resultados com Precisão"
        descricao={
          <>
            <p>
              Monitore sua evolução através de métricas detalhadas que revelam a
              saúde real da sua banca. Transforme dados brutos em inteligência
              estratégica e tenha uma visão clara do seu progresso.
            </p>
            <br />
            <p>
              Analise a consistência das suas entradas e identifique os períodos
              de maior eficiência operacional. Ajuste sua abordagem com base em
              fatos, minimizando a intuição e maximizando o retorno matemático.
            </p>
            <br />
            <p>
              Refine sua jornada rumo à profissionalização utilizando um
              dashboard que prioriza a transparência. Entenda cada oscilação do
              seu gráfico para manter o controle emocional e técnico sobre suas
              operações.
            </p>
          </>
        }
      />
      <ObjetivosTable className="sm-12 col-end-6" />
    </div>
  );
}
export default Objetivos;
