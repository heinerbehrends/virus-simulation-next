import type { NextApiRequest, NextApiResponse } from 'next';
import { resistantSim } from '../../simulations/simulation';
import { Prescriptions } from '../../simulations/simulationTypes';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { guttagonol, grimpex } = JSON.parse(req.body);
  const prescriptions: Prescriptions = {
    [guttagonol]: 'guttagonol',
    [grimpex]: 'grimpex',
  };
  const virusCounts = resistantSim({
    prescriptions,
  });
  res.status(200).json({ virusCounts });
};
