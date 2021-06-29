let valueToDisplay = [];
let valueToOperate = [];
console.log(valueToDisplay)
const currentDisplayValue = document.querySelector(".js-currentValue");

function addGlobalEventListener(type, selector, callback) {
    document.addEventListener(type, (e) => {
        if (e.target.matches(selector)) callback(e);
    })
}

addGlobalEventListener("click", ".js-number", function(e) {
    valueToDisplay.push(e.target.textContent);
    valueToOperate.push(e.target.textContent);
    currentDisplayValue.textContent = valueToDisplay.join("");
    console.log(valueToDisplay);
    }
)

addGlobalEventListener("click", ".js-allClear", function() {
    valueToDisplay = [];
    console.log(valueToDisplay);
    currentDisplayValue.textContent = "";
    }
)

addGlobalEventListener("click", ".js-operator", function(e) {
    if(currentDisplayValue.textContent.includes(e.target.textContent, valueToDisplay.length - 1)) {return;}

    if(e.target.name === "equals") {
        console.log(valueToOperate)
        const isOperator = valueToOperate.findIndex(operator => isNaN(operator))
        let left = [];
        let right = [];
        for(let i = 0; i < isOperator; i++) {
            left.push(parseInt(valueToOperate[i]))
        }
        for(let i = isOperator; i < valueToOperate.length; i++) {
            if (isNaN(valueToOperate[i])) continue;
            right.push(parseInt(valueToOperate[i]))
        }
        
        console.log(left.join(""))
        console.log(right)
        let result = operate(valueToOperate[isOperator], Number (left.join("")), Number (right.join("")))
        currentDisplayValue.textContent = result;
        return console.log(result)
    }
    // When you press equal, then check all the numbers before the operator, and all the numbers after the operator
    // will use findIndex to start from that value to now create a new array for left and a new one for right

    console.log(e.target.name)
    valueToDisplay.push(e.target.textContent);
    valueToOperate.push(e.target.name);
    currentDisplayValue.textContent = valueToDisplay.join("");

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

