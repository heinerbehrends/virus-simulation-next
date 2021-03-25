import Head from 'next/head';
import SimSection from '../components/simSection';
import SimpleSimSection from '../components/simpleSection';
import HistoSimSection from '../components/histoSection';
export default function Home() {
  return (
    <>
      <Head>
        <title>MIT 6.00 PS12</title>
      </Head>
      <h1 style={{ textAlign: 'center' }}>
        Simulating Virus Population Dynamics
      </h1>
      <SimpleSimSection />
      <SimSection />
      <HistoSimSection />
    </>
  );
}
