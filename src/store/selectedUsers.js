import { store } from 'react-easy-state'

const data = store({
  users: []
})

export const getIdList = () => {
  const ids = [];
  data.users.forEach(function(users){
    ids.push(users.id)
  })
  return ids;
}

export const clearUsers = () => {
  data.users = [];
}

export const removeUser = (id) => {
  data.users = data.users.filter(function( obj ) {
    return obj.id !== id;
  });
}

export const addUser = (user) => {
  return data.users.push(user)
}

export const removeAllUsers = () => {
  data.users = []
}


export default data;

