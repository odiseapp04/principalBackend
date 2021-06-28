import jwt from 'jsonwebtoken';

/**
 * Generate JsonWebToken from user
 */
function generateJWT(user){
    return jwt.sign({ data: user }, process.env.SEED, { expiresIn: '30 days' });
}

/**
 * Decode JsonWebToken
 * @param {*} token => jwt
 */
function decodeJWT(token){
    return jwt.verify(token.replace("Bearer ",""), process.env.SEED);
}

module.exports.generateJWT = generateJWT;
module.exports.decodeJWT = decodeJWT;