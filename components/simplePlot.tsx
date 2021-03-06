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
};
type simplePlotProps = {
  data: number[];
  style?: React.CSSProperties;
};

function SimplePlot({ data, style }: simplePlotProps): JSX.Element {
  function createPlotData(listOfVirusCounts: number[]): plotPoint[] {
    return listOfVirusCounts.map((virusCount, index) => ({
      name: index.toString(),
      'virus count': virusCount,
    }));
  }

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
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SimplePlot;
