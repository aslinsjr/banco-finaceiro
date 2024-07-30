const prompt = require('prompt-sync')()
const chalk = require('chalk')
var qrcode = require('qrcode-terminal');
const axios = require('axios')

const { getLogo, getTitle } = require('./funcoes/decorativos.js')
const { fourSpacing, twoSpacing } = require('./funcoes/space-lines.js')

console.log("O input abaixo está escondido")
let teste = prompt.hide ("")