// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { simpleSimulation } from '../../simpleSim/simpleSim';

const virusCounts = simpleSimulation({
  virusCount: 100,
  birthProb: 0.1,
  clearProb: 0.05,
  maxPop: 1000,
  repetitions: 300,
});

export default (req, res) => {
  res.status(200).json({ virusCounts });
};
