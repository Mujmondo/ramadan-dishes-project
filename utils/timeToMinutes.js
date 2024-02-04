const timeToMinutes = (time) => {
  const timeArr = time.split(":");
  const timeInMinutes = Number(timeArr[0]) * 60 + Number(timeArr[1]);
  return timeInMinutes;
};

module.exports = timeToMinutes;
