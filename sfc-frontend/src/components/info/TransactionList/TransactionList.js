import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { List } from 'semantic-ui-react'


import "./TransactionList.css";

// service
import * as service from '../../../services/info';

const TransactionList = ({ }) => {

    // {state.creators.map(creator =>
    //     <Creator
    //       img={creator.image}
    //       name={creator.name}
    //     />)
    // }

    const [datas, setData] = useState(null);

    useEffect(() => {
        // const userInfo = JSON.parse(window.localStorage.userInfo);
        // userInfo.result.account
        // service.getTransaction("10029218*****")
        //     .then((result) => setData(result.data))
        //     .catch((error) => console.log(error));
        setTimeout(() => {
            service.getTransaction("10029218*****")
                .then((result) => setData(result.data))
                .catch((error) => console.log(error));
        }, 1000);
    }, []);

    return (
        <List divided relaxed className="transaction__list">

            {!datas && <p> LOADING </p>}
            {datas && (
                datas['result'].map((data) => {
                    if (data['PAY_AM']) {
                        return (
                            <List.Item className="transaction__list__item">
                                <List.Content>
                                    <List.Header as='a'>{data['TRN_DT']} {data['TRN_TXT']}</List.Header>
                                    <List.Description className="transaction__list__desc" as='a'>출금: {data['PAY_AM']}, 잔액: {data['DPS_BAL']}</List.Description>
                                </List.Content>
                            </List.Item>
                        )
                    }
                    else {
                        return (
                            <List.Item>
                                <List.Content>
                                    <List.Header as='a'>{data['TRN_DT']} {data['TRN_TXT']}</List.Header>
                                    <List.Description as='a'>입금: {data['RCV_AM']}, 잔액: {data['DPS_BAL']}</List.Description>
                                </List.Content>
                            </List.Item>
                        )
                    }
                })
            )}

        </List>
    );
};

export default TransactionList;

