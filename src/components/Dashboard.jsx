import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);

  const token = localStorage.getItem("authToken");
  const API_BASE_URL = "https://finance-tracker-app-4i9b.onrender.com/transactions";

  const fetchTransactions = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/fetchall`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setTransactions(response.data.transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error.message);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const pieChartData = {
    labels: transactions.map((t) => t.description),
    datasets: [
      {
        data: transactions.map((t) => t.amount),
        backgroundColor: [
          "#007bff",
          "#ff6600",
          "#ff33cc",
          "#00cc66",
          "#ff0000",
        ],
        hoverBackgroundColor: [
          "#0056b3",
          "#cc5200",
          "#cc0099",
          "#00994d",
          "#cc0000",
        ],
      },
    ],
  };

  return (
    <div className="container-fluid py-5 bg-dark text-white vh-100">
      <div className="row my-5">
        <div className="col-md-6 d-flex flex-column align-items-center">
          <h3 className="text-center mb-3">Total Expenses</h3>
          {/* Make Pie Chart smaller */}
          <div style={{ width: "300px", height: "300px" }}>
            <Pie data={pieChartData} />
          </div>
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-primary">Report</h3>
          <table className="table table-hover table-dark bg-secondary" >
            <thead>
              <tr>
                <th>#</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{t.type || "N/A"}</td>
                  <td>{t.amount || 0}</td>
                  <td>{t.description || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
