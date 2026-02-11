import Autenticacao from "../components/autenticacao/Autenticacao";
import HeroPages from "../components/heroPages/HeroPages";

function Home({ authConfig, closeAuth }) {
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
      <div className="content-wrapper-center row row_align_top">
        {authConfig.isOpen && (
          <Autenticacao
            className="sm-12 col-start-8"
            initialMode={authConfig.mode}
            onClose={closeAuth}
          />
        )}
      </div>
    </>
  );
}

export default Home;
