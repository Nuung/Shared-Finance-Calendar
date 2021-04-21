'use strict';
const OAuth = require('.').OAuth

class OAuthModel {

    //OAuth 유저 생성 
    async saveOAuthByLocalId(data) {
        await OAuth.create({
            id: data.id,
            userId: data.userId,
            is_oauth: data.is_oauth
        });
    }

    //유저 id 중복 확인 
    async findOAuthById(id) {
        const user = await OAuth.findOne({
            where: { id }
        });
        return user;
    }

    async getUserIdBylId(id) {
        const user = await OAuth.findOne({
            attributes: [
                'userId',
                'is_oauth'
            ],
            where: { id }
        })
        return user;
    }
}

module.exports = OAuthModel;