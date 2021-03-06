import { useState } from 'react';
import { useQuery } from 'react-query';
import fetch from 'isomorphic-unfetch';
import HistoPlot from './histoPlot';
import ValueSlider from './ValueSlider';

export default function HistoSimSection() {
  const { data, status, isFetching, refetch } = useQuery(
    'histoSim',
    async () => {
      const response = await fetch('./api/histogram', {
        body: JSON.stringify({
          guttagonol,
          grimpex,
          nrOfPatients,
        }),
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }
  );
  const [nrOfPatients, setNrOfPatients] = useState(20);
  const [guttagonol, setGuttagonol] = useState(21);
  const [grimpex, setGrimpex] = useState(300);
  if (status === 'loading') {
    return (
      <div
        style={{
          height: '614px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '24px',
        }}
      >
        ...loading
      </div>
    );
  }
  return (
    <section style={{ marginTop: '4rem', marginBottom: '4rem' }}>
      <h2 style={{ textAlign: 'center' }}>Virus Simulation Histogram</h2>
      <div style={{ display: 'grid' }}>
        <HistoPlot
          style={{ gridArea: '1/1', marginTop: '2rem' }}
          data={data.virusHistograms}
        />
        {isFetching ? (
          <div
            style={{
              gridArea: '1/1',
              zIndex: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.75)',
              height: '320px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '24px',
            }}
          >
            {`running ${nrOfPatients * 5} simulations...`}
          </div>
        ) : null}
      </div>
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
        name={'Number of Patients'}
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
