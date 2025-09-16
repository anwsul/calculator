let buttons = document.querySelectorAll("button");
let display = document.querySelector("input"); 

let operand1 = "";
let operand2 = "";
let operator = null;

const operations = {
	"+": add,
	"-": subtract,
	"x": multiply,
	"/": divide,
	"%": modulo,
}

buttons.forEach(button => {
	button.onclick = () => handleInput(button);
});


function handleInput(button) {
	let val = button.textContent;

	if (button.id == "clear") {
		if (operand2 != "") {
			operand2 = operand2.slice(0, -1);
		} else if (operator != null) {
			operator = null;
		} else {
			operand1 = operand1.slice(0, -1);
		}
	} else if (button.id == "all-clear") {
		operand1 = "";
		operand2 = "";
		operator = null; 
	} else if (val in operations && operand1 && operand2){
		operate(operator, operand1, operand2);
		operator = val;
	} else if (val in operations && operand1) {
		operator = val;
	} else if (val == "=" && operand1 && operand2 && operator) {
		operate(operator, operand1, operand2);
		operator = null;
	} else if (!operator && isValidNumber(operand1, val)) {
		operand1 += val;
	} else if (operator && isValidNumber(operand2, val)) {
		operand2 += val;
	}

	updateDisplay();
}


function updateDisplay(value) {
	if (value) {
		display.value = value;
	} else {
		display.value = operand1 + " " + (operator || "") + " " +  operand2;
	}

	display.scrollLeft = display.scrollWidth;
}


function add(operand1, operand2) {
	return operand1 + operand2;
}


function subtract(operand1, operand2) {
	return operand1 - operand2;
}


function multiply(operand1, operand2) {
	return operand1 * operand2;
}


function divide(operand1, operand2) {
	if (operand2 != 0)
		return operand1 / operand2;
	if (operand1 < 0)
		return -Infinity;

	return Infinity;
}


function modulo(operand1, operand2) {
	return operand1 % operand2;
}


function operate(optor, op1, op2) {
	operand1 = operations[optor](Number(op1), Number(op2));
	operand2 = "";
	updateDisplay();
}


function isValidNumber(currentState, newToken) {
	if (currentState == "" && newToken == "-"){
		return true;
	} else if(newToken >= "0" && newToken <= "9") {
		return true;
	} else if (newToken == "." && currentState.split(".").length - 1 == 0) {
		return true;
	}
 
	return false;
}
