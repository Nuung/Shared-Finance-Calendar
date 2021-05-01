import React from "react";
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts';

// service
import * as service from '../services/info';

// getEndAlert
const fetchEndAlert = async () => {


  const result = await service.getEndAlert();

}

// 3. 캘린더에 등록한 일정 중에 모임이 끝나고 정산한 것만 / 월 별로
const GroupInfoPage = () => {

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
      <BarChart width={730} height={250} data={data}
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
};


export default GroupInfoPage;