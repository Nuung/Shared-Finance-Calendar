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




// 
export function getEndAlert(userId) {
    return axios.get(`http://3.35.6.3:3000/api/alert/calculation/${userId}`);
}
