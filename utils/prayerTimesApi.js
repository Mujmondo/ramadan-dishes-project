const calculateNextRamadan = require("./calculateNextRamadan");
// calculate next ramadan year according to current hijri date
const year = calculateNextRamadan();

const api = `http://api.aladhan.com/v1/hijriCalendarByCity/${year}/9?city=Mecca&country=Saudi%20Arabia&method=1`;

const prayerTimesApi = async () => {
  const response = await fetch(api);
  const { data: apiData } = await response.json();
  const data = apiData?.map((item) => {
    return {
      day: parseInt(item.date.hijri.day),
      asr: item.timings.Asr.split(" ")[0],
      Maghrib: item.timings.Maghrib.split(" ")[0],
    };
  });
  return data;
};

module.exports = prayerTimesApi;
