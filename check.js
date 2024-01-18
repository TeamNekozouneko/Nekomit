const { Octokit } = require('@octokit/rest')
const { owner, repository, branch } = require('./config')
const { sendMessage } = require("./webhook");
const {addContent, editName, removeContent} = require("./actions");
require('dotenv').config()

const kit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN })
let lastSha

async function checkCommits() {
    try {
        const { data: commits } = await kit.repos.listCommits({
            owner,
            repo: repository,
            sha: branch
        })

        if(commits.length > 0 && commits[0].sha !== lastSha) {
            if(lastSha) {
                const { data: diff } = await kit.repos.compareCommits({
                    owner,
                    repo: repository,
                    base: lastSha,
                    head: commits[0].sha
                })

                let commitData = []
                for (const file of diff.files) {
                    const name = file.filename
                    switch (file.status) {
                        case "added":
                            console.log(`[追加] ${name}`)
                            commitData.push(`[追加] ${name}`)
                            await addContent(name, await getContents(commits, name))
                            break
                        case "modified":
                            console.log(`[編集] ${name}`)
                            commitData.push(`[編集] ${name}`)
                            await addContent(name, await getContents(commits, name))
                            break
                        case "removed":
                            console.log(`[削除] ${name}`)
                            commitData.push(`[削除] ${name}`)
                            await removeContent(name)
                            break
                        case "renamed":
                            console.log(`[名前変更] ${file.previous_filename} -> ${name}`)
                            commitData.push(`[名前変更] ${file.previous_filename} -> ${name}`)
                            await editName(file.previous_filename, name)
                            break
                        case "changed":
                            console.log(`変更？？`)
                    }
                }
                await sendMessage(commitData, commits[0].commit.message)
            } else {
                console.log("コミットは見つかってない。")
            }
            lastSha = commits[0].sha
        } else {
            console.log("は？アップデート見つかってないんだけどえっぐ")

        }

    } catch (error) {
        console.log("error", error)
    }
}

async function getContents(commits, path) {
    const { data: content } = await kit.repos.getContent({
        owner,
        repo: repository,
        path,
        ref: commits[0].sha
    })
    return Buffer.from(content.content, 'base64').toString('utf-8')
}

module.exports = {
    checkCommits
}