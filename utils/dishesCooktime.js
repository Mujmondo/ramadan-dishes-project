const timeToMinutes = require("./timeToMinutes");

const disheCooktime = (times, dishes, query) => {
  const filteredTimes = times.filter((time) => time.day == query);
  // transform the time string to minutes in total 
  const asrInMinutes = timeToMinutes(filteredTimes[0].asr);
  const MaghribInMinutes = timeToMinutes(filteredTimes[0].Maghrib);

  const data = dishes.map((dish) => {
    const readyBeforeMaghrib = 15; // time for the dishes to be prepared before the Maghrib prayer
    const cooktimeInMinutes = (MaghribInMinutes - readyBeforeMaghrib - dish.duration);
    const toAsr = cooktimeInMinutes > asrInMinutes ? "after" : "before";
    const cooktime = Math.abs(cooktimeInMinutes - asrInMinutes);
    return {
      name: dish.name,
      ingredients: dish.ingredients,
      cooktime: `${cooktime} minutes ${toAsr} Asr`,
    };
  });
  return data;
};

module.exports = disheCooktime;