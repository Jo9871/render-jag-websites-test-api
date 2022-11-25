import moment from "moment";

import { shiftModel } from "../../../../../Config/Database Configs/Work/Schema/Tesco/shiftSchema.js";

import {
  success as successFunc,
  error as errorFunc,
} from "../../../Helpers/sendResponse.js";

import { formatCurrency } from "../../../Helpers/formatter.js";
import { getTimeBetween } from "../../../Helpers/utils.js";
import { tescoConfigsModel } from "../../../../../Config/Database Configs/Admin/Schema/configSchemas.js";

// Returns all Expense Transaction in the database in an array of transaction objects.
export const getShifts = async (req, res) => {
  try {
    const shifts = await shiftModel.find({});
    // console.log(shifts);
    res.status(201).json({
      message: `All shifts in database.`,
      shifts,
    });
  } catch (error) {
    // errorFunc(res, res, 200, error);
    res.status(400).json({ message: `Error`, errorMessage: error });
  }
};

// Returns all Expense Transaction in the database in an array of transaction objects.
export const createNewShift = async (req, res) => {
  try {
    const incomingData = req.body;

    // Getting shift timings
    const totalShiftTime = getTimeBetween(
      incomingData.shiftTiming.shiftHours.shiftStart,
      incomingData.shiftTiming.shiftHours.shiftEnd
    ).totals.minutes.number;
    const totalBreakTime = getTimeBetween(
      incomingData.shiftTiming.breakHours.breakStart,
      incomingData.shiftTiming.breakHours.breakEnd
    ).totals.minutes.number;

    const payedShiftTime = totalShiftTime - totalBreakTime;

    // Work out pay

    let baseHoursPay = 0;
    let premiumBaseHoursPay = 0;
    let overtimeHoursPay = 0;
    let premiumOvertimeHoursPay = 0;
    let totalHoursPay = 0;

    const shiftBasePay = incomingData.shiftPay.hourlyRate.shiftBasePay;
    const basePayMultiplier =
      incomingData.shiftPay.hourlyRate.basePayMultiplier;

    const shiftPay = shiftBasePay * basePayMultiplier;

    // Get contracted hours for day and see if shift is base, base and overtime or just overtime.
    const tescoConfigs = await tescoConfigsModel.find({
      _id: `6282df5c189c71c0da7c8bc4`,
    });

    const contractedHours = tescoConfigs[0].contractedHours;
    const todaysContractedHours =
      contractedHours[
        `${moment(incomingData.date).format("dddd").toLowerCase()}`
      ];

    // Calculating base, base premium, overtime and overtime premium.
    if (payedShiftTime > todaysContractedHours) {
      if (todaysContractedHours == 0) {
        if (basePayMultiplier == 1) {
          overtimeHoursPay = (payedShiftTime / 60) * shiftPay;
        } else {
          overtimeHoursPay = (payedShiftTime / 60) * (shiftBasePay * 1);
          premiumOvertimeHoursPay =
            (payedShiftTime / 60) * (shiftBasePay * (basePayMultiplier - 1));
        }
      } else {
        if (basePayMultiplier == 1) {
          baseHoursPay = (todaysContractedHours / 60) * shiftPay;
          overtimeHoursPay =
            ((payedShiftTime - todaysContractedHours) / 60) * shiftPay;
        } else {
          baseHoursPay = (todaysContractedHours / 60) * (shiftBasePay * 1);
          overtimeHoursPay =
            ((payedShiftTime - todaysContractedHours) / 60) *
            (shiftBasePay * 1);

          premiumBaseHoursPay =
            (todaysContractedHours / 60) *
            (shiftBasePay * (basePayMultiplier - 1));
          premiumOvertimeHoursPay =
            ((payedShiftTime - todaysContractedHours) / 60) *
            (shiftBasePay * (basePayMultiplier - 1));
        }
      }
    } else if (payedShiftTime == todaysContractedHours) {
      if (basePayMultiplier == 1) {
        baseHoursPay = (payedShiftTime / 60) * shiftPay;
      } else {
        baseHoursPay = (payedShiftTime / 60) * (shiftBasePay * 1);
        premiumBaseHoursPay =
          (payedShiftTime / 60) * (shiftBasePay * (basePayMultiplier - 1));
      }
    } else {
      if (basePayMultiplier == 1) {
        baseHoursPay = (payedShiftTime / 60) * shiftPay;
      } else {
        baseHoursPay = (payedShiftTime / 60) * (shiftBasePay * 1);
        premiumBaseHoursPay =
          (payedShiftTime / 60) * (shiftBasePay * (basePayMultiplier - 1));
      }
    }

    totalHoursPay =
      baseHoursPay +
      premiumBaseHoursPay +
      overtimeHoursPay +
      premiumOvertimeHoursPay;

    // Overtime variables
    let baseHours = todaysContractedHours;
    let overtimeHours = payedShiftTime - baseHours;

    // console.log(
    //   `Base Hours - ${baseHours}`,
    //   `Overtime Hours - ${overtimeHours}`
    // );

    // if (overtimeHours !== 0 && baseHours == 0) console.log(`Overtime`);
    // if (overtimeHours !== 0 && baseHours !== 0)
    //   console.log(`Overtime & Base Time`);
    // if (overtimeHours == 0 && baseHours !== 0) console.log(`Base Time`);

    // Working out next pay day and pay period
    let firstPayDay = new Date("2021-10-15");
    let nextPayDay = new Date("2021-10-15");

    let dateForNextPayDayManipulation = new Date(incomingData.date);

    while (nextPayDay < dateForNextPayDayManipulation) {
      if (nextPayDay == firstPayDay) {
        nextPayDay = new Date(
          firstPayDay.setDate(new Date(firstPayDay.getDate() + 28))
        );
      } else {
        nextPayDay = new Date(
          firstPayDay.setDate(new Date(firstPayDay.getDate() + 28))
        );
      }
    }

    if (
      getTimeBetween(nextPayDay, dateForNextPayDayManipulation).cutOff
        .totalMilSec == 0
    ) {
      nextPayDay = new Date(
        nextPayDay.setDate(new Date(nextPayDay.getDate() + 28))
      );
    } else if (
      getTimeBetween(dateForNextPayDayManipulation, nextPayDay).cutOff
        .totalMilSec <=
        1000 * 60 * 60 * 24 * 8 &&
      baseHours == 0
    ) {
      nextPayDay = new Date(
        nextPayDay.setDate(new Date(nextPayDay.getDate() + 28))
      );
    }

    //Creating new Shift
    const newShift = new shiftModel({
      shiftDateInfo: {
        fullDate: incomingData.date,
        day: {
          string: moment(incomingData.date).format("dddd"),
          number: new Date(incomingData.date).getDay(),
        },
        date: {
          string: moment(incomingData.date).format("Do"),
          number: new Date(incomingData.date).getDate(),
        },
        month: {
          string: moment(incomingData.date).format("MMMM"),
          number: new Date(incomingData.date).getMonth(),
        },
        year: new Date(incomingData.date).getFullYear(),
      },
      shiftPayPeriodInfo: {
        shiftPayDay: nextPayDay,
        payPeriod: {
          start: new Date(
            new Date(nextPayDay).setDate(new Date(nextPayDay).getDate() - 28)
          ),
          end: new Date(
            new Date(nextPayDay).setDate(new Date(nextPayDay).getDate() - 1)
          ),
        },
      },
      shiftTiming: {
        payedShiftTime: payedShiftTime,
        shiftHours: {
          totalShiftTime: totalShiftTime,
          shiftStart: incomingData.shiftTiming.shiftHours.shiftStart,
          shiftEnd: incomingData.shiftTiming.shiftHours.shiftEnd,
        },
        breakHours: {
          totalBreakTime: totalBreakTime,
          breakStart: incomingData.shiftTiming.breakHours.breakStart,
          breakEnd: incomingData.shiftTiming.breakHours.breakEnd,
        },
      },
      shiftPay: {
        hourlyRate: {
          shiftBasePay: {
            number: shiftBasePay,
            currencyNumber: formatCurrency("£", shiftBasePay),
          },
          basePayMultiplier,
          shiftPay: {
            number: shiftPay,
            currencyNumber: formatCurrency("£", shiftPay),
          },
        },
        totalShiftPay: {
          baseHoursPay: {
            number: baseHoursPay,
            currencyNumber: formatCurrency("£", baseHoursPay),
          },
          premiumBaseHoursPay: {
            number: premiumBaseHoursPay,
            currencyNumber: formatCurrency("£", premiumBaseHoursPay),
          },
          overtimeHoursPay: {
            number: overtimeHoursPay,
            currencyNumber: formatCurrency("£", overtimeHoursPay),
          },
          premiumOvertimeHoursPay: {
            number: premiumOvertimeHoursPay,
            currencyNumber: formatCurrency("£", premiumOvertimeHoursPay),
          },
          totalHoursPay: {
            number: totalHoursPay,
            currencyNumber: formatCurrency("£", totalHoursPay),
          },
        },
      },
    });

    newShift
      .save()
      .then((data) => {
        // console.log(`Transaction [${data._id}] added to the database.`);
        res.status(201).json({
          message: `Shift [${data._id}] added to the database.`,
          data,
        });
      })
      .catch((err) => {
        res.status(400).json({ message: `Error`, errorMessage: err });
      });

    //   res.status(200).json({ success: true, message: `All Good` });
  } catch (error) {
    // errorFunc(res, res, 200, error);
    res.status(400).json({ message: `Error`, errorMessage: error });
  }
};
