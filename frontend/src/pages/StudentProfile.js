import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function StudentProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await API.get(`/student-profile/${id}`);
      setData(data);
    };
    fetchProfile();
  }, [id]);

  if (!data) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => navigate(-1)}>⬅ Back</button>

      <h2>{data.student.name}</h2>
      <p><b>Roll No:</b> {data.student.rollNo}</p>
      <p><b>Department:</b> {data.student.department}</p>
      <p><b>Year:</b> {data.student.year}</p>

      <hr />

      <h3>Attendance Summary</h3>
      <p><b>Attendance %:</b> {data.attendancePercentage}%</p>
      <p>
        <b>Status:</b>{" "}
        <span style={{ color: data.status === "Defaulter" ? "red" : "green" }}>
          {data.status}
        </span>
      </p>

      <hr />

      <h3>Attendance History</h3>
      {data.attendanceRecords.length === 0 && (
        <p>No attendance records found</p>
      )}
      {data.attendanceRecords.map((a) => (
        <div key={a._id}>
          {a.date} – {a.status}
        </div>
      ))}
    </div>
  );
}

export default StudentProfile;
