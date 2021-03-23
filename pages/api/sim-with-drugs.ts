import type { NextApiRequest, NextApiResponse } from 'next';
import { Prescriptions, simulation } from '../../simulations/simulation';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { guttagonol, grimpex, maxPop, birthProb, clearProb } = JSON.parse(
    req.body
  );
  const prescriptions: Prescriptions = {
    [guttagonol]: 'guttagonol',
    [grimpex]: 'grimpex',
  };
  const virusCounts = simulation({
    birthProb,
    clearProb,
    maxPop,
    prescriptions,
  });
  res.status(200).json({ virusCounts, prescriptions });
};
