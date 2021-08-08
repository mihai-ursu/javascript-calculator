const screen = document.querySelector(".screen");

const resetBtn = document.querySelector(".reset-btn");
const deleteBtn = document.querySelector(".delete-btn");

// OPERATORS
const divideBtn = document.querySelector(".divide-btn");
const multiplyBtn = document.querySelector(".multiply-btn");
const subtractBtn = document.querySelector(".subtract-btn");
const addBtn = document.querySelector(".add-btn");

const equalsBtn = document.querySelector(".equals-btn");

//NUMBERS
const numberButtons = document.querySelectorAll(".btn");

let firstNumber = "0";
let secondNumber = "";
let haveOperator = false;
let operator = "";

const setScreenDisplay = (firstNumber, operator, secondNumber) => {
  if (operator === undefined && secondNumber === undefined) return firstNumber;
  if (secondNumber === undefined) return `${firstNumber} ${operator}`;
  return `${firstNumber} ${operator} ${secondNumber}`;
};

resetBtn.addEventListener("click", () => {
  if (firstNumber === "0") return;
  firstNumber = "0";
  secondNumber = "";
  operator = "";
  haveOperator = false;
  screen.innerHTML = firstNumber;
});

deleteBtn.addEventListener("click", () => {
  if (!haveOperator) {
    if (firstNumber === "0") return;
    if (firstNumber.length === 1) firstNumber = "0";
    if (firstNumber.length > 1) firstNumber = firstNumber.slice(0, -1);
    screen.innerHTML = setScreenDisplay(firstNumber, operator, secondNumber);
  }
  if (haveOperator) {
    if (secondNumber === "0") return;
    if (secondNumber.length === 1) secondNumber = "0";
    if (secondNumber.length > 1) secondNumber = secondNumber.slice(0, -1);
    screen.innerHTML = setScreenDisplay(firstNumber, operator, secondNumber);
  }
});

numberButtons.forEach((el, i) => {
  el.addEventListener("click", () => {
    if (!haveOperator) {
      firstNumber === "0" ? (firstNumber = `${i}`) : (firstNumber += `${i}`);
    }
    if (haveOperator) {
      secondNumber === "0" || secondNumber === ""
        ? (secondNumber = `${i}`)
        : (secondNumber += `${i}`);
    }
    screen.innerHTML = setScreenDisplay(firstNumber, operator, secondNumber);
  });
});

divideBtn.addEventListener("click", () => {
  operator = "/";
  haveOperator = true;
  screen.innerHTML = setScreenDisplay(firstNumber, operator);
});
multiplyBtn.addEventListener("click", () => {
  operator = "*";
  haveOperator = true;
  screen.innerHTML = setScreenDisplay(firstNumber, operator);
});
subtractBtn.addEventListener("click", () => {
  operator = "-";
  haveOperator = true;
  screen.innerHTML = setScreenDisplay(firstNumber, operator);
});
addBtn.addEventListener("click", () => {
  operator = "+";
  haveOperator = true;
  screen.innerHTML = setScreenDisplay(firstNumber, operator);
});

equalsBtn.addEventListener("click", () => {
  let result = "";
  if (operator === "" || secondNumber === "") return;
  if (operator === "/")
    result = `${parseFloat(firstNumber) / parseFloat(secondNumber)}`;
  if (operator === "*")
    result = `${parseFloat(firstNumber) * parseFloat(secondNumber)}`;
  if (operator === "+")
    result = `${parseFloat(firstNumber) + parseFloat(secondNumber)}`;
  if (operator === "-")
    result = `${parseFloat(firstNumber) - parseFloat(secondNumber)}`;
  isFinite(result) ? (firstNumber = result) : (firstNumber = "0");
  haveOperator = false;
  operator = "";
  secondNumber = "";
  screen.innerHTML = result;
});
