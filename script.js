const calculate = {
    displayValue: '0',
    firstNumber: null,
    waitingForSecondNumber: false,
    operator: null,
};

function inputDigit(digit) {

    const displayValue = calculate.displayValue;
    const waitingForSecondNumber = calculate.waitingForSecondNumber;

    if (waitingForSecondNumber === true) {
        calculate.displayValue = digit;
        calculate.waitingForSecondNumber = false;
    } else {
        calculate.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }

}

function inputDecimal(dot) {

    if (calculate.waitingForSecondNumber === true) {
        calculate.displayValue = "0."
        calculate.waitingForSecondNumber = false;
        return
    }

    if (!calculate.displayValue.includes(dot)) {
        calculate.displayValue += dot;
    }
}

function handleOperator(nextOperator) {

    const firstNumber = calculate.firstNumber;
    const displayValue = calculate.displayValue;
    const operator = calculate.operator;

    const inputValue = parseFloat(displayValue);

    if (operator && calculate.waitingForSecondNumber) {
        calculate.operator = nextOperator;
        return;
    }

    if (firstNumber == null && !isNaN(inputValue)) {
        calculate.firstNumber = inputValue;
    } else if (operator) {
        const result = operate(firstNumber, inputValue, operator);

        calculate.displayValue = `${parseFloat(result.toFixed(7))}`;
        calculate.firstNumber = result;
    }

    calculate.waitingForSecondNumber = true;
    calculate.operator = nextOperator;
}

function operate(firstNumber, secondNumber, operator) {
    if (operator === '+') {
        return add(firstNumber, secondNumber);
    } else if (operator === '-') {
        return subtract(firstNumber, secondNumber);
    } else if (operator === '*') {
        return multiply(firstNumber, secondNumber);
    } else if (operator === '/') {
        return divide(firstNumber, secondNumber);
    }
    return secondNumber;
}

//////////////
function add(firstNumber, secondNumber) {
    let result = firstNumber + secondNumber;
    return result;
}

function subtract(firstNumber, secondNumber) {
    let result = firstNumber - secondNumber;
    return result;
}

function multiply(firstNumber, secondNumber) {
    let result = firstNumber * secondNumber;
    return result;
}

function divide(firstNumber, secondNumber) {

    if (secondNumber === 0) {
        error.textContent = "You can't divide number by 0 !"
        error.style.color = "red"
    }

    let result = firstNumber / secondNumber;
    return result;
}

/////////

function resetCalculator() {
    calculate.displayValue = '0';
    calculate.firstNumber = null;
    calculate.waitingForSecondNumber = false;
    calculate.operator = null;
    error.textContent = ""
}

function backSpace() {
    

  calculate.displayValue = document.querySelector('.calculator-screen').value.slice(0, - 1) ;
  updateDisplay();
  
}

/////
function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculate.displayValue;
}

updateDisplay();

const keys = document.querySelector('.calculator-keys');

keys.addEventListener('click', event => {

    const target = event.target;
    const value = target.value;

    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(value);
            break;
        case '.':
            inputDecimal(value);
            break;
        case 'all-clear':
            resetCalculator();
            break;
            case 'BackSpace':
                 backSpace();
                break;
        default:
            if (Number.isInteger(parseFloat(value))) {
                inputDigit(value);
            }
    }

    updateDisplay();
});


/////keyboard support///////

const keubourdInput = document.getElementById("screen");

document.addEventListener('keydown',(event)=>{

    if(event.key === '='){

        let result =  eval(keubourdInput.value);
        keubourdInput.value = parseFloat(result.toFixed(7));

     }
     else if(event.key === 'Backspace'){

        keubourdInput.value = keubourdInput.value.slice(0, - 1);
     }
    else{
    keubourdInput.value += event.key;
    
    }

})

 //keubourdInput.value = Math.round(result*100)/100;
// keubourdInput.value = eval(keubourdInput.value);