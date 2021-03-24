import type { NextApiRequest, NextApiResponse } from 'next';
import { simulation } from '../../simulations/simulation';
import { Prescriptions } from '../../simulations/simulationTypes';

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
