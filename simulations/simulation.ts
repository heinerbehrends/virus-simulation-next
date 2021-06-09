import { addIndex, map, mapAccum } from 'ramda';
import { createPatient } from '../patients/patientWithDrugs';
import { Patient } from '../patients/patientTypes';
import { createVirusPopulation } from '../viruses/resistantVirus';
import { SimulationArgs } from './simulationTypes';

export function simulation({
  virusCount = 100,
  birthProb = 0.1,
  clearProb = 0.05,
  mutProb = 0.005,
  maxPop = 1000,
  random0to1 = Math.random,
  repetitions = 300,
  prescriptions = {},
}: SimulationArgs = {}): [Patient, ReadonlyArray<Patient>] {
  // creates an array with integers from 0 to length
  function createTicks(length: number): number[] {
    return addIndex(map)((_val: any, index: number) => index, Array(length));
  }
  // sim gets passed to mapAccum in createSim, accepts a patient and a time tick,
  // updates the patient and adds the prescribed drugs.
  function sim(patient: Patient, tick: number): [Patient, Patient] {
    if (tick in prescriptions) {
      return [patient.addDrug(prescriptions[tick]).update(), patient];
    }
    return [patient.update(), patient];
  }
  // creates an array of a sequence of updated patients
  function createSim(
    listOfTicks: number[],
    patient: Patient
  ): [Patient, ReadonlyArray<Patient>] {
    return mapAccum(sim, patient, listOfTicks);
  }
  // transforms the sequence of patients into virus and resistant virus counts

  const patient = createPatient(
    createVirusPopulation({
      virusCount,
      birthProb,
      clearProb,
      mutProb,
      random0to1,
    }),
    maxPop
  );
  return createSim(createTicks(repetitions), patient);
}

export function resistantSim({
  virusCount = 100,
  birthProb = 0.1,
  clearProb = 0.05,
  mutProb = 0.005,
  maxPop = 1000,
  random0to1 = Math.random,
  repetitions = 300,
  prescriptions = {},
}: SimulationArgs = {}): ReadonlyArray<[number, number, number]> {
  function getResults(patient: Patient): [number, number, number] {
    return [
      patient.getVirusCount(),
      patient.getResistantCount('guttagonol'),
      patient.getResistantCount('grimpex'),
    ];
  }
  const [, patients] = simulation({
    virusCount,
    birthProb,
    clearProb,
    mutProb,
    maxPop,
    random0to1,
    repetitions,
    prescriptions,
  });
  return map(getResults, patients);
}
