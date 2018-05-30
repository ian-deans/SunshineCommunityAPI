const db = require('../../db')
const router = require('express').Router()
const Users = db.model('Users')

module.exports = router
  .get('/', (request, response, next) => {
    return Users.find()
      .sort({name: 'descending'})
      .then(users => response.json({users: users.map(user => user.toJSON())}))
      .catch(next)
  })

  .post('/', (request, response, next) => {
    const {body} = request

    if (!body.name) {
     response.status(422).json({
       errors: {
         name: 'is required.'
       }
     })
    }
    if (!body.email) {
      response.status(422).json({
        errors: {
          email: 'is required.'
        }
      })
     }
     if (!body.password) {
      response.status(422).json({
        errors: {
          password: 'is required.'
        }
      })
     }

    response.status(200).json({
      message: "Post route successful",
      data: body
    })
  })

  // .patch()
  // .delete()