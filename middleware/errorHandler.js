const errorHandler = (err, req, res, next) => {
    if (err instanceof Error) {
        res.status(err.statusCode || 500).json({
            success: false,
            message: `${err.message || '錯誤'}`,
        });
    } else {
        res.status(500).json({
            success: false,
            message: '錯誤',
        });
    }
};

module.exports = { errorHandler };