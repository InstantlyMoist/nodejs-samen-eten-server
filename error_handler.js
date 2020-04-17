let createError = (res, message, code) => {
    let errorObject = {
        statusCode: code,
        message: message,
        time: Date.now()
    }
    res.status(code).json(errorObject);
}

exports.createError = createError;