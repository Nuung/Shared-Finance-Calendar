import React from 'react';
import { Checkbox } from 'semantic-ui-react';
import './ScheduleEndModal.css';

const ScheduleEndModal = () => {
    const name = "hyemin";
    const amount = "10000";
    return (
        <React.Fragment>
            <div className="Modal-overlay" />
            <div className="Modal">
                <p className="title">모임 종료</p>
                <p>{amount}원이 나왔습니다.</p>
                <div className="content">
                    <p>정산할 멤버를 고르세요</p>
                    <div>
                        <Checkbox label={name} />
                        <Checkbox label={name} />
                        <Checkbox label={name} />
                    </div>
                </div>
                <div className="button-wrap">
                    <button> 알림보내기 </button>
                </div>
            </div>
        </React.Fragment>
    )
}
export default ScheduleEndModal;