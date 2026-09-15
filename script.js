let students = JSON.parse(localStorage.getItem("students")) || [];

let editIndex = -1;


// Add Student
function addStudent() {

    let name = document.getElementById("name").value;
    let roll = document.getElementById("roll").value;
    let course = document.getElementById("course").value;
    let marks = document.getElementById("marks").value;


    // Check empty fields

    if (name === "" || roll === "" || course === "" || marks === "") {

        alert("Please fill all fields");

        return;
    }


    // Create student object

    let student = {
        name: name,
        roll: roll,
        course: course,
        marks: marks
    };


    // Edit existing student

    if (editIndex !== -1) {

        students[editIndex] = student;

        editIndex = -1;

    } else {

        // Add new student

        students.push(student);
    }


    // Save data

    localStorage.setItem("students", JSON.stringify(students));


    // Clear input fields

    clearFields();


    // Display students

    displayStudents();
}


// Display Students

function displayStudents() {

    let table = document.getElementById("studentTable");

    table.innerHTML = "";


    students.forEach(function(student, index) {

        let row = `
        
        <tr>

            <td>${student.name}</td>

            <td>${student.roll}</td>

            <td>${student.course}</td>

            <td>${student.marks}</td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editStudent(${index})">
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteStudent(${index})">
                    Delete
                </button>

            </td>

        </tr>
        
        `;

        table.innerHTML += row;

    });


    // Update total

    document.getElementById("total").innerText = students.length;
}


// Delete Student

function deleteStudent(index) {

    students.splice(index, 1);

    localStorage.setItem("students", JSON.stringify(students));

    displayStudents();
}


// Edit Student

function editStudent(index) {

    let student = students[index];


    document.getElementById("name").value = student.name;

    document.getElementById("roll").value = student.roll;

    document.getElementById("course").value = student.course;

    document.getElementById("marks").value = student.marks;


    editIndex = index;

}


// Search Student

function searchStudent() {

    let searchValue =
        document.getElementById("search").value.toLowerCase();


    let rows =
        document.getElementById("studentTable").getElementsByTagName("tr");


    for (let i = 0; i < rows.length; i++) {

        let rowText = rows[i].innerText.toLowerCase();


        if (rowText.includes(searchValue)) {

            rows[i].style.display = "";

        } else {

            rows[i].style.display = "none";

        }

    }

}


// Clear input fields

function clearFields() {

    document.getElementById("name").value = "";

    document.getElementById("roll").value = "";

    document.getElementById("course").value = "";

    document.getElementById("marks").value = "";
}


// Display data when page loads

displayStudents();