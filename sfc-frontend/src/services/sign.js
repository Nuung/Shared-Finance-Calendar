// 인증, 로그인, 회원가입에 해당하는 모든 부분
import axios from 'axios';

// 로그인
export function getSignIn(userId) {
    return axios.get(`http://3.35.6.3:3000/api/user/${userId}`);
}

// 회원 가입
export function getSignUp(data) {
    const options = {
        method: 'POST',
        url: `http://3.35.6.3:3000/api/user`,
        data: data
    };

    // request 
    return axios.request(options);
}

// 문자 인증, 토큰 값 얻기
export function getAuthToken(data) {
    /*
    {
        "phoneNumber":"01053285816",
        "name":"정현우",
        "birth":"950604"
    }
    */
    const options = {
        method: 'POST',
        url: `http://3.35.6.3:3000/api/user/phone`,
        data: data
    };

    // request 
    return axios.request(options);
}

// 문자 인증, 토큰 값 체크
export function getAuthTokenChk(data) {
    /*
    {
        "birth":"950704",
        "auth_number":"123123",
        "auth_token":"MG05313998037253019842"
    }
    */
    const options = {
        method: 'POST',
        url: `http://3.35.6.3:3000/api/user/phone/auth`,
        data: data
    };

    // request 
    return axios.request(options);
}

// create schedule
export function postSchedule() {
    const options = {
        method: 'POST',
        url: `http://3.35.6.3:3000/api/schedule`,
        data: {
            "userId": "qlgks1",
            "account": "10023105*****",
            "sharedUserId": ["qlgks0", "qlgks2", "qlgks3", "qlgks4"],
            "startTime": "2021-04-28T15:36:05.761+00:00",
            "endTime": "2021-04-28T15:36:05.761+00:00",
            "location": [37.663998, 127.978462],
            "memo": "스터디 모임"
        }
    };

    // request 
    return axios.request(options);
}