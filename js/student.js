function renderManageStudents() {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  let html = `<h2>Manage Students</h2><button onclick="showAddStudentForm()">➕ Add Student</button>
    <table><tr><th>ID</th><th>Name</th><th>Class</th><th>Gender</th><th>Actions</th></tr>`;
  students.forEach((s, index) => {
    html += `<tr><td>${s.id}</td><td>${s.name}</td><td>${s.class}</td><td>${s.gender}</td>
      <td><button onclick="editStudent(${index})">✏️ Edit</button>
      <button onclick="deleteStudent(${index})">🗑️ Delete</button></td></tr>`;
  });
  html += `</table><div id="studentFormContainer"></div>`;
  dashboardContent.innerHTML = html;
}

function showAddStudentForm(student = {}, index = null) {
  const isEdit = index !== null;
  document.getElementById("studentFormContainer").innerHTML = `
    <h3>${isEdit ? 'Edit' : 'Add'} Student</h3>
    <form id="studentForm">
      <input type="text" id="studentId" value="${student.id || ''}" placeholder="ID" required>
      <input type="text" id="studentName" value="${student.name || ''}" placeholder="Name" required>
      <input type="text" id="studentClass" value="${student.class || ''}" placeholder="Class" required>
      <select id="studentGender" required>
        <option value="">Select Gender</option>
        <option value="Male" ${student.gender === 'Male' ? 'selected' : ''}>Male</option>
        <option value="Female" ${student.gender === 'Female' ? 'selected' : ''}>Female</option>
      </select>
      <button type="submit">${isEdit ? 'Update' : 'Add'} Student</button>
    </form>`;
  document.getElementById("studentForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const students = JSON.parse(localStorage.getItem("students")) || [];
    const newStudent = {
      id: document.getElementById("studentId").value.trim(),
      name: document.getElementById("studentName").value.trim(),
      class: document.getElementById("studentClass").value.trim(),
      gender: document.getElementById("studentGender").value
    };
    if (isEdit) students[index] = newStudent;
    else students.push(newStudent);
    localStorage.setItem("students", JSON.stringify(students));
    renderManageStudents();
  });
}

function editStudent(index) {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  showAddStudentForm(students[index], index);
}

function deleteStudent(index) {
  if (confirm("Delete this student?")) {
    const students = JSON.parse(localStorage.getItem("students")) || [];
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    renderManageStudents();
  }
}
