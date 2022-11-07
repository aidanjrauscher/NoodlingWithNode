const EventEmitter = require('events')

const eventEmitter = new EventEmitter()

eventEmitter.on('response', ()=>{
    console.log('system response')
})

eventEmitter.on('meltdown', (time)=>{
    console.log(`meltdown in ${time} seconds`)
})

eventEmitter.emit('response')
eventEmitter.emit('meltdown', 10)
