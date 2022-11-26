const search = document.getElementById('search'),
  submit = document.getElementById('submit'),
  random = document.getElementById('random'),
  mealsEl = document.getElementById('meals'),
  resultHeading = document.getElementById('result-heading'),
  singleMeal = document.getElementById('single-meal');

// 查找获取食谱列表
function searchMeal(e) {
  e.preventDefault();
  
  const term = search.value
  // console.log(term)

  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        resultHeading.innerHTML = `<h2>${term}的查询结果为：</h2>`

        if (data.meals === null) {
          resultHeading.innerHTML = `<p>没有查询到相关食物，请重新输入！！！</p>`
        } else {
          mealsEl.innerHTML = data.meals.map(
            meal => `
            <div class="meal">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <div class="meal-info" data-mealId="${meal.idMeal}">
            <h3>${meal.strMeal}</h3>
            </div>
            </div>
            `
          ).join("")
        }
      })
    
    search.value = ""
  } else {
    alert("请输入内容！！！")
  }
}

// 根据id显示单个食物信息
function getMealById(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(res => res.json())
    .then(data => {
      const meal = data.meals[0];
      addMealToDOM(meal);
    });
}

// 添加到页面中
function addMealToDOM(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  singleMeal.innerHTML = `
  <div class="single-meal">
  <h1>${meal.strMeal}</h1>
  <img src= "${meal.strMealThumb}" alt="${meal.strmeal}">
  <div class="single-meal-info">
  ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
  ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
  </div>
  <div class="main">
  <p>${meal.strInstructions}</p>
  <h2>Ingredients</h2>
  <ul>
  ${ingredients.map(ing => `<li>${ing}</li>`).join("")}
  </ul>
  </div>
  </div>
  `;
}

// 随机食物展示
function getRandomMeal() {
  mealsEl.innerHTML = "";
  resultHeading.innerHTML = "";

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data => {
      const meal = data.meals[0];
      addMealToDOM(meal);
    });
}

// 添加事件监听
submit.addEventListener("submit", searchMeal)
random.addEventListener("click", getRandomMeal);


// 图片点击事件获取id
mealsEl.addEventListener("click", e => {
  // console.log(e.path)
  const mealInfo = e.path.find(item => {
    if (item.classList) {
      return item.classList.contains("meal-info")
    } else {
      return false
    }
  })
  console.log(mealInfo)
  if (mealInfo) {
    const mealID = mealInfo.getAttribute("data-mealid")
    // console.log(mealID)
    getMealById(mealID)
  }
})