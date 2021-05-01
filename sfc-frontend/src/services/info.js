// 인포 그래픽 관련 
import axios from 'axios';

// 로그인
export function getEndAlert(userId) {
    return axios.get(`http://3.35.6.3:3000/api/alert/calculation/${userId}`);
}
