const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const validator = require('validator');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // In production, use env var

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: true,
  credentials: true
}));

// Serve static files from frontend
app.use(express.static(path.join(__dirname, 'frontend')));

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/vibethon';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Invalid email']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Instance method to check password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.redirect('/signIn.html');

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.redirect('/signIn.html');
    req.user = user;
    next();
  });
};

// Routes

// Signup
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Create user
    const user = new User({ name, email, password });
    await user.save();

    res.json({ message: 'Signup successful', redirect: '/signIn.html' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password, remember } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT
    const expiresIn = remember ? '30d' : '1h';
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn
    });

    // Set cookie
    const maxAge = remember ? 30 * 24 * 60 * 60 * 1000 : 60 * 60 * 1000;
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      maxAge
    });

    res.json({ message: 'Login successful', redirect: '/dashboard.html' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Logout
app.post('/api/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out', redirect: '/signIn.html' });
});

// Protected route example
app.get('/dashboard.html', authenticateToken, (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dashboard.html'));
});

// Check auth status
app.get('/api/auth/status', (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.json({ authenticated: false });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.json({ authenticated: false });
    res.json({ authenticated: true, user });
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'CareerPilot AI Backend is running 🚀' });
});

// ─────────────────────────────────────────────────────────────────────────────
// GEMINI QUIZ & CODE EXECUTION ENDPOINTS
// ─────────────────────────────────────────────────────────────────────────────

const axios = require('axios');

// POST /api/generate-quiz - Generate quiz questions using Gemini API
app.post('/api/generate-quiz', async (req, res) => {
  const { language = 'Python', topic = 'Basics', difficulty = 'Medium' } = req.body;

  const prompt = `
You are an expert programming quiz generator for a gamified AI/ML learning platform called CareerPilot AI.

Generate exactly 5 challenging questions.

Programming Language: ${language}
Topic: ${topic}
Difficulty Level: ${difficulty}

Rules:
- Questions must test deep understanding, not just syntax recall
- Each question must have exactly 4 options
- The answer field must be the INDEX (0-3) of the correct option
- Include real code snippets where it makes sense (leave empty string "" if not applicable)
- Explanations should be detailed and educational (2-3 sentences)
- Make it feel premium and professional

Return ONLY valid JSON — no markdown, no backticks, no extra text:
{
  "topic": "${topic}",
  "language": "${language}",
  "difficulty": "${difficulty}",
  "questions": [
    {
      "question": "Question text here",
      "code": "optional code snippet here or empty string",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer": 0,
      "explanation": "Detailed explanation of why the correct answer is right and why others are wrong."
    }
  ]
}
`;
  try {
    console.log('📝 Incoming Quiz request:', req.body);
    const webhookRes = await axios.post('https://hook.eu1.make.com/bg4rj2j1pisgmln8c2iroabrgltnemod', {
      language,
      topic,
      difficulty
    });

    res.json(webhookRes.data);

  } catch (err) {
    console.error('❌ Error generating quiz:', err.response?.data || err.message);
    res.status(500).json({
      error: 'Failed to generate quiz. Please try again.',
      detail: err.message,
    });
  }
});

// POST /api/run-code - Simulate code execution via Gemini
app.post('/api/run-code', async (req, res) => {
  console.log('🚀 Incoming Code Runner request:', req.body);
  const { code = '', language = 'Python' } = req.body;

  if (!code.trim()) {
    return res.json({ output: '', error: 'No code provided.', ai_explanation: '' });
  }

  try {
    const webhookRes = await axios.post('https://hook.eu1.make.com/4atrqtgj72rtg6743z7hyhaxkb823yio', {
      code,
      language
    });

    res.json(webhookRes.data);

  } catch (err) {
    console.error('❌ Error running code:', err.message);
    res.status(500).json({ output: '', error: 'Execution failed.', ai_explanation: '' });
  }
});

// Serve HTML files
app.get('/', (req, res) => {
  res.redirect('/hero.html');
});

app.listen(PORT, () => {
  console.log(`\n🚀 CareerPilot AI Backend running on http://localhost:${PORT}`);
  console.log(`   MongoDB: ${process.env.MONGODB_URI ? '✅ Configured' : '⚠️  Local instance'}`);
  console.log(`   Gemini API: ${process.env.GEMINI_API_KEY ? '✅ Loaded' : '❌ Missing'}\n`);
});
