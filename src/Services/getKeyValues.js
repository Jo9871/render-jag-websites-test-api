import axios from "axios";
import { formatCurrency } from "../API/v1/Helpers/formatter.js";
import { keyValuesModel } from "../Config/Database Configs/Work/Schema/Tesco/keyValues.js";

export const getKeyValues = () => {
  setInterval(function () {
    console.log(`This function is running every second.`)
    // let date = new Date();
    // if (date.getHours() == 21) {
//     axios
//       .get(
//         `https://api.sheety.co/cd2628e2795737a00f7dfd4fcf3d4c6f/mainFinancialTracker/keyFigures`
//       )
//       .then((res) => {
//         console.log(res);
//         console.log(res.data.keyFigures);
//         getNextPayEstimate(res.data.keyFigures[0].estimatedPay);
//         getCashBalanceTotal(res.data.keyFigures[0].cashBalance);
//         getNatWestCurrentAccountBalanceTotal(
//           res.data.keyFigures[0].natWestCurrentAccountBalance
//         );
//         getNatWestSavingsAccountBalanceTotal(
//           res.data.keyFigures[0].natWestSavingsAccountBalance
//         );
//         getFluidCreditCardBalanceTotal(
//           res.data.keyFigures[0].fluidCreditCardBalance
//         );
//         getMonzoCurrentAccountBalanceTotal(
//           res.data.keyFigures[0].monzoCurrentAccountBalance
//         );
//         getTotalBalance(res.data.keyFigures[0].totalBalanceOfAccounts);
//       });
    // }
  }, 1000);
};

const getNextPayEstimate = (estimatedPay) => {
  keyValuesModel.findOne(
    { _id: `62813dbfc05bcb9137994251` },
    async (err, data) => {
      if (err) throw err;
      const newData = await keyValuesModel.findOneAndUpdate(
        { _id: `62813dbfc05bcb9137994251` },
        {
          estimatedNextPay: {
            number: estimatedPay,
            currencyNumber: formatCurrency("£", estimatedPay),
          },
        }
      );
      newData.save();
      console.log(
        `Key Value - Estimated Next Pay | Updated to ${formatCurrency(
          "£",
          estimatedPay
        )}`
      );
    }
  );
};

const getCashBalanceTotal = (cashBalance) => {
  keyValuesModel.findOne(
    { _id: `62813dbfc05bcb9137994251` },
    async (err, data) => {
      if (err) throw err;
      const newData = await keyValuesModel.findOneAndUpdate(
        { _id: `62813dbfc05bcb9137994251` },
        {
          cashBalance: {
            number: cashBalance,
            currencyNumber: formatCurrency("£", cashBalance),
          },
        }
      );
      newData.save();
      console.log(
        `Key Value - Cash Balance | Updated to ${formatCurrency(
          "£",
          cashBalance
        )}`
      );
    }
  );
};

const getNatWestCurrentAccountBalanceTotal = (natWestCurrentAccountBalance) => {
  keyValuesModel.findOne(
    { _id: `62813dbfc05bcb9137994251` },
    async (err, data) => {
      if (err) throw err;
      const newData = await keyValuesModel.findOneAndUpdate(
        { _id: `62813dbfc05bcb9137994251` },
        {
          natWestCurrentAccountBalance: {
            number: natWestCurrentAccountBalance,
            currencyNumber: formatCurrency("£", natWestCurrentAccountBalance),
          },
        }
      );
      newData.save();
      console.log(
        `Key Value - NatWest Current Account Balance | Updated to ${formatCurrency(
          "£",
          natWestCurrentAccountBalance
        )}`
      );
    }
  );
};

const getNatWestSavingsAccountBalanceTotal = (natWestSavingsAccountBalance) => {
  keyValuesModel.findOne(
    { _id: `62813dbfc05bcb9137994251` },
    async (err, data) => {
      if (err) throw err;
      const newData = await keyValuesModel.findOneAndUpdate(
        { _id: `62813dbfc05bcb9137994251` },
        {
          natWestSavingsAccountBalance: {
            number: natWestSavingsAccountBalance,
            currencyNumber: formatCurrency("£", natWestSavingsAccountBalance),
          },
        }
      );
      newData.save();
      console.log(
        `Key Value - NatWest Savings Account Balance | Updated to ${formatCurrency(
          "£",
          natWestSavingsAccountBalance
        )}`
      );
    }
  );
};

const getFluidCreditCardBalanceTotal = (fluidCreditCardBalance) => {
  keyValuesModel.findOne(
    { _id: `62813dbfc05bcb9137994251` },
    async (err, data) => {
      if (err) throw err;
      const newData = await keyValuesModel.findOneAndUpdate(
        { _id: `62813dbfc05bcb9137994251` },
        {
          fluidCreditCardBalance: {
            number: fluidCreditCardBalance,
            currencyNumber: formatCurrency("£", fluidCreditCardBalance),
          },
        }
      );
      newData.save();
      console.log(
        `Key Value - Fluid Credit Card Balance | Updated to ${formatCurrency(
          "£",
          fluidCreditCardBalance
        )}`
      );
    }
  );
};

const getMonzoCurrentAccountBalanceTotal = (monzoCurrentAccountBalance) => {
  keyValuesModel.findOne(
    { _id: `62813dbfc05bcb9137994251` },
    async (err, data) => {
      if (err) throw err;
      const newData = await keyValuesModel.findOneAndUpdate(
        { _id: `62813dbfc05bcb9137994251` },
        {
          monzoCurrentAccountBalance: {
            number: monzoCurrentAccountBalance,
            currencyNumber: formatCurrency("£", monzoCurrentAccountBalance),
          },
        }
      );
      newData.save();
      console.log(
        `Key Value - Monzo Current Account Balance | Updated to ${formatCurrency(
          "£",
          monzoCurrentAccountBalance
        )}`
      );
    }
  );
};

const getTotalBalance = (totalBalanceOfAccounts) => {
  keyValuesModel.findOne(
    { _id: `62813dbfc05bcb9137994251` },
    async (err, data) => {
      if (err) throw err;
      const newData = await keyValuesModel.findOneAndUpdate(
        { _id: `62813dbfc05bcb9137994251` },
        {
          totalBalanceOfAccounts: {
            number: totalBalanceOfAccounts,
            currencyNumber: formatCurrency("£", totalBalanceOfAccounts),
          },
        }
      );
      newData.save();
      console.log(
        `Key Value - Total Balance Of Accounts | Updated to ${formatCurrency(
          "£",
          totalBalanceOfAccounts
        )}`
      );
    }
  );
};
