const Joi = require('joi');
const MongoConnection = require('../configs/mongo');
const BcryptHash = require('../configs/hash')
const jwt = require('jsonwebtoken');

const UserService = class UserService {
    static async authLogin(req, res, next) {
        const schema = Joi.object({
            username: Joi.string()
                .alphanum()
                .required(),

            password: Joi.string()
                .required()
        });

        const validation = schema.validate({
            username: req.body.username,
            password: req.body.password
        })

        if(validation.error){
            res.send({
                statusCode: 422,
                message: validation.error.message
            });
        } else {
            const user = await MongoConnection.findOne({
                username: req.body.username
            }, 'users');

            if(!user){
                res.send({
                    statusCode: 401,
                    message: `User with username ${req.body.username} not found`
                });
            } else {
                const checkPassword = await BcryptHash.check(req.body.password, user.password);
                if(checkPassword){
                    const jwtToken = await jwt.sign({
                        user,
                        exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    }, process.env.JWT_SECRET || 'secret');
                    
                    delete user['password'];
                    res.send({
                        statusCode: 200,
                        message: 'Login Success',
                        data: {
                            token: jwtToken,
                            user
                        }
                    })
                } else {
                    res.send({
                        statusCode: 401,
                        message: `Password doesn't match`
                    })
                }
            }
        }
    }
}

module.exports = UserService;
