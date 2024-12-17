import {
  addTransaction,
  deleteTransaction,
  fetchTransaction,
} from "./database/transaction/transactionFunctions.js";

export const fetchall = async (userid, res) => {
  try {
    const transactions = await fetchTransaction(userid);
    if (transactions) {
      res.status(200).json({
        status: "success",
        message: "Transactions fetched successfully!",
        transactions,
      });
    } else {
      res.status(400).json({ status: "error", message: "Some error occured" });
    }
  } catch (error) {
    console.error("Error during fetching:", error.message);
    res.status(500).json({ status: "error", message: "Fetching failed." });
  }
};

export const addone = async (newTransaction, userid, res) => {
  try {
    const newTrans = {
      userid: userid,
      type: newTransaction.type,
      amount: newTransaction.amount,
      description: newTransaction.description,
    };

    const addTrans = await addTransaction(newTrans);

    if (addTrans) {
      res.status(200).json({
        status: "success",
        message: "Transaction added successfully!",
      });
    } else {
      res
        .status(400)
        .json({ status: "error", message: "Error adding transaction" });
    }
  } catch (error) {
    console.error("Error during adding transaction:", error.message);
    res
      .status(500)
      .json({ status: "error", message: "Adding transaction failed." });
  }
};

export const deleteone = async (data, userid, res) => {
  try {
    const { _id } = data; // Expecting { id: "transaction_id" }
    const del = await deleteTransaction(_id, userid);

    if (del) {
      res.status(200).json({
        status: "success",
        message: "Transaction deleted successfully!",
      });
    } else {
      res
        .status(400)
        .json({ status: "error", message: "Transaction not found" });
    }
  } catch (error) {
    console.error("Error during deletion:", error.message);
    res.status(500).json({ status: "error", message: "Deletion failed." });
  }
};
