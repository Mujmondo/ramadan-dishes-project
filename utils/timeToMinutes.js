const timeToMinutes = (time) => {
  const timeArr = time.split(":");
  const timeInMinutes = parseInt(timeArr[0]) * 60 + parseInt(timeArr[1]);
  return timeInMinutes;
};

module.exports = timeToMinutes;
