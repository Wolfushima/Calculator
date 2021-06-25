let displayValue = [];
console.log(displayValue)
const currentValue = document.querySelector(".js-currentValue");

function addGlobalEventListener(type, selector, callback) {
    document.addEventListener(type, (e) => {
        if (e.target.matches(selector)) callback(e);
    })
}

addGlobalEventListener("click", ".js-number", function(e) {
    displayValue.push(e.target.textContent)
    currentValue.textContent = displayValue.join("");
    console.log(displayValue)
    }
)

/* --- operator functions --- */
function add(...operand) {
    console.log(operand.reduce((total, currentValue) => total + currentValue))
}

function substract(...operand) {
    console.log(operand.reduce((total, currentValue) => total - currentValue))
}

function multiply(...operand) {
    console.log(operand.reduce((total, currentValue) => total * currentValue))
}

function divide(...operand) {
    console.log(operand.reduce((total, currentValue) => total / currentValue))
}

function operate(operator, ...operand) {
    if(operator === "add") { return add(...operand) }
    if(operator === "substract") { return substract(...operand) }
    if(operator === "multiply") { return multiply(...operand) }
    if(operator === "divide") { return divide(...operand) }
}
