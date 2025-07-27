const loginForm = document.getElementById("loginForm");
const errorMsg = document.getElementById("error");
const dummyUsers = [
  { username: "admin", password: "adminpass", role: "admin" },
  { username: "aman", password: "112", role: "student" },
  { username: "student2", password: "pass456", role: "student" },
];

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.getElementById("role").value;

  const user = dummyUsers.find(
    (u) => u.username === username && u.password === password && u.role === role
  );

  if (user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    window.location.href = "dashboard.html";
  } else {
    errorMsg.textContent = "Invalid credentials!";
  }
});
