import React, { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

function Attendance() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [date, setDate] = useState("");
  const [records, setRecords] = useState([]);

  // 1️⃣ Fetch students ONCE
  useEffect(() => {
    const fetchStudents = async () => {
      const { data } = await API.get("/students");
      setStudents(data);
    };
    fetchStudents();
  }, []);

  // 2️⃣ Whenever DATE changes → reset + fetch date-wise attendance
  useEffect(() => {
    if (!date || students.length === 0) return;

    // Default everyone to Present for NEW date
    const resetAttendance = {};
    students.forEach((s) => {
      resetAttendance[s._id] = "Present";
    });
    setAttendance(resetAttendance);

    // Fetch attendance for selected date
    fetchAttendance();
  }, [date, students]);

  // 3️⃣ Fetch attendance for selected date and PREFILL UI
  const fetchAttendance = async () => {
    if (!date) return;

    const { data } = await API.get(`/attendance/${date}`);
    setRecords(data);

    // Prefill attendance state from DB
    const updatedAttendance = {};
    students.forEach((s) => {
      const record = data.find((r) => r.student._id === s._id);
      updatedAttendance[s._id] = record ? record.status : "Present";
    });

    setAttendance(updatedAttendance);
  };

  // 4️⃣ Mark attendance ONLY for selected date
  const markAttendance = async () => {
    if (!date) {
      alert("Please select a date");
      return;
    }

    for (let studentId in attendance) {
      await API.post("/attendance", {
        student: studentId,
        date,
        status: attendance[studentId]
      });
    }

    alert("Attendance marked successfully");
    fetchAttendance();
  };

  return (
    <Layout>
      {/* 👇 YOUR EXISTING ATTENDANCE UI */}
      <div style={{ padding: "20px" }}>
        <h2>Attendance</h2>

        {/* Date Selector */}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={fetchAttendance}>View</button>

        <hr />

        {/* Mark Attendance */}
        <h3>Mark Attendance</h3>
        {students.map((student) => (
          <div key={student._id}>
            {student.name}
            <select
              value={attendance[student._id] || "Present"}
              onChange={(e) =>
                setAttendance({
                  ...attendance,
                  [student._id]: e.target.value
                })
              }
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
          </div>
        ))}

        <br />
        <button onClick={markAttendance}>Submit Attendance</button>

        <hr />

        {/* Attendance Records */}
        <h3>Attendance Records ({date})</h3>
        {records.length === 0 && (
          <p>No attendance marked for this date</p>
        )}
        {records.map((r) => (
          <div key={r._id}>
            {r.student.name} – {r.status}
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default Attendance;
