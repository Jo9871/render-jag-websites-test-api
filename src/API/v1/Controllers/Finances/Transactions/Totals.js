import moment from "moment";

import { incomeModel } from "../../../../../Config/Database Configs/Financial Website/Schema/Transactions Schema/incomeSchema.js";
import { expensesModel } from "../../../../../Config/Database Configs/Financial Website/Schema/Transactions Schema/expensesSchema.js";
import { transferModel } from "../../../../../Config/Database Configs/Financial Website/Schema/Transactions Schema/transferSchema.js";

import { formatCurrency } from "../../../Helpers/formatter.js";
import { success as sendSuccess } from "../../../Helpers/sendResponse.js";

// Returns all Income Transaction in the database in an array of transaction objects.
export const getIncomeTotals = async (req, res) => {};
// Accepts a JSON object and create new Transaction object in database with it.
export const getExpensesTotals = async (req, res) => {};
// Returns single Income Transaction in the database using a provided transaction ID.
export const getTransfersTotals = async (req, res) => {};
// Returns single Income Transaction in the database using a provided transaction ID.
export const getDailyTotals = async (req, res) => {
  try {
    let { day, days } = req.query;

    let totals = {};
    let message;

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
      // console.log(selectedDate);

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
            number: 0 - expensesTotal,
            currencyNumber: formatCurrency("£", 0 - expensesTotal),
          },
          profit: {
            number: incomeTotal - expensesTotal,
            currencyNumber: formatCurrency("£", incomeTotal - expensesTotal),
          },
        },
      };

      message = `Below is an object for the income total, expense total and profit for ${daysAgo}.`;
    } else {
      if (!days || days == 0) days = 28;

      for (let i = 0; i < days; i++) {
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
              number: 0 - expensesTotal,
              currencyNumber: formatCurrency("£", 0 - expensesTotal),
            },
            profit: {
              number: incomeTotal - expensesTotal,
              currencyNumber: formatCurrency("£", incomeTotal - expensesTotal),
            },
          },
        };
      }
      message = `Below is an array of income totals, expense totals and profit for the last ${days} ${
        days != 1 ? `Days` : `Day`
      }.`;
    }

    res.status(200).json({
      message,
      totals,
    });
  } catch (error) {
    res.status(400).json({ message: `Error`, errorMessage: error });
  }
};

export const getTotals = async (req, res) => {
  try {
    let totalTransactions = 0;
    let totalIncomeTransactions = 0;
    let totalExpenseTransactions = 0;
    let totalTransferTransactions = 0;
    let totalProfit = 0;
    let totalIncomeAmount = 0;
    let totalExpenseCost = 0;

    const incomeTransactions = await incomeModel.find({});
    const expenseTransactions = await expensesModel.find({});
    const transferTransactions = await transferModel.find({});

    totalTransactions =
      incomeTransactions.length +
      expenseTransactions.length +
      transferTransactions.length;
    totalIncomeTransactions = incomeTransactions.length;
    totalExpenseTransactions = expenseTransactions.length;
    totalTransferTransactions = transferTransactions.length;

    incomeTransactions.forEach((transaction) => {
      totalProfit = totalProfit + transaction.incomeAmount.number;
      totalIncomeAmount = totalIncomeAmount + transaction.incomeAmount.number;
    });

    expenseTransactions.forEach((transaction) => {
      totalProfit = totalProfit - transaction.expenseCost.number;
      totalExpenseCost = totalExpenseCost + transaction.expenseCost.number;
    });

    // sendSuccess(req, res, 200, {
    //   message: `Totals for from all transactions within the database.`,
    //   totals: {
    //     transactionCounts: {
    //       allTransactions: totalTransactions,
    //       incomeTransactions: totalIncomeTransactions,
    //       expenseTransactions: totalExpenseTransactions,
    //       transferTransactions: totalTransferTransactions,
    //     },
    //     transactionTotals: {
    //       profit: formatCurrency("£", totalProfit),
    //       incomeAmount: formatCurrency("£", totalIncomeAmount),
    //       expenseCost: formatCurrency("£", totalExpenseCost),
    //     },
    //   },
    // });

    res.status(200).json({
      message: `Totals for from all transactions within the database.`,
      totals: {
        transactionCounts: {
          allTransactions: totalTransactions,
          incomeTransactions: totalIncomeTransactions,
          expenseTransactions: totalExpenseTransactions,
          transferTransactions: totalTransferTransactions,
        },
        transactionTotals: {
          profit: formatCurrency("£", totalProfit),
          incomeAmount: formatCurrency("£", totalIncomeAmount),
          expenseCost: formatCurrency("£", totalExpenseCost),
        },
      },
    });
  } catch (error) {
    res.status(400).json({ message: `Error`, errorMessage: error });
  }
};
