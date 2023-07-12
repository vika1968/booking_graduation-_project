import React from "react";
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

const data = [
  // { name: "January", Total: 1200 },
  // { name: "February", Total: 2100 },
  // { name: "March", Total: 800 },
  // { name: "April", Total: 1600 },
  // { name: "May", Total: 900 },
  // { name: "June", Total: 1700 },
  { name: "January", Total: Math.floor(Math.random() * (1200 - 200 + 1)) + 200 },
  { name: "February",Total: Math.floor(Math.random() * (2100 - 1000 + 1)) + 1000 },
  { name: "March", Total: Math.floor(Math.random() * (800 - 300 + 1)) + 300 },
  { name: "April", Total: Math.floor(Math.random() * (1600 - 500 + 1)) + 500 },
  { name: "May", Total: Math.floor(Math.random() * (800 - 400 + 1)) + 400 },
  { name: "June", Total: Math.floor(Math.random() * (1700 - 1000 + 1)) + 1000 },
];

const Chart: React.FC<ChartProps> = ({ aspect, title }) => {
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
