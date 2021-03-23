import { addIndex, map, mapAccum } from 'ramda';
import { Patient } from '../patients/patientWithDrugs';
import { createPatient } from '../patients/patientWithDrugs';
import { createVirusPopulation } from '../viruses/resistantVirus';
import { Drug } from '../viruses/resistantVirusTypes';
import { RandomFn } from '../viruses/simpleVirusTypes';
import { SimpleSimArgs } from './simpleSim';

export type Prescriptions = {
  [key: number]: Drug;
};

type SimulationArgs = SimpleSimArgs & {
  mutProb?: number;
  prescriptions?: Prescriptions;
  random0to1?: RandomFn;
};

export function simulation({
  virusCount = 100,
  birthProb = 0.1,
  clearProb = 0.05,
  mutProb = 0.005,
  maxPop = 1000,
  random0to1 = Math.random,
  repetitions = 300,
  prescriptions = {},
}: SimulationArgs = {}): [number, number, number][] {
  const patient = createPatient(
    createVirusPopulation({
      virusCount,
      birthProb,
      clearProb,
      mutProb,
      maxPop,
      random0to1,
    }),
    1000
  );
  // creates an array with integers from 0 to length
  function createTicks(length: number): number[] {
    return addIndex(map)((_val: any, index: number) => index, Array(length));
  }
  // gets passed to mapAccum in createSim
  // accepts a patient and a time tick,
  // updates the patient and adds the prescribed drugs.
  function sim(patient: Patient, tick: number): [Patient, Patient] {
    if (tick in prescriptions) {
      return [patient.addDrug(prescriptions[tick]).update(), patient];
    }
    return [patient.update(), patient];
  }
  // creates an array of a sequence of updated patients
  function createSim(listOfTicks: number[]) {
    return mapAccum(sim, patient, listOfTicks);
  }
  // transforms the sequence of patients into virus and resistant virus counts
  function getResults(patient: Patient): [number, number, number] {
    return [
      patient.getVirusCount(),
      patient.getResistantCount('guttagonol'),
      patient.getResistantCount('grimpex'),
    ];
  }

  const [, simulation] = createSim(createTicks(repetitions));
  return map(getResults, simulation);
}
