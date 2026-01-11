import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Layout from "../components/Layout";

function Students() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");

  const navigate = useNavigate();

  const fetchStudents = async () => {
    const { data } = await API.get("/students");
    setStudents(data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const addStudent = async (e) => {
    e.preventDefault();
    await API.post("/students", {
      name,
      rollNo,
      department,
      year
    });
    setName("");
    setRollNo("");
    setDepartment("");
    setYear("");
    fetchStudents();
  };

  const deleteStudent = async (id) => {
    await API.delete(`/students/${id}`);
    fetchStudents();
  };

  return (
    <Layout>
      {/* 👇 YOUR EXISTING STUDENTS UI */}
      <div style={{ padding: "20px" }}>
        <h2>Students</h2>

        <form onSubmit={addStudent}>
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <br /><br />

          <input
            placeholder="Roll No"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            required
          />
          <br /><br />

          <input
            placeholder="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          />
          <br /><br />

          <input
            placeholder="Year"
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
          <br /><br />

          <button type="submit">Add Student</button>
        </form>

        <hr />

        <h3>Student List</h3>
        {students.map((student) => (
          <div key={student._id} className="list-item">
  <span
    className="link"
    onClick={() => navigate(`/students/${student._id}`)}
  >
    {student.name} ({student.rollNo})
  </span>

  <button onClick={() => deleteStudent(student._id)}>
    Delete
  </button>
</div>

        ))}
      </div>
    </Layout>
  );
}

export default Students;
