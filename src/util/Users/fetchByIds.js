import { request } from 'graphql-request'

const fetchByIds = async (userIds) => {
  //Todo Check if user already exists
  const userListString = `"${userIds.join(`","`)}"`
  const query = `
          query {
            allUsers(filter: {
              id_in: [${userListString}]
            }) {
              id,
              fullName,
              bio,
              profileImageUrl,
              website,
              email
            }
          }
        `
  try {
    const data = await request('https://api.graph.cool/simple/v1/pictyr-dev', query)
    return data.allUsers
  } catch(e) {
    throw new Error(e)
  }
}

export default fetchByIds