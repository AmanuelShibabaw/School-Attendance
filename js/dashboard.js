const user = JSON.parse(localStorage.getItem("loggedInUser"));
const usernameSpan = document.getElementById("username");
const dashboardContent = document.getElementById("dashboardContent");
const navItems = document.getElementById("navItems");
const logoutBtn = document.getElementById("logoutBtn");

if (!user) window.location.href = "index.html";
usernameSpan.textContent = user.username;

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
});

if (user.role === "admin") {
  navItems.innerHTML = `
    <li><a href="#" onclick="renderAdminStats()">📊 Dashboard</a></li>
    <li><a href="#" onclick="renderAttendancePage()">📝 Mark Attendance</a></li>
    <li><a href="#" onclick="renderViewRecords()">📅 View Records</a></li>
    <li><a href="#" onclick="renderManageStudents()">👨‍🎓 Manage Students</a></li>`;
  renderAdminStats();
} else {
  navItems.innerHTML = `
    <li><a href="#" onclick="renderStudentRecords()">📅 My Attendance</a></li>`;
  renderStudentRecords();
}

function renderAdminStats() {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  const attendance = JSON.parse(localStorage.getItem("attendance")) || [];
  const today = new Date().toISOString().slice(0, 10);
  const todayCount = attendance.filter((a) => a.date === today).length;
  dashboardContent.innerHTML = `
    <div class="card">📚 Total Students: <strong>${students.length}</strong></div>
    <div class="card">🕒 Today's Attendance: <strong>${todayCount}</strong></div>`;
}
