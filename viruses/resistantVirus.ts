import { map } from 'ramda';
import {
  ResistantVirusArgs,
  Virus,
  Drug,
  Resistences,
  CreateResistantPopArgs,
} from './resistantVirusTypes';
import { createSimpleVirus } from './simpleVirus';

export function createVirus({
  resistances = { guttagonol: false, grimpex: false },
  mutProb = 0.005,
  birthProb = 0.1,
  clearProb = 0.05,
  random0to1 = Math.random,
}: ResistantVirusArgs): Virus {
  function isResistantAgainst(nameOfDrug: Drug): boolean {
    return resistances[nameOfDrug];
  }
  function doesReproduce(popDensity: number, activeDrugs: Drug[]): boolean {
    // if the virus is not resistant against all drugs return false
    if (!activeDrugs.every(isResistantAgainst)) {
      return false;
    }
    // else return the result of the same function as in simple virus
    return random0to1() < birthProb * (1 - popDensity);
  }
  function doesMutate(): boolean {
    return Math.random() < mutProb;
  }
  // the probability of mutation depends on mutProb
  function updateResistances(resistances: Resistences): Resistences {
    function mutate(isResistant: boolean): boolean {
      return doesMutate() ? !isResistant : isResistant;
    }
    // ramda's map function can apply a function to object values as well as array values
    return map(mutate, resistances);
  }
  // called by the createPatient function to mutate the resistencies
  function reproduce(): Virus {
    return createVirus({
      resistances: updateResistances(resistances),
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

export function createVirusPopulation({
  virusCount = 100,
  resistances = { guttagonol: false, grimpex: false },
  mutProb = 0.005,
  clearProb = 0.05,
  birthProb = 0.1,
  random0to1 = Math.random,
}: CreateResistantPopArgs = {}): Virus[] {
  return Array(virusCount).fill(
    createVirus({
      resistances,
      mutProb,
      clearProb,
      birthProb,
      random0to1,
    })
  );
}
