import { mapAccum } from 'ramda';
import { SimplePatient } from '../patients/patientTypes';
import { createSimplePatient } from '../patients/simplePatient';
import { createSimpleVirusPopulation } from '../viruses/simpleVirus';
import { SimpleSimArgs } from './simulationTypes';

export function simpleSimulation({
  virusCount = 100,
  birthProb = 0.1,
  clearProb = 0.05,
  maxPop = 1000,
  repetitions = 300,
  random0to1 = Math.random,
}: SimpleSimArgs): number[] {
  //
  function updatePatientGetVirusCount(
    patient: SimplePatient
  ): [SimplePatient, number] {
    return [patient.update(), patient.getVirusCount()];
  }

  const patient: SimplePatient = createSimplePatient(
    createSimpleVirusPopulation({
      virusCount,
      birthProb,
      clearProb,
    }),
    1000
  );
  // mapAccum is like a combination of map and reduce.
  // The accumulating parameter part is the patient object and the function is patient.update()
  // The map function (mapPatient) records the virus counts to the empty list by calling patient.getVirusCount()
  // Returns a tuple of the final state of the patient and the array of virus counts.
  const [, virusCounts] = mapAccum(
    updatePatientGetVirusCount,
    patient,
    Array(repetitions)
  );
  return virusCounts;
}
