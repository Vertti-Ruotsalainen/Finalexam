const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'courses.json');
let courses = [];

// Load existing courses from file
if (fs.existsSync(DATA_FILE)) {
  courses = JSON.parse(fs.readFileSync(DATA_FILE));
}

// GET all courses
app.get('/courses', (req, res) => {
  res.json(courses);
});

// POST create a new course
app.post('/courses', (req, res) => {
  const { name, grade } = req.body;
  const newCourse = { id: Date.now().toString(), name, grade };
  courses.push(newCourse);
  fs.writeFileSync(DATA_FILE, JSON.stringify(courses, null, 2));
  res.status(201).json(newCourse);
});

// PUT update an existing course
app.put('/courses/:id', (req, res) => {
  const { id } = req.params;
  const { name, grade } = req.body;
  const course = courses.find(c => c.id === id);
  if (!course) {
    return res.status(404).json({ error: 'Course not found' });
  }
  course.name = name;
  course.grade = grade;
  fs.writeFileSync(DATA_FILE, JSON.stringify(courses, null, 2));
  res.json(course);
});

// DELETE a course
app.delete('/courses/:id', (req, res) => {
  const { id } = req.params;
  const index = courses.findIndex(c => c.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Course not found' });
  }
  const deleted = courses.splice(index, 1)[0];
  fs.writeFileSync(DATA_FILE, JSON.stringify(courses, null, 2));
  res.json(deleted);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));