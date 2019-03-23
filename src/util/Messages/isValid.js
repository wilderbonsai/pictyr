const isValid = (message) => {
  console.log(message)
  return(
    message.name &&
    message.email &&
    message.body
  )
}

export default isValid;