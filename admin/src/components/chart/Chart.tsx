import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./chart.scss";

interface ChartProps {
  aspect: number;
  title: string;
}

const Chart: React.FC<ChartProps> = ({ aspect, title }) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const newData = generateData();
    setData(newData);
  }, []);

  const generateData = () => {
    return [
      {
        name: "January",
        Total: Math.floor(Math.random() * (1200 - 1000 + 1)) + 1000,
      },
      {
        name: "February",
        Total: Math.floor(Math.random() * (2100 - 300 + 1)) + 300,
      },
      { name: "March", Total: Math.floor(Math.random() * (800 - 300 + 1)) + 300 },
      { name: "April", Total: Math.floor(Math.random() * (1600 - 500 + 1)) + 500 },
      { name: "May", Total: Math.floor(Math.random() * (800 - 400 + 1)) + 400 },
      { name: "June", Total: Math.floor(Math.random() * (1700 - 1000 + 1)) + 1000 },
    ];
  };

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chart-grid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;

