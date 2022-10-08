const display = document.querySelector(".display");
const btnCl = document.querySelector("#btn-cl");
const buttons = document.querySelectorAll(".btn-number");

let firstOperand, secondOperand;


for (btn of buttons) btn.addEventListener("click", (e) => {
  display.innerText = display.innerText.concat(e.target.dataset.id);
});

btnCl.addEventListener("click", clearDisplay);
/*btnAdd.addEventListener("click",)
<btnSubtract.addEventListener("click",)
btnMultiply.addEventListener("click",)
btnDivide.addEventListener("clcik",)
btnEquals.addEventListener("click",)
*/
function add(a, b) { return a + b };
function subtract(a, b) { return a - b };
function multiply(a, b) { return a * b; };
function divide(a, b) { return a / b };

function operate(operator, a, b) {
  switch (operator) {
    case add: return add(a, b);
    case subtract: return subtract(a, b);
    case multiply: return multiply(a, b);
    case divide: return divide(a, b);
    default: break;
  }
}

function clearDisplay() { display.innerText = ""; }
function numberIsValid(num) { return parseFloat(num).toString() === num }