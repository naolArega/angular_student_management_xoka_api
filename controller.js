const model = require("./model");

const types = {
    STUDENT: "students",
    CLASS: "classes",
    COURSE: "courses",
    TEST: "tests",
    TEST_RESULT: "testresults"
};

function responedResult(objectResult, res) {
    console.log(objectResult);
    if (objectResult.success) {
        res.status(200).json(objectResult);
    }
    else {
        if (objectResult.error_code === 500) {
            res.status(500).json({ success: false, code: 500, message: "server side error" });
        }
        else {
            res.status(404).json({ success: false, code: 404, message: "not found" });
        }
    }
}

function typeNotFound() {
    return {
        message: "type not found"
    };
}

let getAllObjects = async (req, res) => {
    let type = req.params.type;
    let objectResult;

    switch (type) {
        case types.STUDENT:
            objectResult = await model.Student.students();
            break;
        case types.CLASS:
            objectResult = await model.Class.classes();
            break;
        case types.COURSE:
            objectResult = await model.Course.courses();
            break;
        case types.TEST:
            objectResult = await model.Test.tests();
            break;
        case types.TEST_RESULT:
            objectResult = await model.TestResult.testResults();
            break;
        default:
            objectResult = typeNotFound();
            break;
    }
    responedResult(objectResult, res);
}

let getSingleObject = async (req, res) => {
    let type = req.params.type;
    let id = req.params.id;
    let objectResult;

    switch (type) {
        case types.STUDENT:
            objectResult = await model.Student.readStudent(id);
            break;
        case types.CLASS:
            objectResult = await model.Class.readClass(id);
            break;
        case types.COURSE:
            objectResult = await model.Course.readCourse(id);
            break;
        case types.TEST:
            objectResult = await model.Test.readTest(id);
            break;
        case types.TEST_RESULT:
            objectResult = await model.TestResult.readTestResult(id);
            break;
        default:
            objectResult = typeNotFound();
            break;
    }
    responedResult(objectResult, res);
}

let createNewObject = async (req, res) => {
    let type = req.params.type;
    let objectResult;
    let newObject;

    switch (type) {
        case types.STUDENT:
            newObject = new model.Student(
                req.body.name,
                req.body.age,
                req.body.year,
                req.body.classid,
                req.body.courseId);
            objectResult = await newObject.createStudent();
            break;
        case types.CLASS:
            newObject = new model.Class(req.body.floorNumber);
            objectResult = await newObject.createClass();
            break;
        case types.COURSE:
            newObject = new model.Course(
                req.body.name,
                req.body.instructor);
            objectResult = await newObject.createCourse();
            break;
        case types.TEST:
            newObject = new model.Test(
                req.body.courseId,
                req.body.question);
            objectResult = await newObject.createTest();
            break;
        case types.TEST_RESULT:
            newObject = new model.TestResult(
                req.body.studentId,
                req.body.testId,
                req.body.result);
            objectResult = await newObject.createTestResult();
            break;
        default:
            objectResult = typeNotFound();
            break;
    }
    responedResult(objectResult, res);
}

let updateObject = async (req, res) => {
    let type = req.params.type;
    let id = req.params.id;
    let updateObject;
    let objectResult;

    switch (type) {
        case types.STUDENT:
            updateObject = new model.Student(
                req.body.name,
                req.body.age,
                req.body.year,
                req.body.classid,
                req.body.courseId);
            objectResult = await updateObject.updateStudent(id);
            break;
        case types.CLASS:
            updateObject = new model.Class(req.body.floorNumber);
            objectResult = await updateObject.updateClass(id);
            break;
        case types.COURSE:
            updateObject = new model.Course(
                req.body.name,
                req.body.instructor);
            objectResult = await updateObject.updateCourse(id);
            break;
        case types.TEST:
            updateObject = new model.Test(
                req.body.courseId,
                req.body.question);
            objectResult = await updateObject.updateTest(id);
            break;
        case types.TEST_RESULT:
            updateObject = new model.TestResult(
                req.body.testId,
                req.body.result);
            objectResult = await updateObject.updateTestResult(id);
            break;
        default:
            objectResult = typeNotFound();
            break;
    }
    responedResult(objectResult, res);
}

let deleteObject = async (req, res) => {
    let type = req.params.type;
    let id = req.params.id;
    let objectResult;

    switch (type) {
        case types.STUDENT:
            objectResult = await model.Student.deleteStudent(id);
            break;
        case types.CLASS:
            objectResult = await model.Class.deleteClass(id);
            break;
        case types.COURSE:
            objectResult = await model.Course.deleteCourse(id);
            break;
        case types.TEST:
            objectResult = await model.Test.deleteTest(id);
            break;
        case types.TEST_RESULT:
            objectResult = await model.TestResult.deleteTestResult(id);
            break;
        default:
            objectResult = typeNotFound();
            break;
    }
    responedResult(objectResult, res);
}

module.exports = {
    getAllObjects,
    getSingleObject,
    createNewObject,
    updateObject,
    deleteObject
};