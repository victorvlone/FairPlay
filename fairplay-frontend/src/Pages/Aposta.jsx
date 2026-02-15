import { useEffect, useState } from "react";
import ApostasAbertas from "../components/apostasAbertas/ApostasAbertas";
import ApostasCaderneta from "../components/apostasCaderneta/ApostasCaderneta";
import ApostasTable from "../components/apostasTable/ApostasTable";
import HeroPages from "../components/heroPages/HeroPages";
import TeamPerformanceCard from "../components/teamPerformanceCard/TeamPerformanceCard";

function Aposta() {
  const [listaDeJogos, setListaDeJogos] = useState([]);
  const [caderneta, setCaderneta] = useState([]);
  const [jogosDoBanco, setJogosDoBanco] = useState([]);

  const removerAnaliseDaTabela = (indexParaRemover) => {
    setListaDeJogos((prev) =>
      prev.filter((_, index) => index !== indexParaRemover),
    );
  };

  const fetchMatches = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch("http://localhost:8080/matches", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setJogosDoBanco(data.map((m) => ({ ...m, isPersisted: true })));
      }
    } catch (err) {
      console.error("Erro ao buscar jogos:", err);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  const todosOsJogos = [...jogosDoBanco, ...listaDeJogos];

  const salvarNovoJogo = (jogoJson) => {
    console.log("Recebi no Pai:", jogoJson);
    setListaDeJogos([...listaDeJogos, jogoJson]);
  };

  const adicionarACaderneta = (jogoFinal) => {
    console.log("Adicionando à Caderneta:", jogoFinal);
    setCaderneta([...caderneta, jogoFinal]);
  };

  const removerDaCaderneta = (indexParaRemover) => {
    setCaderneta((prev) =>
      prev.filter((_, index) => index !== indexParaRemover),
    );
  };

  const aoSalvarSucesso = () => {
    setListaDeJogos([]);
    setCaderneta([]);

    fetchMatches();
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
        <TeamPerformanceCard
          className="sm-12 col-7"
          onAdicionar={salvarNovoJogo}
        />
        <ApostasTable
          className="sm-12 col-7"
          jogos={todosOsJogos}
          onEnviarParaCaderneta={adicionarACaderneta}
          onRemoverAnalise={removerAnaliseDaTabela}
        />

        <div className=" apostas_caderneta_abertas col-7">
          <ApostasCaderneta
            caderneta={caderneta}
            onRemover={removerDaCaderneta}
          />
          <ApostasAbertas />
        </div>
      </div>
    </>
  );
}

export default Aposta;
