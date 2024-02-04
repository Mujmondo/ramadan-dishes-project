const express = require("express");

const router = express.Router();

const dishesApi = require("../utils/dishesApi");
const dishes = require("../utils/dishes.json");
const apiRequest = require("../utils/api");

router.get("/", (req, res) => {
  const dayQuery = req.query.day;
  const ingredientQuery = req.query.ingredient;
  // Should work on capitalizing search

  // filter dishes based on ingredient
  const filteredDishes = dishes.filter((dish) =>
    dish.ingredients.includes(req.query.ingredient)
  );

  // handling user input errors
  if (!(ingredientQuery && dayQuery)) {
    throw new Error("provide day & ingredient query params");
  } else if (!filteredDishes) {
    throw new Error("No dishes found with the given ingredient");
  } else if (dayQuery <= 0 || dayQuery > 30) {
    throw new Error("given day should be between 1-30");
  }

  const prayerTimes = apiRequest();
  prayerTimes
    .then(function (times) {
      const data = dishesApi(times, filteredDishes, dayQuery);
      res.status(200).json(data);
    })
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
