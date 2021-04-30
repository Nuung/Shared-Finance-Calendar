const mongoose = require('mongoose');

// 발생한 비용과 실제 참석한 사람(즉 정산 대상자)를 체크하면 일정에 태그되어 있던 사람들에게 비용 청구 메세지가 간다.
const alert_log = new mongoose.Schema({
    userId: String, // 로그 주인
    fromUserId: String, // 로그 남긴 사람
    targetSchedule: String, // 스케쥴 object id string 값
    targetAccount: String, // 모임 주의 계좌, account 
    amount: Number,
    memo: String,
    status: { // 로그 확인했니 안했니, 0은 안했음 1은 했음 
        type: Number,
        default: 0
    }, 
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

alert_log.set('collection', 'alert_log'); // collection 이름 정하기
module.exports = mongoose.model('alert_log', alert_log);