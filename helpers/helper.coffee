utile = require 'utile'

class Form
  constructor: (@model, @mName, @errs) ->
    @errs = errs || []
    @id = (key) ->
      return '"' + @mName + '_' + key + '"'

    @name = (key) ->
      return '"' + @mName + '[' + key + ']"'

    @layout_header = (key) ->
      ret = ''
      ret+= '<div class="control-group' + (if @errs[key] then ' error' else '') + '">'
      ret+= '<label class="control-label" for=' + @id(key) + '>'
      ret+= utile.inflect.titleize(key) + '</label><div id=' + @id(key) + ' class="controls">'
      return ret

    @layout_footer = (key) ->
      ret = (if @errs[key] then '<span class="help-inline">' + @errs[key] + '</span>' else '')
      ret+= '</div></div>'
      return ret

    @layout = (key, inp) ->
      ret = @layout_header(key)
      ret+= inp
      ret+= @layout_footer(key)
      return ret

  layout_header: (key) ->
    return @layout_header(key)

  layout_footer: (key) ->
    return @layout_footer(key)
    
  text: (key) ->
    return @layout(key, '<input type="text" class="input-xlarge" id=' + @id(key) + ' name=' + @name(key) + ' value="' + (if @model[key] then @model[key] else '') + '"/>')

  textarea: (key) ->
    return @layout(key, '<textarea class="input-xxlarge" rows="10" id=' + @id(key) + ' name=' + @name(key) + '>' + (if @model[key] then @model[key] else '') + '</textarea>')

  select: (key, vals, names) ->
    opt = ''
    names = names || vals

    for val, i in vals
      s = (if (@model[key] && @model[key]==vals[i]) then '" selected="selected"' else '"')
      opt += '<option value="' + vals[i] + s + '>' + names[i] + '</option>'

    return @layout(key, '<select class="input-xlarge" id=' + @id(key) + 'name=' + @name(key) + '>' + opt + '</select>')

  checkbox: (key, vals, names, inline) ->
    opt = ''
    inline = (if inline then ' inline' else '')
    names = names || vals

    for val, i in vals
      c = (if (@model[key] && @model[key]==vals[i]) then '" checked="checked"' else '"')
      opt += '<label class="checkbox' + inline + '"><input type="checkbox" name=' + @name(key) + ' value="' + vals[i] + c + '/>' + names[i] + '</label>'

    return @layout(key, opt)

  radio: (key, vals, names, inline) ->
    opt = ''
    inline = (if inline then ' inline' else '')
    names = names || vals

    for val, i in vals
      c = (if (@model[key] && @model[key]==vals[i]) then '" checked="checked"' else '"')
      opt += '<label class="radio' + inline + '"><input type="radio" name=' + @name(key) + ' value="' + vals[i] + c + '/>' + names[i] + '</label>'

    return @layout(key, opt)

  hidden: (key, val) ->
    return '<input type="hidden" id=' + @id(key) + ' name=' + @name(key) + ' value="' + (if @model[key] then @model[key] else '') + '"/>'

module.exports = (app) ->
	app.locals.form = (model, mName, errs) ->
    return new Form(model, mName, errs)
	app.helpers = (req, res, next) ->
    # res.locals = locals
    # req.flash = app.flash
    # res.locals.flash = req.flash()
    next()