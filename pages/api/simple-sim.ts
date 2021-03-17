import type { NextApiRequest, NextApiResponse } from 'next';
import { simpleSimulation } from '../../simpleSim/simpleSim';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { maxPop, birthProb } = JSON.parse(req.body);
  const virusCounts = simpleSimulation({ birthProb, maxPop });
  res.status(200).json({ virusCounts });
};
