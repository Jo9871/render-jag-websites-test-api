import moment from "moment";

import { incomeModel } from "../../../../../Config/Database Configs/Financial Website/Schema/Transactions Schema/incomeSchema.js";
import { expensesModel } from "../../../../../Config/Database Configs/Financial Website/Schema/Transactions Schema/expensesSchema.js";
import { transferModel } from "../../../../../Config/Database Configs/Financial Website/Schema/Transactions Schema/transferSchema.js";

import { formatCurrency } from "../../../Helpers/formatter.js";

// Returns all Income Transaction in the database in an array of transaction objects.
export const getIncomeTotals = async (req, res) => {};
// Accepts a JSON object and create new Transaction object in database with it.
export const getExpensesTotals = async (req, res) => {};
// Returns single Income Transaction in the database using a provided transaction ID.
export const getTransfersTotals = async (req, res) => {};
// Returns single Income Transaction in the database using a provided transaction ID.
export const getAllTotals = async (req, res) => {
  try {
    const { day } = req.query;

    let totals = {};

    if (day) {
      let daysAgo =
        day == 0 ? `Today` : `${day} ${day > 1 ? `Days` : `Day`} Ago`;

      let incomeTotal = 0;
      let expensesTotal = 0;

      let todaysDate = new Date(new Date().setUTCHours(0, 0, 0, 0));
      let selectedDate = new Date(
        todaysDate.setDate(todaysDate.getDate() - day)
      );
      let dateToChange = selectedDate;
      // console.log(selectedDate)

      const startOfDay = new Date(
        dateToChange.setUTCHours(0, 0, 0, 0)
      ).toISOString();
      const endOfDay = new Date(
        dateToChange.setUTCHours(23, 59, 59, 999)
      ).toISOString();

      // console.log(startOfDay, endOfDay);

      const incomeTransactions = await incomeModel
        .find({
          transactionDate: {
            $gte: startOfDay, // 2019-11-08T00:00:00.000Z
            $lt: endOfDay, // 2019-11-08T23:59:59.999Z
          },
        })
        .sort({ transactionDate: -1 });

      const expenseTransactions = await expensesModel
        .find({
          transactionDate: {
            $gte: startOfDay, // 2019-11-08T00:00:00.000Z
            $lt: endOfDay, // 2019-11-08T23:59:59.999Z
          },
        })
        .sort({ transactionDate: -1 });

      incomeTransactions.forEach((transaction) => {
        incomeTotal = incomeTotal += transaction.incomeAmount.number;
      });
      expenseTransactions.forEach((transaction) => {
        expensesTotal = expensesTotal += transaction.expenseCost.number;
      });

      // console.log(incomeTransactions, expenseTransactions);

      totals = {
        ...totals,
        [daysAgo]: {
          date: moment(new Date(selectedDate.setUTCHours(0, 0, 0, 0))).format(
            `dddd Do MMMM yyyy`
          ),
          incomeTotals: {
            number: incomeTotal,
            currencyNumber: formatCurrency("£", incomeTotal),
          },
          expenseTotals: {
            number: expensesTotal,
            currencyNumber: formatCurrency("£", expensesTotal),
          },
          profit: {
            number: incomeTotal - expensesTotal,
            currencyNumber: formatCurrency("£", incomeTotal - expensesTotal),
          },
        },
      };
    } else {
      for (let i = 0; i < 181; i++) {
        let daysAgo = i == 0 ? `Today` : `${i} ${i > 1 ? `Days` : `Day`} Ago`;

        // console.log(totals)

        let incomeTotal = 0;
        let expensesTotal = 0;

        let todaysDate = new Date();
        let selectedDate = new Date(
          todaysDate.setDate(todaysDate.getDate() - i)
        );
        let dateToChange = selectedDate;
        // console.log(selectedDate)

        const startOfDay = new Date(
          dateToChange.setUTCHours(0, 0, 0, 0)
        ).toISOString();
        const endOfDay = new Date(
          dateToChange.setUTCHours(23, 59, 59, 999)
        ).toISOString();

        // console.log(startOfDay, endOfDay);

        const incomeTransactions = await incomeModel
          .find({
            transactionDate: {
              $gte: startOfDay, // 2019-11-08T00:00:00.000Z
              $lt: endOfDay, // 2019-11-08T23:59:59.999Z
            },
          })
          .sort({ transactionDate: -1 });

        const expenseTransactions = await expensesModel
          .find({
            transactionDate: {
              $gte: startOfDay, // 2019-11-08T00:00:00.000Z
              $lt: endOfDay, // 2019-11-08T23:59:59.999Z
            },
          })
          .sort({ transactionDate: -1 });

        incomeTransactions.forEach((transaction) => {
          incomeTotal = incomeTotal += transaction.incomeAmount.number;
        });
        expenseTransactions.forEach((transaction) => {
          expensesTotal = expensesTotal += transaction.expenseCost.number;
        });

        // console.log(incomeTransactions, expenseTransactions);

        totals = {
          ...totals,
          [daysAgo]: {
            date: selectedDate,
            incomeTotals: {
              number: incomeTotal,
              currencyNumber: formatCurrency("£", incomeTotal),
            },
            expenseTotals: {
              number: expensesTotal,
              currencyNumber: formatCurrency("£", expensesTotal),
            },
            profit: {
              number: incomeTotal - expensesTotal,
              currencyNumber: formatCurrency("£", incomeTotal - expensesTotal),
            },
          },
        };
      }
    }

    res.status(200).json({
      message: `Below are all totals of transactions.`,
      totals,
    });
  } catch (error) {
    res.status(400).json({ message: `Error`, errorMessage: error });
  }
};
