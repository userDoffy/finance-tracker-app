import Transaction from "./transactionModel.js";

export const fetchTransaction = (userid) => {
  return Transaction.find({ userid:userid });
};

export const addTransaction = (transobj) => {
  return Transaction(transobj).save();
};

export const deleteTransaction = (id, userid) => {
  return Transaction.findOneAndDelete({ _id: id, userid: userid });
};
