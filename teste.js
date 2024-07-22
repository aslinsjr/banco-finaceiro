var prompt = require('prompt-sync')();

//celsius-fahrenheit

let celsius;
let fahrenheit;
let opcao;

function celsiusToFahrenheit(celsius,fahrenheit) {
    return fahrenheit = (celsius * 1.8) + 32
}

function fahrenheitToCelsius(celsius, fahrenheit) {
   return celsius =(fahrenheit - 32) / 1.8
}

function mainMenu() {
    console.log('Bem vindo ao conversor de temperaturas!');
    console.log('Escolha uma opção:');
    console.log();
    console.log('1: Celsius para Fahrenheit');
    console.log('2: Fahrenheit para Celsius');
    console.log('3: Sair');
    
    return opcao = prompt(' ');

}

mainMenu();

while (opcao != 3) {
    if (opcao == 1){
        celsius = prompt('Digite o valor em grau celsius: ');
        console.log(celsiusToFahrenheit(celsius,fahrenheit).toFixed(2));
        console.log();
        console.log('Você deseja continuar na calculadora?\n\nS:Sim\nN:Não');
       let opcaoCalc = prompt(' ')
       if (opcaoCalc == 'S') {
        mainMenu()
       } else{
           break
       }
    }
    
    if (opcao == 2){
        celsius = prompt('Digite o valor em grau fahrenheit: ');
        console.log(fahrenheitToCelsius(fahrenheit,celsius).toFixed(2));

        console.log('Você deseja continuar na calculadora?\nS:Sim\nN:Não');
        let opcaoCalc = prompt(' ')
        if (opcaoCalc == 'S') {
         mainMenu()
        } else{
            break
        }
    }
    
}
