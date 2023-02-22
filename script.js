// For DOM manipulation
const numberBtn = document.querySelectorAll("button")
const displayCurrent = document.querySelector(".display-current")
const displayLast = document.querySelector(".display-last")

// Dummy content to not let the empty display minimize
displayCurrent.textContent = '\u00a0';
displayLast.textContent = '\u00a0';

// Access variables globally
let newNumber = '';
let currentNumber = '';
let operator = '';
let results;
let a;
let b = '';
let bCase = false;

// Select all button without individual ID or class
for(let i = 0; i < numberBtn.length; i++){
    numberBtn[i].addEventListener('click', function(e){
        display(e)
    });
}

// to show results
function display(e){

    let button = e.target.id; // Access any button through it's ID

    // if-else cases for operators, numbers, delete, and equal button

    if(button == "delete"){ // to start from scratch
        location.reload()

    } else if (button == "+" || button == "-" || button == "÷" || button == "×"){
        
        // if-else case for first/fresh operation and further operations

        if (operator == ""){
            firstOperation(e)

        } else {
                console.log(operator)
                results = operate(operator,a,b)
                operator = e.target.id
                furtherOperations()
        }

    } else if(button == "="){
        
        // If-else cases for pressing equal button without any second number
        if (!b){
            displayCurrent.textContent = a;
            displayLast.textContent = '\u00a0';

        } else {
            results = operate(operator,a,b)
            displayLast.textContent = a + operator + b + button;
            displayCurrent.textContent = results;
        }

        currentNumber = ''

    } else { // case for all the numbers

        newNumber = e.target.id;
        currentNumber += newNumber;
        displayCurrent.textContent = currentNumber;

        // a is only required for first operation
        if (!operator){
            a = currentNumber;
        } else {
            b = currentNumber.slice(a.length + 1) // +1 for removing operator for the string
        }
        newNumber = ''
    }
}

// To run the first or fresh operation

function firstOperation(e){
    operator = e.target.id;
    displayCurrent.textContent += newNumber + operator;
    currentNumber += newNumber + operator;
    console.log(operator)
}

// To run operations after the first operation
function furtherOperations() {
    displayCurrent.textContent = '\u00a0';
    displayLast.textContent = results + operator;
    currentNumber = ''
    a = results;

    if(operator == "+" || operator == "-"){
        b = 0;
    }
    else if (operator == "÷" || operator == "×"){
        b = 1;
    }
}

// Individual Operator Functions
function add(a,b){
    return (Number(a) + Number(b)) // to avoid concatenation
}

function subtract(a,b){
    return (a - b);
}

function multiply(a,b){
    return (a * b);
}

function divide(a,b){
    return (a/b);
}

// Single Operate Function
function operate(operator,a,b){

    if(operator == "+"){
        return add(a,b);
    } else if(operator == "-"){
        return subtract(a,b);
    } else if(operator == "×"){
        return multiply(a,b);
    } else if(operator == "÷"){
        return divide(a,b);
    }

}

