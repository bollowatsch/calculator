const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".btn-number");

let displayContent = 0, firstOperand, secondOperand;


for (btn of buttons) btn.addEventListener("click", (e) => {
  displayContent = parseFloat(displayContent.toString().concat(e.target.dataset.id));
  updateDisplay();
});

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

function updateDisplay() { display.innerText = displayContent; }