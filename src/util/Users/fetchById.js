import { request } from 'graphql-request'

const fetchById = async (userId) => {
  console.log('fetchById')
  const query = `
          query {
            User(externalId: "${userId}") {
              id
              externalId,
              fullName,
              bio,
              profileImageUrl,
              website,
              email,
              tags {
                id,
                key
              },
              commPreferences {
                id,
                key
              }
            }
          }
        `
      try {
        console.log('try')
        const data = await request('https://api.graph.cool/simple/v1/pictyr-dev', query)
        console.log(data, 'data')
        return data.User
      } catch(e) {
        console.log(e)
        throw new Error(e)
      }
}

export default fetchById