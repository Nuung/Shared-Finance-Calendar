import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts';

import "./TransactionGraph.css";

// service
import * as service from '../../../services/info';

const TransactionGraph = ({ }) => {

    // state { name: 몇월, 정산요금: 얼마 }
    const [data, setData] = useState(null);

    useEffect(() => {
        const userInfo = JSON.parse(window.localStorage.userInfo);
        setTimeout(() => {
            service.getcalculationMonthly(userInfo.result.userId)
                .then((result) => {
                    const updateData = [];
                    const tempDict = {};
                    const resultDatas = result.data.result;
                    resultDatas.map((data) => {
                        const month = new Date(data.created_at).getMonth() + 1;
                        if (tempDict[month]) tempDict[month] += data.amount;
                        else tempDict[month] = data.amount;
                    });

                    // dict to array_dict
                    for (const key in tempDict) {
                        updateData.push({
                            name: key,
                            정산요금: tempDict[key]
                        });
                    }

                    // set state
                    setData(updateData);
                })
                .catch((error) => console.log(error));
        }, 1000);
    }, []);

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
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis dataKey="name" label={<AxisLabel axisType="xAxis" x={400} y={230} width={0} height={0}>  월 별</AxisLabel>} />
                <YAxis label={<AxisLabel axisType="xAxis" x={25} y={25} width={0} height={0}>금액</AxisLabel>} />

                <Tooltip />
                <Legend />
                <Bar dataKey="정산요금" fill="#8884d8" />
            </BarChart>

        </div>
    );
};

export default TransactionGraph;

