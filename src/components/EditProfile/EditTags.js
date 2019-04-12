import React from 'react'
import AuthenticatedUser from 'store/authenticatedUser'
import TagInput from 'components/TagInput'
import authenticatedUser from 'store/authenticatedUser'
import { EXISTING_ID_IDENTIFIER }  from  'util/Tags/const'
class EditTags extends React.Component {

  render() {
    let existingTags = authenticatedUser.user.tags
    if(!existingTags) existingTags = []
    const existingTagNames = existingTags.map((tag) => {
      return tag.id + EXISTING_ID_IDENTIFIER
    })

    return (
        <>
        Add or remove tags
        <TagInput existingTags={existingTagNames} allowCreate/>
        </>
    )
  }
}


export default EditTags