// 인증, 로그인, 회원가입에 해당하는 모든 부분
import axios from 'axios';

export function getSignIn(userId) {
    return axios.get(`http://3.35.6.3:3000/api/user/${userId}`);
}
