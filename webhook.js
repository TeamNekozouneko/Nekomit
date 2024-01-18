const { getCurrentTime } = require('./utils')
require('dotenv').config()

async function sendMessage(message, commitMsg) {
    const formatted = message.map(msg => `・${msg}`).join('\n')
    const styled = `\`\`\`${getCurrentTime()}頃のコミット\n変更部分:\n${formatted}\n\n内容: \n${commitMsg}\`\`\``
    await fetch(process.env.WEBHOOK_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content: styled
        })
    })
}

module.exports = {
    sendMessage
}