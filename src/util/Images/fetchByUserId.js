import { request } from 'graphql-request'

const fetchByIds = async (userId) => {
  //Todo Check if user already exists
  const query = `
          query {
            allImages(filter: {
              userId: "${userId}"
            }) {
              url
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

export default fetchByIds