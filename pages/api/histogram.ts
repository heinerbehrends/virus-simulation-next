import type { NextApiRequest, NextApiResponse } from 'next';
import { map } from 'ramda';
import { runMultipleSims } from '../../simulations/multipleSims';
import { Prescriptions } from '../../simulations/simulationTypes';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { guttagonol, grimpex, nrOfPatients } = JSON.parse(req.body);
  const prescriptions: Prescriptions = {
    [guttagonol]: 'guttagonol',
    [grimpex]: 'grimpex',
  };
  const virusHistograms = map(
    () =>
      runMultipleSims({
        prescriptions,
        nrOfPatients,
      }),
    Array(5)
  );
  res.status(200).json({ virusHistograms });
};
