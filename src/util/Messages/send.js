import axios from 'axios'

const send = async (fromName, fromEmail, fromBody, toUserIds) => {

  console.log('send message')
  const message = {
    from: {
      name: fromName,
      email: fromEmail
    },
    to: {
      userIds: toUserIds
    },
    body: fromBody
  }
  //Todo handle error
  const result = await axios.post('https://wt-fc9679ce7625bd77470a290dafbfa8f9-0.sandbox.auth0-extend.com/pictyr-mailer-development/new-message', message)

  return;
}

export default send;