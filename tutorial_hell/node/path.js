const path = require('path')

const sep = path.sep

const filePath = path.join('/tutorial_hell', 'usemodules.js')

const base  = path.basename(filePath)

const abs = path.resolve(__dirname, 'tutorial_hell', 'usemodules.js')

console.log(abs)