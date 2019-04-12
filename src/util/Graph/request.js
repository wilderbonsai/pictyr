import { request } from 'graphql-request'

const { GATSBY_GRAPH_ENDPOINT } = process.env

const graphRequest = async (query) => {
  try {
    const data = await request(GATSBY_GRAPH_ENDPOINT, query)
    return data
  } catch(e) {
    throw new Error(e)
  }
}

export default graphRequest