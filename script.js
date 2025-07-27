const adminCredentials = { username: "admin", password: "admin123" };
const students = JSON.parse(localStorage.getItem('students')) || [];
const attendanceRecords = JSON.parse(localStorage.getItem('attendanceRecords')) || {};

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorElement = document.getElementById('login-error');

    if (!username || !password) {
        errorElement.textContent = "Please fill in all fields.";
        return;
    }

    if (username === adminCredentials.username && password === adminCredentials.password) {
        showAdminDashboard();
    } else {
        const student = students.find(s => s.id === username && s.password === password);
        if (student) {
            showStudentDashboard(student);
        } else {
            errorElement.textContent = "Invalid credentials.";
        }
    }
}

function showAdminDashboard() {
    document.getElementById('login-page').classList.add('hidden');
    document.getElementById('admin-dashboard').classList.remove('hidden');
    loadStudentList();
}

function showStudentDashboard(student) {
    document.getElementById('login-page').classList.add('hidden');
    document.getElementById('student-dashboard').classList.remove('hidden');
    loadStudentAttendance(student.id);
}

function logout() {
    document.getElementById('admin-dashboard').classList.add('hidden');
    document.getElementById('student-dashboard').classList.add('hidden');
    document.getElementById('login-page').classList.remove('hidden');
}

function markAttendance() {
    const date = document.getElementById('attendance-date').value;
    const className = document.getElementById('class-select').value;
    const attendance = {};

    const checkboxes = document.querySelectorAll('.student-checkbox:checked');
    checkboxes.forEach(checkbox => {
        attendance[checkbox.value] = 'Present';
    });

    attendanceRecords[date] = attendanceRecords[date] || {};
    attendanceRecords[date][className] = attendance;

    localStorage.setItem('attendanceRecords', JSON.stringify(attendanceRecords));
    alert('Attendance marked successfully!');
}

function loadStudentList() {
    const studentListDiv = document.getElementById('student-list');
    studentListDiv.innerHTML = '';

    students.forEach(student => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = student.id;
        checkbox.className = 'student-checkbox';
        const label = document.createElement('label');
        label.textContent = student.name;

        studentListDiv.appendChild(checkbox);
        studentListDiv.appendChild(label);
        studentListDiv.appendChild(document.createElement('br'));
    });
}

function loadStudentAttendance(studentId) {
    const attendanceRecordsDiv = document.getElementById('attendance-records');
    attendanceRecordsDiv.innerHTML = '';

    for (const date in attendanceRecords) {
        const record = attendanceRecords[date];
        if (record[studentId]) {
            const p = document.createElement('p');
            p.textContent = `Date: ${date}, Status: ${record[studentId]}`;
            attendanceRecordsDiv.appendChild(p);
        }
    }
}

function showAddStudentModal() {
    document.getElementById('add-student-modal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('add-student-modal').classList.add('hidden');
}

function addStudent() {
    const id = document.getElementById('student-id').value;
    const name = document.getElementById('student-name').value;
    const className = document.getElementById('student-class').value;
    const gender = document.getElementById('student-gender').value;

    if (!id || !name || !className) {
        alert("Please fill in all fields.");
        return;
    }

    students.push({ id, name, class: className, gender });
    localStorage.setItem('students', JSON.stringify(students));
    closeModal();
    loadStudentList();
}
