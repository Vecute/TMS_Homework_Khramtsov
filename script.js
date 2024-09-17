// С ниже приведенным объектом решить следующие задачи:
// 1. Создать строку из названий предметов написанных через запятую
// 2. Подсчитать общее количество студентов и учителей на всех предметах
// 3. Получить среднее количество студентов на всех предметах
// 4. Создать массив из объектов предметов
// 5. Получить массив из предметов и отсортировать по количеству преподавателей на факультете от большего к меньшему

const subjects = {
    mathematics: {
        students: 200,
        teachers: 6
    },
    biology: {
        students: 120,
        teachers: 6
    },
    geography: {
        students: 60,
        teachers: 2
    },
    chemistry: {
        students: 100,
        teachers: 3
    }
}

// Task 1
    let stringFromObject = Object.keys(subjects).join(', ');
    console.log(stringFromObject);
// Task 2
    let totalStudents = 0;
    let totalTeachers = 0;

    Object.values(subjects).forEach(subject => {
        totalStudents += subject.students;
        totalTeachers += subject.teachers;
    });

    console.log(`Общее количество студентов: ${totalStudents}`);
    console.log(`Общее количество учителей: ${totalTeachers}`);
// Task 3
    let subjectCount = Object.keys(subjects).length;
    let studentAmount = 0;

    Object.values(subjects).forEach(subject => {
        studentAmount += subject.students;
    });

    let averageStudents = studentAmount / subjectCount;

    console.log(`Среднее количество студентов: ${averageStudents}`);
// Task 4
    let subjectsArray = Object.keys(subjects).map(key => ({name: key, ...subjects[key]}));

    console.log(subjectsArray);
// Task 5
    let sortedSubjects = Object.keys(subjects).sort((a, b) => subjects[b].teachers - subjects[a].teachers);

    console.log(sortedSubjects);