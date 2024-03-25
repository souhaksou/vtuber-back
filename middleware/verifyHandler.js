const verifyToken = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'no token'
            });
        }
        req.token = JSON.parse(Base64.decode(token));
        next();
    } catch (error) {

    }
};


module.exports = { verifyToken };