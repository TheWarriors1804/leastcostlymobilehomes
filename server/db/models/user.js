const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  phone: {
    type: Sequelize.STRING
  },
  address: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
    type: Sequelize.STRING
  }
})

module.exports = User

/* SOME NOTES ON SALT AND HASHES
If you look at the seeded users table, passwords look like this:
3b649989f9b54e673806f9d8c575e242487241f1ec058327b5997320b953c24e

They have been hashed and salted. This is a one-way process and cannot be reversed. The actual passwords are never stored on the server. When a user logs in, the salt and hash are reapplied to the inputted pw to get the encrypted one. The two passwords are then compared.

Hashing alone is not secure because hackers can use brute force (millions of logins with common PWs) If two users have the same pw, they will have the same hash. This leads to security vulnerabilities as PWs are more predictable.

A salt is a random sequence that is created when a user makes or changes a PW. Each user has a unique salt. This random sequence is prepended to the password before hashing occurs. As a result, all hashed pw's are different and thus harder to predict.

Reading: https://crackstation.net/hashing-security.htm
*/

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

/**
 * classMethods
 */
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
