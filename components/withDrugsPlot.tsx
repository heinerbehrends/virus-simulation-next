import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Line,
  Legend,
  CartesianGrid,
  Tooltip,
} from 'recharts';

type plotPoint = {
  name: string;
  'virus count': number;
  'guttagonol resistant': number;
  'grimpex resistant': number;
};

function createPlotData(
  data: ReadonlyArray<[number, number, number]>
): plotPoint[] {
  return data.map((virusCounts, index) => ({
    name: index.toString(),
    'virus count': virusCounts[0],
    'guttagonol resistant': virusCounts[1],
    'grimpex resistant': virusCounts[2],
  }));
}

type PlotProps = {
  data: ReadonlyArray<[number, number, number]>;
  style?: React.CSSProperties;
};

function Plot({ data, style }: PlotProps) {
  return (
    <div style={{ width: '100%', height: '100%', ...style }}>
      <ResponsiveContainer width="100%" height={320}>
        <LineChart
          width={730}
          height={250}
          data={createPlotData(data)}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            minTickGap={50}
            domain={['dataMin', 'dataMax']}
            dataKey="name"
          />
          <YAxis type="number" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="virus count"
            stroke="#8884d8"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="guttagonol resistant"
            stroke="#7e0f0f"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="grimpex resistant"
            stroke="#136111"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Plot;
