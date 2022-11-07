const {readFileSync, writeFileSync} = require('fs')

const first = readFileSync('./tutorial_hell/files/first.txt', 'utf8')
const second = readFileSync('./tutorial_hell/files/second.txt', 'utf8')

writeFileSync('./tutorial_hell/files/third.txt', "what's up world")
writeFileSync('./tutorial_hell/files/third.txt', "what's up world", {flag: 'a'})

console.log(first)