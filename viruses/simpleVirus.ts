type randomFn = {
  (): number;
};
export type simpleVirus = Readonly<{
  birthProb: number;
  clearProb: number;
  doesReproduce: { (popDensity: number): boolean };
  doesSurvive: { (): boolean };
}>;
export type simpleVirusArgs = {
  birthProb?: number;
  clearProb?: number;
  random0to1?: randomFn;
};

export function createSimpleVirus({
  birthProb = 0.1,
  clearProb = 0.05,
  random0to1 = Math.random,
}: simpleVirusArgs): simpleVirus {
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

type virusPopulationArg = {
  virusCount: number;
  birthProb: number;
  clearProb: number;
  random0to1?: randomFn;
};

export function createVirusPopulation({
  virusCount,
  birthProb,
  clearProb,
  random0to1 = Math.random,
}: virusPopulationArg): simpleVirus[] {
  return Array(virusCount).fill(
    createSimpleVirus({ birthProb, clearProb, random0to1 })
  );
}
