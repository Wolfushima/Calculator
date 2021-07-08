let valueToDisplay = [];
let valueToOperate = [];
let result = 0;
let equalsFlag = 0;
const currentDisplayValue = document.querySelector(".js-currentValue");
const resultDisplayValue = document.querySelector(".js-resultValue")

addGlobalEventListener("click", ".js-delete", () => {
    /*          --- CHECK ---           */
    if (resultDisplayValue.textContent != "0") {
        resultDisplayValue.textContent = "0";
    }
    valueToDisplay.pop();
    valueToOperate.pop();
    currentDisplayValue.textContent = valueToDisplay.join("");
    return
})

function addGlobalEventListener(type, selector, callback) {
    document.addEventListener(type, (e) => {
        if (e.target.matches(selector)) callback(e);
    })
}

addGlobalEventListener("click", ".js-number", function(e) {
    /*          --- CHECK ---           */
    if (equalsFlag != 0 && indexOperator() === -1) {
        valueToDisplay = [];
        valueToOperate = [];
        result = 0;
        equalsFlag = 0;
    }
    valueToDisplay.push(Number (e.target.textContent));
    valueToOperate.push(Number (e.target.textContent));
    currentDisplayValue.textContent = valueToDisplay.join("");
    }
)

addGlobalEventListener("click", ".js-allClear", function() {
    result = 0;
    equalsFlag = 0;
    valueToDisplay = [];
    valueToOperate = [];
    currentDisplayValue.textContent = "";
    resultDisplayValue.textContent = "0";
    }
)

addGlobalEventListener("click", ".js-operator", function(e) {
    // prevents starting with a division, multiplication or sum sign, or adding more operators at the end if there is
    // already one that is not a substract sign or point sign
    if (valueToOperate.length >= 0 && e.target.name != "substract" &&
        e.target.name != "point" && isNaN(valueToOperate[valueToOperate.length - 1])) {
        return console.log("Need number/point/- first, can't add two consecutive operators")
    }

    /*          --- substract functions ---         */
    if (e.target.name === "substract") {
        // prevents adding two consecutive substract signs
        if (valueToOperate[valueToOperate.length - 1] === "substract" ||
            valueToOperate[valueToOperate.length - 1] === "point") { return console.log("no consecutive substracts/.") }
        
        // IF THE LAST VALUE OF VALUE TO OPERATE IS ADD, REPLACE IT WITH SUBSTRACT
        if (valueToOperate[valueToOperate.length - 1] === "add") {
            valueToOperate.splice(valueToOperate.length - 1, 1, "substract");
            valueToDisplay.splice(valueToOperate.length - 1, 1, "-");
            currentDisplayValue.textContent = valueToDisplay.join("");
            return;
        }

        // there should only be two susbtracts, one can be the for the first operand and one for the second one
        if (valueToOperate.indexOf("substract", 1) > 0) {
            // CHECK HERE!
            updateResultValue()
                    valueToOperate.push("substract")
                    valueToDisplay.push("-")
                    currentDisplayValue.textContent = valueToDisplay.join("");
                    console.log(valueToOperate)
            return console.log("substract already") 
        }
    }

    
    /*          --- point functions ---         */
    if (e.target.name === "point") {
        // prevents adding two consecutive points
        if (valueToOperate[valueToOperate.length - 1] === "point") { return console.log("no consecutive points") }

        if (valueToOperate.includes("point")) {
            if (indexOperator() === -1) { return console.log("!!!no more points when there is only one value") }
            if (valueToOperate.indexOf("point", indexOperator()) > 0) { return console.log("there is a point") }
            else { return updateOperatorValue(e); }
        }
    }


    /*          --- equal functions ---         */
    // returns the result by calling resultValue()
    if (e.target.name === "equals") {
        if(valueToOperate.length === 0) { return }
        // returns if there is only one value to operate
        if (indexOperator() === -1) { return }
        updateResultValue();
        equalsFlag = 1;
        return 
    };
    

    // prevents adding more operators if there is already one 
    if ((valueToOperate.includes("add") || valueToOperate.includes("multiply") || valueToOperate.includes("divide") ||
        valueToOperate.includes("substract")) && e.target.name != "point") {
            let numberAfterOperator = valueToOperate.some((number, index) => {
                if (indexOperator() === -1) { return false }
                else return !isNaN(number) && index > indexOperator();
            })

            // CHECK HERE!
            if (e.target.name === "substract" && numberAfterOperator) {
                updateResultValue()
                valueToOperate.push("substract")
                valueToDisplay.push("-")
                currentDisplayValue.textContent = valueToDisplay.join("");
                console.log(valueToOperate)
                return console.log("nemo")
            }

            if (e.target.name === "add" && numberAfterOperator) {
                updateResultValue()
                valueToOperate.push("add")
                valueToDisplay.push("+")
                currentDisplayValue.textContent = valueToDisplay.join("");
                console.log(valueToOperate)
                return console.log("nemo")
            }

            if (e.target.name === "multiply" && numberAfterOperator) {
                updateResultValue()
                valueToOperate.push("multiply")
                valueToDisplay.push("x")
                currentDisplayValue.textContent = valueToDisplay.join("");
                console.log(valueToOperate)
                return console.log("nemo")
            }

            if (e.target.name === "divide" && numberAfterOperator) {
                updateResultValue()
                valueToOperate.push("divide")
                valueToDisplay.push("÷")
                currentDisplayValue.textContent = valueToDisplay.join("");
                console.log(valueToOperate)
                return console.log("nemo")
            }

            if(indexOperator() > 0 && e.target.name != "substract") { return console.log("no more operators") }
    }

    return updateOperatorValue(e);
    console.log(valueToOperate)  
    }
)

/*          --- operator functions ---          */
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

/*          --- result functions ---            */

function updateResultValue() {
    let leftOperand = [];
    let rightOperand = [];

    for(let i = 0; i < indexOperator(); i++) {
        if (valueToOperate[i] === "substract") { leftOperand.push("-") }
        else if (valueToOperate[i] === "point") { leftOperand.push(".") }
        else if (typeof valueToOperate[i] === "number") { leftOperand.push(valueToOperate[i]) }
        else { leftOperand.push(parseInt(valueToOperate[i])) }
    }
    for(let i = indexOperator() + 1; i < valueToOperate.length; i++) {
        if (valueToOperate[i] === "substract") { rightOperand.push("-") }
        else if (valueToOperate[i] === "point") { rightOperand.push(".") }
        else { rightOperand.push(parseInt(valueToOperate[i])) }
    }
    console.log(`the left operand is: ${leftOperand}`)
    console.log(`the right operand is: ${rightOperand}`)
    result = operate(valueToOperate[indexOperator()], Number (leftOperand.join("")), Number (rightOperand.join("")));
    resultDisplayValue.textContent = result;
    valueToDisplay = [result];
    valueToOperate = [result];
    return console.log(valueToOperate)
}

function updateOperatorValue(e) {
    valueToDisplay.push(e.target.textContent);
    valueToOperate.push(e.target.name);
    currentDisplayValue.textContent = valueToDisplay.join("");
}


/*          --- etc ---         */
function indexOperator() {
    let index = valueToOperate.findIndex((operator, index) => {
        return isNaN(operator) && operator != "point" && index > 0;
    })
    return index;
}