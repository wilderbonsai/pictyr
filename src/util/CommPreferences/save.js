import fetchAll from './fetchAll'
import graphRequest from 'util/Graph/request'
import fetchUserById from 'util/Users/fetchById'
import ntol from 'number-to-letter'
import { MARKETING, COLLABORATION, GENERAL, PAID } from 'const/commPrefKeys'
const saveCommPreferences = async (authUserId, marketing, paid, collaboration, general) => {
  const addCommIds = []
  const removeCommIds = []
  var marketingId, paidId, collaborationId, generalId;
  const user = await fetchUserById(authUserId)
  const userId = user.id

  //Get graphIds for commpreferences
  const commPreferences = await fetchAll()
  //Get all commpreference ids from graph
  commPreferences.forEach((preference) => {
    if(preference.key == MARKETING) {
      marketingId = preference.id
    }
    if(preference.key == PAID) {
      paidId = preference.id
    }
    if(preference.key == COLLABORATION) {
      collaborationId = preference.id
    }
    if(preference.key == GENERAL) {
      generalId = preference.id
    }
  })

  console.log('here')
  console.log(marketingId, paidId, collaborationId, generalId)
  console.log('wtf')
  if(marketing) addCommIds.push(marketingId)
  else removeCommIds.push(marketingId)

  if(paid) addCommIds.push(paidId)
  else removeCommIds.push(paidId)

  if(general) addCommIds.push(generalId)
  else removeCommIds.push(generalId)


  if(collaboration) addCommIds.push(collaborationId)
  else removeCommIds.push(collaborationId)

  console.log('hmm')
  console.log(addCommIds, 'wtf')
  console.log(removeCommIds, 'wtf')
  try {
    await linkCommPreferences(addCommIds, userId)
    await unlinkCommPreferences(removeCommIds, userId)
  } catch(e) {
    console.log(e)
  }
}

const linkCommPreferences = async (commIds, userId) => {
  console.log('link')
  if(!commIds || commIds.length === 0) return

  var i = 0;
  let linkQuery = ''
  commIds.forEach((commPrefId) => {
    linkQuery += `
      ${ntol(i)}: addToUsersCommPreferences (
        usersUserId: "${userId}"
        commPreferencesCommPreferenceId:"${commPrefId}"
      ) {
          usersUser {
            id
          }
        }
    `
    i++
  })

  const query = `
    mutation {
      ${linkQuery}
    }
  `

  console.log(query, 'link')
  await graphRequest(query)
}

const unlinkCommPreferences = async (commIds, userId) => {
  if(!commIds || commIds.length === 0) return

  var i = 0;
  let linkQuery = ''
  commIds.forEach((commPrefId) => {
    linkQuery += `
      ${ntol(i)}: removeFromUsersCommPreferences (
        usersUserId: "${userId}"
        commPreferencesCommPreferenceId:"${commPrefId}"
      ) {
          usersUser {
            id
          }
        }
    `
    i++
  })
  const query = `
    mutation {
      ${linkQuery}
    }
  `
  console.log(query, 'unlink')
  await graphRequest(query)
}
export default saveCommPreferences