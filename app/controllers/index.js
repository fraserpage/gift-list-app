function index(req, res, next) {
  res.render('index', {
    title: 'home',
    user: req.user,
  });
}

module.exports = {index}