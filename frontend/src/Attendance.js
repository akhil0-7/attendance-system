import React, { useEffect, useState } from "react";

function Attendance() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/students/")
      .then(res => res.json())
      .then(data => setStudents(data));

    fetch("http://127.0.0.1:8000/api/attendance/")
      .then(res => res.json())
      .then(data => setAttendance(data));
  }, []);

  const markAttendance = (id, present) => {
    fetch("http://127.0.0.1:8000/api/attendance/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        student: id,
        present: present
      })
    })
      .then(res => res.json())
      .then(data => {
        alert("Attendance marked");
        setAttendance([...attendance, data]);
      });
  };

  return (
    <div>
      <h2>Students</h2>
      <table border="1">
        <tr>
          <th>Name</th>
          <th>Roll No</th>
          <th>Mark Attendance</th>
        </tr>
        {students.map(s => (
          <tr key={s.id}>
            <td>{s.name}</td>
            <td>{s.roll_no}</td>
            <td>
              <button onClick={() => markAttendance(s.id, true)}>Present</button>
              <button onClick={() => markAttendance(s.id, false)}>Absent</button>
            </td>
          </tr>
        ))}
      </table>

      <h2>Attendance Records</h2>
      <table border="1">
        <tr>
          <th>Student</th>
          <th>Date</th>
          <th>Status</th>
        </tr>
        {attendance.map(a => (
          <tr key={a.id}>
            <td>{a.student_name}</td>
            <td>{a.date}</td>
            <td>{a.present ? "Present" : "Absent"}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default Attendance;
