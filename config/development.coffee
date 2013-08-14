
# Dependencies
express = require 'express'

# Server development configuration
module.exports = ->
    
  # Output sensible errors with the full stack trace
  @use express.errorHandler(
    dumpExceptions: true
    showStack: true
  )

  exports.DEBUG_LOG=true
  exports.DEBUG_WARN=true
  exports.DEBUG_ERROR=true
  exports.DEBUG_CLIENT=true
  exports.DB_HOST = 'localhost'
  exports.DB_PORT = "3306"
  exports.DB_NAME = 'mvc_example'
  exports.DB_USER = 'root'
  exports.DB_PASS = 'root'