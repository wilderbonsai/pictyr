const { request } = require('graphql-request')

const saveImage = async (instagramId, instagramUserId, userId, url) => {
  const query = `
          mutation {
            createImage(
              instagramId:"${instagramId}",
              instagramUserId:"${instagramUserId}",
              userId:"${userId}",
              url:"${url}"
            ) {
              id
            }
          }
        `
  try {
    const data = await request('https://api.graph.cool/simple/v1/pictyr-dev', query)
    return data;
  } catch(e) {
    throw new Error(e)
  }
}

export default saveImage