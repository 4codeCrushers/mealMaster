const searchInput = $("input");
const searchBtn = $("#search-btn");

localStorage.setItem("goal", JSON.stringify({ calories: 2000, carbs: 200, fat: 50, protein: 100 }));

// Event listener for search button
$("form").on("submit", function (event) {
  event.preventDefault();
  const queries = JSON.parse(localStorage.getItem("queries")) || [];
  localStorage.setItem("queries", JSON.stringify(queries));
  const query = searchInput.val();
  console.log(query);
  const url = `https://api.spoonacular.com/recipes/guessNutrition?title=${query}&apiKey=${apiKey}`;

  fetch(url, {
    headers: {
      "X-Api-Key": apiKey
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const queryHash = {};
      queryHash[query] = { calories: data.calories.value, carbs: data.carbs.value, fat: data.fat.value, protein: data.protein.value };

      let queries = JSON.parse(localStorage.getItem("queries")) || [];
      queries.push(queryHash);
      localStorage.setItem("queries", JSON.stringify(queries));
    })
    .catch(error => {
      console.error(error);
    });
});
