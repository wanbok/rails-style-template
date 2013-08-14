User = require '../models/user'

# User model's CRUD controller.
class UserController 

  # Lists all users
  index: (req, res) ->
    User.find {}, (err, users) ->
      switch req.format
        when 'json' then res.json users
        else res.render 'users/index', {users: users}

  new: (req, res) ->
    res.render 'users/new', {user: new User, errs: null}

  edit: (req, res) ->
    User.findOne {userId: req.params.user}, (err, user) ->
      if err
        user = err
        res.statusCode = 500
      switch req.format
        when 'json' then res.json user
        else res.render 'users/edit', {user: user, errs: null}

  # Creates new user with data from `req.body.user`
  create: (req, res) ->
    user = new User req.body.user
    user.save (err, user) ->
      if not err
        res.send user
        res.statusCode = 201
      else
        res.send err
        res.statusCode = 500
        
  # Gets user by id
  show: (req, res) ->
    User.findOne {userId: req.params.user}, (err, user) ->
      if err
        user = err
        res.statusCode = 500
      switch req.format
        when 'json' then res.json user
        else res.render 'users/show', {user: user}

  # Updates user with data from `req.body.user`
  update: (req, res) ->
    console.log 'Update user'
    User.findOneAndUpdate {userId: req.params.user}, {"$set": req.body.user}, {upsert: true}, (err, user) ->
      if not err
        console.log 'Succeed updating user'
        console.log user
        res.send user
        res.statusCode = 200
      else
        console.log 'Failed updating user'
        res.send err
        res.statusCode = 500
    
  # Deletes user by id
  destroy: (req, res) ->
    User.findOneAndRemove {userId: req.params.user}, (err) ->
      if not err
        res.send {}
      else
        res.send err
        res.statusCode = 500

module.exports = new UserController