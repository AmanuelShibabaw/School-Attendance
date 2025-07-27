function renderAttendancePage() {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  const today = new Date().toISOString().slice(0, 10);
  let form = `<h2>Mark Attendance - ${today}</h2><form id="attendanceForm">
    <table><tr><th>Name</th><th>Class</th><th>Status</th></tr>`;
  students.forEach((s) => {
    form += `<tr><td>${s.name}</td><td>${s.class}</td>
      <td><select name="status-${s.id}">
        <option value="Present">Present</option>
        <option value="Absent">Absent</option></select></td></tr>`;
  });
  form += `</table><button type="submit">Save Attendance</button></form>`;
  dashboardContent.innerHTML = form;
  document.getElementById("attendanceForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const attendance = JSON.parse(localStorage.getItem("attendance")) || [];
    const entries = students.map((s) => {
      const status = document.querySelector(`select[name='status-${s.id}']`).value;
      return { id: s.id, name: s.name, class: s.class, status, date: today };
    });
    localStorage.setItem("attendance", JSON.stringify([...attendance, ...entries]));
    alert("Attendance saved.");
    renderAdminStats();
  });
}

function renderViewRecords() {
  const attendance = JSON.parse(localStorage.getItem("attendance")) || [];
  const grouped = {};
  attendance.forEach((a) => {
    if (!grouped[a.date]) grouped[a.date] = [];
    grouped[a.date].push(a);
  });
  let html = '<h2>Attendance Records</h2>';
  for (let date in grouped) {
    html += `<h3>${date}</h3><table><tr><th>Name</th><th>Class</th><th>Status</th></tr>`;
    grouped[date].forEach((entry) => {
      html += `<tr><td>${entry.name}</td><td>${entry.class}</td><td>${entry.status}</td></tr>`;
    });
    html += `</table>`;
  }
  dashboardContent.innerHTML = html;
}

function renderStudentRecords() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const attendance = JSON.parse(localStorage.getItem("attendance")) || [];
  const records = attendance.filter((a) => a.name === user.username);
  let html = `<h2>My Attendance</h2><table><tr><th>Date</th><th>Status</th></tr>`;
  records.forEach((r) => {
    html += `<tr><td>${r.date}</td><td>${r.status}</td></tr>`;
  });
  html += `</table>`;
  dashboardContent.innerHTML = html;
}
