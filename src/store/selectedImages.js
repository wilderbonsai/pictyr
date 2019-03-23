import { store } from 'react-easy-state'

const data = store({
  images: []
})

export const isSelected = (id) => {
 return  data.images.some(image => image.id === id)
}


export const removeImage = (id) => {
  data.images = data.images.filter(function( obj ) {
    return obj.id !== id;
  });
}

export const addImage = (id, userId, url) => {
  return data.images.push({id, userId, url})
}

export const getUniqueUserIdList = () => {
  const images = data.images;
  const userIds = [];
  images.forEach((image) => {
    if(!userIds.includes(image.userId)) {
      userIds.push(image.userId)
    }
  })
  return userIds;
}

export const getSortedUserIdList = () => {
  const images = data.images;

  const userIds = [];

  images.forEach((image) => {
      if(!userIds.some(user => user.id === image.userId)){
        userIds.push({id:image.userId, count:1})
      }
    else {
      var result = userIds.find(obj => {
        return obj.id === image.userId
      })
      if(result) result.count++
    }
  })
  console.log(userIds)
  return userIds.sort(compareUserByCount);
}

const compareUserByCount = (a, b) => {
    if(a.count  < b.count) return 1
    if(a.count > b.count) return -1
    if(a.count == b.count ) return 0

}

export default data;

