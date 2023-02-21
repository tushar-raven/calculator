const numberBtn = document.querySelectorAll("button")
const displayCurrent = document.querySelector(".display-current")
const displayLast = document.querySelector(".display-last")

// to access them globally
let newNumber = '';
let currentNumber = '';
let operator = '';
let results;
let a;
let b = '';

for(let i = 0; i < numberBtn.length; i++){
    numberBtn[i].addEventListener('click', function(e){
        display(e)
    });
}

// to not let the display minimize
displayCurrent.textContent = '\u00a0';
displayLast.textContent = '\u00a0';

function display(e){

    let button = e.target.id;

    if(button == "delete"){
        location.reload()

    } else if (button == "+" || button == "-" || button == "÷" || button == "×"){
        
        if (operator == ""){
            operator = e.target.id;
            console.log(operator);
            displayCurrent.textContent += newNumber + operator;
            currentNumber += newNumber + operator;

        } else {

            if (!b){
                operator = e.target.id
                x = results
                console.log(x);
                results = operate(operator,x,currentNumber)
                console.log(results)
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

            } else {
                results = operate(operator,a,b)
                operator = e.target.id
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
        }
        console.log(b)

    } else if(button == "="){
        
        if (!b){
            displayCurrent.textContent = a;
            displayLast.textContent = '\u00a0';
        } else {
        results = operate(operator,a,b)
        displayLast.textContent = a + operator + b + button;
        displayCurrent.textContent = results;
        }
        currentNumber = '';

    } else { // case for all the numbers

        newNumber = e.target.id;
        currentNumber += newNumber;
        displayCurrent.textContent = currentNumber;
        if (!operator){
            a = currentNumber;
        } else {
            b = currentNumber.slice(a.length + 1) // +1 for removing operator for the string
            console.log(b)
        }
        newNumber = ''
        console.log(currentNumber)
        console.log(operator)
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

// Single Operator Function
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

