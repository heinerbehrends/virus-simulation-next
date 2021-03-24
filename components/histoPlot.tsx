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
};

export default function HistoPlot({ data }: histoPlotProps) {
  console.log(`data: ${data}`);
  function transformHistoData(
    histoData: [number, number][]
  ): { Cured: number; 'Not cured': number }[] {
    return histoData.map((histo) => ({
      name: 'Histogram',
      Cured: histo[0],
      'Not cured': histo[1],
    }));
  }
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart width={730} height={250} data={transformHistoData(data)}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Cured" fill="#8884d8" />
        <Bar dataKey="Not cured" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}
