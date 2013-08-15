#route 
module.exports = -> 
  # Filters
  # sampleAdminFilter = (req, res, next) ->
  #   if not req.session? or req.session.user isnt 'admin' 
  #     console.log  'no session' 
  #     res.redirect 'session/new'
  #   else  
  #     console.log  req.session 
  #     next()

  # 'Static page' routes
  @get '/', require('./controllers/welcome').welcome

  # RESTful
  @resource 'users', require('./controllers/user')

  # Nested route sample
  # users = @resource 'users', require('./controllers/user')
  # installs = @resource 'installs', require('./controllers/install')
  # users.add installs
