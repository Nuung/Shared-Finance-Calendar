import React, { useCallback, useState, useEffect } from "react";
import { PieChart, Pie, Sector } from "recharts";

// service
import * as service from '../../../services/info';

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle,
        fill,
        payload,
        percent,
        value
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
        <g>
            <text x={cx} y={cy} dy={20} textAnchor="middle" fill={fill}>
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path
                d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                stroke={fill}
                fill="none"
            />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                textAnchor={textAnchor}
                fill="#333"
            >{`교류 금액 ${value}`}</text>
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                dy={20}
                textAnchor={textAnchor}
                fill="#999"
            >
                {`(비율 ${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};

const TransactionRank = ({ }) => {

    // const [data, setData] = useState([
    //     { name: "Group A", value: 400 },
    //     { name: "Group B", value: 300 },
    //     { name: "Group C", value: 300 },
    //     { name: "Group D", value: 200 }
    // ]);

    const [activeIndex, setActiveIndex] = useState(0);
    const onPieEnter = useCallback(
        (_, index) => {
            setActiveIndex(index);
        },
        [setActiveIndex]
    );

    // return (
    //     <PieChart width={350} height={400}>
    //         <Pie
    //             activeIndex={activeIndex}
    //             activeShape={renderActiveShape}
    //             data={data}
    //             cx={200}
    //             cy={200}
    //             innerRadius={60}
    //             outerRadius={80}
    //             fill="#8884d8"
    //             dataKey="value"
    //             onMouseEnter={onPieEnter}
    //         />
    //     </PieChart>
    // );

    const [data, setData] = useState([
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
        { name: 'Group E', value: 278 },
        { name: 'Group F', value: 189 },]);

    useEffect(() => {
        const userInfo = JSON.parse(window.localStorage.userInfo);
        setTimeout(() => {
            service.getRank(userInfo.result.userId)
                .then((result) => {
                    const resultData = result.data.result;
                    console.log(resultData);
                    // console.log(resultData.resultBelong); // 내가 이체 한 내역
                    // console.log(resultData.resultOwn); // 내가 이체 받은 내역

                    const updateData = [];
                    const tempDict = Object.assign({}, resultData.resultOwn, resultData.resultBelong);

                    // dict to array_dict
                    for (const key in tempDict) {
                        updateData.push({
                            name: key,
                            value: tempDict[key]
                        });
                    }

                    console.log(updateData);

                    // set state
                    setData(updateData);
                })
                .catch((error) => console.log(error));
        }, 1000);
    }, []);

    return (
        <PieChart width={350} height={200}>
            <Pie
                activeShape={renderActiveShape}
                activeIndex={activeIndex}
                onMouseEnter={onPieEnter}
                dataKey="value"
                startAngle={180}
                endAngle={0}
                data={data}
                cx={170}
                cy={150}
                outerRadius={80}
                fill="#8884d8"
            />
        </PieChart>
    );
}

export default TransactionRank;

