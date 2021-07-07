let valueToDisplay = [];
let valueToOperate = [];
let result = 0;

const currentDisplayValue = document.querySelector(".js-currentValue");
const resultDisplayValue = document.querySelector(".js-resultValue")

addGlobalEventListener("click", ".js-delete", () => console.log(`Value= ${valueToDisplay}`))

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
    // prevents starting with a division, multiplication or sum sign
    if (valueToOperate.length >= 0 && e.target.name != "substract" && e.target.name != "point") {
        if (isNaN(valueToOperate[valueToOperate.length - 1])) { return console.log("hel;lo")}
    }

    // prevents adding two consecutive substract signs
    if (valueToOperate[valueToOperate.length - 1] === "substract" && e.target.name === "substract") { return console.log("bro") }

    // prevents adding two consecutive points
    if (e.target.name === "point") {
        if(valueToOperate[valueToOperate.length - 1] === "point") { return console.log("dory") }
    }

    // prevents adding a second point before/after the operator sign
    if (valueToOperate.includes("point") && e.target.name === "point") {
        if (valueToOperate.includes("add") || valueToOperate.includes("substract") ||
            valueToOperate.includes("multiply") || valueToOperate.includes("divide")) {
                let dog = valueToOperate.filter(element => element === "point");

                let indexOfOperator = valueToOperate.findIndex(element => {
                    return isNaN(element) && element != "point";
                })

                if (valueToOperate.includes("point") && valueToOperate.indexOf("point", indexOfOperator) > 0) { return console.log("there is a point")}
                else if(dog.length > 1) { return console.log(dog.length) }
                else {
                    valueToDisplay.push(e.target.textContent);
                    valueToOperate.push(e.target.name);
                    currentDisplayValue.textContent = valueToDisplay.join("");
                    return
                }
        }
        else { return console.log("thats it") } 
    }

    // returns the result by calling resultValue()
    if (e.target.name === "equals") {
        if(valueToOperate.length === 0) return;
        return resultValue();
    };







    // there should only be two susbtracts, one can be the for the first operand and one for the second one
    if (e.target.name === "substract" && valueToOperate.indexOf("substract", 1) > 0 && e.target.name != "point") {
        // CHECK HERE!
        resultValue()
                valueToOperate.push("substract")
                valueToDisplay.push("-")
                currentDisplayValue.textContent = valueToDisplay.join("");
                console.log(valueToOperate)
        return console.log("substract already") 
    }

    // prevents adding more operators if there is already one 
    if ((valueToOperate.includes("add") || valueToOperate.includes("multiply") || valueToOperate.includes("divide"))
        && e.target.name != "point") {
            let indexOfOperator = valueToOperate.findIndex((element, index) => {
                return isNaN(element) && element != "point" && index > 0;
            })
            let numberAfterOperator = valueToOperate.some((element, index) => {
                return !isNaN(element) && index > indexOfOperator;
            })

            // CHECK HERE!
            if (e.target.name === "substract" && numberAfterOperator) {
                resultValue()
                valueToOperate.push("substract")
                valueToDisplay.push("-")
                currentDisplayValue.textContent = valueToDisplay.join("");
                console.log(valueToOperate)
                return console.log("nemo")
            }

            else if (e.target.name === "substract") {
                valueToDisplay.push(e.target.textContent);
                valueToOperate.push(e.target.name);
                currentDisplayValue.textContent = valueToDisplay.join("");
                return
            }
            else if (e.target.name === "add" && numberAfterOperator) {
                resultValue()
                valueToOperate.push("add")
                valueToDisplay.push("+")
                currentDisplayValue.textContent = valueToDisplay.join("");
                console.log(valueToOperate)
                return console.log("nemo")
            }
            else { return console.log("no more operators") }
    }

    let indexOfOperators = valueToOperate.findIndex((element, index) => {
        return isNaN(element) && element != "point" && index > 0;
    })
    let numberAfterOperators = valueToOperate.some((element, index) => {
        return !isNaN(element) && index > indexOfOperators;
    })
    if (e.target.name === "add" && numberAfterOperators) {
        resultValue()
        valueToOperate.push("add")
        valueToDisplay.push("+")
        currentDisplayValue.textContent = valueToDisplay.join("");
        console.log(valueToOperate)
        return console.log("nemo")
    }









    valueToDisplay.push(e.target.textContent);
    valueToOperate.push(e.target.name);
    currentDisplayValue.textContent = valueToDisplay.join("");
    console.log(valueToOperate.length)
    console.log(valueToOperate)  
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
    const isOperator = valueToOperate.findIndex((operator, index) => {
                        return isNaN(operator) && operator != "point" && index > 0;
    })
    let leftOperand = [];
    let rightOperand = [];

    for(let i = 0; i < isOperator; i++) {
        if (valueToOperate[i] === "substract") { leftOperand.push("-") }
        else if (valueToOperate[i] === "point") { leftOperand.push(".") }
        else if (typeof valueToOperate[i] === "number") { leftOperand.push(valueToOperate[i]) }
        else { leftOperand.push(parseInt(valueToOperate[i])) }
    }
    for(let i = isOperator + 1; i < valueToOperate.length; i++) {
        if (valueToOperate[i] === "substract") { rightOperand.push("-") }
        else if (valueToOperate[i] === "point") { rightOperand.push(".") }
        else { rightOperand.push(parseInt(valueToOperate[i])) }
    }
    console.log(`the left operand is: ${leftOperand}`)
    console.log(`the right operand is: ${rightOperand}`)
    result = operate(valueToOperate[isOperator], Number (leftOperand.join("")), Number (rightOperand.join("")));
    resultDisplayValue.textContent = result;
    valueToDisplay = [result];
    valueToOperate = [result];
    return console.log(valueToOperate)
}