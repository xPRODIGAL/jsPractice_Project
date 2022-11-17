const container = document.querySelector(".container")
const seats = document.querySelectorAll(".row .seat:not(.occupied)")
const count = document.getElementById("count")
const total = document.getElementById("total")
const movieSelect = document.getElementById("movie")
let ticketPrice = Number(movieSelect.value)

// 执行存储数据填充函数
populateUI();

// 添加影片切换事件 获取value值 回调更新数据函数 发送状态存储Storage中
movieSelect.addEventListener("change", e => {
  ticketPrice = +e.target.value
  updateSelectCount()
  setMovieData(e.target.selectedIndex,  e.target.value)
  // console.log(typeof ticketPrice, ticketPrice)
})


// 将电影显式状态存储到localStorage中
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex)
  localStorage.setItem("selectedMoviePrice", moviePrice)
}

// 数据更新函数 将点击作为index存储到Storage中
function updateSelectCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected")

  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat))
  // console.log(seatsIndex)
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex))
  // console.log(localStorage.getItem("selectedSeats"))

  const selectedCount = selectedSeats.length

  count.innerText = selectedCount
  total.innerText = selectedCount * ticketPrice
}

// 作为点击监听获取添加selected状态 回调函数更新数据
container.addEventListener("click", e => {
  if (e.target.classList.contains("seat") &&
      !e.target.classList.contains("occupied")) {
    e.target.classList.toggle("selected")
    
    updateSelectCount()
  }
})

// 根据localStorage存储数据回显
function populateUI() {
  // seat
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"))

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected")
      }
    })
  }

  // movie
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex")
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex
  }

  updateSelectCount()
}

