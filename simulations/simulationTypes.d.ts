export type Prescriptions = {
  [key: number]: Drug;
};

export type SimulationArgs = SimpleSimArgs & {
  mutProb?: number;
  prescriptions?: Prescriptions;
};

export type SimpleSimArgs = {
  random0to1?: RandomFn;
  virusCount?: number;
  birthProb?: number;
  clearProb?: number;
  maxPop?: number;
  repetitions?: number;
};
