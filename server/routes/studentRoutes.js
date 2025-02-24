const express = require('express');
const Student = require('../models/Student');
const protect = require('../middleware/authMiddleware'); 
const sendEmail = require('../utils/mailer'); 
const upload = require('../utils/multer');
const {evaluate} = require('../utils/llm');

const router = express.Router();

// CREATE a new student
router.post('/', protect, upload.single('file'), async (req, res) => {
  const { name, email, jd } = req.body;

  const file = req.file;  // Multer will store the uploaded file information in req.file

  // File upload is optional for testing
  // if (!file) {
  //   return res.status(400).json({ message: 'Please upload a file.' });
  // }

  try {
    const newStudent = new Student({
      name,
      email,
      uid : req.user.userId,
      jd,
      status : "Processing"
    });

    await newStudent.save();

    const filePath = file.path;
    const responseText = await evaluate(jd, filePath);
    console.log(responseText);
    if(!responseText['JD Match'] || !responseText['MissingKeywords']){
      newStudent.status = 'ATS SCORING FAILED';
    }
    else{
      newStudent.status = 'Evaluated';
      newStudent.atsScore = responseText['JD Match'];
      newStudent.profileSummary = responseText['Profile Summary'];
    }
    await newStudent.save();

    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// READ all students
router.get('/', protect, async (req, res) => {
  try {
    const students = await Student.find({uid : req.user.userId});
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ a single student by ID
router.get('/:id', protect, async (req, res) => {
  const { id } = req.params;

  try {
    const student = await Student.findById(id, {}, {uid : req.user.userId});
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE a student by ID
router.put('/:id', protect, async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const student = await Student.findById(id, {}, {uid : req.user.userId});
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    student.name = name || student.name;
    student.email = email || student.email;

    await student.save();
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE a student by ID
router.delete('/:id', protect, async (req, res) => {
  const { id } = req.params;

  try {
    const student = await Student.findById(id, {}, {uid : req.user.userId});
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    await student.deleteOne();
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/send-email/:id', protect, async (req, res) => {
  const { id } = req.params;
  const { subject, message } = req.body;

  // Check if req.user is defined
  if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: 'User not authenticated' });
  }

  try {
      const student = await Student.findOne({ _id: id, uid: req.user.userId });

      if (!student) {
          return res.status(404).json({ message: 'Student not found' });
      }

      const emailSent = await sendEmail(student.email, subject, message);

      res.json({
          info: emailSent,
      });
  } catch (error) {
      res.status(500).json({ message: 'Error sending email', error: error.message });
  }
});

router.post('/evaluate/:id', async (req, res) => {
  const { id } = req.params;
  const { filePath } = req.body;

  try {
    const student = await Student.findById(id, {}, {uid : req.user.userId});

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Call the evaluate function from utils/llm.js
    const responseText = await evaluate(student.jd, filePath);

    // Update the student status
    student.status = 'Evaluated';
    student.atsScore = responseText['JD Match'];
    await student.save();

    // Respond with the evaluation response
    res.json({ message: 'Evaluation completed', response: student });
  } catch (error) {
    res.status(500).json({ message: 'Error evaluating student', error: error.message });
  }
});


module.exports = router;
