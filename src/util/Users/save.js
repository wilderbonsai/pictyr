import { request } from 'graphql-request'
import emojiStrip from 'emoji-strip'
import {escapeString} from 'escape-string';

const saveUser = async (
    instagramId,
    fullName,
    bio,
    profileImageUrl,
    website,
    email
  ) => {
  //Todo Check if user already exists
  const query = `
          mutation {
            createUser(
              instagramId:"${instagramId}"
              fullName:"${emojiStrip(fullName)}"
              bio:"${escapeString(bio)}"
              website:"${website}"
              profileImageUrl:"${profileImageUrl}"
            ) {
              id
            }
          }
        `
  try {
    const data = await request('https://api.graph.cool/simple/v1/pictyr-dev', query)
    return data.createUser;
  } catch(e) {
    throw new Error(e)
  }
}

export default saveUser