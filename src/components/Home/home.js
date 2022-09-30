import HeaderSearchBar from "../Header/HeaderSearchBar/headerSearchBar";

function Home() {

  const bgImage = "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";

  return (
    <section className="w-screen h-screen bg-cover fixed" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="flex w-screen h-full items-center justify-center container mx-auto">
        <div className="max-w-2xl text-center">
          <h2 className="text-xl sm:text-2xl tracking-widest text-white lg:text-2xl p-5">Ton aventure musicale commence maintenant, trouve tes partenaires et forme ton prochain groupe</h2>

          <HeaderSearchBar />

          <p className="mt-6 lg:text-lg text-white">La musique est meilleure quand elle est partagée ! </p>
          <p className="mt-6 lg:text-lg text-white"> Quoi de mieux qu'une bonne Jam entre zicos ? <br></br>
            OneBand, 1er réseau social des amoureux du bon son, te permet de trouver ton/tes âme(s) soeur(s) et de vibrer sur la même onde ! </p>
          <p className="mt-6 lg:text-lg text-white"> Un groupe de rock en panne de bassiste ? <br></br>
            Trouve la personne idéale pour le remplacer ! Ton guitariste ne veut faire que des solos mais n'est pas très bon ? Trouve ton as du médiator qui saura manier le vibrato à la perfection !</p>
        </div>
      </div>
    </section>
  );
};

export default Home;