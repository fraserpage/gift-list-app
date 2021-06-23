function index(req, res, next) {
  if (req.user){
    res.redirect('/groups')
  }
  else{
    res.render('index', {
      title: 'home',
      user: req.user,
    });
  }
  
}

module.exports = {index}