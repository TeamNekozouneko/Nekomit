const { output } = require('./config')
const fs = require('fs')

async function addContent(name, content) {
    fs.writeFile(`${output}/${name}`, content, (err) => {
        if(err) {
            console.log(err)
        }
    })
}

async function editName(oldName, newName) {
    await fs.renameSync(`${output}/${oldName}`, `${output}/${newName}`)
}

async function removeContent(name) {
    await fs.unlinkSync(`${output}/${name}`)
}

module.exports = {
    addContent,
    editName,
    removeContent
}