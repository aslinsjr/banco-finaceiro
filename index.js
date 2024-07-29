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
const { postingUser } = require('./funcoes/interacao-api.js')
const { paying, getLoan, transfering, depositing, widrawing, showingBalance, getContacts, getPaid, financing } = require('./funcoes/operacoes.js')
const { saudacao, divisoria, getLogo } = require('./funcoes/decorativos.js')

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

    while (!cpf || cpf.replace(/[A-z]/g, "").length !== 11) {

        console.clear()
        getLogo()

        fourSpacing()
        console.log("          " + chalk.bgRgb(207, 22, 29)(" dado necessário ") + " para continuar...")
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
        console.log("          " + chalk.bgRgb(207, 22, 29)(" dado necessário ") + " para continuar...")
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
        console.log("          " + chalk.bgRgb(207, 22, 29)(" dado necessário ") + " para continuar...")
        textInput("Informe seu sobrenome")
        sobrenome = prompt("          ")
    }

    console.clear()
    getLogo()

    fourSpacing()
    textInput("Informe sua idade")
    let idade = parseInt(prompt("          "))

    while (!idade || typeof idade !== "number") {

        console.clear()
        getLogo()

        fourSpacing()
        console.log("          " + chalk.bgRgb(207, 22, 29)(" dado necessário ") + " para continuar...")
        textInput("Informe sua idade")
        idade = parseInt(prompt("          "))
    }

    console.clear()
    getLogo()

    fourSpacing()
    textInput("Informe um e-mail para contato")
    let email = prompt("          ")

    while (!email) {

        console.clear()
        getLogo()

        fourSpacing()
        console.log("          " + chalk.bgRgb(207, 22, 29)(" dado necessário ") + " para continuar...")
        textInput("Informe um e-mail válido")
        email = prompt("          ")
    }

    console.clear()
    getLogo()

    fourSpacing()
    textInput("Informe uma senha de acesso com 4 dígitos")
    let senha = prompt("          ", { echo: '*' })

    while (!senha || senha.length !== 4) {

        console.clear()
        getLogo()

        fourSpacing()
        console.log("          " + chalk.bgRgb(207, 22, 29)(" dado necessário ") + " para continuar...")
        textInput("Informe uma senha válida")
        senha = prompt("          ", { echo: '*' })
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
        cpf,
        email,
        senha
    }, postingUser(usuario)
}

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

    usuario = listaDeUsuarios.find((user) => user.cpf === cpf);

    while (!usuario) {

        console.clear()
        getLogo()

        fourSpacing()
        console.log("          Usuário " + chalk.bgRgb(207, 22, 29)(" não encontrado ") + " digite seu CPF para acessar... ")
        console.log()
        let cpf = prompt("          ")

        usuario = listaDeUsuarios.find((user) => user.cpf === cpf);
    }

    console.clear()
    getLogo()
    fourSpacing()
    console.log("          Digite sua senha de acesso...")
    console.log()
    let senha = prompt("          ", { echo: '*' })

    if (usuario.senha === senha) {
        return usuario
    }

    while (usuario.senha !== senha) {
        console.clear()
        getLogo()
        fourSpacing()
        console.log("          Senha " + chalk.bgRed(' incorreta ') + ' , tente novamente...')
        console.log()
        senha = prompt("          ", { echo: '*' })
    }
}

function mainMenu() {   // Função do Menu Inicial

    console.clear()
    getLogo()

    fourSpacing()
    console.log("          Bem Vindo " + chalk.black.bgRgb(220, 120, 42)(` ${usuario.nome} ${usuario.sobrenome} `))
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
    console.log("          7 - Cobrança")
    console.log("          8 - Financiamento")
    console.log("          9 - Atendimento")
    console.log("          0 - Sair")
    twoSpacing()

    return opcao = prompt("          ")
}

function menuRouter(opcao) {   // Função de Roteamento do Menu
    if (opcao === "1") {
        return console.clear(), getLogo(),
            fourSpacing(), depositing(usuario)
    }

    if (opcao === "2") {
        return console.clear(), getLogo(),
            fourSpacing(), widrawing(usuario)
    }

    if (opcao === "3") {
        return console.clear(), showingBalance(usuario)
    }

    if (opcao === "4") {
        return console.clear(),
            getLogo(), fourSpacing(), transfering(usuario, listaDeUsuarios)
    }

    if (opcao === "5") {
        return console.clear(), getLogo(),
            fourSpacing(), getLoan(usuario)
    }

    if (opcao === "6") {
        return console.clear(), getLogo(),
            fourSpacing(), paying(usuario, listaDeContas)
    }

    if (opcao === "7") {
        return console.clear(), getPaid(usuario)
    }

    if (opcao === "8") {
        return console.clear(),
            getLogo(), fourSpacing(), financing()
    }

    if (opcao === "9") {
        return console.clear(), getContacts()
    }
}

function returning(opcao) {   // Função de Retorno ao Menu

    if (opcao === "0") {
        return sair = true,
            console.clear()

    } else {
        twoSpacing()
        console.log("          O que você deseja fazer agora?")
        console.log()
        console.log("          1 - Retornar ao " + chalk.rgb(220, 120, 42)(' Menu Principal '))
        console.log("          2 - " + chalk.red('Sair'))
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