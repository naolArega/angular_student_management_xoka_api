const knexConnection = require("./knex_connection");
const alphNum = require("alphanumeric-random-string-generator");

const tableNames = {
    student: "students",
    class: "classes",
    course: "courses",
    test: "tests",
    testResult: "test_results"
};

let operationSuccess = (result) => {
    console.log(result);
    let data = {};
    if (Object.keys(result).length > 0) {
        data = {
            success: true,
            result
        };
    }
    else {
        data = {
            success: false,
            error_message: "not found"
        };
    }
    return data;
}

let operationFailure = (err) => {
    console.error(err);
    let errorData = {
        success: false,
        error_message: err
    }
    return errorData;
}

function createObject(tableName, insertObject) {
    return knexConnection(tableName).insert(insertObject)
        .then(operationSuccess)
        .catch(operationFailure);
}

function fetchAll(tableName) {
    return knexConnection(tableName).select("*")
        .then(operationSuccess)
        .catch(operationFailure);
}

function fetchObject(tableName, fetchKeyId) {
    return knexConnection(tableName)
        .where(fetchKeyId).select("*")
        .then(operationSuccess)
        .catch(operationFailure);
}

function updateObject(tableName, updateKeyId, newObject) {
    return knexConnection(tableName)
        .where(updateKeyId).update(newObject)
        .then(operationSuccess)
        .catch(operationFailure);
}

function deleteObject(tableName, deleteKeyId) {
    return knexConnection(tableName)
        .where(deleteKeyId).del()
        .then(operationSuccess)
        .catch(operationFailure);
}

class Student {
    studentId;
    name;
    age;
    year;
    classId;

    constructor(name, age, year, classId) {
        this.studentId = alphNum(8);
        this.name = name;
        this.age = age;
        this.year = year;
        this.classId = classId;
        console.log(this.studentId);
    }

    createStudent() {
        let studentObject = {
            student_id: this.studentId,
            name: this.name,
            age: this.age,
            year: this.year,
            class_id: this.classId
        };
        return createObject(tableNames.student, studentObject);
    }
    updateStudent(studentId) {
        let newObject = {
            name: this.name,
            age: this.age,
            year: this.year,
            class_id: this.classId
        };
        return updateObject(tableNames.student, { "student_id": studentId }, newObject);
    }
    static deleteStudent(studentId) {
        return deleteObject(tableNames.student, { "student_id": studentId });
    }
    static readStudent(studentId) {
        return fetchObject(tableNames.student, { "student_id": studentId });
    }
    static students() {
        return fetchAll(tableNames.student);
    }
}

class Class {
    classId;
    floorNumber;
    constructor(floorNumber) {
        this.classId = alphNum(8);
        this.floorNumber = floorNumber;
    }

    createClass() {
        let classObject = {
            class_id: this.classId,
            floor_number: this.floorNumber,
        };
        return createObject(tableNames.class, classObject);
    }
    updateClass(classId) {
        let newObject = {
            floor_number: this.floorNumber,
        };
        return updateObject(tableNames.class, { "class_id": classId }, newObject);
    }
    static deleteClass(classId) {
        return deleteObject(tableNames.class, { "class_id": classId });
    }
    static readClass(classId) {
        return fetchObject(tableNames.class, { "class_id": classId });
    }
    static classes() {
        return fetchAll(tableNames.class);
    }
}

class Course {
    courseId;
    name;
    instructor;
    constructor(name, instructor) {
        this.courseId = alphNum(8);
        this.name = name;
        this.instructor = instructor;
    }

    createCourse() {
        let courseObject = {
            course_id: this.courseId,
            name: this.name,
            instructor: this.instructor
        };
        return createObject(tableNames.course, courseObject);
    }
    updateCourse(courseId) {
        let newObject = {
            name: this.name,
            instructor: this.instructor
        };
        return updateObject(tableNames.course, { "course_id": courseId }, newObject);
    }
    static deleteCourse(courseId) {
        return deleteObject(tableNames.course, { "course_id": courseId });
    }
    static readCourse(courseId) {
        return fetchObject(tableNames.course, { "course_id": courseId });
    }
    static courses() {
        return fetchAll(tableNames.course);
    }
}

class Test {
    testId;
    courseId;
    question;
    constructor(courseId, question) {
        this.testId = alphNum(8);
        this.courseId = courseId;
        this.question = question;
    }

    createTest() {
        let testObject = {
            course_id: this.courseId,
            name: this.name,
            instructor: this.instructor
        };
        return createObject(tableNames.test, testObject);
    }
    updateTest(courseId) {
        let newObject = {
            name: this.name,
            instructor: this.instructor
        };
        return updateObject(tableNames.test, { "test": testId }, newObject);
    }
    static deleteTest(testId) {
        return deleteObject(tableNames.test, { "test": testId });
    }
    static readTest(testId) {
        return fetchObject(tableNames.test, { "test": testId });
    }
    static tests() {
        return fetchAll(tableNames.test);
    }
}

class TestResult {
    studentId;
    testId;
    result;
    constructor(studentId, testId, result) {
        this.studentId = studentId;
        this.testId = testId;
        this.result = result;
    }

    createTestResult() {
        let testResultObject = {
            student_id: this.studentId,
            test_id: this.testId,
            result: this.result
        };
        return createObject(tableNames.testResult, testResultObject);
    }
    updateTestResult(studentId, testId) {
        let newObject = {
            result: this.result
        };
        return updateObject(tableNames.testResult, {
            "student_id": studentId,
            "test_id": testId
        }, newObject);
    }
    static deleteTestResult(studentId, testId) {
        return deleteObject(tableNames.testResult, {
            "student_id": studentId,
            "test_id": testId
        });
    }
    static readTestResult(studentId, testId) {
        return fetchObject(tableNames.testResult, {
            "student_id": studentId,
            "test_id": testId
        });
    }
    static testResults() {
        return fetchAll(tableNames.testResult);
    }
}

module.exports = {
    Student,
    Class,
    Course,
    Test,
    TestResult
};