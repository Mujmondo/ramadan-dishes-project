const express = require("express");

const router = express.Router();

const apiRequest = require("../utils/api");
const dishes = require("../utils/dishes.json");

// methods
const dishesApi = require("../utils/dishesApi");

router.get("/", (req, res) => {
  const dayQuery = req.query.day;
  // handling user input errors
  if (!dayQuery) {
    throw new Error("provide day query param");
  } else if (dayQuery <= 0 || dayQuery > 30) {
    throw new Error("given day should be between 1-30");
  }

  const prayerTimes = apiRequest();
  prayerTimes
    .then(function (times) {
      const data = dishesApi(times, dishes, dayQuery);
      // random dish
      const randomInt = Math.floor(Math.random() * data.length);
      res.status(200).json(data[randomInt]);
    })
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
