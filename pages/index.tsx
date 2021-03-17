import Head from 'next/head';
import SimplePlot from '../components/simplePlot';
import { useQuery } from 'react-query';
import fetch from 'isomorphic-unfetch';

export default function Home() {
  const { data, status } = useQuery('simpleSim', async () => {
    const virusCounts = await fetch('./api/simpleSim');
    return virusCounts.json();
  });
  if (status === 'loading') {
    return <p>...loading</p>;
  }
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SimplePlot data={data.virusCounts} />
    </>
  );
}
