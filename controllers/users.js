const mongoose = require('mongoose')
const Users = mongoose.model('Users')

module.exports = {
  create: (request, response, next) => {
    const {body} = request

    if (!body.name) {
      return response.status(422).json({
        errors: {
          name: 'is required'
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
      .then(() => response.status(200).json({user: finalUser.toJSON()}))
      .catch(next)
  },

  getAll: (request, response, next) => {
    return Users.find()
      .sort({username: 'ascending'})
      .then(users => response.json({users: users.map(user => user.toJSON())}))
      .catch(next)
  },

  getById: (request, response, next, id) => {
    return  Users.findById(id, (error, user) => {
      if (error) {
        return response.sendStatus(404)
      }
      if (user) {
        request.userObject = user
        return next()
      }
    })
    .catch(next)
  },

  getOne: (request, response, next) => {
    response.json(request.userObject.toJSON())
  },

  edit: (request, response, next) => {
    const {body} = request

    if (typeof body.name !== 'undefined') {
      request.userObject.name = body.name
    }
    if (typeof body.email !== 'undefined') {
      request.userObject.email = body.email
    }
    if (typeof body.password !== 'undefined') {
      request.userObject.password = body.password
    }

    return request.userObject.save()
      .then(() => response.json({user: request.userObject.toJSON()}))
      .catch(next)
  },

  delete: (request, response, next) => {
    return Users.findByIdAndRemove(request.userObject._id)
      .then(() => response.sendStatus(200))
      .catch(next)
  },
}