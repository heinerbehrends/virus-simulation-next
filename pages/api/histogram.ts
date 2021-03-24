import type { NextApiRequest, NextApiResponse } from 'next';
import { runMultipleSims } from '../../simulations/multipleSims';
import { Prescriptions } from '../../simulations/simulationTypes';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { guttagonol, grimpex, nrOfPatients } = JSON.parse(req.body);
  const prescriptions: Prescriptions = {
    [guttagonol]: 'guttagonol',
    [grimpex]: 'grimpex',
  };
  const curedOrNot = runMultipleSims({
    prescriptions,
    nrOfPatients,
  });
  console.log(`cured of not${curedOrNot}`);
  res.status(200).json({ curedOrNot: [curedOrNot] });
};
