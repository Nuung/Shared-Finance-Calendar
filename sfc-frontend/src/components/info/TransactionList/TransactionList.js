import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { List, Checkbox } from 'semantic-ui-react'
import Loader from "../../loader/Loader";

import "./TransactionList.css";

// service
import * as service from '../../../services/info';

// casting to Won 
// const castingWon = (str) => {
//     return 
// }


const TransactionList = ({ mode, type }) => {

    const [datas, setData] = useState(null);

    useEffect(() => {
        // const userInfo = JSON.parse(window.localStorage.userInfo);
        // userInfo.result.account
        // service.getTransaction("10029218*****")
        //     .then((result) => setData(result.data))
        //     .catch((error) => console.log(error));
        setTimeout(() => {
            service.getTransaction("10029218*****")
                .then((result) => {
                    setData(result.data.result.slice(0, Number(type)));
                })
                .catch((error) => console.log(error));
        }, 1000);
    }, []);

    if (mode == "check") {
        return (
            <List divided relaxed className="transaction__list">
                {!datas && <Loader />}
                {datas && (
                    datas.map((data) => {
                        if (data['PAY_AM']) {
                            return (
                                <List.Item id={data['_id']} className="transaction__list__item" data-amount={Number(data['PAY_AM'])}>
                                    <List.Content>
                                        <Checkbox label={data['TRN_DT'] + data['TRN_TXT']} value={data['_id']} />
                                        <List.Description className="transaction__list__desc" as='a'>출금: {Number(data['PAY_AM'])}, 잔액: {Number(data['DPS_BAL'])}</List.Description>
                                    </List.Content>
                                </List.Item>
                            )
                        }
                        else {
                            return (
                                <List.Item id={data['_id']} data-amount={Number(data['RCV_AM'])}>
                                    <List.Content>
                                        <Checkbox label={data['TRN_DT'] + data['TRN_TXT']} value={data['_id']} />
                                        <List.Description className="transaction__list__desc" as='a'>입금: {Number(data['RCV_AM'])}, 잔액: {Number(data['DPS_BAL'])}</List.Description>
                                    </List.Content>
                                </List.Item>
                            )
                        }
                    })
                )}
            </List>
        );
    }
    else {
        return (
            <List divided relaxed className="transaction__list">
                {!datas && <Loader />}
                {datas && (
                    datas.map((data) => {
                        if (data['PAY_AM']) {
                            return (
                                <List.Item id={data['_id']} className="transaction__list__item" data-amount={Number(data['PAY_AM'])} >
                                    <List.Content id={data['_id']}>
                                        <List.Header as='a'>{data['TRN_DT']} {data['TRN_TXT']}</List.Header>
                                        <List.Description className="transaction__list__desc" as='a'>출금: {Number(data['PAY_AM'])}, 잔액: {Number(data['DPS_BAL'])}</List.Description>
                                    </List.Content>
                                </List.Item>
                            )
                        }
                        else {
                            return (
                                <List.Item id={data['_id']} data-amount={Number(data['RCV_AM'])}>
                                    <List.Content>
                                        <List.Header as='a'>{data['TRN_DT']} {data['TRN_TXT']}</List.Header>
                                        <List.Description className="transaction__list__desc" as='a'>입금: {Number(data['RCV_AM'])}, 잔액: {Number(data['DPS_BAL'])}</List.Description>
                                    </List.Content>
                                </List.Item>
                            )
                        }
                    })
                )}
            </List>
        );
    }
};

export default TransactionList;

