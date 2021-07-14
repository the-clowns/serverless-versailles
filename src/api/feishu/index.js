const request = require('../request/feishu')

// Authorization: "Bearer " + token,
function createSendMessage (receive_id_type = 'open_id') {
  return function sendMessage (receive_id, text) {
    return request.post(`/im/v1/messages?receive_id_type=${receive_id_type}`, {
      receive_id,
      msg_type: 'text',
      content: {
        text
      }
    })
  }
}

const SendMessageByOpenId = createSendMessage()

function sendMessage (receive_id, text) {
  return SendMessageByOpenId(receive_id, text)
}

module.exports = {

  sendMessage
}
