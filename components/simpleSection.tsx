import { useState } from 'react';
import { useQuery } from 'react-query';
import SimplePlot from './simplePlot';
import ValueSlider from './ValueSlider';

export default function SimpleSimSection() {
  const [birthProb, setBirthProb] = useState(0.09);
  const [clearProb, setClearProb] = useState(0.03);
  const { data, status, refetch } = useQuery('simpleSim', async () => {
    const response = await fetch('./api/simple-sim/', {
      body: JSON.stringify({ birthProb, clearProb }),
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
  if (status === 'loading') {
    return <p>...loading</p>;
  }
  return (
    <section>
      <h2 style={{ textAlign: 'center' }}>Simple Virus Simulation</h2>
      <SimplePlot data={data.virusCounts} />
      <ValueSlider
        name={'Chance to reproduce'}
        value={birthProb}
        setValue={setBirthProb}
        refetch={refetch}
        min={0.01}
        max={0.2}
        step={0.01}
      />
      <ValueSlider
        name={'Chance to die'}
        value={clearProb}
        setValue={setClearProb}
        refetch={refetch}
        min={0.01}
        max={0.2}
        step={0.01}
      />
    </section>
  );
}
