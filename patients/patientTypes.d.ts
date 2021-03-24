import { Drug, Virus } from '../viruses/resistantVirusTypes';
import { SimpleVirus } from '../viruses/simpleVirusTypes';

export type SimplePatient = {
  getPopDensity: { (virusArr: ReadonlyArray<SimpleVirus>): number };
  getVirusCount: { (): number };
  getViruses: { (): ReadonlyArray<SimpleVirus> };
  update: { (): SimplePatient };
};

export type Drugs = ReadonlyArray<Drug>;

export type Viruses = ReadonlyArray<Readonly<Virus>>;

export type Patient = Readonly<{
  addDrug: (drug: Drug) => Patient;
  getDrugs: () => Drugs;
  getResistantCount: (drug: Drug) => number;
  getPopDensity: (virusArr: any) => number;
  getVirusCount: () => number;
  getViruses: () => Viruses;
  update: () => Patient;
}>;
