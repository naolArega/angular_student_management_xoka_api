const express = require("express");
const model = require("./model");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/students", async (req, res) => {
    let studentResult = await model.Student.students();
    console.log(studentResult);
    if (studentResult.success) {
        res.status(200).json(studentResult);
    }
    else {
        res.status(404).json({ success: false });
    }
});

app.get("/students/:id", async (req, res) => {
    let studentResult = await model.Student.readStudent(req.params.id);
    if (studentResult.success) {
        res.status(200).json(studentResult);
    }
    else {
        res.status(404).json({ success: false, message: studentResult.error_message });
    }
});

app.post("/students", async (req, res) => {
    let newStudent = new model.Student(req.body.name,
        req.body.age,
        req.body.year,
        req.body.classid);
    let result = await newStudent.createStudent();
    if (result.success) {
        res.status(200).json(result);
    }
    else {
        res.status(404).json({ success: false });
    }
});

app.patch("/students/:id", async (req, res) => {
    let updateStudent = new model.Student(
        req.body.name,
        req.body.age,
        req.body.year,
        req.body.classid);
    let studentResult = await updateStudent.updateStudent(req.params.id);
    if (studentResult.success) {
        res.status(200).json(studentResult);
    }
    else {
        res.status(404).json({ success: false, message: studentResult.error_message });
    }
});

app.delete("/students/:id", async (req, res) => {
    let studentResult = await model.Student.deleteStudent(req.params.id);
    if (studentResult.success) {
        res.status(200).json(studentResult);
    }
    else {
        res.status(404).json({ success: false, message: studentResult.error_message });
    }
});

app.listen(80, "api.studentangularxoka.io", () => {
    console.log("Api server is now running at api.studentangularxoka.io");
});