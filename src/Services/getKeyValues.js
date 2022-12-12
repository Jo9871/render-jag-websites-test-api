import axios from "axios";
import { formatCurrency } from "../API/v1/Helpers/formatter.js";
import { keyValuesModel } from "../Config/Database Configs/Work/Schema/Tesco/keyValues.js";

export const getKeyValues = () => {
  setInterval(keyValuesUpdate, 1000 * 60 * 60 * 24);
};


export const keyValuesUpdate = async () => {
  const sheetlyResponse = await axios
    .get(
      `https://api.sheety.co/cd2628e2795737a00f7dfd4fcf3d4c6f/mainFinancialTracker/keyFigures`
    )

  const newKeyFigures = sheetlyResponse.data.keyFigures[0]

  const estimatedPayFigures = getNextPayEstimate(newKeyFigures.estimatedPay);
  const cashBalanceFigures = getCashBalanceTotal(newKeyFigures.cashBalance);
  const natWestCurrentAccountBalanceFigures = getNatWestCurrentAccountBalanceTotal(
    newKeyFigures.natWestCurrentAccountBalance
  );
  const natWestSavingsAccountBalanceFigures = getNatWestSavingsAccountBalanceTotal(
    newKeyFigures.natWestSavingsAccountBalance
  );
  const fluidCreditCardBalanceFigures = getFluidCreditCardBalanceTotal(
    newKeyFigures.fluidCreditCardBalance
  );
  const monzoCurrentAccountBalanceFigures = getMonzoCurrentAccountBalanceTotal(
    newKeyFigures.monzoCurrentAccountBalance
  );
  const totalBalanceFigures = getTotalBalance(newKeyFigures.totalBalanceOfAccounts);

const oldKeyFigures = await keyValuesModel.findOne(
    { _id: `62813dbfc05bcb9137994251` })

  const responseData = {
    estimatedPayFigures:{
      "oldFigure": oldKeyFigures.estimatedNextPay.number,
      "newFigure": newKeyFigures.estimatedPay
    },
    cashBalanceFigures:{
      "oldFigure": oldKeyFigures.cashBalance.number,
      "newFigure": newKeyFigures.cashBalance
    },
    natWestCurrentAccountBalanceFigures:{
      "oldFigure": oldKeyFigures.natWestCurrentAccountBalance.number,
      "newFigure": newKeyFigures.natWestCurrentAccountBalance
    },
    natWestSavingsAccountBalanceFigures:{
      "oldFigure": oldKeyFigures.natWestSavingsAccountBalance.number,
      "newFigure": newKeyFigures.natWestSavingsAccountBalance
    },
    fluidCreditCardBalanceFigures:{
      "oldFigure": oldKeyFigures.fluidCreditCardBalance.number,
      "newFigure": newKeyFigures.fluidCreditCardBalance
    },
    monzoCurrentAccountBalanceFigures:{
      "oldFigure": oldKeyFigures.monzoCurrentAccountBalance.number,
      "newFigure": newKeyFigures.monzoCurrentAccountBalance
    },
    totalBalanceFigures:{
      "oldFigure": oldKeyFigures.totalBalanceOfAccounts.number,
      "newFigure": newKeyFigures.totalBalanceOfAccounts
    }
  }

  // console.log(responseData)
  return responseData
}

const getNextPayEstimate = async (estimatedPay) => {
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
