const bcrypt = require('bcrypt');

const SALT_ROUNDS = 12;

const BcryptHash = class BcryptHash {
    static async check(plain, hash){
        return await bcrypt.compare(plain, hash);
    }

    static async hash(plain){
        return await bcrypt.hash(plain, SALT_ROUNDS);
    }
}

module.exports = BcryptHash;