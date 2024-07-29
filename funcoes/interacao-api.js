const axios = require('axios');

async function postingUser(usuario) {   //Função de Criação de Usuários
    try {
        await axios.post("http://localhost:3000/users", {
            nome: usuario.nome,
            sobrenome: usuario.sobrenome,
            idade: usuario.idade,
            cpf: usuario.cpf,
            email: usuario.email,
            senha: usuario.senha,
            saldo: 0,
            transacoes: []
        })
    }
    catch (error) {
        console.error(error);
    }
}

async function editUser(usuario) {   //Função de Edição de Usuários
    try {
        await axios.patch(`http://localhost:3000/users/${usuario.id}`, {
            nome: usuario.nome,
            sobrenome: usuario.sobrenome,
            idade: usuario.idade,
            saldo: usuario.saldo,
            transacoes: usuario.transacoes
        })
    }
    catch (error) {
        console.error(error);
    }
}

async function payingBill(conta) {   //Função de Edição de Usuários
    try {
        await axios.patch(`http://localhost:3000/bills/${conta.id}`, {
           pago: true
        })
    }
    catch (error) {
        console.error(error);
    }
}

module.exports = { editUser, postingUser, payingBill }