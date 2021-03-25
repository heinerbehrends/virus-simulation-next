import { useState } from 'react';
import { useQuery } from 'react-query';
import fetch from 'isomorphic-unfetch';
import Plot from './withDrugsPlot';
import ValueSlider from './ValueSlider';

export default function SimSection() {
  const { data, status, refetch } = useQuery('simWithDrugs', async () => {
    const response = await fetch('./api/sim-with-drugs', {
      body: JSON.stringify({
        guttagonol,
        grimpex,
      }),
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
  const [guttagonol, setGuttagonol] = useState(70);
  const [grimpex, setGrimpex] = useState(207);
  if (status === 'loading') {
    return <p>...loading</p>;
  }
  return (
    <section>
      <h2 style={{ textAlign: 'center' }}>Virus Simulation with drugs</h2>
      <Plot data={data.virusCounts} />
      <ValueSlider
        name={'Add guttagonol'}
        value={guttagonol}
        setValue={setGuttagonol}
        refetch={refetch}
        min={0}
        max={data.virusCounts.length}
        step={1}
      />
      <ValueSlider
        name={'Add grimpex'}
        value={grimpex}
        setValue={setGrimpex}
        refetch={refetch}
        min={0}
        max={data.virusCounts.length}
        step={1}
      />
    </section>
  );
}
