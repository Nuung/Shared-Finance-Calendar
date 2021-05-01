// 유저 프로필, 인포 그래픽 관련 
import axios from 'axios';


// Get targetUser's Transaction (최근 거래 내역)
export function getTransaction(account) {
    const options = {
        method: 'GET',
        url: `http://3.35.6.3:3000/api/transaction/${account}`
    };

    // request 
    return axios.request(options);
}


// Get 캘린더에 등록한 일정 중에 모임이 끝나고 정산한 것 
export function getcalculationMonthly(userId) {
    return axios.get(`http://3.35.6.3:3000/api/alert/calculation/${userId}`);
}

// 내가 이체한 내역과 내가 이체 받은 내역을 한꺼번에 보기
export function getRank(userId) {
    return axios.get(`http://3.35.6.3:3000/api/alert/rank/${userId}`);
}