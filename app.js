const display = document.querySelector(".display");
const btnCl = document.querySelector("#btn-cl");
const btnsOperand = document.querySelectorAll(".btn-operand");
const btnsOperator = document.querySelectorAll(".btn-operator");
const btnEquals = document.querySelector("#btn-equals");

//Calculation class for all calculations, including historic calculations for chained calculations
function Calculation(firstOperand, secondOperand, operator, result, finished) {
  this.firstOperand = firstOperand,
    this.secondOperand = secondOperand,
    this.operator = operator,
    this.result = result,

    this.operate = function () {
      if (!(numberIsValid(this.firstOperand) && numberIsValid(this.secondOperand))) return NaN;
      this.result = window[this.operator](this.firstOperand, this.secondOperand);
      console.table(calculationHistory.at(-1));
    }
};

// +++ add EventListeners to all buttons +++
//change innerText of display, only store, when operator is pressed
for (btn of btnsOperand) btn.addEventListener("click", (e) => {
  if (e.target.dataset.id === "." && display.innerText.includes(".")) return;
  display.innerText = display.innerText.concat(e.target.dataset.id);
});

//calls function based on name of dataset.id
//Array.at(-1) returns last element of array
for (btn of btnsOperator) btn.addEventListener("click", (e) => {
  let currentCalc = calculationHistory.at(-1);
  // unsupported cases 
  if (display.innerText === "" || currentCalc.firstOperand !== undefined && currentCalc.secondOperand !== undefined) return;

  //regular case: single calculation -- save number & operator, clear display
  else if (currentCalc.firstOperand === undefined && currentCalc.secondOperand === undefined) {
    calculationHistory.at(-1).firstOperand = parseFloat(display.innerText);
    calculationHistory.at(-1).operator = e.target.dataset.id;
    display.innerText = "";
  } //regular case: chained calculation -- save number & calculate result. use result for next operation and save operator, clear display
  else if (currentCalc.firstOperand !== undefined && currentCalc.secondOperand === undefined) {
    calculationHistory.at(-1).secondOperand = parseFloat(display.innerText);
    calculationHistory.at(-1).operate;
    calculationHistory.push(new Calculation(calculationHistory.at(-1).result, undefined, e.target.dataset.id));
    display.innerText = "";
  }
})

btnEquals.addEventListener("click", () => {
  calculationHistory.at(-1).secondOperand = parseFloat(display.innerText);
  calculationHistory.at(-1).operate();
  display.innerText = calculationHistory.at(-1).result;
  calculationHistory.push(new Calculation);
})

//clear Display and create new Calculation. Either save the last one (if result could be determined) or overwrite, if not
btnCl.addEventListener("click", () => {
  display.innerText = "";
  calculationHistory[calculationHistory.length - 1].result === undefined ? calculationHistory[calculationHistory.length - 1] = new Calculation() : calculationHistory.push(new Calculation);
});

function add(a, b) { return a + b };
function subtract(a, b) { return a - b };
function multiply(a, b) { return a * b; };
function divide(a, b) { return b === 0 ? "error" : a / b }

let calculationHistory = [];
calculationHistory.push(new Calculation());

function numberIsValid(num) { return parseFloat(num.toString()) === num }