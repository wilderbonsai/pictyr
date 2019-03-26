import { store } from 'react-easy-state'

export const PHOTOGRAPHER = 'photographer';
export const MODEL = 'model'

const data = store({
  filters: {
    'type': PHOTOGRAPHER,
    'color': 'teal',
    'arrangement': 'pay',
    'genders': []
  }
})


export const selectPhotographer = () => {
  const filters = data.filters
  filters.type = PHOTOGRAPHER
  filters.color = 'teal'
}

export const selectModel = () => {
  const filters = data.filters
  filters.type = PHOTOGRAPHER
  filters.color = 'purple'
}

export const toggleGender = (gender) => {
  const genders = data.filters.genders
  var index = genders.indexOf(gender);
  if (index > -1) {
    genders.splice(index, 1);
  } else {
    genders.push(gender)
  }
  console.log(genders)
}


export default data;