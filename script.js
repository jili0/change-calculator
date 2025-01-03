// let price = 1.87;
// let cid = [
//   ["PENNY", 1.01],
//   ["NICKEL", 2.05],
//   ["DIME", 3.1],
//   ["QUARTER", 4.25],
//   ["ONE", 90],
//   ["FIVE", 55],
//   ["TEN", 20],
//   ["TWENTY", 60],
//   ["ONE HUNDRED", 100],
// ];
let price = 10;
let cid = [
  ["PENNY", 0],
  ["NICKEL", 0],
  ["DIME", 0],
  ["QUARTER", 0],
  ["ONE", 5],
  ["FIVE", 0],
  ["TEN", 0],
  ["TWENTY", 0],
  ["ONE HUNDRED", 0],
];

const cashInputField = document.getElementById("cash");
const priceContainer = document.getElementById("price");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDueContainer = document.getElementById("change-due");
const drawerContainer = document.getElementById("drawer");

// functions

// main function - handleClick
const handleClick = () => {
  const cash = cashInputField.value;
  const changeDue = cash * 100 - price * 100;
  const currencyUnit = [
    ["PENNY", 1],
    ["NICKEL", 5],
    ["DIME", 10],
    ["QUARTER", 25],
    ["ONE", 100],
    ["FIVE", 500],
    ["TEN", 1000],
    ["TWENTY", 2000],
    ["ONE HUNDRED", 10000],
  ];
  const cashInDrawer = cid.reduce((sum, item) => sum + item[1] * 100, 0);
  let changeArr = [];

  const statusMsg = checkStatus(
    changeDue,
    cashInDrawer,
    currencyUnit,
    changeArr
  );

  switch (statusMsg) {
    case "Customer does not have enough money to purchase the item":
      alert(statusMsg);
      break;
    case "No change due - customer paid with exact cash":
      changeDueContainer.textContent = statusMsg;
      break;
    case "Status: INSUFFICIENT_FUNDS":
      changeDueContainer.textContent = statusMsg;
      break;
    case "Status: CLOSED":
      changeDueContainer.textContent =
        statusMsg + " " + convertChangeArr(changeArr, currencyUnit);
      break;
    case "Status: OPEN":
      changeDueContainer.textContent =
        statusMsg + " " + convertChangeArr(changeArr, currencyUnit);
  }

  updateDrawerMsg(cid);
};

// helper function - checkHasExactChange: returns a boolean
const checkHasExactChange = (changeDue, currencyUnit, changeArr, tempCid) => {
  // e.g. changeDue = 4, cash in Drawer = 5 -> need to 1)  find out first what are the  currencyUnits that's less than the changeDue and 2)whether they are greater than 0

  const newCid = cid.map((item) => [item[0], item[1] * 10 * 10]);

  const arr = newCid
    .filter(
      (item, index) =>
        currencyUnit[index][1] <= changeDue && item[1] >= currencyUnit[index][1]
    )
    .map((item) => {
      const cash = item[1];
      const step = currencyUnit.filter((curr) => curr[0] === item[0])[0][1];
      let arr = [];
      for (let i = 0; i < cash / step; i++) {
        arr.push(step);
      }
      return arr;
    });
  // inner helper function - calculate
  const substractFromCid = (arr, changeDue, currencyUnit, changeArr) => {
    if (!arr.length) {
      return false;
    }
    const currName = currencyUnit.filter(
      (item) => item[1] === arr.flat()[0]
    )[0][0];
    const currDiff = arr.flat()[0] / 100;
    cid = cid.map((item) =>
      item[0] === currName ? [item[0], item[1] - currDiff] : item
    );
    changeArr.push(arr.flat()[0]);
    if (arr.flat()[0] - changeDue === 0) {
      return true;
    } else if (arr.flat()[0] - changeDue < 0) {
      return substractFromCid(
        arr.flat().slice(1),
        changeDue - arr.flat()[0],
        currencyUnit,
        changeArr
      );
    }
  };
  return substractFromCid(arr, changeDue, currencyUnit, changeArr);
};

// helper function  - checkStatus : returns a status as string
const checkStatus = (changeDue, cashInDrawer, currencyUnit, changeArr) => {
  let tempCid = [...cid];
  const hasExactChange = checkHasExactChange(
    changeDue,
    currencyUnit,
    changeArr,
    tempCid
  );
  if (!hasExactChange) cid = tempCid;
  if (changeDue < 0) {
    return "Customer does not have enough money to purchase the item";
  } else if (!changeDue) {
    return "No change due - customer paid with exact cash";
  } else if (cashInDrawer < changeDue || !hasExactChange) {
    return "Status: INSUFFICIENT_FUNDS";
  } else if (cashInDrawer === changeDue) {
    return "Status: CLOSED";
  } else {
    return "Status: OPEN";
  }
};

//  helper function - convertChangeArr
const convertChangeArr = (changeArr, currencyUnit) => {
  const newChangeArr = changeArr.map(
    (change) => currencyUnit.filter((curr) => curr[1] === change)[0]
  );
  console.log(changeArr);
  let cleanedArr = [];
  for (let i = 0; i < newChangeArr.length; i++) {
    if (
      cleanedArr.length &&
      cleanedArr[cleanedArr.length - 1][0] === newChangeArr[i][0]
    ) {
      cleanedArr[cleanedArr.length - 1][1] += newChangeArr[i][1];
    } else {
      cleanedArr.push([...newChangeArr[i]]);
    }
  }
  cleanedArr = cleanedArr.map((item) => [item[0], item[1] / 100])[0];
  return cleanedArr.join(": $");
};

// helper function - update msg (change / cash)
const updateDrawerMsg = (cid) => {
  drawerContainer.textContent = cid.map((item) => item.join(": $")).join(" ");
};

window.onload = () => {
  priceContainer.textContent = ` $${price}`;
  updateDrawerMsg(cid);
};

purchaseBtn.addEventListener("click", handleClick);
