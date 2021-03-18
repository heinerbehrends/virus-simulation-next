import Head from 'next/head';
import SimplePlot from '../components/simplePlot';
import { useQuery } from 'react-query';
import fetch from 'isomorphic-unfetch';
import ValueSlider from '../components/ValueSlider';
import { useEffect, useState } from 'react';

export default function Home() {
  const [maxPop, setMaxPop] = useState(1000);
  const [birthProb, setBirthProb] = useState(0.1);
  const [clearProb, setClearProb] = useState(0.05);
  const [refetchState, triggerRefetch] = useState(Math.random());
  const { data, status, refetch } = useQuery('simpleSim', async () => {
    const virusCounts = await fetch('./api/simple-sim/', {
      body: JSON.stringify({ maxPop, birthProb, clearProb }),
      method: 'POST',
    });
    return virusCounts.json();
  });
  useEffect(() => {
    refetch();
  }, [refetchState]);

  if (status === 'loading') {
    return <p>...loading</p>;
  }
  return (
    <>
      <Head>
        <title>Simple Virus Simulation</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 style={{ textAlign: 'center' }}>Simple Virus Simulation</h1>
      <SimplePlot data={data.virusCounts} />
      <ValueSlider
        name={'maximum population'}
        value={maxPop}
        setValue={setMaxPop}
        setRefetch={triggerRefetch}
        min={100}
        max={5000}
        step={50}
      />
      <ValueSlider
        name={'Chance to reproduce'}
        value={birthProb}
        setValue={setBirthProb}
        setRefetch={triggerRefetch}
        min={0.01}
        max={0.2}
        step={0.01}
      />
      <ValueSlider
        name={'Chance to die'}
        value={clearProb}
        setValue={setClearProb}
        setRefetch={triggerRefetch}
        min={0.01}
        max={0.2}
        step={0.01}
      />
    </>
  );
}
