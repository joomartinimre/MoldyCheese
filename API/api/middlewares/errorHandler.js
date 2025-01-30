exports.notFoundError = (req, res, next) =>
{
    const error = new Error("Not Found");

    error.status = 404;

    next(error);
}

exports.showError = (error, req, res, next) =>
{
    const message = error.message || "Unknown Error";

    const status = error.status || 500;

    res.status(status).send(message);
}