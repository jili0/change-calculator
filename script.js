/*

let price = 19.5;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];
*/
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
const priceContainer = document.getElementById("price");
const cash = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDueContainer = document.getElementById("change-due");
const drawerContainer = document.getElementById("drawer");
let changeDueObj = {};

const displayCash = () => {
  drawerContainer.innerHTML = cid
    .map((item) => `<p>${item[0]}: $${item[1]}</p>`)
    .join("");
};
const handlePurchase = () => {
  if (isChangeNeeded()) {
    const status = calculateChange();
    changeDueContainer.innerText = status;
    for (let i = 0; i < Object.keys(changeDueObj).length; i++) {
      const currentKey = Object.keys(changeDueObj)[i];
      changeDueContainer.innerHTML += `<p>${currentKey}: &dollar;${changeDueObj[currentKey]}</p>`;
    }
  } else {
    console.log("no change needed");
  }
};

const isChangeNeeded = () => {
  const difference = Number((Number(cash.value) - price).toFixed(2));
  if (difference < 0) {
    alert("Customer does not have enough money to purchase the item");
    return false;
  } else if (difference === 0) {
    changeDueContainer.textContent =
      "No change due - customer paid with exact cash";
    return false;
  } else {
    return true;
  }
};

const calculateChange = () => {
  const difference = Number((Number(cash.value) - price).toFixed(2));
  const statusArr = [
    "Status: INSUFFICIENT_FUNDS",
    "Status: CLOSED",
    "Status: OPEN",
  ];
  const totalCash = Number(
    [...cid].reduce((sum, curr) => sum + curr[1], 0).toFixed(2)
  );

  const calculate = (difference, cid) => {
    if (difference === 0) {
      return;
    } else if (difference < 0) {
      return;
    } else {
      const steps = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];
      for (let i = steps.length - 1; i >= 0; i--) {
        if (difference > steps[i] && difference < steps[i + 1]) {
          if (cid[i][1] > 0) {
            const newCid = cid.map((curr, index) => {
              if (index === i) {
                return [curr[0], curr[1] - steps[i]];
              } else {
                return curr;
              }
            });
            const newDifference = difference - steps[i];
            if (Object.hasOwn(changeDueObj, cid[i][0])) {
              changeDueObj[cid[i][0]] += steps[i];
            } else {
              changeDueObj[cid[i][0]] = steps[i];
            }
            // console.log(changeDueObj);
            calculate(newDifference, newCid);
          } else {
            return "insufficient fund";
          }
        }
      }
    }
  };

  if (totalCash < difference) {
    return statusArr[0];
  } else {
    const status = calculate(difference, cid);
    if (status === "insufficient fund") {
      return statusArr[0];
    } else if (totalCash === 0) {
      return statusArr[1];
    } else {
      return statusArr[2];
    }
  }
};

window.onload = () => {
  priceContainer.textContent = `$${price.toFixed(2)}`;
  displayCash();
};
document.addEventListener("keydown", () => {
  event.key === "Enter" && cash.value ? handlePurchase() : undefined;
});
purchaseBtn.addEventListener("click", handlePurchase);
