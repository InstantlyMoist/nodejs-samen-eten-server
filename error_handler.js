let createError = (res, message, code) => {
    let errorObject = {
        statusCode: code,
        errorMessage: message,
        time: Date.now()
    }
    res.status(code).end(errorObject);
}

exports.createError = createError;