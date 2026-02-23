import { useEffect, useState } from "react";
import ApostasAbertas from "../components/apostasAbertas/ApostasAbertas";
import ApostasCaderneta from "../components/apostasCaderneta/ApostasCaderneta";
import ApostasTable from "../components/apostasTable/ApostasTable";
import HeroPages from "../components/heroPages/HeroPages";
import TeamPerformanceCard from "../components/teamPerformanceCard/TeamPerformanceCard";
import ComponentHeader from "../components/componentHeader/ComponentHeader";

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
          titulo="Entrada de Dados"
          descricao="Preencha os resultados recentes das equipes para gerar uma nova análise."
          className="col-12"
        />
        <TeamPerformanceCard
          className="sm-12 col-7"
          onAdicionar={salvarNovoJogo}
        />
        <ComponentHeader
          titulo="Painel de Probabilidades"
          descricao="Confira as métricas calculadas e a sugestão de mercado para cada confronto."
          className="col-12"
        />
        <ApostasTable
          className="sm-12 col-7"
          jogos={todosOsJogos}
          onEnviarParaCaderneta={adicionarACaderneta}
          onRemoverAnalise={removerAnaliseDaTabela}
        />
        <ComponentHeader
          titulo="Gestão de Caderneta"
          descricao="Monte suas múltiplas e gerencie o status de suas apostas ativas."
          className="col-12"
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
