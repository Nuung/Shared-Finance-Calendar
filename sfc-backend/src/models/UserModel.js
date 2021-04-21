'use strict';
const User = require('.').User

class UserModel {

    //유저 생성 
    async saveUserByLocalId(data) {
        await User.create({
            id: data.id,
            profile_icon: data.profile_icon,
            nic_name: data.nic_name,
            gender: data.gender,
            password: data.password,
            salt: data.salt
        });
    }

    //유저 id 중복 확인 
    async findUserByLocalId(id) {


        const user = await User.findOne({
            where: {
                id
            },
            raw: true
        })
        return user
    }

    async getUserDataByLocalId(id) {

        const user = await User.findOne({
            attributes: [
                'profile_icon',
                'nic_name',
                'gender'
            ],
            where: {
                id
            }
        })

        return user
    }

    async findUserByLocalPassword(id) {
        //find one 함수가 모든걸 찾아 주는건 아님
        //attributes 함수를 통해서 조절 할 수 있음 
        const user = await User.findOne({
            attributes: [
                'id',
                'salt',
                'password'
            ],
            where: {
                id
            }
        })
        return user;
    }
}

module.exports = UserModel