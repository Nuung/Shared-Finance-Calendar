import React, { useState, useEffect } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

// service
import * as service from '../../../services/info';

const TransactionRank = ({ }) => {

    // const [data, setData] = useState(null);
    const data = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
        { name: 'Group E', value: 278 },
        { name: 'Group F', value: 189 },
    ];

    // useEffect((index) => {
    //     setActiveIndex(index);
    // }, []);

    return (
        <div>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                    <Pie
                        dataKey="value"
                        startAngle={180}
                        endAngle={0}
                        data={data}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default TransactionRank;

