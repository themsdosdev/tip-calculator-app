/** @format */

const billInput = document.querySelector(".inputs-section__bill-input");
const peopleInput = document.querySelector(".inputs-section__people-input");
const tipResult = document.querySelector(".results__tip-value");
const totalResult = document.querySelector(".results__total-value");
const buttons = document.querySelectorAll(".btns__button");
const alert = document.querySelector("#alert");
const customTipInput = document.querySelector(".btns__custom");
const resetBtn = document.querySelector(".result-section__reset");

let tipPercentage = 5;

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    removeActiveStyles();
    button.classList.add("btns__button--selected");
    tipPercentage = parseInt(event.target.innerText.slice(0, -1)) || 0;
    calculateTip();
  });
});

function removeActiveStyles() {
  buttons.forEach((button) =>
    button.classList.remove("btns__button--selected")
  );
}

billInput.addEventListener("input", () => {
  billAmount = parseFloat(billInput.value) || 0;
  calculateTip();
});

customTipInput.addEventListener("click", removeActiveStyles);
customTipInput.addEventListener("input", () => {
  tipPercentage = parseInt(customTipInput.value) || 0;
  if (tipPercentage >= 0) calculateTip();
});

peopleInput.addEventListener("input", () => {
  peopleCount = parseFloat(peopleInput.value) || 0;
  if (peopleCount <= 0) {
    alert.classList.add("error");
    peopleInput.style.borderColor = "rgb(164, 68, 68)";
    tipResult.innerText = "$0.00";
    totalResult.innerText = "$0.00";
  } else {
    hideError();
    calculateTip();
  }
});

function hideError() {
  alert.classList.remove("error");
  peopleInput.style.borderColor = "hsl(189, 41%, 97%)";
}

resetBtn.addEventListener("click", () => {
  billInput.value = "";
  billAmount = "$0.00";
  peopleInput.value = "";
  peopleCount = "$0.00";
  customTipInput.value = "";
  removeActiveStyles();
  hideError();
  tipResult.innerText = "$0.00";
  totalResult.innerText = "$0.00";
});

function calculateTip() {
  if (billAmount > 0 && peopleCount > 0) {
    const tipAmount = (billAmount * tipPercentage) / 100 / peopleCount;
    const totalAmount =
      (billAmount + (billAmount * tipPercentage) / 100) / peopleCount;

    tipResult.innerText = `$${tipAmount.toFixed(2)}`;
    totalResult.innerText = `$${totalAmount.toFixed(2)}`;
  } else {
    tipResult.innerText = "$0.00";
    totalResult.innerText = "$0.00";
  }
}
