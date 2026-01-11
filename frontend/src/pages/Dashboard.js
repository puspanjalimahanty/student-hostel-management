import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Layout from "../components/Layout";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    const fetchStats = async () => {
      const { data } = await API.get("/dashboard");
      setStats(data);
    };

    fetchStats();
  }, [navigate, user]);

  if (!stats) {
    return (
      <Layout>
        <p>Loading dashboard...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container">
        {/* Header */}
        <div className="dashboard-header">
          <h2>Admin Dashboard</h2>
          <p className="dashboard-subtitle">
            Welcome, {user.name}
          </p>
        </div>

        {/* Cards */}
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3>Total Students</h3>
            <h1>{stats.totalStudents}</h1>
          </div>

          <div className="dashboard-card">
            <h3>Present Today</h3>
            <h1>{stats.presentCount}</h1>
          </div>

          <div className="dashboard-card">
            <h3>Absent Today</h3>
            <h1>{stats.absentCount}</h1>
          </div>

          <div className="dashboard-card">
            <h3>Attendance %</h3>
            <h1>{stats.attendancePercentage}%</h1>
          </div>
        </div>

        {/* Actions */}
        <div className="dashboard-actions">
          <button onClick={() => navigate("/students")}>
            Manage Students
          </button>
          <button onClick={() => navigate("/attendance")}>
            Attendance
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
