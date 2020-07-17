const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if(bearerHeader){
        const bearerToken = bearerHeader.split(' ')[1];
        jwt.verify(bearerToken, process.env.JWT_SECRET || 'secret', (err, auth) => {
            if(err){
                res.send({
                    statusCode: 401,
                    message: 'Unauthorized'
                })
            } else {
                next();
            }
        })
    } else {
        res.send({
            statusCode: 401,
            message: 'Unauthorized'
        })
    }
}

module.exports = { verifyToken };