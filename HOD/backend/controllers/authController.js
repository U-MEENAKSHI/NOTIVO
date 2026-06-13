const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const Hod = require('../models/Hod');

// Helper to send email
const sendEmail = async (options) => {
  let transporter;
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    });
  } else {
    let testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email", port: 587, secure: false,
      auth: { user: testAccount.user, pass: testAccount.pass },
    });
  }
  const message = {
    from: `${process.env.FROM_NAME || 'HOD Portal'} <${process.env.FROM_EMAIL || 'noreply@hodlogin.com'}>`,
    to: options.email,
    subject: options.subject,
    html: options.htmlMessage
  };
  const info = await transporter.sendMail(message);
  if (!process.env.EMAIL_USER) {
    const previewUrl = nodemailer.getTestMessageUrl(info);
    console.log("Email Preview URL: %s", previewUrl);
    return previewUrl;
  }
  return null;
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate request
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Find user by email
    const hod = await Hod.findOne({ email });

    if (!hod) {
      return res.status(404).json({ message: 'Account not found with that email.' });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, hod.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid Email/Password Credentials.' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: hod._id, email: hod.email },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: hod._id,
        email: hod.email
      }
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error during authentication.' });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required to reset password.' });
    
    const hod = await Hod.findOne({ email });
    if (!hod) {
      // Don't leak that the email doesn't exist
      return res.status(200).json({ message: 'If that email exists, a password reset link has been sent.' });
    }

    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');
    
    // Hash token and set to hod document
    hod.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    hod.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 mins
    await hod.save();

    // Create reset url (using frontend's current origin)
    const origin = req.headers.origin || 'http://localhost:5173';
    const resetUrl = `${origin}/reset-password/${resetToken}`;

    const htmlMessage = `
      <div style="font-family: Arial, sans-serif; max-w: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h2 style="color: #1a1f36; margin-bottom: 20px;">Password Reset Request</h2>
        <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">You requested a password reset. Please click the button below to set a new password.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #22c55e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">Reset My Password</a>
        </div>
        <p style="color: #6b7280; font-size: 14px;">Or copy and paste this link into your browser:</p>
        <p style="color: #3b82f6; font-size: 14px; word-break: break-all;"><a href="${resetUrl}">${resetUrl}</a></p>
        <hr style="border-top: 1px solid #e5e7eb; margin: 30px 0;" />
        <p style="color: #9ca3af; font-size: 12px;">This link will expire in 10 minutes. If you did not request this, please ignore this email.</p>
      </div>
    `;

    try {
      const previewUrl = await sendEmail({
        email: hod.email,
        subject: 'HOD Portal - Password Reset Request',
        htmlMessage
      });

      res.status(200).json({ 
        message: 'If that email exists, a password reset link has been sent.',
        previewUrl // Attached for development convenience
      });
    } catch (err) {
      hod.resetPasswordToken = undefined;
      hod.resetPasswordExpire = undefined;
      await hod.save();
      console.error(err);
      return res.status(500).json({ message: 'Email could not be sent' });
    }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error processing password reset.' });
    }
};

exports.resetPassword = async (req, res) => {
  try {
    // Get hashed token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const hod = await Hod.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!hod) {
      return res.status(400).json({ message: 'Invalid or expired password reset token' });
    }

    const { password } = req.body;
    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Set new password
    const salt = await bcrypt.genSalt(10);
    hod.password = await bcrypt.hash(password, salt);
    
    // Clear reset token fields
    hod.resetPasswordToken = undefined;
    hod.resetPasswordExpire = undefined;
    
    await hod.save();

    res.status(200).json({ message: 'Password reset successful. You can now login.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error resetting password.' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    // req.user is set by authMiddleware
    const hod = await Hod.findById(req.user.id).select('-password');
    if (!hod) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(hod);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching profile.' });
  }
};
