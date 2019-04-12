import AuthService from 'util/Auth/AuthService'
const Auth = new AuthService
import axios from 'axios'
export const getUserMedia = async () => {
  const endpoint = `https://wt-fc9679ce7625bd77470a290dafbfa8f9-0.sandbox.auth0-extend.com/pictyr-auth0-instagram/instagram/media`
  const media = await axios.get(endpoint,
     { headers: { "Authorization":`Bearer ${Auth.getAccessToken()}`}}
  )
  return media
}