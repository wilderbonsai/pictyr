import AuthService from 'util/Auth/AuthService'
import axios from 'axios'


const isOnboarded = async () => {
  const Auth = new AuthService()
  const data = await axios.get(`https://pictyr-development.eu.auth0.com/api/v2/users/${Auth.getUserId()}`,
      { headers: { "Authorization":`Bearer ${Auth.getAccessToken()}`}}
  )
  const userMeta = data.data.user_metadata

  if(!userMeta) return false
  if(!userMeta.genders) return false
  if(!userMeta.photographer && !userMeta.model && !userMeta.other) return false
  if(userMeta.publicProfile === null) return false

  return true
}

export default isOnboarded