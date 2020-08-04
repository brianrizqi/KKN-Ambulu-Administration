function notFoundHandler(req, res, next){
    const error = new Error('Not found : ' + req.originalUrl);
    res.status(404);
    res.send({
        statusCode: 404,
        message: 'Path not found'
    })
}

function errorHandler(err, req, res, next){
    if(err){
        const statusCode = err.statusCode || 500;
        res.status(statusCode);
        res.send({
            statusCode: statusCode,
            message: err.message,
            error: process.env.NODE_ENV === 'production' ? 'Error messages cant be showed' : err.stack
        });
    }
    // const statusCode = err.statusCode || 500;
    // res.status(statusCode);
    // res.send({
    //     statusCode: statusCode,
    //     message: err.message,
    //     error: process.env.NODE_ENV === 'production' ? 'Error messages cant be showed' : err.stack
    // });
}

module.exports = {
    notFoundHandler,
    errorHandler
}
