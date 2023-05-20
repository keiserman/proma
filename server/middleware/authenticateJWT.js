const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, 'your-secret-key', (error, user) => {
            if (error) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};