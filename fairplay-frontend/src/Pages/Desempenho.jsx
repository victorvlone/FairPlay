import DesempenhoTable from "../components/desempenhoTable/DesempenhoTable";
import HeroPages from "../components/heroPages/HeroPages";
import desempenhoImg from "../assets/desempenhoPage_img.png";

function Desempenho() {
  return (
    <>
      <HeroPages 
        titulo={<>Desem <br /> penho</>} 
        descricao="Acompanhe a performance das apostas de forma clara e organizada.
            Aqui você visualiza acertos, erros e o balanço final por time,
            permitindo analisar consistência, evolução e identificar padrões ao
            longo do tempo."
        imagem={desempenhoImg}
      />
      <DesempenhoTable />
    </>
  );
}
export default Desempenho;
