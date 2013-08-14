#route 
module.exports = -> 
	# content negotiation function
	addingFormat = (req, res, next) ->
		req.format = req.route.path.substring(req.route.path.lastIndexOf('.') + 1)
		next()

	sessionFilter = (req, res, next) ->
		if not req.session? or req.session.user isnt 'admin' 
			console.log  'no session' 
			res.redirect 'session/new'
		else	
			console.log  req.session 
			next()
	#	next()

	# 'Session Login'
	#@get '/session/new', require('./controllers/session').login

	@get '/session/new', require('./controllers/session').login
	@post '/session/auth', require('./controllers/session').auth


	# 'Static page' routes
	@get '/', sessionFilter, require('./controllers/home').home
	@get '/gcm', sessionFilter, require('./controllers/gcm').test
	@get '/user_usage', sessionFilter, require('./controllers/report').user_usage
	@get '/user_usage.json', sessionFilter, addingFormat, require('./controllers/report').user_usage
	@get '/correlate', sessionFilter, require('./controllers/report').correlate
	@get '/correlate.json', sessionFilter, addingFormat, require('./controllers/report').correlate
	@get '/track_location', sessionFilter, require('./controllers/report').trackLocation
	@get '/track_location.json', sessionFilter, addingFormat, require('./controllers/report').trackLocation
	@get '/scoped_report', sessionFilter, require('./controllers/report').scopedReport
	@get '/scoped_report.json', sessionFilter, addingFormat, require('./controllers/report').scopedReport
	# @get '/reports/survey', require('./controllers/report').surveyCorrelation

	# RESTful
	@resource 'apps', require('./controllers/app')
	@resource 'categories', require('./controllers/category')
	@resource 'usages', require('./controllers/usage')
	@resource 'surveys', require('./controllers/survey')
	@resource 'friendships', require('./controllers/friendship')

	# Nested by User
	users = @resource 'users', require('./controllers/user')
	installs = @resource 'installs', require('./controllers/install')

	users.add installs
