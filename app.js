const display = document.querySelector(".display");
const btnCl = document.querySelector("#btn-cl");
const btnsOperand = document.querySelectorAll(".btn-operand");
const btnsOperator = document.querySelectorAll(".btn-operator");

// +++ add EventListeners to all buttons +++
//change innerText of display, only store, when operator is pressed
for (btn of btnsOperand) btn.addEventListener("click", (e) => {
  if (e.target.dataset.id === "." && display.innerText.includes(".")) return;
  display.innerText = display.innerText.concat(e.target.dataset.id);
});

//calls function based on name of dataset.id
//Array.at(-1) returns last element of array
for (btn of btnsOperator) btn.addEventListener("click", () => {
  if (calculationHistory.at(-1).firstOperand === undefined) return;
  if (calculationHistory.at(-1).secondOperand === undefined) {
    calculationHistory.at(-1).firstOperand = display.innerText;
    calculationHistory.at(-1).operator = btn.dataset.id;
    return;
  };



  window[btn.dataset.id]();
})

//clear Display and create new Calculation. Either save the last one (if result could be determined) or overwrite, if not
btnCl.addEventListener("click", () => {
  clearDisplay();
  calculationHistory[calculationHistory.length - 1].result === undefined ? calculationHistory[calculationHistory.length - 1] = new Calculation() : calculationHistory.push(new Calculation);
});

//Calculation class for all calculations, including historic calculations for chained calculations
function Calculation(firstOperand, secondOperand, operator, result, finished) {
  this.firstOperand = firstOperand,
    this.secondOperand = secondOperand,
    this.operator = operator,
    this.result = result,
    this.finished = finished,

    this.operate = function () {
      if (!(numberIsValid(this.firstOperand) && numberIsValid(this.secondOperand))) return NaN;
      switch (this.operator) {
        case 'add': this.result = add(this.firstOperand, this.secondOperand);
        case 'subtract': this.result = subtract(this.firstOperand, this.secondOperand);
        case 'multiply': this.result = multiply(this.firstOperand, this.secondOperand);
        case 'divide': this.result = divide(this.firstOperand, this.secondOperand);
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