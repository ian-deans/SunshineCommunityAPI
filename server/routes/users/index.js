const router = require('express').Router()
const controller = require('../../../controllers').users

module.exports = router
  .post('/', controller.create)
  .get('/', controller.getAll)
  .param('id', controller.getById)
  .get('/:id', controller.getOne)
  .patch('/:id', controller.edit)
  .delete('/:id', controller.delete)


// .patch()
// .delete()