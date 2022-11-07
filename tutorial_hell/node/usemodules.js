const names = require('./tutorial_hell/names.js')
const sayHi = require('./tutorial_hell/utils.js')
const list = require('./tutorial_hell/list.js')

sayHi(list.person.name)

list.names.forEach(name  => {
    sayHi(name)
});
