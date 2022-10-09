const display = document.querySelector(".display");
const btnCl = document.querySelector("#btn-cl");
const btnsOperand = document.querySelectorAll(".btn-operand");
const btnsOperator = document.querySelectorAll(".btn-operator");

// +++ add EventListeners to all buttons +++
for (btn of btnsOperand) btn.addEventListener("click", (e) => {
  display.innerText = display.innerText.concat(e.target.dataset.id);
});

//calls function based on name of dataset.id
for (btn of btnsOperator) btn.addEventListener("click", window[btn.dataset.id]);

//clear Display and create new Calculation. Either save the last one (if result could be determined) or overwrite, if not
btnCl.addEventListener("click", () => {
  clearDisplay();
  calculationHistory[calculationHistory.length - 1].result === undefined ? calculationHistory[calculationHistory.length - 1] = new Calculation() : calculationHistory.push(new Calculation);
});

//Calculation class for all calculations, including historic calculations for chained calculations
function Calculation(firstOperand, secondOperand, operation, result, finished) {
  this.firstOperand = firstOperand,
    this.secondOperand = secondOperand,
    this.operation = operation,
    this.result = result,
    this.finished = finished,

    function operate(operator, firstOperand, secondOperand) {
      if (!(numberIsValid(firstOperand) && numberIsValid(secondOperand))) return NaN;
      switch (operator) {
        case add: return add(firstOperand, secondOperand);
        case subtract: return subtract(firstOperand, secondOperand);
        case multiply: return multiply(firstOperand, secondOperand);
        case divide: return divide(firstOperand, secondOperand);
        default: break;
      }
    }
};

function add(a, b) { return a + b };
function subtract(a, b) { return a - b };
function multiply(a, b) { return a * b; };
function divide(a, b) { return a / b };
function equals() { }

let calculationHistory = [];
calculationHistory.push(new Calculation());



/*btnAdd.addEventListener("click",)
<btnSubtract.addEventListener("click",)
btnMultiply.addEventListener("click",)
btnDivide.addEventListener("clcik",)
btnEquals.addEventListener("click",)
*/


function clearDisplay() { display.innerText = ""; }
function numberIsValid(num) { return parseFloat(num).toString() === num }