const express = require("express");

const router = express.Router();

const dishesCooktime = require("../utils/dishesCooktime");
const dishes = require("../assets/dishes.json");
const prayerTimesApi = require("../utils/prayerTimesApi");

router.get("/", (req, res) => {
  // endpoint request queries
  const dayQuery = req.query.day;
  const ingredientQuery = req.query.ingredient;

  // filter dishes based on ingredient
  const filteredDishes = dishes.filter((dish) => {
    const ingredients = dish.ingredients.map((ingredient) =>
      ingredient?.toLowerCase()
    );
    return ingredients.includes(ingredientQuery?.toLowerCase());
  });
  // handling user input errors
  if (!(ingredientQuery && dayQuery)) {
    return res
      .status(400)
      .json({ error: "provide day & ingredient query params" });
  } else if (dayQuery <= 0 || dayQuery > 30) {
    return res.status(400).json({ error: "given day should be between 1-30" });
  } else if (!filteredDishes) {
    return res
      .status(400)
      .json({ error: "No dishes found with the given ingredient" });
  }

  // getting prayertimes object for the given day
  const prayerTimes = prayerTimesApi();

  prayerTimes
    .then(function (times) {
      // getting dishes with cooktime
      const data = dishesCooktime(times, filteredDishes, dayQuery);
      res.status(200).json(data);
    })
    .catch((error) => res.status(500).json({ error: error.message }));
});

module.exports = router;
