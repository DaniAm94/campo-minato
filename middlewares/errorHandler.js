module.exports = (err, req, res, next) => {
    console.error(err);
    const statusCode = err.statusCode || 500;
    const message = err.customMessage || 'Server Error';
    console.log(err);
    res.status(statusCode).json({ error: message });
}