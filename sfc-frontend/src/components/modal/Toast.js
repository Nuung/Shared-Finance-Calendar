import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// status 가 0인 알람, 최근순 불러오기!! -> 그걸 Toast로 띄워주기!
const fetchAlertLog = () => {
    toast("Wow so easy!");
}

const Toast = () => {

    return (
        <div>
            <button onClick={fetchAlertLog}>Notify!</button>
            <ToastContainer />
        </div>
    );
};
export default Toast;