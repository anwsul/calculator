let buttons = document.querySelectorAll("button");
let fieldArea = document.querySelector("input"); 

let operand1 = 0;
let operand2 = 0;
let operator = null;

buttons.forEach(button => {
  button.onclick = function () {
    if (button.id == "clear") {
      temp = fieldArea.value;
      fieldArea.value = temp.slice(0, -1);
    } else if (button.id == "all-clear") {
      fieldArea.value = "";
    } else {
      fieldArea.value += button.textContent;
    }
  } 
});

