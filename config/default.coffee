
# Dependencies
express = require 'express'
assets = require 'connect-assets'
mongoose = require 'mongoose'
global._ = require 'underscore'

module.exports = ->
	baseDir = @set 'baseDir'

	# Define Port
	@port = process.env.PORT or process.env.VMC_APP_PORT or 3000

	@set 'views', baseDir + '/views'
	@set 'view engine', 'jade'
	@set 'view options', {layout: true}
	
	# DB Setting.
	# db_config = "mongodb://#{config.DB_USER}:#{config.DB_PASS}@#{config.DB_HOST}:#{config.DB_PORT}/#{config.DB_NAME}"
	# mongoose.connect db_config
	mongoose.connect 'mongodb://localhost/' + 'dbname'

	# Access-Control-Allow-Origin
	# @use (req, res, next) ->
	# 	res.header 'Access-Control-Allow-Origin', '*'
	# 	res.header 'Access-Control-Allow-Headers', 'X-Requested-With'
	# 	next()

	# Allow parsing of request bodies and '_method' parameters
	@use express.bodyParser()
	@use express.methodOverride()

	# Add Connect Assets.
	@use assets()
	# Set the public folder as static assets.
	@use express.static(baseDir + '/public')
	
	# Enable cookies
	@use express.cookieParser('your secret here')

	# session setting
	@use express.session({
		secrete: 'my screte',
		maxAge: 3600000
	})
	
	# Mount application routes
	@use @router

	# Helper
	require('../helpers/helper')(@)
	@use @helpers

	# Routin works
	
