const prompt = require('prompt-sync')()
const { getLogo } = require('./decorativos')
const { postingUser } = require('./interacao-api')
const { twoSpacing, fourSpacing } = require('./space-lines')

function textInput(texto) {   //Função de solicitação de dados
    twoSpacing()
    console.log(`          ${texto}`)
    console.log()
}

function creatingUser() {   // Função de Criação

    console.clear()
    getLogo()

    fourSpacing()
    console.log("          Deseja criar uma conta?")
    console.log()
    console.log("          Digite “sim” ou “não” para continuar")
    console.log()
    const confirmacao = prompt("          ")

    if (confirmacao !== "sim") {

        return
    }

    console.clear()
    getLogo()

    fourSpacing()
    textInput("Informe seu CPF")
    let cpf = prompt("          ")

    while (!cpf || cpf.replace(/[A-z]/g, "").length !== 11 ) {

        console.clear()
        getLogo()

        fourSpacing()
        console.log("          dado necessário para continuar...")
        textInput("Informe seu CPF")
        cpf = prompt("          ")
    }

    console.clear()
    getLogo()

    fourSpacing()
    textInput("Informe seu Nome")
    let nome = prompt("          ")

    while (!nome) {
        
        console.clear()
        getLogo()

        fourSpacing()
        console.log("          dado necessário para continuar...")
        textInput("Informe seu Nome")
        nome = prompt("          ")
    }

    console.clear()
    getLogo()

    fourSpacing()
    textInput("Informe seu sobrenome")
    let sobrenome = prompt("          ")

    while (!sobrenome) {
        
        console.clear()
        getLogo()

        fourSpacing()
        console.log("          dado necessário para continuar...")
        textInput("Informe seu sobrenome")
        sobrenome = prompt("          ")
    }

    console.clear()
    getLogo()

    fourSpacing()
    textInput("Informe sua idade")
    let idade = parseInt(prompt("          "))

    while (!idade  || typeof idade !== "number") {
        
        console.clear()
        getLogo()

        fourSpacing()
        console.log("          dado necessário para continuar...")
        textInput("Informe sua idade")
        idade = parseInt(prompt("          "))
    }

    console.clear()
    getLogo()
    fourSpacing()
    console.log("          Usuário criado com sucesso!")

    nome = nome.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase());
    sobrenome = sobrenome.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase());

    return usuario = {
        nome,
        sobrenome,
        idade,
        cpf
    }, postingUser(usuario)
}

module.exports = { creatingUser }