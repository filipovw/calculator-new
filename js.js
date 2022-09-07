let previousResults = document.querySelector(".results-previous");
let currentResults = document.querySelector(".results-new");
let numbers = document.querySelectorAll(".num");
let clear = document.querySelector(".ac");
let del = document.querySelector(".del");
let operators = document.querySelectorAll(".operator");
let equals = document.querySelector(".equals");
let input = document.querySelectorAll(".input");
let plusMinus = document.querySelector(".plus-minus");

let currentOperand = 0;
let previousOperand = "";
let operator = "";
let temp;
let result;
let key;

function calculator() {
  handleInput();
  updateDisplay();
}

function handleInput() {
  handleNumbers();
  handleOperators();
  handleClear();
  handleDel();
  handleEquals();
  handlePlusMinus();
}

function handleNumbers() {
  numbers.forEach(function (num) {
    num.addEventListener("click", function () {
      if (currentOperand == "0" && num.textContent == "0") {
        return;
      }

      if (currentOperand.toString().includes(".") && num.textContent == ".") {
        return;
      }

      if (currentOperand == "0" && num.textContent != 0) {
        currentOperand = "";
      }

      currentOperand += num.textContent;
      updateDisplay();
    });
  });
}

function handleOperators() {
  operators.forEach(function (op) {
    op.addEventListener("click", function () {
      if (currentOperand == ".") {
        return;
      }

      if (currentOperand == "" && operator && !result && previousOperand) {
        currentOperand = 0;
        operator = op.textContent;
        updateDisplay();
        return;
      }

      if (currentOperand == 0) {
        previousOperand = 0;
        operator = op.textContent;
        updateDisplay();
      }

      if (
        (previousOperand && operator && !currentOperand) ||
        currentOperand == "0"
      ) {
        if (
          (previousOperand &&
            previousOperand != "" &&
            operator &&
            operator != "" &&
            !currentOperand) ||
          (currentOperand == "" && !result && result != "")
        ) {
          operator = op.textContent;
          updateDisplay();
          return;
        }

        previousOperand = "0";
        currentOperand = "";
        operator = op.textContent;
        updateDisplay();
        return;
      }

      switch (op.textContent) {
        case "+":
          if (
            currentOperand &&
            currentOperand != "" &&
            previousOperand &&
            previousOperand != ""
          ) {
            calculate();
            previousOperand = currentOperand;
            currentOperand = "0";
            operator = "+";

            updateDisplay();
            return;
          }
          if (
            currentOperand == "" ||
            (!currentOperand && previousOperand && operator)
          ) {
            currentOperand = "0";
          }

          operator = "+";
          temp = currentOperand;
          currentOperand = "0";
          previousOperand = temp;
          updateDisplay();
          return;
        case "-":
          if (
            currentOperand &&
            currentOperand != "" &&
            previousOperand &&
            previousOperand != ""
          ) {
            calculate();
            previousOperand = currentOperand;
            currentOperand = "0";
            operator = "-";

            updateDisplay();
            return;
          }
          if (
            currentOperand == "" ||
            (!currentOperand && previousOperand && operator)
          ) {
            currentOperand = "0";
          }
          operator = "-";
          temp = currentOperand;
          currentOperand = "0";
          previousOperand = temp;
          updateDisplay();
          return;
        case "÷":
          if (
            currentOperand &&
            currentOperand != "" &&
            previousOperand &&
            previousOperand != ""
          ) {
            calculate();
            previousOperand = currentOperand;
            currentOperand = "0";
            operator = "÷";

            updateDisplay();
            return;
          }
          if (
            currentOperand == "" ||
            (!currentOperand && previousOperand && operator)
          ) {
            currentOperand = "0";
          }
          operator = "÷";
          temp = currentOperand;
          currentOperand = "0";
          previousOperand = temp;
          updateDisplay();
          return;
        case "*":
          if (
            currentOperand &&
            currentOperand != "" &&
            previousOperand &&
            previousOperand != ""
          ) {
            calculate();
            previousOperand = currentOperand;
            currentOperand = "0";
            operator = "*";

            updateDisplay();
            return;
          }
          if (
            currentOperand == "" ||
            (!currentOperand && previousOperand && operator)
          ) {
            currentOperand = "0";
          }
          operator = "*";
          temp = currentOperand;
          currentOperand = "0";
          previousOperand = temp;
          updateDisplay();
          return;
      }
    });
  });
}

function handleClear() {
  clear.addEventListener("click", function () {
    currentOperand = "0";
    previousOperand = "";
    operator = "";
    temp = undefined;
    previousResults.textContent = "";
    result = undefined;
    updateDisplay();
  });
}

function handleDel() {
  del.addEventListener("click", function () {
    if (currentOperand.toString().length > 1) {
      arr = currentOperand.toString().split("");
      arr.pop();
      if (arr.length == 0) {
        currentOperand = 0;
        updateDisplay();
        return;
      }
      currentOperand = arr.join("");
      updateDisplay();
    } else {
      currentOperand = "0";
      updateDisplay();
    }
  });
}

function handleEquals() {
  equals.addEventListener("click", function () {
    if (currentOperand == ".") {
      return;
    }
    if (
      currentOperand &&
      currentOperand != "" &&
      operator &&
      operator != "" &&
      previousOperand &&
      previousOperand != ""
    ) {
      calculate();
    } else if (previousOperand == "") {
      calculate();
    }
  });
}

function calculate() {
  switch (operator) {
    case "+":
      result = parseFloat(previousOperand) + parseFloat(currentOperand);

      previousOperand = "";
      currentOperand = result;
      result = undefined;
      operator = "";
      updateDisplay();
      return;
    case "-":
      result = parseFloat(previousOperand) - parseFloat(currentOperand);

      previousOperand = "";
      currentOperand = result;
      result = undefined;
      operator = "";
      updateDisplay();
      return;
    case "÷":
      if (parseFloat(currentOperand) == 0) {
        alert("No.");
        return;
      }
      result = parseFloat(previousOperand) / parseFloat(currentOperand);

      previousOperand = "";
      currentOperand = result;
      result = undefined;
      operator = "";
      updateDisplay();
      return;
    case "*":
      result = parseFloat(previousOperand) * parseFloat(currentOperand);

      previousOperand = "";
      currentOperand = result;
      result = undefined;
      operator = "";
      updateDisplay();
      return;
  }
}

function handlePlusMinus() {
  plusMinus.addEventListener("click", function () {
    if (currentOperand != "." && currentOperand && currentOperand != "") {
      currentOperand = parseFloat(currentOperand) * -1.0;
      updateDisplay();
    }
  });
}

function updateDisplay() {
  previousResults.textContent = previousOperand + " " + operator;
  currentResults.textContent = currentOperand;
}

calculator();
