const prompt = require('prompt-sync')()

let cpf = prompt("          ")

        
        // cpf = cpf.replace((/[A-z]/g, ""))


        console.log(cpf.replace(/[A-z]/g, "").length)