import React, { useEffect, useState } from "react";
import axios from "axios";

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [newTransaction, setNewTransaction] = useState({
    type: "",
    amount: "",
    description: "",
  });
  const token = localStorage.getItem("authToken"); // Get the token for authentication
  // API Base URL
  const API_BASE_URL = "https://finance-tracker-app-4i9b.onrender.com/transactions";

  // Fetch all transactions
  const fetchTransactions = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/fetchall`,
        {}, // Assuming backend requires user data; empty payload for now
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request
            "Content-Type": "application/json", // Explicitly set content type
          },
        }
      );
      setTransactions(response.data.transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error.message);
    }
  };

  // Add a new transaction
  const handleAddTransaction = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/addone`,
        newTransaction,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status === "success") {
        fetchTransactions(); // Refresh the list
        setNewTransaction({ type: "", amount: "", description: "" }); // Reset form
      } else {
        alert("Failed to add transaction.");
      }
    } catch (error) {
      console.error("Error adding transaction:", error.message);
    }
  };

  // Delete a transaction
  const handleDeleteTransaction = async (id) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/deleteone`,
        { _id: id }, // Pass the transaction ID
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status === "success") {
        fetchTransactions(); // Refresh the list
      } else {
        alert("Failed to delete transaction.");
      }
    } catch (error) {
      console.error("Error deleting transaction:", error.message);
    }
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  // Handle search input change
  const handleSearchChange = (e) => setSearch(e.target.value);

  // Filter transactions based on search
  const filteredTransactions = transactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(search.toLowerCase())
  );

  // Fetch transactions when the component mounts
  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="container-fluid py-5 bg-dark text-white vh-100">
      <div
        className="card bg-dark text-white shadow-lg"
        style={{ borderRadius: "10px" }}
      >
        {/* Card Header */}
        <div
          className="card-header text-white my-2"
          style={{ backgroundColor: "#24204A", borderRadius: "10px 10px 0 0" }}
        >
          <h4 className="mb-0">Transactions</h4>
        </div>

        {/* Card Body */}
        <div className="card-body">
          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              className="form-control bg-dark text-white border-primary"
              placeholder="Search by description..."
              value={search}
              onChange={handleSearchChange}
            />
          </div>

          {/* Transactions Table */}
          <div className="table-responsive">
            <table className="table table-dark table-hover">
              <thead
                className="text-white"
                style={{ backgroundColor: "#1E3A8A" }}
              >
                <tr>
                  <th>#</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Description</th>
                  <th>Date Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction, index) => (
                  <tr key={transaction._id}>
                    <td>{index + 1}</td>
                    <td>{transaction.type}</td>
                    <td>${transaction.amount}</td>
                    <td>{transaction.description}</td>
                    <td>
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteTransaction(transaction._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add New Transaction Form */}
          <div className="mt-4 p-3 rounded bg-secondary">
            <h5 className="text-white mb-3">Add New Transaction</h5>
            <div className="row g-3">
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control bg-dark text-white border-primary"
                  placeholder="Type (Credit/Debit)"
                  name="type"
                  value={newTransaction.type}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-3">
                <input
                  type="number"
                  className="form-control bg-dark text-white border-primary"
                  placeholder="Amount"
                  name="amount"
                  value={newTransaction.amount}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control bg-dark text-white border-primary"
                  placeholder="Description"
                  name="description"
                  value={newTransaction.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-2">
                <button
                  className="btn btn-primary w-100"
                  onClick={handleAddTransaction}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
