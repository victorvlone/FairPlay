import styles from "./TeamPerformanceCard.module.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShield } from "@fortawesome/free-solid-svg-icons";

function TeamPerformanceCard({ className, onAdicionar }) {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [leagues, setLeagues] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState("");
  const [loadingLeagues, setLoadingLeagues] = useState(false);

  const handleBotaoAdicionar = () => {
    const dados = coletarDados();
    
    // Validação simples antes de enviar
    if (!dados.equipes.casa || !dados.equipes.fora) {
      alert("Preencha os nomes dos times!");
      return;
    }

    if (onAdicionar) {
      onAdicionar(dados); // Aqui os dados "sobem" para o pai
    }
  };

  const coletarDados = () => {

    const statsHT = calcularEstatisticasHT();
    const statsFT = calcularEstatisticasFT();

    const nomeTimeCasa = document.getElementById("nome-time-casa")?.value;
    const nomeTimeFora = document.getElementById("nome-time-fora")?.value;
    
    const dadosParaEnviar = {
      equipes: {
        casa: nomeTimeCasa,
        fora: nomeTimeFora
      },
      filtros: {
        pais: selectedCountry,
        liga: document.getElementById("comp.")?.value,
        data: document.querySelector('input[type="date"]')?.value
      },
      estatisticas: {
        over05HT: statsHT,
        over15FT: statsFT.over15,
        over25FT: statsFT.over25,
        btts: statsFT.btts
      },
      geradoEm: new Date().toISOString()
    };

    console.log("Objeto pronto para envio:", dadosParaEnviar);
    return dadosParaEnviar;
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8080/countries", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCountries(data);
        } else {
          console.error("Erro ao buscar países:", response.status);
        }
      } catch (error) {
        console.error("Erro de rede:", error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (!selectedCountry) {
      setLeagues([]);
      return;
    }

    const fetchLeagues = async () => {
      setLoadingLeagues(true);
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:8080/leagues/country/${selectedCountry}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (response.ok) {
          const data = await response.json();
          setLeagues(data);
        }
      } catch (error) {
        console.error("Erro ao buscar ligas:", error);
      } finally {
        setLoadingLeagues(false);
      }
    };

    fetchLeagues();
  }, [selectedCountry]);

  const calcularEstatisticasHT = () => {
    const todosInputsHT = document.querySelectorAll('input[class*="ht_input"]');

    let jogosComGolsNoHT = 0;

    for (let i = 0; i < todosInputsHT.length; i += 2) {
      const golTimeCasa = parseInt(todosInputsHT[i]?.value) || 0;
      const golTimeFora = parseInt(todosInputsHT[i + 1]?.value) || 0;

      if (golTimeCasa + golTimeFora > 0) {
        jogosComGolsNoHT++;
      }
    }

    console.log(`Quantidade de jogos com gols no HT: ${jogosComGolsNoHT}`);
    return jogosComGolsNoHT;
  };

  const calcularEstatisticasFT = () => {
    const container = document.querySelector(
      "." + styles.matches_button_container,
    );
    const todosInputsFT = container.querySelectorAll(
      'input[class*="ft_input"]',
    );

    let over15 = 0; // Pelo menos 2 gols (1.5)
    let over25 = 0; // Pelo menos 3 gols (2.5)
    let btts = 0; // Ambas marcam (Both Teams to Score)

    for (let i = 0; i < todosInputsFT.length; i += 2) {
      const golsCasa = parseInt(todosInputsFT[i]?.value) || 0;
      const golsFora = parseInt(todosInputsFT[i + 1]?.value) || 0;
      const totalGols = golsCasa + golsFora;

      // 1. Lógica Over 1.5 (2 ou mais gols)
      if (totalGols >= 2) {
        over15++;
      }

      // 2. Lógica Over 2.5 (3 ou mais gols)
      if (totalGols >= 3) {
        over25++;
      }

      // 3. Lógica BTTS (Gols em ambos os inputs)
      if (golsCasa > 0 && golsFora > 0) {
        btts++;
      }
    }

    console.log(`--- Estatísticas FT ---`);
    console.log(`Over 1.5: ${over15}`);
    console.log(`Over 2.5: ${over25}`);
    console.log(`BTTS: ${btts}`);

    return { over15, over25, btts };
  };

  const handleInputChange = (e) => {
    const { value, className } = e.target;

    if (!/^\d$/.test(value)) {
      e.target.value = "";
      return;
    }

    const isFT = className.includes("ft_input");
    const targetClass = isFT ? "ft_input" : "ht_input";

    const container = e.target.closest("." + styles.matches_button_container);

    const allSameType = Array.from(
      container.querySelectorAll(`input[class*="${targetClass}"]`),
    );

    const currentIndex = allSameType.indexOf(e.target);
    const nextInput = allSameType[currentIndex + 1];

    if (nextInput) {
      nextInput.focus();
    }
    setTimeout(() => {
      calcularEstatisticasHT();
      calcularEstatisticasFT();
    }, 0);
  };

  return (
    <div className={`${styles.matches_button_container} ${className}`}>
      <div className={styles.home_away_container}>
        <div className={styles.matches_data_container}>
          <div className={styles.matches_container}>
            <p className={styles.team_name}>
              Ultimos 5 jogos do{" "}
              <input
                type="text"
                className={styles.input_team_name}
                placeholder="Nome"
                id="nome-time-casa"
              />{" "}
              <br />
              em casa na competição
            </p>
            <div className={styles.match_container} id="casa-jogo1">
              <div className={styles.result_container}>
                <div className={styles.match_iconName_container}>
                  <FontAwesomeIcon
                    icon={faShield}
                    className={styles.match_icons}
                  />
                  <p>Casa</p>
                </div>
                <input
                  type="text"
                  className={styles.ht_input}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className={styles.ft_input}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.result_container}>
                <input
                  type="text"
                  className={styles.ft_input}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className={styles.ht_input}
                  onChange={handleInputChange}
                />
                <div className={styles.match_iconName_container}>
                  <FontAwesomeIcon
                    icon={faShield}
                    className={styles.match_icons}
                  />
                  <p>Casa</p>
                </div>
              </div>
            </div>
            <div className={styles.match_container} id="casa-jogo2">
              <div className={styles.result_container}>
                <div className={styles.match_iconName_container}>
                  <FontAwesomeIcon
                    icon={faShield}
                    className={styles.match_icons}
                  />
                  <p>Casa</p>
                </div>
                <input
                  type="text"
                  maxLength={1}
                  className={styles.ht_input}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  maxLength={1}
                  className={styles.ft_input}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.result_container}>
                <input
                  type="text"
                  maxLength={1}
                  className={styles.ft_input}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  maxLength={1}
                  className={styles.ht_input}
                  onChange={handleInputChange}
                />
                <div className={styles.match_iconName_container}>
                  <FontAwesomeIcon
                    icon={faShield}
                    className={styles.match_icons}
                  />
                  <p>Casa</p>
                </div>
              </div>
            </div>
            <div className={styles.match_container} id="casa-jogo3">
              <div className={styles.result_container}>
                <div className={styles.match_iconName_container}>
                  <FontAwesomeIcon
                    icon={faShield}
                    className={styles.match_icons}
                  />
                  <p>Casa</p>
                </div>
                <input
                  type="text"
                  maxLength={1}
                  className={styles.ht_input}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  maxLength={1}
                  className={styles.ft_input}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.result_container}>
                <input
                  type="text"
                  maxLength={1}
                  className={styles.ft_input}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  maxLength={1}
                  className={styles.ht_input}
                  onChange={handleInputChange}
                />
                <div className={styles.match_iconName_container}>
                  <FontAwesomeIcon
                    icon={faShield}
                    className={styles.match_icons}
                  />
                  <p>Casa</p>
                </div>
              </div>
            </div>
            <div className={styles.match_container} id="casa-jogo4">
              <div className={styles.result_container}>
                <div className={styles.match_iconName_container}>
                  <FontAwesomeIcon
                    icon={faShield}
                    className={styles.match_icons}
                  />
                  <p>Casa</p>
                </div>
                <input
                  type="text"
                  maxLength={1}
                  className={styles.ht_input}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  maxLength={1}
                  className={styles.ft_input}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.result_container}>
                <input
                  type="text"
                  maxLength={1}
                  className={styles.ft_input}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  maxLength={1}
                  className={styles.ht_input}
                  onChange={handleInputChange}
                />
                <div className={styles.match_iconName_container}>
                  <FontAwesomeIcon
                    icon={faShield}
                    className={styles.match_icons}
                  />
                  <p>Casa</p>
                </div>
              </div>
            </div>
            <div className={styles.match_container} id="casa-jogo5">
              <div className={styles.result_container}>
                <div className={styles.match_iconName_container}>
                  <FontAwesomeIcon
                    icon={faShield}
                    className={styles.match_icons}
                  />
                  <p>Casa</p>
                </div>
                <input
                  type="text"
                  maxLength={1}
                  className={styles.ht_input}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  maxLength={1}
                  className={styles.ft_input}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.result_container}>
                <input
                  type="text"
                  maxLength={1}
                  className={styles.ft_input}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  maxLength={1}
                  className={styles.ht_input}
                  onChange={handleInputChange}
                />
                <div className={styles.match_iconName_container}>
                  <FontAwesomeIcon
                    icon={faShield}
                    className={styles.match_icons}
                  />
                  <p>Casa</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.matches_data_container}>
          <div className={styles.matches_container}>
            <p className={styles.team_name}>
              Ultimos 5 jogos do{" "}
              <input
                type="text"
                className={styles.input_team_name}
                placeholder="Nome"
                id="nome-time-fora"
              />{" "}
              <br />
              em casa na competição
            </p>
            <div className={styles.match_container} id="fora-jogo1">
              <div className={styles.result_container}>
                <div className={styles.match_iconName_container}>
                  <FontAwesomeIcon
                    icon={faShield}
                    className={styles.match_icons}
                  />
                  <p>Casa</p>
                </div>
                <input
                  type="text"
                  className={styles.ht_input}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className={styles.ft_input}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.result_container}>
                <input
                  type="text"
                  className={styles.ft_input}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className={styles.ht_input}
                  onChange={handleInputChange}
                />
                <div className={styles.match_iconName_container}>
                  <FontAwesomeIcon
                    icon={faShield}
                    className={styles.match_icons}
                  />
                  <p>Casa</p>
                </div>
              </div>
            </div>
            <div className={styles.match_container} id="fora-jogo2">
              <div className={styles.result_container}>
                <div className={styles.match_iconName_container}>
                  <FontAwesomeIcon
                    icon={faShield}
                    className={styles.match_icons}
                  />
                  <p>Casa</p>
                </div>
                <input
                  type="text"
                  className={styles.ht_input}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className={styles.ft_input}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.result_container}>
                <input
                  type="text"
                  className={styles.ft_input}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className={styles.ht_input}
                  onChange={handleInputChange}
                />
                <div className={styles.match_iconName_container}>
                  <FontAwesomeIcon
                    icon={faShield}
                    className={styles.match_icons}
                  />
                  <p>Casa</p>
                </div>
              </div>
            </div>
            <div className={styles.match_container} id="fora-jogo3">
              <div className={styles.result_container}>
                <div className={styles.match_iconName_container}>
                  <FontAwesomeIcon
                    icon={faShield}
                    className={styles.match_icons}
                  />
                  <p>Casa</p>
                </div>
                <input
                  type="text"
                  className={styles.ht_input}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className={styles.ft_input}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.result_container}>
                <input
                  type="text"
                  className={styles.ft_input}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className={styles.ht_input}
                  onChange={handleInputChange}
                />
                <div className={styles.match_iconName_container}>
                  <FontAwesomeIcon
                    icon={faShield}
                    className={styles.match_icons}
                  />
                  <p>Casa</p>
                </div>
              </div>
            </div>
            <div className={styles.match_container} id="fora-jogo4">
              <div className={styles.result_container}>
                <div className={styles.match_iconName_container}>
                  <FontAwesomeIcon
                    icon={faShield}
                    className={styles.match_icons}
                  />
                  <p>Casa</p>
                </div>
                <input
                  type="text"
                  className={styles.ht_input}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className={styles.ft_input}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.result_container}>
                <input
                  type="text"
                  className={styles.ft_input}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className={styles.ht_input}
                  onChange={handleInputChange}
                />
                <div className={styles.match_iconName_container}>
                  <FontAwesomeIcon
                    icon={faShield}
                    className={styles.match_icons}
                  />
                  <p>Casa</p>
                </div>
              </div>
            </div>
            <div className={styles.match_container} id="fora-jogo5">
              <div className={styles.result_container}>
                <div className={styles.match_iconName_container}>
                  <FontAwesomeIcon
                    icon={faShield}
                    className={styles.match_icons}
                  />
                  <p>Casa</p>
                </div>
                <input
                  type="text"
                  className={styles.ht_input}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className={styles.ft_input}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.result_container}>
                <input
                  type="text"
                  className={styles.ft_input}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className={styles.ht_input}
                  onChange={handleInputChange}
                />
                <div className={styles.match_iconName_container}>
                  <FontAwesomeIcon
                    icon={faShield}
                    className={styles.match_icons}
                  />
                  <p>Casa</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.teamPerformance_selects}>
        <select
          name="país"
          id="país"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          <option value="" disabled>
            País
          </option>
          {countries.map((country) => (
            <option key={country.id} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>

        <input type="date" />

        <select
          name="comp."
          id="comp."
          defaultValue={selectedLeague}
          onChange={(e) => setSelectedLeague(e.target.value)}
          disabled={!selectedCountry || loadingLeagues}
        >
          <option value="" disabled>
            {loadingLeagues ? "Carregando..." : "Comp."}
          </option>
          {leagues.map((league) => (
            <option key={league.id} value={league.name}>
              {league.name}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleBotaoAdicionar}>Adicionar</button>
      <p className={styles.error_message}>
        Preencha todos os nomes e todos os resultados de gols (HT e FT) para
        adicionar o jogo.
        <br />
      </p>
    </div>
  );
}
export default TeamPerformanceCard;
