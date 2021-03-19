import { mapAccum } from 'ramda';
import { createPatient, patient } from '../patients/simplePatient';
import { createSimpleVirusPopulation } from '../viruses/simpleVirus';

type simpleSimArgs = {
  virusCount?: number;
  birthProb?: number;
  clearProb?: number;
  maxPop?: number;
  repetitions?: number;
};

export function simpleSimulation({
  virusCount = 100,
  birthProb = 0.1,
  clearProb = 0.05,
  maxPop = 1000,
  repetitions = 300,
}: simpleSimArgs): number[] {
  function updatePatientGetVirusCount(patient: patient): [patient, number] {
    return [patient.update(), patient.getVirusCount()];
  }

  const viruses = createSimpleVirusPopulation({
    virusCount,
    birthProb,
    clearProb,
  });
  const patient = createPatient(viruses, maxPop);
  const listOfUndefined = [...Array(repetitions)];
  // mapAccum is like a combination of map and reduce.
  // The accumulating parameter part is the patient object and the function is patient.update()
  // The map function (mapPatient) records the virus counts to the empty list by calling patient.getVirusCount()
  // Returns a tuple of the final state of the patient and the array of virus counts.
  const [, virusCounts] = mapAccum(
    updatePatientGetVirusCount,
    patient,
    listOfUndefined
  );
  return virusCounts;
}
