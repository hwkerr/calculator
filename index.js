document.querySelectorAll(".button-set button").forEach(btn =>
  btn.addEventListener("click", handleClick));
document.addEventListener("keydown", handleKey);

function handleClick() {
  btnLabel = this.textContent;
  useButton(btnLabel);
}

function handleKey(event) {
  useButton(event.key);
}

const display = document.querySelector(".output-display");
const display2 = document.querySelector(".secondary-display");
const displayOper = document.querySelector(".oper-display");
function setDisplay(s) {
  display.textContent = s;
}
function getDisplay() {
  return display.textContent;
}
function appendDisplay(s) {
  display.textContent += s;
}

let value = null;
let store = null;
let oper = null;
let result = false;
function useButton(btnLabel) {
  switch (btnLabel) {
    case "Clear":
      clear();
      break;
    case "/":
    case "x":
    case "-":
    case "+":
    case "%":
      store = Number(value);
      value = null;
      oper = btnLabel;
      break;
    case ".":
      if (value === null) {
        value = "0" + btnLabel;
      }
      else if (value > 0) {
        value += "" + btnLabel;
      }
      break;
    case "=":
    case "Enter":
      equals();
      break;
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      let digit = btnLabel;
      if (value === null || result === true) {
        value = digit;
        result = false;
      }
      else
        value += "" + digit;
      break;
    default:
      console.log("Key pressed: " + btnLabel);
  }

  updateDisplays();
}

function equals() {
  switch (oper) {
    case "/":
      value = Number(store) / Number(value);
      break;
    case "x":
      value = Number(store) * Number(value);
      break;
    case "-":
      value = Number(store) - Number(value);
      break;
    case "+":
      value = Number(store) + Number(value);
      break;
    case "%":
      value = Number(store) % Number(value);
      break;
  }
  store = null;
  oper = null;
  result = true;
}

function clear() {
  value = null;
  store = null;
  oper = null;
  decimal = false;
}

function updateDisplays() {
  let displayElement = document.querySelector(".output-display");
  if (value === null && store === null && oper === null)
    displayElement.textContent = "---";
  else if (!Number.isNaN(value))
    displayElement.textContent = (store === null ? "" : store) + " " + (oper === null ? "" : oper) + " " + (value === null ? "" : value);
  else {
    displayElement.textContent = "Error";
    value = 0;
  }
  // document.querySelector(".secondary-display").textContent = store;
  // document.querySelector(".oper-display").textContent = oper;
}
