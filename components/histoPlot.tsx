import React from 'react';
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from 'recharts';

type histoPlotProps = {
  data: [[number, number]];
  style?: React.CSSProperties;
};

export default function HistoPlot({ data, style }: histoPlotProps) {
  function transformHistoData(
    histoData: [number, number][]
  ): { Cured: number; 'Not cured': number }[] {
    return histoData.map((histo) => ({
      name: '',
      Cured: histo[0],
      'Not cured': histo[1],
    }));
  }
  return (
    <div style={style}>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          width={730}
          height={250}
          maxBarSize={64}
          data={transformHistoData(data)}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Cured" fill="#8884d8" />
          <Bar dataKey="Not cured" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
