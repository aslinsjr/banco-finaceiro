const { twoSpacing, fourSpacing } = require('./space-lines.js')
const { editUser, payingBill } = require('./interacao-api.js')
const { getLogo, divisoriaNBG, getTitle } = require('./decorativos.js')

const chalk = require('chalk')
var prompt = require('prompt-sync')();
var qrcode = require('qrcode-terminal');

function getRegister(usuario, transacao, valor) {   // Função de Registro de Tranzações
    
    const date = new Date()
    const minutes = date.getMinutes()
    const hours = date.getHours()
    const day = date.getDate()
    const month = date.getMonth() + 1;
    const year = date.getFullYear()

    const novoRegistro = {
        transacao: transacao,
        hora: `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}`,
        data: `${day < 10 ? "0" + day : day}/${month < 10 ? "0" + month : month}/${year}`,
        valor: valor
    }
    
    if(transacao !== "Transferência") {
    divisoriaNBG()
    twoSpacing()
    console.log("          Você realizou um " + chalk.black.bgRgb(220,120,42)(` ${transacao} `) + " no valor de " + "R$ " + chalk.black.bgRgb(220,120,42)(` ${valor} `))
    twoSpacing()
    divisoriaNBG()
    } else {
        console.log("")
    }

    return usuario.transacoes.push(novoRegistro)
}

function depositing(usuario) {   // Função de Deposito
    
    console.log("          "+ chalk.black.bgRgb(220,120,42)(` Depósito `))
    twoSpacing()
    console.log("          Indique o valor a ser depositado em Reais")
    console.log("          ex. 1000.00")
    twoSpacing()
    const deposito = prompt("          ")
    
    console.clear()
    getLogo()
    
    fourSpacing()
    console.log("          Você confirma o valor R$ " + chalk.black.bgRgb(220,120,42)(` ${deposito} `))
    console.log()
    console.log("          Digite “sim” ou “não” para continuar")
    console.log()
    const confirmacao = prompt("          ")

    if (confirmacao === "sim") {
        return usuario.saldo = (+usuario.saldo) + (+deposito), getRegister(usuario, "Depósito", +deposito)
    }
}

function widrawing(usuario) {   // Função de Saque
    
    console.log("          "+ chalk.black.bgRgb(220,120,42)(` Saque `))
    twoSpacing()
    console.log("          Indique o valor a ser sacado em Reais")
    console.log("          ex. 500.00")
    twoSpacing()
    const saque = prompt("          ")
    
    console.clear()
    getLogo()

    fourSpacing()
    console.log("          Você confirma o valor R$ " + chalk.black.bgRgb(220,120,42)(` ${saque} `))
    console.log()
    console.log("          Digite “sim” ou “não” para continuar")
    console.log()
    const confirmacao = prompt("          ")

    if (confirmacao === "sim" && saque < usuario.saldo) {
        return usuario.saldo = (+usuario.saldo) - (+saque), getRegister(usuario, "Saque", +saque)
    }

    if (saque > usuario.saldo) {
        return (
            console.clear(),
            getLogo(),
            fourSpacing(),
            console.log("          Saldo " + chalk.black.bgRed(` insuficiente... `)),
            console.log(),
            console.log(),

            getLoan(usuario)
        )
    }
}

function showingBalance(usuario) {   // Função de Consulta do Saldo
    getLogo()
    fourSpacing()
    console.log("          "+ chalk.black.bgRgb(220,120,42)(` Saldo `))
    twoSpacing()
    console.log("          " + usuario.nome + " , o valor total em sua conta é R$ " + chalk.black.bgRgb(220,120,42)(` ${usuario.saldo} `))
    twoSpacing()
}

function transfering(usuario, listaDeUsuarios) {   // Função de Transferência
    
    console.log("          "+ chalk.black.bgRgb(220,120,42)(` Transferência `))
    twoSpacing()
    console.log("          Indique o valor a ser transferido em Reais")
    console.log("          ex. 100.00")
    twoSpacing()
    const transferencia = prompt("          ")
    
    console.clear()
    getLogo()

    fourSpacing()
    console.log("          Informe o cpf do títular da conta a ser transferido o valor")
    fourSpacing()
    const cpfRecebedor = prompt("          ")

    usuarioRecebedor = listaDeUsuarios.find((user) => user.cpf === cpfRecebedor);

    if (usuarioRecebedor) {
        console.clear()
        getLogo()

        fourSpacing()
        console.log("          Você confirma a transferência de R$ " + chalk.black.bgRgb(220,120,42)(` ${transferencia} `) + " para " + chalk.rgb(220,120,42)(` ${usuarioRecebedor.nome} `) + " " + chalk.rgb(220,120,42)(` ${usuarioRecebedor.sobrenome} `))
        console.log()
        console.log("          Digite “sim” ou “não” para continuar")
        console.log()
        const confirmacao = prompt("          ")


        if (confirmacao === "sim" && transferencia < usuario.saldo) {

            usuarioRecebedor.saldo = (+usuarioRecebedor.saldo) + (+transferencia)
            getRegister(usuarioRecebedor, "Transferência", +transferencia)

            setTimeout(() => {
                editUser(usuarioRecebedor)
            }, 3000)

            return usuario.saldo = (+usuario.saldo) - (+transferencia), getRegister(usuario, "Transferência", +transferencia),
            divisoriaNBG(),twoSpacing(),
            console.log("          Você realizou uma transferência no valor de R$ " + chalk.black.bgRgb(220,120,42)(` ${transferencia} `) + " para " + chalk.black.bgRgb(220,120,42)(` ${usuarioRecebedor.nome} ${usuarioRecebedor.sobrenome} `)),
            twoSpacing(),divisoriaNBG()
        }

        if (transferencia > usuario.saldo) {
            return (
                console.clear(),
                getLogo(),
                console.log(),
                console.log(),
                console.log(),
                console.log(),
                console.log("          Saldo" + chalk.black.bgRed(` insuficiente... `)),
                console.log(),
                console.log(),

                getLoan(usuario)
            )
        }
    } else {
        console.clear()
        getLogo()
        
        fourSpacing()
        console.log("          Usuário " + chalk.black.bgRed(` não `) +" encontrado... ")
        twoSpacing()
    }
}

function getLoan(usuario) {   // Função de Empréstimo

    console.log("          Deseja contratar um empréstimo?")
    twoSpacing()
    console.log("          Digite “sim” ou “não” para continuar")
    console.log()
    const confirmacao = prompt("          ")

    if (confirmacao === "sim" && usuario.idade >= 18) {
        console.clear()
        getLogo()

        fourSpacing()
        console.log("          Insira o valor que você gostaria de receber")
        console.log()
        const emprestimo = prompt("          ")
        
        console.clear()
        getLogo()

        fourSpacing()
        console.log("          Você confirma a solicitação de emprestimo de R$ " + chalk.black.bgRgb(220,120,42)(` ${emprestimo} `))
        console.log()
        console.log("          Digite “sim” ou “não” para continuar")
        console.log()
        const confirmacao = prompt("          ")

        if (confirmacao === "sim" && usuario.transacoes.length >= 3 && emprestimo < 10*(usuario.transacoes[usuario.transacoes.length - 1].valor + usuario.transacoes[usuario.transacoes.length - 2].valor + usuario.transacoes[usuario.transacoes.length - 3].valor)) {
            return usuario.saldo = (+usuario.saldo) + (+emprestimo), getRegister(usuario, "Empréstimo", +emprestimo)
        } else {
            console.clear()
            getLogo()
            fourSpacing()
            console.log("          Valor " + chalk.bgRed(" não liberado ") + " procure seu gerente...")
        }

    } 
    
    if (usuario.idade < 18){
        console.clear()
        getLogo()

        fourSpacing()
        console.log("          Você precisa ter " + chalk.bgRed(' maior idade ') + " para pedir emprestimos :(")
        twoSpacing()
    }

    if (confirmacao !== "sim") {
        return
    }

}

function paying(usuario, listaDeContas) { // Função de Pagamento
    
    console.log("          "+ chalk.black.bgRgb(220,120,42)(` Pagamento `))
    twoSpacing()
    console.log("          Indique o código de barras do boleto para pagamento")
    console.log("          ex. 0 123456 654321")
    twoSpacing()
    const codigo = prompt("          ")

    conta = listaDeContas.find((conta) => conta.codigo === codigo);

    if (conta && conta.pago == false) {
        console.clear()
        getLogo()

        fourSpacing()
        console.log("          Você confirma o pagamento de R$ " + chalk.black.bgRgb(220,120,42)(` ${conta.valor} `) + " para " + chalk.black.bgRgb(220,120,42)(` ${conta.cobrador} `))
        console.log()
        console.log("          Digite “sim” ou “não” para continuar")
        console.log()
        const confirmacao = prompt("          ")

        if (confirmacao === "sim" && conta.valor < usuario.saldo) {

            setTimeout(() => {
                payingBill(conta)
            }, 3000)

            return usuario.saldo = (+usuario.saldo) - (conta.valor), getRegister(usuario, "Pagamento", conta.valor)
        }

        if (conta.valor > usuario.saldo) {
            return (
                console.clear(),
                getLogo(),
                fourSpacing(),
                console.log("          Saldo " + chalk.black.bgRed(` insuficiente... `)),
                console.log(),
                console.log(),

                getLoan(usuario)
            )
        }
    } else {
        console.clear()
        getLogo()

        fourSpacing()
        console.log("          Código de barras " +  chalk.black.bgRed(' não ') + " disponivel para pagamentos... ")
        twoSpacing()
    }

}

function getPaid(usuario) {   // Função de Cobrança

    getLogo()
    fourSpacing()
    console.log("          " + chalk.black.bgRgb(220,120,42)(` ${usuario.nome} `) + " você deseja gerar um PIX de cobrança?")
    console.log()
    console.log("          Digite “sim” ou “não” para continuar")
    console.log()
    const confirmacao = prompt("          ")

    if (confirmacao === "sim") {
        return console.clear(), getLogo(), twoSpacing(), qrcode.generate("00020126330014br.gov.bcb.pix0111083415694695204000053039865802BR5925Alexandre Silva Lins Juni6009Sao Paulo62070503***63042A39", {small: true}, function(qrcode) {
            console.log(qrcode)
        })
    }
   
}

function financing() {   // Função de Financiamento

    let maxVal;
    let minVal;
    let item;
    let juros

    console.log("          " + chalk.black.bgRgb(220, 120, 42)(` Financiamento `))
    twoSpacing()
    console.log('          Escolha o tipo de financiamento:')
    twoSpacing()
    console.log('          1 - Imóveis' + chalk.rgb(220, 120, 42)(" 0,87% a.m"))
    console.log('          2 - Automóveis' + chalk.rgb(220, 120, 42)(" 1,72% a.m"))
    twoSpacing()
    let tipoFinanciamento = prompt('          ')

    while (tipoFinanciamento !== "1" && tipoFinanciamento !== "2") {
        console.clear()
        getLogo()
        fourSpacing()
        console.log("          Opção " + chalk.bgRed(` inválida! `))
        twoSpacing()
        console.log('          Escolha o tipo de financiamento:')
        twoSpacing()
        console.log('          1 - Imóveis' + chalk.rgb(220, 120, 42)(" 0,87% a.m"))
        console.log('          2 - Automóveis' + chalk.rgb(220, 120, 42)(" 1,72% a.m"))
        twoSpacing()
        tipoFinanciamento = prompt('          ')
    }

    if (tipoFinanciamento === "1") {
        item = 'imóvel';
        maxVal = 1000000; // Valor máximo de financiamento para imóveis
        minVal = 200000
        juros = 0.87
    }

    if (tipoFinanciamento === "2") {
        item = 'automóvel';
        maxVal = 500000; // Valor máximo de financiamento para automóveis
        minVal = 15000
        juros = 1,72

    }

    console.clear()
    getLogo()
    fourSpacing()
    console.log("          " + chalk.black.bgRgb(220, 120, 42)(` ${item.replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase())} `))
    twoSpacing()
    console.log(`          Qual o valor do ${item}? ` + chalk.rgb(247, 196, 101)(`(Mínimo: R$ ${minVal} / Máximo: R$ ${maxVal})`));
    twoSpacing()
    let valor = parseFloat(prompt('          Valor: '));

    while (isNaN(valor) || valor > maxVal || valor < minVal) {
        console.clear()
        getLogo()
        fourSpacing()
        console.log("          Valor " + chalk.black.bgRed(` inválido... `))
        twoSpacing()
        console.log(`          Qual o valor do ${item}? ` + chalk.rgb(247, 196, 101)(`(Mínimo: R$ ${minVal} / Máximo: R$ ${maxVal})`));
        twoSpacing()
        valor = parseFloat(prompt('          Valor: '));
    }

    console.clear()
    getLogo()
    fourSpacing()
    console.log("          " + chalk.black.bgRgb(220, 120, 42)(` ${item.replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase())} `))
    twoSpacing()
    console.log('          Informe o valor da entrada:');
    console.log()
    let entrada = parseFloat(prompt('          Entrada: '));

    while (isNaN(entrada) || entrada <= 0 || entrada >= valor) {
        console.clear()
        getLogo()
        fourSpacing()
        console.log("          " + chalk.black.bgRgb(220, 120, 42)(` ${item.replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase())} `))
        twoSpacing()
        console.log("          Valor " + chalk.black.bgRed(` inválido... `))
        twoSpacing()
        console.log('          Informe o valor da entrada:');
        console.log()
        entrada = parseFloat(prompt('          Entrada: '));
    }

    const valorFinanciado = valor - entrada;

    console.clear()
    getLogo()
    fourSpacing()
    console.log("          " + chalk.black.bgRgb(220, 120, 42)(` ${item.replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase())} `))
    twoSpacing()
    console.log('          Em quantos meses deseja pagar?');
    console.log()
    let meses = parseInt(prompt('          Meses: '));

    while (isNaN(meses) || meses <= 0) {
        console.clear()
        getLogo()
        fourSpacing()
        console.log("          " + chalk.black.bgRgb(220, 120, 42)(` ${item.replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase())} `))
        twoSpacing()
        console.log("          Valor " + chalk.black.bgRed(` inválido... `))
        twoSpacing()
        console.log('          Em quantos meses deseja pagar?');
        console.log()
        meses = parseInt(prompt('          Meses: '));
    }

    const parcelaMensal = (valorFinanciado + (((juros * meses) / 100) * valorFinanciado)) / meses;

    console.clear()
    getLogo()
    fourSpacing()
    console.log("          " + chalk.black.bgRgb(220, 120, 42)(` ${item.replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase())} `))
    twoSpacing()
    console.log("          O valor financiado é " + chalk.rgb(220, 120, 42)(`R$ ${valorFinanciado.toFixed(2)} `))
    console.log()
    console.log("          A parcela mensal será de " + chalk.rgb(220, 120, 42)(`R$ ${parcelaMensal.toFixed(2)} `))
    console.log()
    console.log("          Pagamento em " + chalk.rgb(220, 120, 42)(` ${meses} `) + " meses.")
    twoSpacing()
    console.log("          Digite “sim” ou “não” para confirmar o financiamento")
    console.log()
    const confirmacao = prompt('          ');

    if (confirmacao === "sim") {
        console.clear()
        getLogo()
        fourSpacing()
        console.log('          Financiamento realizado com ' + chalk.black.bgRgb(220, 120, 42)( " sucesso! "))
        console.log()
        console.log("          Você receberá um e-mail com todas as informações...")
    } else {
        console.clear()
        getLogo()
        fourSpacing()
        console.log('          Financiamento ' + chalk.bgRed( " cancelado! "))
    }
    
}

function getContacts() {   // Função de Contatos
    getTitle()
    twoSpacing()
    console.log("          Site: https://aslinsjr.github.io/banco2.0/ ")
    console.log()
    console.log("          Whatsapp: 81 92002-6963")
    console.log()
    console.log("          Telefone: 0800 800 0008")
    console.log()
}

module.exports = { paying, getLoan, transfering, depositing, widrawing, showingBalance, getContacts, getPaid, financing }