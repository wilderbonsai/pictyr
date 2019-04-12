import { store } from 'react-easy-state'
import { getUserId } from 'util/Auth/AuthService'
import fetchUserById from 'util/Users/fetchById'

const data = store({
  user: {}
})

export const populateAuthenticatedUser = async (force = false) => {
  const userId = getUserId()
  if(force || (!data.user.id && getUserId())) {
    console.log('populate')
    const user = await fetchUserById(userId)
    console.log(user)
    data.user = user
  }
}

export default data;