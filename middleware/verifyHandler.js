const jwt = require('jsonwebtoken');
const util = require('util');

const jwtVerify = util.promisify(jwt.verify);
const secret = 'QQVtuber';

const verifyToken = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            const error = new Error();
            error.statusCode = 401;
            error.message = 'no token';
            throw error;
        }
        const decoded = await jwtVerify(token, secret);
        const { _id, name, account } = decoded;
        req.identity = { _id, name, account };
        next();
    } catch (error) {
        console.error(error);
        if (error.name === 'TokenExpiredError') {
            const error = new Error();
            error.statusCode = 401;
            error.message = 'TokenExpiredError';
            throw error;
        }
        next(error);
    }
};

module.exports = { verifyToken };