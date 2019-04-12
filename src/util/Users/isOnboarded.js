import AuthService from 'util/Auth/AuthService'
import fetchUserById from 'util/Users/fetchById'

//TODO FIX TO USE SSTATE OVER CALL EVERY TIME
const isOnboarded = async () => {
  const Auth = new AuthService()
  const user = await fetchUserById(Auth.getUserId())
  return (user.tags.length > 0)

}

export default isOnboarded