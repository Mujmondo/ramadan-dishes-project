const express = require("express");

const router = express.Router();

const prayerTimesApi = require("../utils/prayerTimesApi");
const dishesCooktime = require("../utils/dishesCooktime");
const dishes = require("../assets/dishes.json");

router.get("/", (req, res) => {
  // endpoint request queries
  const dayQuery = req.query.day;

  // handling user input errors
  if (!dayQuery) {
    return res.status(400).json({ error: "provide day query param" });
  } else if (isNaN(dayQuery)) {
    return res
      .status(400)
      .json({ error: "day should be a number between 1-30" });
  } else if (dayQuery <= 0 || dayQuery > 30) {
    return res.status(400).json({ error: "given day should be between 1-30" });
  }

  // getting prayertimes object for the given day
  const prayerTimes = prayerTimesApi();

  prayerTimes
    .then(function (times) {
      // getting dishes with cooktime
      const data = dishesCooktime(times, dishes, dayQuery);
      // generating a random dish index
      const randomInt = Math.floor(Math.random() * data.length);
      res.status(200).json(data[randomInt]);
    })
    .catch((error) => res.status(500).json({ message: error }));
});

module.exports = router;
