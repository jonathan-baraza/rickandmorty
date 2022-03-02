import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});
const handler = async (req, res) => {
  const searchText = req.body;

  try {
    const { data } = await client.query({
      query: gql`
        query {
          characters(filter: { name: "${searchText}" }) {
            results {
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
    res
      .status(200)
      .json({ error: "null", characters: data.characters.results });
  } catch (error) {
    if (error.message === "404: Not Found") {
      res.status(404).json({
        error: "Error, the requested character was not found on this server.",
        characters: null,
      });
    } else {
      res.status(500).json({
        error: "Internal Server error! Kindly try again later.",
        characters: null,
      });
    }
  }
};

export default handler;
