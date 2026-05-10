const { Admission, Contact, Gallery } = require('../models/index');
const Student = require('../models/Student');
const Admin = require('../models/Admin');

// ─── ADMISSION ───────────────────────────────────────────────────────────────

exports.createAdmission = async (req, res, next) => {
  try {
    const admission = await Admission.create(req.body);
    res.status(201).json({ success: true, admission });
  } catch (error) {
    next(error);
  }
};

exports.getAdmissions = async (req, res, next) => {
  try {
    const admissions = await Admission.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: admissions.length, admissions });
  } catch (error) {
    next(error);
  }
};

exports.updateAdmissionStatus = async (req, res, next) => {
  try {
    const admission = await Admission.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!admission) return res.status(404).json({ success: false, message: 'Not found' });
    res.status(200).json({ success: true, admission });
  } catch (error) {
    next(error);
  }
};

exports.deleteAdmission = async (req, res, next) => {
  try {
    await Admission.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Deleted' });
  } catch (error) {
    next(error);
  }
};

// ─── CONTACT ─────────────────────────────────────────────────────────────────

exports.createContact = async (req, res, next) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json({ success: true, contact });
  } catch (error) {
    next(error);
  }
};

exports.getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: contacts.length, contacts });
  } catch (error) {
    next(error);
  }
};

exports.markContactRead = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    res.status(200).json({ success: true, contact });
  } catch (error) {
    next(error);
  }
};

exports.deleteContact = async (req, res, next) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Deleted' });
  } catch (error) {
    next(error);
  }
};

// ─── GALLERY ─────────────────────────────────────────────────────────────────

exports.getGallery = async (req, res, next) => {
  try {
    const { category } = req.query;
    const query = { isActive: true };
    if (category && category !== 'All') query.category = category;
    const items = await Gallery.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, items });
  } catch (error) {
    next(error);
  }
};

exports.createGalleryItem = async (req, res, next) => {
  try {
    const item = await Gallery.create(req.body);
    res.status(201).json({ success: true, item });
  } catch (error) {
    next(error);
  }
};

exports.deleteGalleryItem = async (req, res, next) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Deleted' });
  } catch (error) {
    next(error);
  }
};

// ─── STUDENT ─────────────────────────────────────────────────────────────────

exports.getStudents = async (req, res, next) => {
  try {
    const students = await Student.find().populate('course', 'title').sort({ registrationDate: -1 });
    res.status(200).json({ success: true, count: students.length, students });
  } catch (error) {
    next(error);
  }
};

exports.createStudent = async (req, res, next) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json({ success: true, student });
  } catch (error) {
    next(error);
  }
};

exports.updateStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) return res.status(404).json({ success: false, message: 'Not found' });
    res.status(200).json({ success: true, student });
  } catch (error) {
    next(error);
  }
};

exports.deleteStudent = async (req, res, next) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Deleted' });
  } catch (error) {
    next(error);
  }
};

// ─── ADMIN MANAGEMENT ────────────────────────────────────────────────────────

exports.getAdmins = async (req, res, next) => {
  try {
    const admins = await Admin.find().select('-password');
    res.status(200).json({ success: true, admins });
  } catch (error) {
    next(error);
  }
};

exports.createAdmin = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const admin = await Admin.create({ name, email, password, role });
    res.status(201).json({
      success: true,
      admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) return res.status(404).json({ success: false, message: 'Not found' });
    if (admin.role === 'super_admin') {
      return res.status(403).json({ success: false, message: 'Cannot delete super admin' });
    }
    await Admin.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Admin deleted' });
  } catch (error) {
    next(error);
  }
};

// ─── DASHBOARD STATS ─────────────────────────────────────────────────────────

exports.getDashboardStats = async (req, res, next) => {
  try {
    const Course = require('../models/Course');
    const [students, admissions, contacts, courses] = await Promise.all([
      Student.countDocuments(),
      Admission.countDocuments(),
      Contact.countDocuments({ isRead: false }),
      Course.countDocuments({ isActive: true }),
    ]);

    const recentAdmissions = await Admission.find().sort({ createdAt: -1 }).limit(5);

    res.status(200).json({
      success: true,
      stats: { students, admissions, unreadMessages: contacts, courses },
      recentAdmissions,
    });
  } catch (error) {
    next(error);
  }
};
