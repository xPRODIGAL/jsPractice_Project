const balance = document.getElementById("balance"),
  moneyPlus = document.getElementById("money-plus"),
  moneyMinus = document.getElementById("money-minus"),
  list = document.getElementById("list"),
  form = document.getElementById("form"),
  text = document.getElementById("text"),
  amount = document.getElementById("amount");

// 虚拟交易数组
const dummyTransactions = [
  { id: 1, text: "鲜花", amount: -20 },
  { id: 2, text: "薪酬", amount: 300 },
  { id: 3, text: "书籍", amount: -10 }
];

let transactions = dummyTransactions;

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
  <button class="delete-btn">X</button>
  `

  list.appendChild(item)
}

function init() {
  list.innerHTML = ""
  transactions.forEach(addTransactionDOM)
}

init()