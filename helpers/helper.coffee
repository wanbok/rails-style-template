module.exports = (app) ->
	app.helpers = (req, res, next) ->
    # res.locals = locals
    # req.flash = app.flash
    # res.locals.flash = req.flash()
    next()