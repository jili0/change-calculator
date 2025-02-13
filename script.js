let price = 19.5;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

const currencyValues = {
  "PENNY": 0.01,
  "NICKEL": 0.05,
  "DIME": 0.1,
  "QUARTER": 0.25,
  "ONE": 1,
  "FIVE": 5,
  "TEN": 10,
  "TWENTY": 20,
  "ONE HUNDRED": 100,
};

const priceContainer = document.getElementById("price");
const cash = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDueContainer = document.getElementById("change-due");
const drawerContainer = document.getElementById("drawer");

const displayCash = () => {
  drawerContainer.innerHTML = cid
    .map((item) => `<p>${item[0]}: $${item[1].toFixed(2)}</p>`) 
    .join("");
};

const handlePurchase = () => {
  let changeDueObj = {};
  let changeDue = parseFloat((parseFloat(cash.value) - price).toFixed(2));
  let totalCash = parseFloat(cid.reduce((sum, curr) => sum + curr[1], 0).toFixed(2));

  if (changeDue < 0) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  if (changeDue === 0) {
    changeDueContainer.textContent = "No change due - customer paid with exact cash";
    return;
  }

  if (totalCash < changeDue) {
    changeDueContainer.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  let newCid = JSON.parse(JSON.stringify(cid)).reverse();
  for (let i = 0; i < newCid.length; i++) {
    let denom = newCid[i][0];
    let denomValue = currencyValues[denom];
    let amount = newCid[i][1];
    let amountToGive = 0;

    while (changeDue >= denomValue && amount > 0) {
      changeDue = parseFloat((changeDue - denomValue).toFixed(2));
      amount -= denomValue;
      amountToGive += denomValue;
    }

    newCid[i][1] = amount;

    if (amountToGive > 0) {
      changeDueObj[denom] = amountToGive;
    }
  }

  if (changeDue > 0) {
    changeDueContainer.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  let remainingCash = parseFloat(
    newCid.reduce((sum, [_, amount]) => sum + amount, 0).toFixed(2)
  );

  let status = remainingCash === 0 ? "Status: CLOSED" : "Status: OPEN";
  let changeString = Object.entries(changeDueObj)
    .sort((a, b) => currencyValues[b[0]] - currencyValues[a[0]])
    .map(([denom, amount]) => `${denom}: $${amount.toFixed(2)}`)
    .join(" ");

  changeDueContainer.innerHTML = changeString ? `${status} ${changeString}` : status;
  cid = newCid.reverse();
  displayCash();
};

window.onload = () => {
  priceContainer.textContent = `$${price.toFixed(2)}`;
  displayCash();
};

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && cash.value) {
    handlePurchase();
  }
});

purchaseBtn.addEventListener("click", handlePurchase);
