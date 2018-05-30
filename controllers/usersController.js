const mongoose = require('mongoose')
const Users = mongoose.model('Users')

module.exports = {
  create: (request, response, next) => {
    const {body} = request

    if (!body.username) {
      return response.status(422).json({
        errors: {
          username: 'is required'
        }
      })
    }

    if (!body.email) {
      return response.status(422).json({
        errors: {
          email: 'is required'
        }
      })
    }

    if (!body.password) {
      return response.status(422).json({
        errors: {
          password: 'is required'
        }
      })
    }

    const finalUser = new Users(body)
    return finalUser.save()
      .then(() => response.json({user: finalUser.toJSON()}))
      .catch(next)
  },

  getAll: (request, response, next) => {
    return Users.find()
      .sort({username: 'ascending'})
      .then(users => res.json({users: users.map(user => user.toJSON())}))
  }
}