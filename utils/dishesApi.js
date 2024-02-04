const timeToMinutes = require("./timeToMinutes");

const dishesApi = (times, dishes, query) => {
  const filteredTimes = times.filter((time) => time.day == query);
  const asrInMinutes = timeToMinutes(filteredTimes[0].asr);
  const MaghribInMinutes = timeToMinutes(filteredTimes[0].Maghrib);

  const data = dishes.map((dish) => {
    const cooktimeInMinutes = MaghribInMinutes - 15 - dish.duration;
    const when = cooktimeInMinutes > asrInMinutes ? "after" : "before";
    const cooktime = Math.abs(cooktimeInMinutes - asrInMinutes);
    return {
      name: dish.name,
      ingredients: dish.ingredients,
      cooktime: `${cooktime} minutes ${when} Asr`,
    };
  });
  return data;
};

module.exports = dishesApi;