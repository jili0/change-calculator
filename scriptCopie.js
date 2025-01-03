let price = 1.87;
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


const priceContainer = document.getElementById("price");
const cash = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDueContainer = document.getElementById("change-due");
const drawerContainer = document.getElementById("drawer");

// to change
const currencyUnit = [
  ["PENNY", 0.01],
  ["NICKEL", 0.05],
  ["DIME", 0.1],
  ["QUARTER", 0.25],
  ["ONE", 1],
  ["FIVE", 5],
  ["TEN", 10],
  ["TWENTY", 20],
  ["ONE HUNDRED", 100],
];
let difference;
let cashToPay = {};

const combineArrs = (arr1, arr2) =>
  arr1
    .map((item, index) => [...item, arr2[index][1]])
    .map((item) => [item[0], item[1] * 10 * 10, item[2] * 10 * 10]);

let combinedCid = combineArrs(cid, currencyUnit);
priceContainer.textContent += `${price} $`;

const totalCashInDrawer = combinedCid.reduce((sum, item) => sum + item[1], 0);

const handleClick = () => {
  cashToPay = {};
  if (Number(cash.value) < price)
    alert("Customer does not have enough money to purchase the item");
  else if (Number(cash.value) === price)
    changeDueContainer.textContent =
      "No change due - customer paid with exact cash";
  else {
    difference = Number(cash.value) * 10 * 10 - price * 10 * 10;

    if (difference === totalCashInDrawer) {
      findBiggestUnitToPay(difference, combinedCid, "closed");
    } else if (difference > totalCashInDrawer) {
      changeDueContainer.textContent = "Status: INSUFFICIENT_FUNDS";
    } else {
      findBiggestUnitToPay(difference, combinedCid);
    }

    cash.value = "";
  }
};

const updateDrawerMsg = (arr) => {
  let msg = arr.map((item) => `<p>${item[0]}: $${item[1] / 100}</p>`).join("");
  drawerContainer.innerHTML = msg;
};

updateDrawerMsg(combinedCid);

const findBiggestUnitToPay = (difference, combinedCid, status = "open") => {
  if (difference < 0.01) return;

  const filteredCid = combinedCid.filter((currency) => {
    const currencyAmount = currency[1];
    const currencyStep = currency[2];
    return currencyAmount >= currencyStep && currencyStep <= difference;
  });

  const [biggestUnitToPay, amount, step] = [...filteredCid].pop();

  //push result to array
  cashToPay.hasOwnProperty(biggestUnitToPay)
    ? (cashToPay[biggestUnitToPay] += step)
    : (cashToPay[biggestUnitToPay] = step);

  // extract from difference
  difference -= step;

  // update combinedCid
  combinedCid = combinedCid.map((currency) =>
    currency[0] === biggestUnitToPay
      ? [biggestUnitToPay, amount - step, step]
      : currency
  );
  updateDrawerMsg(combinedCid);

  // update cashToPay msg
  const cashToPayAsArray = Object.keys(cashToPay)
    .map((key) => [key, cashToPay[key] / 100])
    .sort((a, b) => b[1] - a[1]);
  let msg = cashToPayAsArray
    .map((item) => `<p>${item[0]}: $${item[1]}</p>`)
    .join("");
  changeDueContainer.innerHTML =
    status === "open"
      ? "<p>Status: OPEN</p>" + msg
      : status === "closed"
      ? "<p>Status: CLOSED</p>" + msg
      : undefined;
  // recursion
  findBiggestUnitToPay(difference, combinedCid, status);
};

purchaseBtn.addEventListener("click", handleClick);
