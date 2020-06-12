let inputVal = document.getElementById("budget-input");
let btn = document.getElementById("budget-submit");
let budget = document.getElementById("budget-amount");
let balance = document.getElementById("balance-amount");
let alert1 = document.querySelector(".budget-feedback");
let expense = document.getElementById("expense-input");
let amountExpenses = document.getElementById("amount-input");
let expenseAmount = document.getElementById("expense-amount");
let span1 = document.getElementById("balance");

//alert for empty value------------
btn.addEventListener("click", function(e) {
  e.preventDefault();

  if (inputVal.value === "" || inputVal.value < 0) {
    alert1.innerHTML = "value cannot be empty or negative";
    alert1.style.display = "flex";
  } else {
    budget.innerHTML = inputVal.value;
    balance.innerHTML =
      parseInt(inputVal.value) - parseInt(expenseAmount.innerHTML);
  }

  //function color for positive or negative value of balance-------------
  color();

  //focus------
  inputVal.addEventListener("focus", function() {
    alert1.style.display = "none";
  });

  inputVal.value = "";
});

// table for expenses----------
let forTable = document.querySelector(
  "body > div > div > div > div:nth-child(3) > div.col-md-7.my-3"
);

let table = document.createElement("table");
let btnSubmit = document.getElementById("expense-submit");
forTable.appendChild(table);
let tr = table.insertRow();
let td1 = tr.insertCell(0);
let td2 = tr.insertCell(1);
let td3 = tr.insertCell(2);
td1.innerHTML = "Expense Title";
td2.innerHTML = "Expense Value";

td1.style.paddingRight = "160px";
td1.style.fontWeight = "bold";
td1.style.fontSize = "15px";
td2.style.fontWeight = "bold";
table.style.marginLeft = "85px";

//add row/cell; add value to expenses----------
btnSubmit.addEventListener("click", function(e) {
  e.preventDefault();
  let expense = document.getElementById("expense-input");
  let amountExpenses = document.getElementById("amount-input");
  let expenseAmount = document.getElementById("expense-amount");

  let tr1 = table.insertRow();
  let td11 = tr1.insertCell(0);
  let td22 = tr1.insertCell(1);
  let td33 = tr1.insertCell(2);
  let td44 = tr1.insertCell(3);

  td11.innerHTML = expense.value;
  td22.innerHTML = amountExpenses.value;
  td33.innerHTML = `<span class="edit-icon"><i class="fas fa-edit"></i> </span>`;
  td44.innerHTML = `<span class="delete-icon"><i class="fas fa-trash"></i></span>`;
  td11.classList.add("info-title", "showRed");
  td22.classList.add("info-title", "showRed");
  td11.style.textTransform = "uppercase";
  td11.style.paddingLeft = "15px";
  td22.style.paddingLeft = "30px";
  td33.style.paddingLeft = "180px";
  td44.style.paddingLeft = "10px";

  balance.innerHTML =
    parseInt(balance.innerHTML) - parseInt(amountExpenses.value);

  expenseAmount.innerHTML =
    parseInt(amountExpenses.value) + parseInt(expenseAmount.innerHTML);

  //delete row------
  td44.addEventListener("click", deleteRow);

  function deleteRow(e) {
    let tr1 = e.currentTarget.parentNode;
    tr1.remove();

    balance.innerHTML = parseInt(balance.innerHTML) + parseInt(td22.innerHTML);
    expenseAmount.innerHTML =
      parseInt(expenseAmount.innerHTML) - parseInt(td22.innerHTML);

    //function color for positive or negative value of balance-------------
    color();
  }

  //edit row------
  td33.addEventListener("click", editRow);

  function editRow() {
    let inpTd11 = td11.innerHTML;
    let inpTd22 = td22.innerHTML;
    expense.value = inpTd11;
    amountExpenses.value = inpTd22;
    tr1.remove();

    balance.innerHTML =
      parseInt(balance.innerHTML) + parseInt(amountExpenses.value);

    expenseAmount.innerHTML =
      parseInt(expenseAmount.innerHTML) - parseInt(amountExpenses.value);

    //function color for positive or negative value of balance-------------
    color();
  }

  //function color for positive or negative value of balance-------------
  color();

  expense.value = "";
  amountExpenses.value = "";
});

//function color for positive or negative value of balance-------------

function color() {
  if (balance.innerHTML > 0) {
    span1.classList.remove("showBlack", "showRed");
    span1.classList.add("showGreen");
  } else if (balance.innerHTML < 0) {
    span1.classList.remove("showBlack", "showGreen");
    span1.classList.add("showRed");
  } else {
    span1.classList.add("showBlack");
  }
}
