let displayValue = [];
let operationToOperate = [];
console.log(displayValue)
const currentValue = document.querySelector(".js-currentValue");

function addGlobalEventListener(type, selector, callback) {
    document.addEventListener(type, (e) => {
        if (e.target.matches(selector)) callback(e);
    })
}

addGlobalEventListener("click", ".js-number", function(e) {
    displayValue.push(e.target.textContent);
    operationToOperate.push(e.target.textContent);
    currentValue.textContent = displayValue.join("");
    console.log(displayValue);
    }
)

addGlobalEventListener("click", ".js-allClear", function() {
    displayValue = [];
    console.log(displayValue);
    currentValue.textContent = "";
    }
)

addGlobalEventListener("click", ".js-operator", function(e) {
    if(currentValue.textContent.includes(e.target.textContent, displayValue.length - 1)) {return;}

    if(e.target.name === "equals") {
        console.log(operationToOperate)
        const isOperator = operationToOperate.findIndex(operator => isNaN(operator))
        let left = [];
        let right = [];
        for(let i = 0; i < isOperator; i++) {
            left.push(parseInt(operationToOperate[i]))
        }
        for(let i = isOperator; i < operationToOperate.length; i++) {
            if (isNaN(operationToOperate[i])) continue;
            right.push(parseInt(operationToOperate[i]))
        }
        
        console.log(left.join(""))
        console.log(right)
        let result = operate(operationToOperate[isOperator], Number (left.join("")), Number (right.join("")))
        currentValue.textContent = result;
        return console.log(result)
    }
    // When you press equal, then check all the numbers before the operator, and all the numbers after the operator
    // will use findIndex to start from that value to now create a new array for left and a new one for right

    console.log(e.target.name)
    displayValue.push(e.target.textContent);
    operationToOperate.push(e.target.name);
    currentValue.textContent = displayValue.join("");

    }
)

// addGlobalEventListener("click", ".js-operator", function(e) {
//     if((displayValue.includes(e.target.textContent, displayValue.length + 1))) { 
//         return;
//     }
//     else {
//     console.log(e.target.name)
//     displayValue.push(e.target.textContent);
//     currentValue.textContent = displayValue.join("");
//     }
//     }
// )

/* --- operator functions --- */
function add(...operand) {
    //console.log(operand.reduce((total, currentValue) => total += currentValue))
    return operand.reduce((total, currentValue) => total + currentValue)
}

function substract(...operand) {
    //console.log(operand.reduce((total, currentValue) => total - currentValue))
    return operand.reduce((total, currentValue) => total - currentValue)
}

function multiply(...operand) {
    //console.log(operand.reduce((total, currentValue) => total * currentValue))
    return operand.reduce((total, currentValue) => total * currentValue)
}

function divide(...operand) {
    //console.log(operand.reduce((total, currentValue) => total / currentValue))
    return operand.reduce((total, currentValue) => total / currentValue)
}

function operate(operator, ...operand) {
    if(operator === "add") { return add(...operand) }
    if(operator === "substract") { return substract(...operand) }
    if(operator === "multiply") { return multiply(...operand) }
    if(operator === "divide") { return divide(...operand) }
}