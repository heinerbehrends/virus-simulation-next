import {
  SimpleVirusArgs,
  SimpleVirus,
  VirusPopulationArg,
} from './simpleVirusTypes';

export function createSimpleVirus({
  birthProb = 0.1,
  clearProb = 0.05,
  random0to1 = Math.random,
}: SimpleVirusArgs): SimpleVirus {
  // the methods are called in the simple patient implementation
  function doesReproduce(popDensity: number) {
    return random0to1() < birthProb * (1 - popDensity);
  }
  function doesSurvive() {
    return random0to1() > clearProb;
  }

  return Object.freeze({
    birthProb,
    clearProb,
    doesSurvive,
    doesReproduce,
  });
}

export function createSimpleVirusPopulation({
  virusCount,
  birthProb,
  clearProb,
  random0to1 = Math.random,
}: VirusPopulationArg): SimpleVirus[] {
  return Array(virusCount).fill(
    createSimpleVirus({ birthProb, clearProb, random0to1 })
  );
}
