import { useState } from "react";
import ApostasAbertas from "../components/apostasAbertas/ApostasAbertas";
import ApostasCaderneta from "../components/apostasCaderneta/ApostasCaderneta";
import ApostasTable from "../components/apostasTable/ApostasTable";
import HeroPages from "../components/heroPages/HeroPages";
import TeamPerformanceCard from "../components/teamPerformanceCard/TeamPerformanceCard";

function Aposta() {
  const [listaDeJogos, setListaDeJogos] = useState([]);

  const salvarNovoJogo = (jogoJson) => {
    console.log("Recebi no Pai:", jogoJson);
    setListaDeJogos([...listaDeJogos, jogoJson]);
  };

  return (
    <>
      <HeroPages
        className="sm-12 col-6 col-7 hero_home_custom"
        titulo="Análise preditiva aplicada a apostas esportivas."
        homePage={false}
        descricao={
          <>
            <p>
              Transforme estatísticas em decisões mais seguras e bem
              fundamentadas.
            </p>
          </>
        }
      />
      <div className="content-wrapper-center row">
        <TeamPerformanceCard className="sm-12 col-7" onAdicionar={salvarNovoJogo} />
        <ApostasTable className="sm-12 col-7" />

        <div className=" apostas_caderneta_abertas col-7">
          <ApostasCaderneta />
          <ApostasAbertas />
        </div>
      </div>
    </>
  );
}

export default Aposta;
