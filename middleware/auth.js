const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Protect routes - verify JWT token
exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = await Admin.findById(decoded.id).select('-password');

    if (!req.admin || !req.admin.isActive) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Token invalid or expired' });
  }
};

// Authorize specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.admin.role)) {
      return res.status(403).json({
        success: false,
        message: `Role '${req.admin.role}' is not authorized for this action`,
      });
    }
    next();
  };
};
