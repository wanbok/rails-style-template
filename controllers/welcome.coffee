# Welcome Controller
class WelcomeController 

  welcome: (req, res) ->
    res.render 'index', {title: 'Rails-style-template'}

module.exports = new WelcomeController