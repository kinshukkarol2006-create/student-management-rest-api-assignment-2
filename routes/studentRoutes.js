const express = require('express');
const students = require('../data/students');

const router = express.Router();

function parseId(rawId) {
  if (!/^\d+$/.test(rawId)) return null;
  const id = Number(rawId);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}

function validateStudent(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return 'Request body must be a JSON object';
  }
  const { name, age, course } = body;
  if (typeof name !== 'string' || !name.trim()) return '"name" is required and must be a non-empty string';
  if (!Number.isInteger(age) || age < 1 || age > 120) return '"age" is required and must be an integer between 1 and 120';
  if (typeof course !== 'string' || !course.trim()) return '"course" is required and must be a non-empty string';
  return null;
}

router.get('/', (req, res) => res.status(200).json(students));

router.get('/:id', (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) return res.status(400).json({ error: 'Student id must be a positive integer' });
  const student = students.find((item) => item.id === id);
  if (!student) return res.status(404).json({ error: 'Student with id ' + id + ' was not found' });
  return res.status(200).json(student);
});

router.post('/', (req, res) => {
  const validationError = validateStudent(req.body);
  if (validationError) return res.status(400).json({ error: validationError });
  const nextId = students.reduce((highest, student) => Math.max(highest, student.id), 0) + 1;
  const student = { id: nextId, name: req.body.name.trim(), age: req.body.age, course: req.body.course.trim() };
  students.push(student);
  return res.status(201).json(student);
});

router.put('/:id', (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) return res.status(400).json({ error: 'Student id must be a positive integer' });
  const index = students.findIndex((item) => item.id === id);
  if (index === -1) return res.status(404).json({ error: 'Student with id ' + id + ' was not found' });
  const validationError = validateStudent(req.body);
  if (validationError) return res.status(400).json({ error: validationError });
  students[index] = { id, name: req.body.name.trim(), age: req.body.age, course: req.body.course.trim() };
  return res.status(200).json(students[index]);
});

router.delete('/:id', (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) return res.status(400).json({ error: 'Student id must be a positive integer' });
  const index = students.findIndex((item) => item.id === id);
  if (index === -1) return res.status(404).json({ error: 'Student with id ' + id + ' was not found' });
  const [deletedStudent] = students.splice(index, 1);
  return res.status(200).json({ message: 'Student deleted successfully', student: deletedStudent });
});

module.exports = router;
