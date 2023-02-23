// For DOM manipulation
const buttons = document.querySelectorAll("button");
const displayCurrent = document.querySelector(".display-current");
const displayLast = document.querySelector(".display-last");

// For displaying content
let currentValue = '';
let lastValue = '';
displayCurrent.textContent = currentValue;
displayLast.textContent = lastValue;

//To access globally
let operator = "";
let lastValueWithOp = "";


// Add an event listener to all button
buttons.forEach((button) =>
    button.addEventListener("click",(e) => display(e)
));

// to run different function according to different buttons
function display(e){

    let button = e.target.id

    if (button == "clear") {
        location.reload()

    } else if (button == "delete") {
        deleteDigits()

    } else if (button == "+" || button == "-" || button == "÷" || button == "×") {

        //if-else for not allowing operator on blank screen or if operator is already present
        if(!lastValue){ 
            handleOperator(e.target.textContent)
            displayLast.textContent = lastValueWithOp;
            displayCurrent.textContent = currentValue;
        }

    } else if (button == "=") {

        // if-else for not allowing "=" when there is no value to operate
        if(currentValue != '0' && lastValue != '0'){
            calculate()

            displayLast.textContent = '';
            if(lastValue.length <= 10){
                displayCurrent.textContent = lastValue;
            } else {
                displayCurrent.textContent = lastValue.slice(0,12) + "..."
            }
            lastValue = ''
            lastValueWithOp = ''
        }

    } else if(button == ".") {
        addDecimal()
        displayCurrent.textContent = currentValue;

    }  else { // case for all the numbers
        handleNumber(button);
        displayCurrent.textContent = currentValue;
    }
}

// Handle numbers button
function handleNumber(number) {

    if(currentValue.length <= 15) { //To limit the numbers on screen
    currentValue += number;
    }
}

//Handle operators button
function handleOperator(op){
    operator = op;
    lastValue = currentValue;
    currentValue = '';
    console.log(lastValue)
    lastValueWithOp = lastValue + operator.toString();
    console.log(lastValueWithOp)
}

function calculate() {

    lastValue = operate(operator,lastValue,currentValue);

    if(Boolean(lastValue - Math.floor(lastValue))){ //check for decimal
        lastValue = lastValue.toFixed(5)           //make sure that decimal are not more than 10 to avoid screen overfill
    } else{
        lastValue = lastValue
    }

    lastValue = lastValue.toString()
    currentValue = lastValue;
}

function addDecimal(){
    if(!currentValue.includes('.')){
        currentValue = currentValue + ".";
    }
}

function deleteDigits() {

    //if-else cases for different clearing different cases

    if(currentValue != '' && lastValue != ''){
        currentValue = currentValue.slice(0, currentValue.length-1);
        //lastValue = lastValue.slice(0, lastValue.length-1);
        displayCurrent.textContent = currentValue;
        console.log("x")

    } else if(lastValueWithOp.includes("+")||lastValueWithOp.includes("-")||lastValueWithOp.includes("×")||lastValueWithOp.includes("÷")){
        operator = ''
        displayLast.textContent = lastValue;
        lastValueWithOp = lastValue;
        console.log("x")

    } else if(lastValueWithOp = lastValue){
        lastValue = lastValue.slice(0, lastValue.length-1);
        displayLast.textContent = lastValue;
        console.log("x")

    }else {
        currentValue = currentValue.slice(0, currentValue.length-1);
        lastValue = lastValue.slice(0, lastValue.length-1);
        displayCurrent.textContent = currentValue;
        console.log("x")
    }

}

// Individual Operator Functions
// Number() function to avoid concatenation
function add(a,b){
    return (Number(a) + Number(b)) 
}                                 
function subtract(a,b){
    return (Number(a) - Number(b));
}
function multiply(a,b){
    return (Number(a) * Number(b));
}
function divide(a,b){
    return (Number(a)/Number(b));
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