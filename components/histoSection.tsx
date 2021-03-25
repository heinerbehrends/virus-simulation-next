import { useState } from 'react';
import { useQuery } from 'react-query';
import fetch from 'isomorphic-unfetch';
import HistoPlot from './histoPlot';
import ValueSlider from './ValueSlider';

export default function HistoSimSection() {
  const { data, status, refetch } = useQuery('histoSim', async () => {
    const response = await fetch('./api/histogram', {
      body: JSON.stringify({
        guttagonol,
        grimpex,
        nrOfPatients,
      }),
      method: 'POST',
    });
    return response.json();
  });
  const [nrOfPatients, setNrOfPatients] = useState(20);
  const [guttagonol, setGuttagonol] = useState(21);
  const [grimpex, setGrimpex] = useState(300);
  if (status === 'loading') {
    return <p>...loading</p>;
  }
  return (
    <section>
      <h2 style={{ textAlign: 'center' }}>Virus Simulation Histogram</h2>
      <HistoPlot data={data.virusHistograms} />
      <ValueSlider
        name={'Add guttagonol'}
        value={guttagonol}
        setValue={setGuttagonol}
        refetch={refetch}
        min={0}
        max={300}
        step={1}
      />
      <ValueSlider
        name={'Add grimpex'}
        value={grimpex}
        setValue={setGrimpex}
        refetch={refetch}
        min={0}
        max={300}
        step={1}
      />
      <ValueSlider
        name={'Nr of Patients'}
        value={nrOfPatients}
        setValue={setNrOfPatients}
        refetch={refetch}
        min={20}
        max={300}
        step={10}
      />
    </section>
  );
}
