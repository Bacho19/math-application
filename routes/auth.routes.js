const { Router } = require('express')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const config = require('config')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const auth = require('../middleware/auth.middleware')
const router = Router()

// /api/auth/register
router.post(
  '/register',
  [
    check('email', 'Incorrect email').isEmail(),
    check('password', 'Minimum password length 6 characters').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect registration data',
        })
      }

      const { email, password, username } = req.body

      const candidateEmail = await User.findOne({ email })
      const candidateUser = await User.findOne({ username })

      if (candidateEmail) {
        return res
          .status(400)
          .json({ message: 'User with same email already exists' })
      }

      if (candidateUser) {
        return res
          .status(400)
          .json({ message: 'User with same name already exists' })
      }

      const hashedPassword = await bcrypt.hash(password, 12)

      const user = new User({
        username,
        email,
        emailToken: crypto.randomBytes(64).toString('hex'),
        password: hashedPassword,
        isAdmin: false,
        isVerified: false,
      })

      let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587, // 587
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'mathmath4242@gmail.com', // generated ethereal user
          pass: 'application123', // generated ethereal password
        },
        requireTLS: true,
        tls: {
          rejectUnauthorized: false,
        },
      })

      // send mail with defined transport object
      let msgInfo = {
        from: '"Math - tasks" <mathtasks@math.com>', // sender address
        to: user.email, // list of receivers
        subject: 'Math - Account verification',
        text: `
                Hey! thanks for registering on the site.
                Copy and paste this link to verify your account.
                http://${req.headers.host}/verify-email/${user.emailToken}
            `,
        html: `
                <h1 style="color: #455A64;">Hey!</h1>
                <p style="font-size: 18px">Thank you for registering on the site.</p>
                <p style="font-size: 18px">Click on the link below to verify your account.</p>
                <a href="http://localhost:3000/verify-email/${user.emailToken}">Account Verification</a>
            `, // ${req.headers.host}
      }

      await transporter.sendMail(msgInfo, (error, info) => {
        if (error) {
          return console.log(error)
        }
        console.log('Message sent: %s', info.messageId)
      })

      await user.save()
      res.status(201).json({ message: 'User created' })
    } catch (e) {
      res
        .status(500)
        .json({ message: 'Something went wrong, please try again' })
    }
  }
)

// email verification route
// /api/auth/verify-email
router.get('/verify-email/:emailToken', async (req, res, next) => {
  try {
    const user = await User.findOne({ emailToken: req.params.emailToken })
    if (!user) {
      // error message frontend ??
      // return res.redirect('/')
    }
    user.emailToken = null
    user.isVerified = true
    await user.save()
    res.status(201).json({ message: 'User created' })
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, please try again.' })
  }
})

// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Enter correct email').isEmail(),
    check('password', 'Enter password').exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect login data',
        })
      }

      const { email, password } = req.body

      const user = await User.findOne({ email })

      if (!user) {
        return res.status(400).json({ message: 'User is not found' })
      }

      if (!user.isVerified) {
        return res.status(400).json({ message: 'Account is not activated' })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res
          .status(400)
          .json({ message: 'Invalid username or password, please try again' })
      }

      const token = jwt.sign({ userId: user.id }, config.get('jwtSecret'))

      res.json({ token, userId: user.id })
    } catch (e) {
      res
        .status(500)
        .json({ message: 'Something went wrong, please try again' })
    }
  }
)

// /api/auth/get-user
router.get('/get-user', auth, async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"
    if (!token) {
      return res.status(401).json({ message: 'No authorization' })
    }

    const decoded = jwt.verify(token, config.get('jwtSecret'))
    let user = await User.findById(decoded.userId)
    res.json(user)
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, please try again' })
  }
})

module.exports = router
