exports.formView = (req, res) => {
    res.render('form/form')
}

exports.create = (req, res) => {
    console.log(req.body)
    res.send('mangtap')
}