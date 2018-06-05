const router = require('express').Router()
const {User} = require('../db/models')
const {Product} = require('../db/models/product')
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

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const newUser = await User.find({
      where: {
        id
      },
      // include: {model: Product}
    })
    res.json(newUser)
  } catch (err)
    {next(err)}
})
