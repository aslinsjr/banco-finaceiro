const { twoSpacing, fourSpacing } = require('./space-lines.js')
const { editUser, payingBill } = require('./interacao-api.js')
const { getLogo, divisoriaNBG } = require('./decorativos.js')

var prompt = require('prompt-sync')();

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
    console.log("          Você realizou um(a) " + transacao + " no valor de " + "R$ " + valor)
    twoSpacing()
    divisoriaNBG()
    } else {
        console.log("")
    }

    return usuario.transacoes.push(novoRegistro)
}

function depositing(usuario) {   // Função de Deposito
    getLogo()
    fourSpacing()
    console.log("          Depósito")
    twoSpacing()
    console.log("          Indique o valor a ser depositado em Reais")
    console.log("          ex. 1000.00")
    twoSpacing()
    const deposito = prompt("          ")
    
    console.clear()
    getLogo()
    
    fourSpacing()
    console.log("          Você confirma o valor R$ " + deposito)
    console.log()
    console.log("          Digite “sim” ou “não” para continuar")
    console.log()
    const confirmacao = prompt("          ")

    if (confirmacao === "sim") {
        return usuario.saldo = (+usuario.saldo) + (+deposito), getRegister(usuario, "Depósito", +deposito)
    }
}

function widrawing(usuario) {   // Função de Saque
    getLogo()
    fourSpacing()
    console.log("          Saque")
    twoSpacing()
    console.log("          Indique o valor a ser sacado em Reais")
    console.log("          ex. 500.00")
    twoSpacing()
    const saque = prompt("          ")
    
    console.clear()
    getLogo()

    fourSpacing()
    console.log("          Você confirma o valor R$ " + saque)
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
            console.log(),
            console.log(),
            console.log(),
            console.log(),
            console.log("          Saldo insuficiente..."),
            console.log(),
            console.log(),

            getLoan(usuario)
        )
    }
}

function showingBalance(usuario) {   // Função de Consulta do Saldo
    getLogo()
    fourSpacing()
    console.log("          Saldo")
    twoSpacing()
    console.log("          " + usuario.nome + ", o valor total em sua conta é R$ " + usuario.saldo)
    twoSpacing()
}

function transfering(usuario, listaDeUsuarios) {   // Função de Transferência
    getLogo()
    fourSpacing()
    console.log("          Transferência")
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
        console.log("          Você confirma a transferência de R$ " + transferencia + " para " + usuarioRecebedor.nome + " " + usuarioRecebedor.sobrenome)
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

            return usuario.saldo = (+usuario.saldo) - (+transferencia), getRegister(usuario, "Transferência", +transferencia)
        }

        if (transferencia > usuario.saldo) {
            return (
                console.clear(),
                getLogo(),
                console.log(),
                console.log(),
                console.log(),
                console.log(),
                console.log("          Saldo insuficiente..."),
                console.log(),
                console.log(),

                getLoan(usuario)
            )
        }
    } else {
        console.clear()
        getLogo()
        
        fourSpacing()
        console.log("          Usuário não encontrado... ")
        twoSpacing()
    }
}

function getLoan(usuario) {   // Função de Empréstimo
    getLogo()
    fourSpacing()
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
        console.log("          Você confirma a solicitação de emprestimo de R$ " + emprestimo)
        console.log()
        console.log("          Digite “sim” ou “não” para continuar")
        console.log()
        const confirmacao = prompt("          ")

        if (confirmacao === "sim") {
            return usuario.saldo = (+usuario.saldo) + (+emprestimo), getRegister(usuario, "Empréstimo", +emprestimo)
        }

    } else {
        console.clear()
        getLogo()

        fourSpacing()
        console.log("          Você precisa ter maior idade para pedir emprestimos :(")
        twoSpacing()
    }

}

function paying(usuario, listaDeContas) { // Função de Pagamento7
    getLogo()
    fourSpacing()
    console.log("          Pagamento")
    twoSpacing()
    console.log("          Indique o código de barras do boleto para pagamento")
    console.log("          ex. 0 123456 654321")
    twoSpacing()
    const codigo = prompt("          ")

    conta = listaDeContas.find((conta) => conta.codigo === codigo);

    if (conta) {
        console.clear()
        getLogo()

        fourSpacing()
        console.log("          Você confirma o pagamento de R$ " + conta.valor + " para " + conta.cobrador)
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
                console.log("          Saldo insuficiente..."),
                console.log(),
                console.log(),

                getLoan(usuario)
            )
        }
    } else {
        console.clear()
        getLogo()

        fourSpacing()
        console.log("          Código de barras não encontrado... ")
        twoSpacing()
    }

}

function getContacts() {   // Função de Contatos
    getLogo()
    fourSpacing()
    console.log("          Nossos Contatos")
    twoSpacing()
    console.log("          Site: www.bancog.com ")
    console.log()
    console.log("          Whatsapp: 11 99999-9999")
    console.log()
    console.log("          Telefone: 0800 800 0008")
    console.log()
}

module.exports = { paying, getLoan, transfering, depositing, widrawing, showingBalance, getContacts }