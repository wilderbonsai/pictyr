import graphRequest from 'util/Graph/request'

const fetchAll = async () => {
  const query = `
    query {
      allCommPreferences {
        id,
        key
      }
    }
  `

  const data = await graphRequest(query)
  return data.allCommPreferences
}

export default fetchAll