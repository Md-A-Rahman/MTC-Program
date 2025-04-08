const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.teacherId) {
        return next();
    }
    res.redirect('/'); // Redirect to login page if not authenticated
};

module.exports = isAuthenticated;