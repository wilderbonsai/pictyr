import { request } from 'graphql-request'

const fetchAll = async () => {
  //Todo Check if user already exists
  const query = `
          query {
            allImages {
              url,
              id,
              userId
            }
          }
        `
  try {
    const data = await request('https://api.graph.cool/simple/v1/pictyr-dev', query)
    return data.allImages
  } catch(e) {
    throw new Error(e)
  }
}

export default fetchAll