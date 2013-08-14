
# Dependencies
express = require 'express'

# Server production configuration
module.exports = ->
    
  # Simple error reporting - should display a 500 page
  @use express.errorHandler()

  exports.DEBUG_LOG=false
  exports.DEBUG_WARN=false
  exports.DEBUG_ERROR=true
  exports.DEBUG_CLIENT=false