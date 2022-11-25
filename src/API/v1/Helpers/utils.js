/**
 *
 * @param {Date} startTime
 * @param {Date} endTime
 * @returns
 */
export function getTimeBetween(startTime, endTime) {
  const totalMilSec = Date.parse(endTime) - Date.parse(startTime);

  const milliSecondsCutOff = Math.floor(totalMilSec % 1000);
  const secondsCutOff = Math.floor((totalMilSec / 1000) % 60);
  const minutesCutOff = Math.floor((totalMilSec / 1000 / 60) % 60);
  const hoursCutOff = Math.floor((totalMilSec / (1000 * 60 * 60)) % 24);
  const daysCutOff = Math.floor((totalMilSec / (1000 * 60 * 60 * 24)) % 7);
  const weeksCutOff = Math.floor(totalMilSec / (1000 * 60 * 60 * 24 * 7));

  const milliSecondsTotals = Math.floor(totalMilSec);
  const secondsTotals = Math.floor(totalMilSec / 1000);
  const minutesTotals = Math.floor(totalMilSec / 1000 / 60);
  const hoursTotals = Math.floor(totalMilSec / (1000 * 60 * 60));
  const daysTotals = Math.floor(totalMilSec / (1000 * 60 * 60 * 24));
  const weeksTotals = Math.floor(totalMilSec / (1000 * 60 * 60 * 24 * 7));

  const totalAll = `${weeksCutOff} ${
    weeksCutOff == 1 ? "Week" : "Weeks"
  }, ${daysCutOff} ${daysCutOff == 1 ? "Day" : "Days"}, ${hoursCutOff} ${
    hoursCutOff == 1 ? "Hour" : "Hours"
  }, ${minutesCutOff} ${
    minutesCutOff == 1 ? "Minute" : "Minutes"
  }, ${secondsCutOff} ${secondsCutOff == 1 ? "Second" : "Seconds"}`;
  const totalMinusSeconds = `${weeksCutOff} ${
    weeksCutOff == 1 ? "Week" : "Weeks"
  }, ${daysCutOff} ${daysCutOff == 1 ? "Day" : "Days"}, ${hoursCutOff} ${
    hoursCutOff == 1 ? "Hour" : "Hours"
  }, ${minutesCutOff} ${minutesCutOff == 1 ? "Minute" : "Minutes"}`;
  const totalAllMinusSecondsAndMinutes = `${weeksCutOff} ${
    weeksCutOff == 1 ? "Week" : "Weeks"
  }, ${daysCutOff} ${daysCutOff == 1 ? "Day" : "Days"}, ${hoursCutOff} ${
    hoursCutOff == 1 ? "Hour" : "Hours"
  }`;

  return {
    cutOff: {
      totalMilSec,
      totalTimes: {
        totalAll,
        totalMinusSeconds,
        totalAllMinusSecondsAndMinutes,
      },
      weeks: {
        number: weeksCutOff,
        numberText: `${weeksCutOff} ${weeksCutOff == 1 ? "Week" : "Weeks"}`,
      },
      days: {
        number: daysCutOff,
        numberText: `${daysCutOff} ${daysCutOff == 1 ? "Day" : "Days"}`,
      },
      hours: {
        number: hoursCutOff,
        numberText: `${hoursCutOff} ${hoursCutOff == 1 ? "Hour" : "Hours"}`,
      },
      minutes: {
        number: minutesCutOff,
        numberText: `${minutesCutOff} ${
          minutesCutOff == 1 ? "Minute" : "Minutes"
        }`,
      },
      seconds: {
        number: secondsCutOff,
        numberText: `${secondsCutOff} ${
          secondsCutOff == 1 ? "Second" : "Seconds"
        }`,
      },
      milliSeconds: {
        number: milliSecondsCutOff,
        numberText: `${milliSecondsCutOff} ${
          milliSecondsCutOff == 1 ? "Millisecond" : "Milliseconds"
        }`,
      },
    },
    totals: {
      weeks: {
        number: weeksTotals,
        numberText: `${weeksTotals} ${weeksTotals == 1 ? "Week" : "Weeks"}`,
      },
      days: {
        number: daysTotals,
        numberText: `${daysTotals} ${daysTotals == 1 ? "Day" : "Days"}`,
      },
      hours: {
        number: hoursTotals,
        numberText: `${hoursTotals} ${hoursTotals == 1 ? "Hour" : "Hours"}`,
      },
      minutes: {
        number: minutesTotals,
        numberText: `${minutesTotals} ${
          minutesTotals == 1 ? "Minute" : "Minutes"
        }`,
      },
      seconds: {
        number: secondsTotals,
        numberText: `${secondsTotals} ${
          secondsTotals == 1 ? "Second" : "Seconds"
        }`,
      },
      milliSeconds: {
        number: milliSecondsTotals,
        numberText: `${milliSecondsTotals} ${
          milliSecondsTotals == 1 ? "Millisecond" : "Milliseconds"
        }`,
      },
    },
  };
}
