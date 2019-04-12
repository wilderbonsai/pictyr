import { request } from 'graphql-request'
const { GATSBY_GRAPH_ENDPOINT } = process.env

const getAll = async () => {
  //Todo Check if user already exists
  const query = `
          query {
            allTags(orderBy:key_ASC){
              id
              key
            }
          }
        `
  try {
    const data = await request(GATSBY_GRAPH_ENDPOINT, query)
    return data.allTags
  } catch(e) {
    throw new Error(e)
  }
}

export default getAll