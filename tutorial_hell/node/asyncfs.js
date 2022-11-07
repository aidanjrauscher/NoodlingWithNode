const {readFile, writeFile} = require('fs')

readFile('./tutorial_hell/files/first.txt', 'utf8', (err,res)=>{
    if(err){
        console.log(err)
        return
    }
    else{
        const first = res
        readFile('./tutorial_hell/files/second.txt', 'utf8', (err,res)=>{
            if(err){
                console.log(err)
                return
            }
            else{
                const second = res
                writeFile('./tutorial_hell/files/third.txt', "what's up world", (err,res)=>{
                    if(err){
                        console.log(err)
                        return
                    }
                    else{
                        console.log({first, second})
                        return
                    }
                })
            }
        })
    }
})

