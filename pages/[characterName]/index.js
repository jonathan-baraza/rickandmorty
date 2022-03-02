import { Fragment } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";

const Index = ({ character }) => {
  const router = useRouter();
  const goHome = () => {
    router.push("/");
  };
  return (
    <Fragment>
      <Head>
        <title>{character.name}</title>
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <meta
          name="description"
          content="This is the Rick and Morty Api for Kings."
        />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossOrigin="anonymous"
        ></link>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <div className="card m-2 col-sm-6 mx-auto p-0">
        <h3 className="card-header fw-bold d-flex justify-content-between">
          {character.name}
          <button className="btn btn-sm btn-primary" onClick={goHome}>
            Go back
            <FontAwesomeIcon
              icon={faSignIn}
              flip="horizontal"
              className="ms-1"
            />
          </button>
        </h3>
        <div className="card-body" style={{ display: "block" }}>
          <Image
            alt={`${character.name}'s photo`}
            src={character.image}
            width={100}
            height={65}
            layout="responsive"
          />
        </div>
        <div className="card-footer d-flex flex-column">
          <span className="">
            <span className="fw-bolder text-success me-2">Gender:</span>
            {character.gender}
          </span>
          <span className="">
            <span className="fw-bolder text-success me-2">Location:</span>
            {character.location.name}
          </span>
          <span className="">
            <span className="fw-bolder text-success me-2">Origin:</span>
            {character.origin.name}
          </span>
          <span className="">
            <span className="fw-bolder text-success me-2">Status:</span>
            {character.status}
          </span>
        </div>
      </div>
    </Fragment>
  );
};

export default Index;

export const getStaticPaths = async () => {
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
  const results = data.characters.results;
  return {
    fallback: true,
    paths: results.map((character) => ({
      params: {
        characterName: character.name,
      },
    })),
  };
};

export const getStaticProps = async (context) => {
  const searchName = context.params.characterName;
  const client = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
         query {
           characters(filter:{name:"${searchName}"}) {
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

  const results = data.characters.results[0];
  return {
    props: {
      character: results,
    },
  };
};
