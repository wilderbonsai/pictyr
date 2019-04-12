import {EXISTING_ID_IDENTIFIER} from './const'
import ntol from 'number-to-letter'
import graphRequest from 'util/Graph/request'

const linkTagsToUser = async (tagIds, userGraphId) => {
  await linkExistingTags(tagIds, userGraphId)
  await createAndLinkNonExistingTags(tagIds, userGraphId)
  return
}


const isExistingTag = (tag) => {
  return tag.includes(EXISTING_ID_IDENTIFIER)
}

const removeIdentifierFromExisting = (existing) => {
  const updatedTags =[]
  existing.forEach((tag) => {
    updatedTags.push(tag.replace(EXISTING_ID_IDENTIFIER, ''))
  })
  return updatedTags;
}

const linkExistingTags = async (tagIds, userGraphId) => {
  const existingTags = tagIds.filter((tag) => {
    return isExistingTag(tag)
  })
  const existingTagIds = removeIdentifierFromExisting(existingTags)

  if(!existingTagIds || existingTagIds.length === 0) return
  let linkQuery = ``
  var i = 0;
  existingTagIds.forEach((tagId) => {
    linkQuery += `
      ${ntol(i)}: addToUsersTags(
        usersUserId:"${userGraphId}"
        tagsTagId: "${tagId}"
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
  const data = await graphRequest(query)
  return data
}

const createAndLinkNonExistingTags = async (tagIds, userGraphId) => {
  const nonExistingTags = tagIds.filter((tag) => {
    return !isExistingTag(tag)
  })
  if(!nonExistingTags || nonExistingTags.length === 0) return

  let createTagsQuery = ''
  let i = 0;
  nonExistingTags.forEach((tag) => {
    createTagsQuery += `
      ${ntol(i)}: createTag(
        key:"${tag}"
        usersIds:["${userGraphId}"]
      ) {
        id
      }
    `
    i++
  })

  const query = `
    mutation {
      ${createTagsQuery}
    }
  `

  const data = await graphRequest(query)
  return data
}

export default linkTagsToUser