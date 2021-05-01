import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts';

import "./TransactionGraph.css";

// service
import * as service from '../../../services/info';

const TransactionGraph = ({ }) => {

    const data = [{ name: '1월', 정산요금: 10 }, { name: '2월', 정산요금: 40 }, { name: '2월', 정산요금: 40 }
        , { name: '3월', 정산요금: 50 }, { name: '4월', 정산요금: 40 }, { name: '5월', 정산요금: 20 }, { name: '6월', 정산요금: 90 }];
    const AxisLabel = ({ axisType, x, y, width, height, stroke, children }) => {
        const isVert = axisType === 'yAxis';
        const cx = isVert ? x : x + (width / 2);
        const cy = isVert ? (height / 2) + y : y + height + 10;
        const rot = isVert ? `270 ${cx} ${cy}` : 0;
        return (
            <text x={cx} y={cy} transform={`rotate(${rot})`} textAnchor="middle" stroke={stroke}>
                {children}
            </text>
        );
    };

    return (
        <div>
            <BarChart width={300} height={250} data={data}
                margin={{
                    top: 35,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" label={<AxisLabel axisType="xAxis" x={400} y={230} width={0} height={0}>  월 별</AxisLabel>} />
                <YAxis label={<AxisLabel axisType="xAxis" x={25} y={25} width={0} height={0}>금액</AxisLabel>} />

                <Tooltip />
                <Legend />
                <Bar dataKey="정산요금" fill="#8884d8" />
            </BarChart>

        </div>
    );

    /*
    const [datas, setData] = useState(null);

    useEffect(() => {
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
    */
};

export default TransactionGraph;

