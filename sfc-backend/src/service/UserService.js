
const Usermodel = require('../models/UserModel');
const OAuthmodel = require('../models/OAuthModel');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

//서비스는 유저와 관련 된 함수를 구현하는 파트 
class UserService {

    constructor() {
        this.Usermodel = new Usermodel();
        this.OAuthmodel = new OAuthmodel();
    }

    //create token
    makeToken(id) {
        const token = jwt.sign(
            {
                userId: id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: 365 * 24 * 60 * 60,
                issuer: 'ddmap'
            }
        )
        return token;
    }

    encryptPasswd(password) {
        try {
            const salt = crypto.randomBytes(64).toString('base64')
            const encryptedPasswd = crypto
                .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
                .toString('base64')

            const encryptInfo = {
                salt,
                encryptedPasswd
            }
            return encryptInfo
        } catch (error) {
            console.log(error);
            return new Error(error);
        }
    }

    verifyPassword(salt, password, passwordToVerify) {
        try {
            console.log('verifyPassword')
            const encryptedPasswdToVerify = crypto
                .pbkdf2Sync(passwordToVerify, salt, 10000, 64, 'sha512')
                .toString('base64')

            if (encryptedPasswdToVerify === password) {
                return true
            } else {
                return false
            }
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

    async findUserByLocalId(local_id) {
        try {
            const user = await this.Usermodel.findUserByLocalId(local_id);
            const userId = user ? user.id : null;
            return userId;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    async saveUserByLocalId(data) {
        try {
            const user = await this.Usermodel.saveUserByLocalId(data);
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

    // Sign up -> if OAuth -> Create OAuth row
    async saveUserToOAuth(data) {
        try {
            const user = await this.OAuthmodel.saveOAuthByLocalId(data);
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

    // Kakao OAuth Login -> OAuth -> Kakao에서 return해주는 고유 id값만 체크하고 그걸로 로그인만 하면 됨
    async findUserOAuthlId(id) {
        try {
            const user = await this.OAuthmodel.findOAuthById(id);
            const userId = user ? user.id : null;
            return userId;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    async findUserByLocalPasswd(id) {
        try {
            const user = await this.Usermodel.findUserByLocalPassword(id);
            if (user) return user;
            else return null;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    async getUserDataByLocalId(local_id) {

        try {
            const user = await this.Usermodel.getUserDataByLocalId(local_id)

            if (user) {

                return user
            }

        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }


}

module.exports = UserService;