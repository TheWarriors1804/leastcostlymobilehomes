const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

// get solo user
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const newUser = await User.find({
      where: {
        id
      },
      include: [{all: true}]
    })
    res.json(newUser)
  } catch (err) {
    next(err)
  }
})

// update User
router.put('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    const updated = await user.update(req.body)
    res.json(updated)
  } catch (err) {
    console.error(err)
  }
})

// delete user
router.delete('/:id', async (req, res, next) => {
  try {
    console.log('delete express', req.params.id)
    await User.destroy({
      where: {
        id: req.params.id
      }
    }).then(() => res.status(204).end())
  } catch (err) {
    next(err)
  }
})
