import { Fragment, useState } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Character from "../components/Character";

//rick and morty api
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const Index = (props) => {
  //leave it at that, we will use it in reset method.
  const initialState = props.characters;
  const [allCharacters, setAllCharacters] = useState(initialState);

  const updateSearch = (data) => {
    setAllCharacters(data);
  };

  const resetSearch = () => {
    setAllCharacters(initialState);
  };
  return (
    <Fragment>
      <Head>
        <title>The Rick and Morty Api</title>
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <meta
          name="description"
          content="This is the Rick and Morty Api for Kings."
        />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossorigin="anonymous"
        ></link>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
          crossorigin="anonymous"
        ></script>
      </Head>
      <Header update={updateSearch} reset={resetSearch} />
      <main className="row mx-auto p-3" style={{ width: "90%" }}>
        {allCharacters.map((character) => (
          <Character className="" key={character.id} character={character} />
        ))}
      </main>
    </Fragment>
  );
};

export default Index;

export const getStaticProps = async () => {
  const client = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query {
        characters {
          results {
            id
            name
            gender
            origin {
              name
            }
            location {
              name
            }
            image
            status
          }
        }
      }
    `,
  });

  return {
    props: {
      characters: data.characters.results,
    },
  };
};
