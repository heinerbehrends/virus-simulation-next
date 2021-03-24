import { addIndex, map, mapAccum } from 'ramda';
import { Patient } from '../patients/patientTypes';
import { createPatient } from '../patients/patientWithDrugs';
import { createVirusPopulation } from '../viruses/resistantVirus';
import { simulation } from './simulation';
import { SimulationArgs } from './simulationTypes';

type MultipleSimArgs = SimulationArgs & {
  nrOfPatients?: number;
};

export function runMultipleSims({
  virusCount = 100,
  birthProb = 0.1,
  clearProb = 0.05,
  mutProb = 0.005,
  maxPop = 1000,
  random0to1 = Math.random,
  repetitions = 300,
  prescriptions = {},
  nrOfPatients = 20,
}: MultipleSimArgs = {}): [number, number] {
  function isCured(patient: Patient) {
    return patient.getVirusCount() <= 50;
  }
  const patients = map(
    () =>
      simulation({
        virusCount,
        birthProb,
        clearProb,
        mutProb,
        random0to1,
        maxPop,
        repetitions,
        prescriptions,
      })[0],
    Array(nrOfPatients)
  );
  const nrOfCuredPatients = patients.filter(isCured).length;
  // returns a tuple of the number cured and not cured patients
  return [nrOfCuredPatients, nrOfPatients - nrOfCuredPatients];
}
