const display = document.querySelector(".display");
const btnCl = document.querySelector("#btn-cl");
const btnsNumber = document.querySelectorAll(".btn-number");
const btnsOperator = document.querySelectorAll(".btn-operator");

function Calculation(firstOperand, secondOperand, operation, result) {
  this.firstOperand = firstOperand,
    this.secondOperand = secondOperand,
    this.operation = operation,
    this.result = result
};

let calculationHistory = [];
calculationHistory.push(new Calculation());


for (btn of btnsNumber) btn.addEventListener("click", (e) => {
  display.innerText = display.innerText.concat(e.target.dataset.id);
});

for (btn of btnsOperator) btn.addEventListener("click", (e) => {
  display.innerText = display.innerText.concat(e.target.dataset.id);
});

//clear Display and create new Calculation. Either save the last one (if result could be determined) or overwrite, if not
btnCl.addEventListener("click", () => {
  clearDisplay();
  calculationHistory[calculationHistory.length - 1].result === undefined ? calculationHistory[calculationHistory.length - 1] = new Calculation() : calculationHistory.push(new Calculation);
});
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
  if (!(numberIsValid(a) && numberIsValid(b))) return NaN;
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