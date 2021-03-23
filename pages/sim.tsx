import { useState } from 'react';
import { useQuery } from 'react-query';
import fetch from 'isomorphic-unfetch';
import Head from 'next/head';
import Plot from '../components/plot';
import ValueSlider from '../components/ValueSlider';

export default function Sim() {
  const { data, status, refetch } = useQuery('simWithDrugs', async () => {
    const virusCounts = await fetch('./api/sim-with-drugs', {
      body: JSON.stringify({
        guttagonol,
        grimpex,
        maxPop,
        birthProb,
        clearProb,
      }),
      method: 'POST',
    });
    return virusCounts.json();
  });
  const [maxPop, setMaxPop] = useState(1000);
  const [birthProb, setBirthProb] = useState(0.1);
  const [clearProb, setClearProb] = useState(0.05);
  const [guttagonol, setGuttagonol] = useState(300);
  const [grimpex, setGrimpex] = useState(300);
  if (status === 'loading') {
    return <p>...loading</p>;
  }
  return (
    <>
      <Head>
        <title>Virus Simulation</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 style={{ textAlign: 'center' }}>Virus Simulation</h1>
      <Plot data={data.virusCounts} />
      <ValueSlider
        name={'add guttagonol'}
        value={guttagonol}
        setValue={setGuttagonol}
        refetch={refetch}
        min={0}
        max={data.virusCounts.length}
        step={1}
      />
      <ValueSlider
        name={'add grimpex'}
        value={grimpex}
        setValue={setGrimpex}
        refetch={refetch}
        min={0}
        max={data.virusCounts.length}
        step={1}
      />
      <ValueSlider
        name={'maximum population'}
        value={maxPop}
        setValue={setMaxPop}
        refetch={refetch}
        min={100}
        max={5000}
        step={50}
      />
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
    </>
  );
}
