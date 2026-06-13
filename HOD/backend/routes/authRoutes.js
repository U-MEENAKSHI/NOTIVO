const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// POST /api/hod/login - Day 1 Frame 1 API
router.post('/login', authController.login);

// POST /api/hod/forgot-password - Day 1 Frame 2 Dummy API
router.post('/forgot-password', authController.forgotPassword);

// PUT /api/hod/reset-password/:token - Password Reset
router.put('/reset-password/:token', authController.resetPassword);

// GET /api/hod/profile - Protected route example
router.get('/profile', authMiddleware, authController.getProfile);

module.exports = router;
