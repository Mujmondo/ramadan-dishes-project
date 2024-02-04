const hijriSafe = require("hijri-date/lib/safe");
const HijriDate = hijriSafe.default;

let {_year: year, _month: month} = new HijriDate();
// condition to set the api for the upcoming Ramadan
month <= 9? year : year+=1; 

const api =
  `http://api.aladhan.com/v1/hijriCalendarByCity/${year}/9?city=Mecca&country=Saudi%20Arabia&method=1`;

const apiRequest = async () => {
  // then, the same as above (see ES7 safe)
  const response = await fetch(api);
  const { data: apiData } = await response.json();
  const data = apiData?.map((item) => {
    return {
      day: item.date.hijri.day,
      asr: item.timings.Asr.split(" ")[0],
      Maghrib: item.timings.Maghrib.split(" ")[0],
    };
  });

  return data;
};

module.exports = apiRequest;
