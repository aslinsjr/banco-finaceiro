var prompt = require('prompt-sync')();
const axios = require('axios');
const chalk = require('chalk');

let listaDeUsuarios = [];  // Lista de usuários

let listaDeContas = [];  // Lista de usuários

let usuario = {}   //Objeto de usuário

let opcao = 0   //Opção selecionada no menu

let sair = false //Opção de saida do sistema

// Importações de Funções

const { twoSpacing, fourSpacing } = require('./funcoes/space-lines.js')
const { editUser } = require('./funcoes/interacao-api.js')
const { creatingUser } = require('./funcoes/criando-user.js')
const { paying, getLoan, transfering, depositing, widrawing, showingBalance, getContacts } = require('./funcoes/operacoes.js')
const { saudacao, divisoria, getLogo } = require('./funcoes/decorativos.js')

async function getData() {   //Função de Resgate de Dados em API
    try {
        const resposta = await axios.get("http://localhost:3000/users")

        listaDeUsuarios = await resposta.data

        return listaDeUsuarios
    }
    catch (error) {
        console.log(error)
    }
}

async function getBills() {   //Função de Resgate de Dados em API
    try {
        const resposta = await axios.get("http://localhost:3000/bills")

        listaDeContas = await resposta.data

        return listaDeContas
    }
    catch (error) {
        console.log(error)
    }
}

function getLogin(listaDeUsuarios) {    // Função de Login

    getLogo()
    fourSpacing()
    console.log("          Digite seu CPF para acessar...")
    console.log()
    let cpf = prompt("          ")

    return usuario = listaDeUsuarios.find((user) => user.cpf === cpf);
}

function mainMenu() {   // Função do Menu Inicial

    console.clear()
    getLogo()

    fourSpacing()
    console.log("          Bem Vindo " + chalk.black.bgRgb(220,120,42)(` ${usuario.nome} ${usuario.sobrenome} `))
    twoSpacing()

    twoSpacing()
    console.log("          Escolha a opção da operação:")
    twoSpacing()
    console.log("          1 - Depósito")
    console.log("          2 - Saque")
    console.log("          3 - Saldo")
    console.log("          4 - Transferências")
    console.log("          5 - Empréstimo")
    console.log("          6 - Pagamento")
    console.log("          7 - Atendimento")
    console.log("          8 - Sair")
    twoSpacing()

    return opcao = prompt("          ")
}

function menuRouter(opcao) {   // Função de Roteamento do Menu
    if (opcao === "1") {
        return console.clear(),depositing(usuario)
    }

    if (opcao === "2") {
        return console.clear(),widrawing(usuario)
    }

    if (opcao === "3") {
        return console.clear(),showingBalance(usuario)
    }

    if (opcao === "4") {
        return console.clear(),transfering(usuario, listaDeUsuarios)
    }

    if (opcao === "5") {
        return console.clear(),getLoan(usuario)
    }

    if (opcao === "6") {
        return console.clear(),paying(usuario, listaDeContas)
    }

    if (opcao === "7") {
        return console.clear(),getContacts()
    }
}

function returning(opcao) {   // Função de Retorno ao Menu

    if (opcao === "8") {
        return sair = true,
        console.clear()

    } else {
        twoSpacing()
        console.log("          O que você deseja fazer agora?")
        console.log()
        console.log("          1 - Retornar ao Menu Principal")
        console.log("          2 - Sair")
        twoSpacing()
        const retorno = prompt("          ")

        if (retorno === "2") {
            return sair = true,
            console.clear()
        }
    }
}

function app() {   // Aplicação

    console.clear()

    divisoria()

    console.log(chalk.whiteBright("            Bem vindo ao"))

    saudacao()

    divisoria()

    console.log(chalk.whiteBright("          Já é nosso cliente?"))
    console.log()
    console.log(chalk.whiteBright("          Digite “sim” ou “não” para continuar"))
    console.log()
    const confirmacao = prompt("          ")

    if (confirmacao !== "sim") {
        creatingUser()
    }

    setTimeout(() => {
        twoSpacing()
        console.log("          aguarde.")
    }, 500)

    setTimeout(() => {
        console.log("          aguarde..")
    }, 1000)

    setTimeout(() => {
        console.log("          aguarde...")
    }, 1500)

    setTimeout(() => {
        console.clear()
    }, 2000)
    
    getData()

    getBills()

    setTimeout(() => {   // Delay para carregar dados da API

        if (listaDeUsuarios) {
            getLogin(listaDeUsuarios)
        }

        while (!usuario) {

            console.clear()
            getLogo()

            fourSpacing()
            console.log("          Usuário não encontrado... ")
            twoSpacing()

            getLogin(listaDeUsuarios)

        }

        while (!sair) {

            mainMenu()

            menuRouter(opcao)

            returning(opcao)
        }

        return usuario

    }, 2500)

    setTimeout(() => {

        editUser(usuario)

    }, 3000)

}

app()