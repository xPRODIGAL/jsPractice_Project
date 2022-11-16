const form = document.getElementById("form")
const username = document.getElementById("username")
const email = document.getElementById("email")
const password = document.getElementById("password")
const password2 = document.getElementById("password2")

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error"
  const small = formControl.querySelector("small")
  small.innerText = message
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success"
}

// function isValidEmail(email) {
//   const re = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
//   return re.test(String(email))
// }

function checkRequired(inputArr) {
  inputArr.forEach(input => {
    if (input.value.trim() === "") {
      showError(input, `${getKeyWords(input)}不能为空！！！`)
    } else {
      showSuccess(input)
    }
  })
}

function getKeyWords(input) {
  return input.placeholder.slice(3)
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getKeyWords(input)}不得少于${min}位`)
  } else if (input.value.length > max) {
    showError(input, `${getKeyWords(input)}不得大于${max}位`)
  } else {
    showSuccess(input)
  }
}

function checkEmail(input) {
  const re = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  if (!re.test(input.value.trim())) {
    showError(input, `${getKeyWords(input)}格式错误！！！`)
  } else {
    showSuccess(input)
  }
}

function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "密码不一致！！！")
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault()

  checkRequired([username, email, password, password2])
  checkLength(username, 3, 15)
  checkLength(password, 6, 18)
  checkEmail(email)
  checkPasswordsMatch(password, password2)
})

// 方式一
// form.addEventListener("submit", function (e) {
//   e.preventDefault()
  
//   if (username.value === "") {
//     showError(username, "用户名不能为空！！！")
//   } else {
//     showSuccess(username)
//   }

//   if (email.value === "") {
//     showError(email, "邮箱不能为空！！！")
//   } else if (!isValidEmail(email.value)) {
//     showError(email, "邮箱格式错误！！！")
//   }else {
//     showSuccess(email)
//   }

//   if (password.value === "") {
//     showError(password, "密码不能为空！！！")
//   } else {
//     showSuccess(password)
//   }

//   if (password2.value === "") {
//     showError(password2, "确认密码不能为空！！！")
//   } else {
//     showSuccess(password2)
//   }
// })