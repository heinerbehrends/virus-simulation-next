import { map } from 'ramda';
import {
  ResistantVirusArgs,
  ResistantVirus,
  Drug,
  Resistences,
  CreateResistantPopArgs,
} from './resistantVirusTypes';
import { createSimpleVirus } from './simpleVirus';

export function createResistantVirus({
  resistances = { guttagonol: false, grimpex: false },
  mutProb = 0.005,
  birthProb = 0.1,
  clearProb = 0.05,
  random0to1 = Math.random,
}: ResistantVirusArgs): ResistantVirus {
  function isResistantAgainst(nameOfDrug: Drug) {
    return resistances[nameOfDrug];
  }
  function doesReproduce(popDensity: number, activeDrugs: Drug[]) {
    // if the virus is not resistant against all drugs return false
    if (!activeDrugs.every(isResistantAgainst)) {
      return false;
    }
    // else return the result of the same function as in simple virus
    return random0to1() < birthProb * (1 - popDensity);
  }
  function doesMutate() {
    return Math.random() < mutProb;
  }
  // the probability of mutation depends on mutProb
  function updateResistancies(resistances: Resistences): Resistences {
    function mutate(isResistant: boolean): boolean {
      return doesMutate() ? !isResistant : isResistant;
    }
    // ramda's map function can apply a function to object values as well as array values
    return map(mutate, resistances);
  }
  // called by the patient function to simulate the mutation of resistencies
  function reproduce() {
    return createResistantVirus({
      resistances: updateResistancies(resistances),
      mutProb,
      birthProb,
      clearProb,
      random0to1,
    });
  }

  return Object.freeze({
    ...createSimpleVirus({ birthProb, clearProb, random0to1 }),
    resistances,
    mutProb,
    isResistantAgainst,
    doesReproduce,
    doesMutate,
    reproduce,
  });
}

export function createResistantVirusPopulation({
  virusCount,
  resistances,
  mutProb,
  clearProb,
  birthProb,
  random0to1,
}: CreateResistantPopArgs): ResistantVirus[] {
  return Array(virusCount).fill(
    createResistantVirus({
      resistances,
      mutProb,
      clearProb,
      birthProb,
      random0to1,
    })
  );
}
