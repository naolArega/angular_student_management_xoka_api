BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "students" (
	"student_id"	TEXT,
	"name"	TEXT,
	"age"	INTEGER,
	"year"	INTEGER,
	"class_id"	TEXT,
	"course_id" TEXT,
	PRIMARY KEY("student_id"),
	FOREIGN KEY("class_id") REFERENCES "classes"("class_id"),
	FOREIGN KEY("course_id") REFERENCES "courses"("course_id")
);
CREATE TABLE IF NOT EXISTS "test_results" (
	"student_id"	TEXT,
	"test_id"	TEXT,
	"result"	REAL,
	FOREIGN KEY("student_id") REFERENCES "students"("student_id"),
	FOREIGN KEY("test_id") REFERENCES "tests"("test_id")
);
CREATE TABLE IF NOT EXISTS "tests" (
	"test_id"	TEXT,
	"course_id"	TEXT,
	"question"	TEXT,
	PRIMARY KEY("test_id"),
	FOREIGN KEY("course_id") REFERENCES "courses"("course_id")
);
CREATE TABLE IF NOT EXISTS "courses" (
	"course_id"	TEXT,
	"name"	TEXT,
	"instructor"	TEXT,
	PRIMARY KEY("course_id")
);
CREATE TABLE IF NOT EXISTS "classes" (
	"class_id"	TEXT,
	"floor_number"	INTEGER,
	PRIMARY KEY("class_id")
);
COMMIT;
