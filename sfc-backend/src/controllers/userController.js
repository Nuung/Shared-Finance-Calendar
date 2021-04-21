'use strict';

const UserService = require('../service/UserService')


const signUp = async (req, res) => {
    const userService = new UserService();
    const {
        body: {
            id,
            profile_icon,
            nic_name,
            gender,
            password,
            is_oauth
        }
    } = req;

    try {
        const exUserId = await userService.findUserByLocalId(id)

        if (exUserId) {
            const errorMessage = '이미 가입 된 사용자 입니다.'
            return res.status(401).json({ errorMessage })
        } else {
            const encryptPasswd = userService.encryptPasswd(password)

            let iconValue = '';
            if (profile_icon == 1) {
                iconValue = 'character1.jpg';
            } else if (profile_icon == 2) {
                iconValue = 'character2.jpg';
            }

            // profile_icon의 경우 번호를 입력받아서 기존 데이터베이스에 저장 된 
            // 이미지 주소를 매칭시켜서 저장해주는게 나을듯 
            await userService.saveUserByLocalId({
                id
                , profile_icon: iconValue
                , salt: encryptPasswd.salt
                , nic_name
                , gender
                , password: encryptPasswd.encryptedPasswd
            });


            // oauth일 경우 OAuth Table에 추가 -> is_oauth
            if (is_oauth === 1) {
                await userService.saveUserToOAuth({
                    id: id, userId: id, is_oauth
                });
            }
            else {

            }

            // sign up 과 동시에 토큰 발급 
            const token = userService.makeToken(id);
            const data = {
                message: '회원가입에 성공했습니다',
                token
            };
            return res.status(201).json({ data });
        }
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

// id 중복 체크 API
const signUpIdCheck = async (req, res) => {
    const userService = new UserService();
    const targetId = req.params.id;

    // params check!
    if (!targetId || targetId == null) {
        const errorMessage = "request params 값 체크 부탁 드리겠습니다."
        return res.status(401).json({ error: errorMessage });
    }

    try {
        const exUserId = await userService.findUserByLocalId(targetId);
        if (exUserId) {
            const errorMessage = '이미 가입 된 사용자 입니다.'
            return res.status(401).json({ errorMessage });
        } else {
            const data = {
                message: '사용 가능한 아이디 입니다.'
            };
            return res.status(200).json({ data });
        };
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: error });
    }
};

const localSignin = async (req, res) => {

    const userService = new UserService();

    //여기 로직 
    try {
        const {
            body: {
                id,
                password
            }
        } = req;

        // request first, Find user by id 
        const userpw = await userService.findUserByLocalPasswd(id); 
        if (!userpw) {
            const data = { message: '존재하지 않는 아이디 입니다.' }
            return res.status(401).json({ data });
        }

        const checkPasswd = userService.verifyPassword(userpw.salt, userpw.password, password)
        const token = userService.makeToken(userpw.id);

        if (checkPasswd && id === userpw.id) {
            //login 성공 메시지 
            const data = {
                message: '로그인에 성공했습니다.',
                token
            }
            return res.status(201).json({ data });

        } else {
            const data = {
                message: '비밀번호 또는 아이디가 일치하지 않습니다.'
            }
            return res.status(401).json({ data });
        }

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

// getUserData user의 정보를 가져오는게 필요 할듯 
const getUserData = async (req, res) => {

    const id = req.token.userId;
    const userService = new UserService();
    const userData = await userService.getUserDataByLocalId(id);

    if (userData) {
        const data = {
            profile_icon: `http://localhost:3000/img/${userData.profile_icon}`,
            nic_name: userData.nic_name,
            gender: userData.gender,
        }
        return res.status(201).json({ data });
    } else {
        const data = {
            message: '일치하는 유저가 없습니다.'
        }
        return res.status(401).json({ data });
    }
};


const kakaoSignin = async (req, res) => {
    
    const userService = new UserService();
    const kakaoId = req.body.id; // body value
    
    try {
        if (!kakaoId) {
            const data = { message: '올바른 카카오 계정을 선택 또는 로그인 해주세요!' }
            return res.status(401).json({ data });
        }

        // request first, Find user by OAuth Kakao id 
        const targetUser = await userService.findUserOAuthlId(kakaoId); 
        if (!targetUser) {
            const data = { message: '존재하지 않는 아이디 입니다. 회원가입 부터 해주세요!' }
            return res.status(401).json({ data });
        }

        const token = userService.makeToken(targetUser);
        if (kakaoId === targetUser) {
            //login 성공 메시지 
            const data = {
                message: '로그인에 성공했습니다.',
                token
            }
            return res.status(201).json({ data });

        } else {
            const data = {
                message: '비밀번호 또는 아이디가 일치하지 않습니다.'
            }
            return res.status(401).json({ data });
        }
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};


const kakaoSigncallBack = async (req, res) => {
    passport.authenticate('login-kakao', {
        successRedirect: '/main',
        failureRedirect: '/'
    });
};


module.exports = {
    signUp,
    signUpIdCheck,
    localSignin,
    getUserData,
    kakaoSignin,
    kakaoSigncallBack
}



