let valueToDisplay = [];
let valueToOperate = [];
let result = 0;
const currentDisplayValue = document.querySelector(".js-currentValue");
const resultDisplayValue = document.querySelector(".js-resultValue")

function addGlobalEventListener(type, selector, callback) {
    document.addEventListener(type, (e) => {
        if (e.target.matches(selector)) callback(e);
    })
}

addGlobalEventListener("click", ".js-number", function(e) {
    valueToDisplay.push(Number (e.target.textContent));
    valueToOperate.push(Number (e.target.textContent));
    currentDisplayValue.textContent = valueToDisplay.join("");
    }
)

addGlobalEventListener("click", ".js-allClear", function() {
    valueToDisplay = [];
    valueToOperate = [];
    currentDisplayValue.textContent = "";
    resultDisplayValue.textContent = "0";
    }
)

addGlobalEventListener("click", ".js-operator", function(e) {
    if(currentDisplayValue.textContent.includes(e.target.textContent, valueToDisplay.length - 1)) return;
    if(e.target.name === "equals") {
        if(valueToOperate.length === 0) return;
        return resultValue();
    }
    console.log(e.target.name)
    valueToDisplay.push(e.target.textContent);
    valueToOperate.push(e.target.name);
    currentDisplayValue.textContent = valueToDisplay.join("");
    }
)

/* --- operator functions --- */
function add(...operand) {
    console.log(operand.reduce((total, currentValue) => total + currentValue))
    return operand.reduce((total, currentValue) => total + currentValue)
}

function substract(...operand) {
    return operand.reduce((total, currentValue) => total - currentValue)
}

function multiply(...operand) {
    return operand.reduce((total, currentValue) => total * currentValue)
}

function divide(...operand) {
    return operand.reduce((total, currentValue) => total / currentValue)
}

function operate(operator, ...operand) {
    if(operator === "add") { return add(...operand) }
    if(operator === "substract") { return substract(...operand) }
    if(operator === "multiply") { return multiply(...operand) }
    if(operator === "divide") { return divide(...operand) }
}

/* --- result functions --- */

function resultValue() {
    const isOperator = valueToOperate.findIndex(operator => isNaN(operator) && operator != "point");
    let leftOperand = [];
    let rightOperand = [];
    for(let i = 0; i < isOperator; i++) {
        if (valueToOperate[i] === "point") { leftOperand.push(".") }
        else { leftOperand.push(parseInt(valueToOperate[i])) }
    }
    for(let i = isOperator; i < valueToOperate.length; i++) {
        if (isNaN(valueToOperate[i]) && valueToOperate[i] != "point") continue;
        if (valueToOperate[i] === "point") { rightOperand.push(".") }
        else { rightOperand.push(parseInt(valueToOperate[i])) }
    }
    result = operate(valueToOperate[isOperator], Number (leftOperand.join("")), Number (rightOperand.join("")));
    resultDisplayValue.textContent = result;
    valueToDisplay = [result];
    valueToOperate = [result];
    return
}