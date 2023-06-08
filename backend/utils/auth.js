// backend/utils/auth.js
const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');

const { secret, expiresIn } = jwtConfig;

// Sends a JWT Cookie - This first function is setting the JWT cookie after a user is logged in or signed up
const setTokenCookie = (res, user) => {
// Create the token.
const safeUser = { // payload of the JWT will be the user's id, username, and email attributes
    id: user.id,
    email: user.email,
    username: user.username,
};
const token = jwt.sign(
    { data: safeUser },
    secret,
    { expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
);

const isProduction = process.env.NODE_ENV === "production";

// Set the token cookie
res.cookie('token', token, {
    maxAge: expiresIn * 1000, // maxAge in milliseconds
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && "Lax"
});

return token;
};


//can only make some requests if a user is logged in
const restoreUser = (req, res, next) => {
// token parsed from cookies
const { token } = req.cookies;
req.user = null;

return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) {
    return next();
    }

    try {
    const { id } = jwtPayload.data;
    req.user = await User.findByPk(id, {
        attributes: {
        include: ['email', 'createdAt', 'updatedAt']
        }
    });
} catch (e) {
    res.clearCookie('token'); //accounts for weird errors finding user if user found, it will still go next and clear cookies (defensive code) since dont want an error here in production
    return next();
}

if (!req.user) res.clearCookie('token');

return next();
    });
};

//can only make some requests if a user has proper auth
const requireAuth = function (req, _res, next) {
    if (req.user) return next();

    // If there is no current user, return an error
    const err = new Error('Authentication required');
    err.title = 'Authentication required';
    err.errors = { message: 'Authentication required' };
    err.status = 401;
    return next(err);
}


module.exports = { setTokenCookie, restoreUser, requireAuth };
