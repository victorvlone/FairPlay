import HeroPages from "../components/heroPages/HeroPages";

function Home() {
  return (
    <div className="content-wrapper-center row">
      <HeroPages
        className="sm-12 col-6 col-7"
        titulo="Análise preditiva aplicada a apostas esportivas."
        homePage={false}
        descricao={
          <>
            <p>
              Transforme estatísticas em decisões mais seguras e bem fundamentadas.
            </p>
          </>
        }
      />
    </div>
  );
}

export default Home;
