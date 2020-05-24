const expressJwt = require('express-jwt');
const userController = require('../controller/userController');

module.exports = jwt;

function jwt() {
    const secret = process.env.SECRET;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            '/user/login',
            '/user/register',
            '/user/check/:id'
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userController.getById(payload.sub);

    if (!user) {
        return done(null, true);
    }

    done();
};