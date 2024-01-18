const { checkCommits } = require('./check')
const { interval } = require('./config')

setInterval(checkCommits, interval)