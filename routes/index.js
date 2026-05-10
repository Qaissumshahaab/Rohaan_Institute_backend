const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const authCtrl = require('../controllers/authController');
const courseCtrl = require('../controllers/courseController');
const mainCtrl = require('../controllers/mainController');

// ─── AUTH ─────────────────────────────────────────────────────────────────────
router.post('/auth/login', authCtrl.login);
router.get('/auth/me', protect, authCtrl.getMe);

// ─── COURSES (Public GET, Private POST/PUT/DELETE) ────────────────────────────
router.get('/courses', courseCtrl.getCourses);
router.get('/courses/:slug', courseCtrl.getCourse);
router.post('/courses', protect, courseCtrl.createCourse);
router.put('/courses/:id', protect, courseCtrl.updateCourse);
router.delete('/courses/:id', protect, courseCtrl.deleteCourse);

// ─── ADMISSIONS ───────────────────────────────────────────────────────────────
router.post('/admissions', mainCtrl.createAdmission);
router.get('/admissions', protect, mainCtrl.getAdmissions);
router.put('/admissions/:id', protect, mainCtrl.updateAdmissionStatus);
router.delete('/admissions/:id', protect, mainCtrl.deleteAdmission);

// ─── CONTACT ──────────────────────────────────────────────────────────────────
router.post('/contact', mainCtrl.createContact);
router.get('/contact', protect, mainCtrl.getContacts);
router.put('/contact/:id/read', protect, mainCtrl.markContactRead);
router.delete('/contact/:id', protect, mainCtrl.deleteContact);

// ─── GALLERY ──────────────────────────────────────────────────────────────────
router.get('/gallery', mainCtrl.getGallery);
router.post('/gallery', protect, mainCtrl.createGalleryItem);
router.delete('/gallery/:id', protect, mainCtrl.deleteGalleryItem);

// ─── STUDENTS ─────────────────────────────────────────────────────────────────
router.get('/students', protect, mainCtrl.getStudents);
router.post('/students', protect, mainCtrl.createStudent);
router.put('/students/:id', protect, mainCtrl.updateStudent);
router.delete('/students/:id', protect, mainCtrl.deleteStudent);

// ─── ADMIN MANAGEMENT ─────────────────────────────────────────────────────────
router.get('/admins', protect, authorize('super_admin'), mainCtrl.getAdmins);
router.post('/admins', protect, authorize('super_admin'), mainCtrl.createAdmin);
router.delete('/admins/:id', protect, authorize('super_admin'), mainCtrl.deleteAdmin);

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
router.get('/dashboard/stats', protect, mainCtrl.getDashboardStats);

module.exports = router;
