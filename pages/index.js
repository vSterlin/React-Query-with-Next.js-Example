import { useQuery, QueryClient } from "react-query";
import axios from "axios";
import { dehydrate } from "react-query/hydration";
import Pokemon from "../components/Pokemon";

const fetchPokemons = async () => {
  const { data } = await axios.get(
    "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0"
  );

  const pokemonArray = await Promise.all(
    data.results.map(async (pokemon) => {
      const res = await axios.get(pokemon.url);
      return res.data;
    })
  );

  return pokemonArray;
};

export default function Home() {
  const { data } = useQuery("pokemons", fetchPokemons);
  return (
    <>
      <div>
        {data.map((pokemon) => (
          <Pokemon key={pokemon.name} pokemon={pokemon}/>
        ))}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("pokemons", fetchPokemons);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
