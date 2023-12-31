class Course {
  constructor(name, scale) {
    this.name = name;
    this.scale = scale;
  }
}

class Student {
  constructor(id, name, surname, courses) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.courses = courses;
  }
}

const coursesArray = [];

const studentsArray = [];

const addCourseModal = document.getElementById("add-course-modal");
const coursesSideBar = document.getElementById("courses");
const studentsSideBar = document.getElementById("students");
const emptyCourse = document.getElementById("empty-course");
const emptyStudents = document.getElementById("empty-students");
const graphsSideBar = document.getElementById("graphs");
const courses = document.querySelector(".course-page");
const students = document.querySelector(".student-page");
const closeBtns = document.querySelectorAll(".close");
const addCourseModalBtn = document.getElementById("add-course-modal-btn");
const courseName = document.getElementById("cname");
const scaleSelect = document.getElementById("scales");
const courseForm = document.getElementById("course-form");
const studentForm = document.getElementById("student-form");
const coursesGrid = document.querySelector(".courses-grid");
const topCoursesSelect = document.getElementById("top-courses-select");
const studentSituationSelect = document.getElementById(
  "student-situation-select"
);

const totalStudents = document.getElementById("total-students");
const passedStudents = document.getElementById("passed-students");
const failedStudents = document.getElementById("failed-students");

const addStudentModalBtn = document.getElementById("add-student-modal-btn");
const addStudentModal = document.getElementById("student-modal");
const studentModalCourses = document.getElementById("student-modal-courses");

const studentsTable = document.getElementById("table");

/* COURSE PAGE */
const addCourse = (e) => {
  e.preventDefault();
  const course = new Course(courseName.value, scaleSelect.value);
  coursesArray.push(course);
  courseName.value = "";

  addCourseModal.classList.remove("active");

  topCoursesSelect.innerHTML = "";
  coursesArray.forEach((course) => {
    const option = document.createElement("option");
    option.value = course.name;
    option.textContent = course.name;
    topCoursesSelect.appendChild(option);
  });

  checkCourses();
  renderCourseCards();
};

const checkCourses = () => {
  if (coursesArray.length === 0) {
    emptyCourse.innerHTML = "No Courses Added";
  } else {
    emptyCourse.innerHTML = "";
  }
};

const renderCourseCards = () => {
  coursesGrid.innerHTML = "";

  coursesArray.forEach((course) => {
    const courseCard = document.createElement("div");
    courseCard.classList.add("information-container");

    const courseCardHeader = document.createElement("div");
    courseCard.appendChild(courseCardHeader);

    const profileImg = document.createElement("img");
    profileImg.src = "./assets/course (2).png";
    profileImg.classList.add("profile");

    courseCardHeader.appendChild(profileImg);

    const informationDetail = document.createElement("div");
    informationDetail.classList.add("information-detail");
    courseCard.appendChild(informationDetail);

    const informationDetailHeader = document.createElement("h4");
    informationDetailHeader.textContent = course.name;
    informationDetail.appendChild(informationDetailHeader);

    const informationDetailText = document.createElement("p");
    informationDetailText.textContent = "PS: " + course.scale;
    informationDetail.appendChild(informationDetailText);

    coursesGrid.appendChild(courseCard);
  });
};

/* STUDENT PAGE */
const renderOptions = () => {
  studentModalCourses.innerHTML = "";
  coursesArray.forEach((course) => {
    const option = document.createElement("option");
    option.value = course.name;
    option.textContent = course.name;
    studentModalCourses.appendChild(option);
  });
};

const checkStudents = () => {
  if (studentsArray.length === 0) {
    emptyStudents.innerHTML = "No Students Added";
  } else {
    emptyStudents.innerHTML = "";
  }
};

const deleteStudent = (e) => {
  const id = e.target.parentNode.parentNode.firstChild.textContent;
  const studentIndex = studentsArray.findIndex((student) => student.id === id);

  // deleted it and rendered the students
  studentsArray.splice(studentIndex, 1);
  renderStudentRows(studentModalCourses.value, studentSituationSelect.value);
};

const renderStudentRows = (courseName, studentSituation) => {
  studentsTable.innerHTML = "";

  const filteredStudents = studentsArray.filter((student) => {
    const studentCourses = student.courses;
    const courseIndex = studentCourses.findIndex((c) => c.name === courseName);

    return courseIndex !== -1;
  });

  totalStudents.textContent = filteredStudents.length;

  const passedStudentsCount = filteredStudents.filter((student) => {
    const studentCourses = student.courses;
    const course = studentCourses.find((c) => c.name === courseName);

    return course.grade !== "F";
  });

  passedStudents.textContent = passedStudentsCount.length;

  const failedStudentsCount = filteredStudents.filter((student) => {
    const studentCourses = student.courses;
    const course = studentCourses.find((c) => c.name === courseName);

    return course.grade === "F";
  });

  failedStudents.textContent = failedStudentsCount.length;

  let gradeFilter = [];

  if (studentSituation === "all") {
    gradeFilter = filteredStudents;
  } else if (studentSituation === "passed") {
    gradeFilter = passedStudentsCount;
  } else if (studentSituation === "failed") {
    gradeFilter = failedStudentsCount;
  }

  gradeFilter.forEach((student) => {
    const studentRow = document.createElement("tr");

    const studentId = document.createElement("td");
    studentId.textContent = student.id;
    studentRow.appendChild(studentId);

    const studentName = document.createElement("td");
    studentName.textContent = student.name;
    studentRow.appendChild(studentName);

    const studentSurname = document.createElement("td");
    studentSurname.textContent = student.surname;
    studentRow.appendChild(studentSurname);

    const studentCourses = student.courses;
    const foundCourse = studentCourses.find((c) => c.name === courseName);

    const studentMidterm = document.createElement("td");
    studentMidterm.textContent = foundCourse.midterm;
    studentRow.appendChild(studentMidterm);

    const studentFinal = document.createElement("td");
    studentFinal.textContent = foundCourse.final;
    studentRow.appendChild(studentFinal);

    const studentGrade = document.createElement("td");
    studentGrade.textContent = foundCourse.grade;
    studentRow.appendChild(studentGrade);

    const editImg = document.createElement("img");
    editImg.src = "./assets/tool.png";
    editImg.classList.add("icon");

    const deleteImg = document.createElement("img");
    deleteImg.src = "./assets/delete.png";
    deleteImg.classList.add("icon");
    deleteImg.onclick = deleteStudent;

    const actions = document.createElement("td");
    actions.appendChild(editImg);
    actions.appendChild(deleteImg);
    studentRow.appendChild(actions);

    studentsTable.appendChild(studentRow);
  });
};

const addStudent = (e) => {
  e.preventDefault();
  const studentId = document.getElementById("sId");
  const studentName = document.getElementById("s-name");
  const studentSurname = document.getElementById("surname");
  const midterm = document.getElementById("midterm");
  const final = document.getElementById("final");

  const studentCourses = [];

  const scale = coursesArray.find(
    (course) => course.name === studentModalCourses.value
  ).scale;

  const studentCourse = {
    name: studentModalCourses.value,
    midterm: midterm.value,
    final: final.value,
    grade: calculatePointScale(midterm.value, final.value, scale),
  };

  studentCourses.push(studentCourse);

  const student = new Student(
    studentId.value,
    studentName.value,
    studentSurname.value,
    studentCourses
  );

  studentsArray.push(student);
  studentId.value = "";
  studentName.value = "";
  studentSurname.value = "";

  addStudentModal.classList.remove("active");
  checkStudents();
  renderStudentRows(studentModalCourses.value, studentSituationSelect.value);
};

const calculatePointScale = (midterm, final, scale) => {
  const midtermWeight = 0.4;
  const finalWeight = 0.6;

  const average = midterm * midtermWeight + final * finalWeight;

  if (scale == 7) {
    if (average <= 69) {
      return "F";
    } else if (average <= 76) return "D";
    else if (average <= 84) return "C";
    else if (average <= 92) return "B";
    else if (average <= 100) return "A";
  } else if (scale == 10) {
    if (average <= 59) {
      return "F";
    } else if (average <= 69) return "D";
    else if (average <= 79) return "C";
    else if (average <= 89) return "B";
    else if (average <= 100) return "A";
  }
};

addCourseModalBtn.addEventListener("click", () => {
  addCourseModal.classList.add("active");
});

closeBtns.forEach((closeBtn) => {
  closeBtn.addEventListener("click", () => {
    addCourseModal.classList.remove("active");
    addStudentModal.classList.remove("active");
  });
});

coursesSideBar.addEventListener("click", () => {
  courses.classList.add("active");
  students.classList.remove("active");
});

studentsSideBar.addEventListener("click", () => {
  students.classList.add("active");
  courses.classList.remove("active");
});

addStudentModalBtn.addEventListener("click", () => {
  addStudentModal.classList.add("active");
  renderOptions();
});

topCoursesSelect.addEventListener("change", (e) => {
  renderStudentRows(e.target.value, studentSituationSelect.value);
});

studentSituationSelect.addEventListener("change", (e) => {
  renderStudentRows(topCoursesSelect.value, e.target.value);
});

courseForm.addEventListener("submit", addCourse);
studentForm.addEventListener("submit", addStudent);
