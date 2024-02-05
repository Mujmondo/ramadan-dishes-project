const calculateNextRamadan = () => {
  // getting Hijri current date
  const islamicCalendar = new Intl.DateTimeFormat("en-u-ca-islamic", {
    year: "numeric",
    month: "numeric",
  });
  const currentDate = new Date();
  // formatting the Hijri date
  const [stringMonth, stringYear] = islamicCalendar
    .format(currentDate)
    .split(" ")[0]
    .split("/");

  // month and year in Hijri
  const month = Number(stringMonth);
  let year = Number(stringYear);
  // condition to set the api for the upcoming Ramadan
  return month <= 9 ? year : (year += 1);
};

module.exports = calculateNextRamadan;