import React, { useState, useEffect } from 'react';
import { Checkbox, Button } from 'semantic-ui-react';
import './ScheduleEndModal.css';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TransactionList from '../info/TransactionList/TransactionList'


const fetchEndSchedule = (props) => {

    // data parsing
    const userInfo = JSON.parse(window.localStorage.userInfo);
    const userListChk = document.getElementsByClassName("user__checkbox");
    const payListChk = document.querySelectorAll(".transaction__list__item");
    const userList = []; // get list of user who is checked
    let totalAmount = 0;
    for (let i = 0; i < userListChk.length; i++) {
        const targetChk = userListChk[i].querySelector('input');
        if (targetChk.checked) userList.push(targetChk.value);
    }
    for (let i = 0; i < payListChk.length; i++) {
        const targetChk = payListChk[i].querySelector('input');
        if (targetChk.checked) totalAmount += Number(payListChk[i].getAttribute('data-amount'));
    }

    // request data format
    const testProps = {
        "user_list": userList,
        "fromUserId": userInfo.result.userId,
        "targetSchedule": "608ae0e2694154b2f64b7db5",
        "targetAccount": userInfo.result.account,
        "amount": totalAmount,
        "memo": "스터디룸 금액"
    }

    console.log(testProps);
    toast.success(`${userList}에게 이체 요청이 완료되었습니다!!`);
    // request API
    /*
    const options = {
        method: 'POST',
        url: `http://3.35.6.3:3000/api/schedule/alert`,
        data: data
    };

    axios.request(options)
        .then((res) => {

        })
        .catch((err) => { console.log(err) });
    */
};


const ScheduleEndModal = ({ type }) => {

    const [scheduleData, setData] = useState({
        "sharedUserId": ["bhm3", "bhm2", "qlgks1"],
        "location": [37.6006056, 127.0105066],
        "status": 0,
        "startTime": "2020-09-02T15:36:05.761Z",
        "endTime": "2020-09-02T16:36:05.761Z",
        "memo": "정치외교학회",
        "created_at": "2021-05-01T14:13:02.800Z",
        "updated_at": "2021-05-01T14:13:02.800Z",
        "createUserId": "asdf1234",
        "targetAccount": "10029717*****",
        "__v": 0
    });

    useEffect(() => {
        /*
        const userInfo = JSON.parse(window.localStorage.userInfo);
        setTimeout(() => {
            service.getRank(userInfo.result.userId)
                .then((result) => {
                    // set state
                    setUserData(updateData);
                })
                .catch((error) => console.log(error));
        }, 1000);
        */
    }, []);


    return (
        <React.Fragment>
            <ToastContainer />
            <div className="Modal-overlay" />
            <div className="Modal">
                <p className="title">모임 종료</p>
                <div className="content">
                    <p> 모임 중 사용한 결제 내역 </p>
                    <TransactionList type="3" mode="check" />
                    <p>정산할 멤버를 고르세요</p>
                    <div className="Modal-user__checkbox" >
                        {
                            scheduleData['sharedUserId'].map((share_user_id) => {
                                return <Checkbox className="user__checkbox" label={share_user_id} value={share_user_id} />
                            })
                        }
                    </div>
                </div>
                <div className="button-wrap">
                    <Button type="submit" onClick={() => fetchEndSchedule()}>
                        알림보내기
                    </Button>
                </div>
            </div>
        </React.Fragment>
    )
}
export default ScheduleEndModal;