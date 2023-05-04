const balance = document.getElementById("balance"),
  moneyPlus = document.getElementById("money-plus"),
  moneyMinus = document.getElementById("money-minus"),
  list = document.getElementById("list"),
  form = document.getElementById("form"),
  text = document.getElementById("text"),
  amount = document.getElementById("amount");

// 虚拟交易数组
// const dummyTransactions = [
//   { id: 1, text: "鲜花", amount: -20 },
//   { id: 2, text: "薪酬", amount: 300 }
// ];

// let transactions = dummyTransactions;

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
)

let transactions = localStorage.getItem("transactions") !== null ? localStorageTransactions : []

// 真实输入添加函数
function addTransaction(e) {
  e.preventDefault();
  
  // 验证输入框是否空值
  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("请输入交易名称和金额")
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value
    };
    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();
    
    text.value = "";
    amount.value = "";
  }
}

// 随机id
function generateID() {
  return Math.floor(Math.random() * 100000000)
}

// 将交易列表添加到DOM list中
function addTransactionDOM(transaction) {
  // 获取金额前的符号
  const sign = transaction.amount < 0 ? "-" : "+"

  // 创建li标签
  const item = document.createElement("li")

  // 根据正负添加对应类名
  item.classList.add(transaction.amount < 0 ? "minus" : "plus")

  item.innerHTML = `
  ${transaction.text}
  <span>${sign}${Math.abs(transaction.amount)}</span>
  <button class="delete-btn" onclick="removeTransaction(${transaction.id})">X</button>
  `;

  list.appendChild(item)
}

// 更新余额收入与支出
function updateValues() {
  // 通过map()获取交易金额数组
  const amounts = transactions.map(transaction => transaction.amount)

  // console.log(amounts)
  // 通过reduce()方法计算
  const total = amounts.reduce((acc, item) => (acc += item), 0);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2)
  
  const expense = (amounts
    .filter(item => item < 0)
    .reduce((acc, item) => (acc += item), 0) * -1).toFixed(2)

  // 写入标签
  balance.innerHTML = `$${total}`;
  moneyPlus.innerHTML = `$${income}`;
  moneyMinus.innerText = `$${expense}`
}

// 更新本地存储
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions))
}

// 删除交易
function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);
  updateLocalStorage();
  init();
}

// 初始化
function init() {
  list.innerHTML = ""
  transactions.forEach(addTransactionDOM)
  updateValues()
}

init();

form.addEventListener("submit", addTransaction)