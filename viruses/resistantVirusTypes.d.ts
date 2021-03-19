export type Resistences = {
  guttagonol: boolean;
  grimpex: boolean;
};

export type Drug = keyof Resistences;

export type ResistantVirusArgs = SimpleVirusArgs & {
  resistances?: Resistences;
  mutProb?: number;
};

export type ResistantVirus = Readonly<{
  resistances: Resistences;
  mutProb: number;
  isResistantAgainst: (nameOfDrug: Drug) => boolean;
  doesReproduce: (popDensity: number, activeDrugs: Drug[]) => boolean;
  doesMutate: () => boolean;
  reproduce: () => ResistantVirus;
  birthProb: number;
  clearProb: number;
  doesSurvive: () => boolean;
}>;

type CreateResistantPopArgs = ResistantVirusArgs & {
  virusCount: number;
};
