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
add(1, 1)
substract(15, 5)
multiply(5, 5)
divide(10, 2)

operate("divide", 40, 4)