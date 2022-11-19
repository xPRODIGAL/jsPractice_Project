const addUserBtn = document.getElementById("add-user")
const doubleBtn = document.getElementById("double")
const showBtn = document.getElementById("show-richMan")
const sortBtn = document.getElementById("rich-sort")
const calculateBtn = document.getElementById("calculate-wealth")
const main = document.getElementById("main")

getRandomUser()

let usersData = []

// 给fetch() 提供一个参数指明资源路径，会返回一个包含响应结果的promise。当然它只是一个 HTTP 响应，为了获取JSON的内容，我们需要使用 json() 方法
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api")
  const data = await res.json()
  // console.log(res, data)

  const users = data.results[0].name
  // console.log(users)
  const user = {
    name: `${users.first} ${users.last}`,
    money: Math.floor(Math.random() * 1000000)
  };
  // console.log(user)
  addUsersData(user)
}

function addUsersData(obj) {
  usersData.push(obj)
  console.log(usersData)
  updateDOM()
}

// 信息展示
function updateDOM(providedData = usersData) {
  main.innerHTML = `<h2><strong>Person</strong>Wealth</h2>`
  
  // forEach() 方法用于调用数组的每个元素，并将元素传递给回调函数。
  // 注意: forEach() 对于空数组是不会执行回调函数的。
  providedData.forEach(item => {
    const ele = document.createElement("div")
    ele.classList.add("person")
    ele.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`
    main.appendChild(ele)
  })
}

// 货币正则转换
function formatMoney(number) {
  console.log(typeof number)
  let val = (number/1).toFixed(2).replace(',', '.')
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

// 资金翻倍
function doubleMoney() {
  usersData = usersData.map(user => {
    return {...user, money: user.money * 2}
  })
  updateDOM()
}

// 添加事件点击
addUserBtn.addEventListener("click", getRandomUser)
doubleBtn.addEventListener("click", doubleMoney)