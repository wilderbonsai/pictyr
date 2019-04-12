import graphRequest from 'util/Graph/request'

const fetchByIds = async (tagIds) => {
  //Todo Check if user already exists
  const tagListString = `"${tagIds.join(`","`)}"`
  const query = `
          query {
            allUsers(filter: {
              tags_some:{
                id_in: [${tagListString}]
               }
              }) {
              externalId,
              fullName,
              bio,
              profileImageUrl,
              website,
              email
              _tagsMeta(filter:{
                id_in :[${tagListString}]
              }) {
                count
              }
              tags {
                id
                key
               }
            }
          }
        `
      const data = await graphRequest(query)
      const users = data.allUsers
      const sortedUsers = users.sort((a,b) => {
        if(a._tagsMeta.count > b._tagsMeta.count) return -1
        if(a._tagsMeta.count === b._tagsMeta.count) return 0
        if(a._tagsMeta.count < b._tagsMeta.count) return 1
      })
      return sortedUsers
}

export default fetchByIds