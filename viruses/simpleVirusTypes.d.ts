export type RandomFn = {
  (): number;
};

export type SimpleVirus = Readonly<{
  birthProb: number;
  clearProb: number;
  doesReproduce: { (popDensity: number): boolean };
  doesSurvive: { (): boolean };
}>;

export type SimpleVirusArgs = {
  birthProb?: number;
  clearProb?: number;
  random0to1?: RandomFn;
};

export type VirusPopulationArg = {
  virusCount: number;
  birthProb: number;
  clearProb: number;
  random0to1?: RandomFn;
};
