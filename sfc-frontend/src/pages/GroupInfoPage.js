import React from "react";
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts';

const GroupInfoPage = () => {

  const data = [{ name: '1월', pv: 10 }, { name: '2월', pv: 40 }, { name: '2월', pv: 40 }
    , { name: '3월', pv: 50 }, { name: '4월', pv: 40 }, { name: '5월', pv: 20 }, { name: '6월', pv: 90 }];
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
        <XAxis dataKey="name" label={<AxisLabel axisType="xAxis" x={400} y={230} width={0} height={0}>월</AxisLabel>} />
        <YAxis label={<AxisLabel axisType="xAxis" x={25} y={25} width={0} height={0}>금액</AxisLabel>} />

        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" />
      </BarChart>

    </div>
  );
};


export default GroupInfoPage;