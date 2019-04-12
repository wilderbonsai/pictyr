import graphRequest from 'util/Graph/request'

const fetchAll = async () => {
  const query = `
    query {
      allUsers {
        id
        externalId,
        fullName,
        bio,
        profileImageUrl,
        website,
        email,
        tags {
          key
          id
        }
        
      }
    }
  `
  const data = await graphRequest(query)
  return data.allUsers
}

export default fetchAll