const mongoose = require('mongoose');

// 발생한 비용과 실제 참석한 사람(즉 정산 대상자)를 체크하면 일정에 태그되어 있던 사람들에게 비용 청구 메세지가 간다.
const schedule = new mongoose.Schema({
    createUserId: String, // 모임 주 
    targetAccount: String, // 모임 주의 계좌, account 
    sharedUserId: [String],
    startTime: Date,
    endTime: Date,
    location: [Number], // lat long
    memo: String,
    status: { // 일정이 끝났다 → (또는 수동으로 끝낼 수 있다) // 0은 안끝남, 1은 끝남
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

schedule.set('collection', 'schedule'); // collection 이름 정하기
module.exports = mongoose.model('schedule', schedule);