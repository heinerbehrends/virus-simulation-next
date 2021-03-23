import { Drug, Virus } from '../viruses/resistantVirusTypes';

type Drugs = Drug[];

export type Patient = Readonly<{
  addDrug: (drug: Drug) => Patient;
  getDrugs: () => Drugs;
  getResistantCount: (drug: Drug) => number;
  getPopDensity: (virusArr: any) => number;
  getVirusCount: () => number;
  getViruses: () => Viruses;
  update: () => Patient;
}>;

export type Viruses = Readonly<Virus>[];

export function createPatient(
  viruses: Viruses,
  maxPop: number,
  drugs: Drugs = []
): Patient {
  function addDrug(drug: Drug) {
    return createPatient(viruses, maxPop, [...drugs, drug]);
  }
  function getDrugs() {
    return drugs;
  }
  function getResistantCount(drug: Drug) {
    return getViruses().filter((virus) => virus.isResistantAgainst(drug))
      .length;
  }
  function getPopDensity(virusArr: Viruses) {
    return virusArr.length / maxPop;
  }
  function getVirusCount() {
    return viruses.length;
  }
  function getViruses(): Viruses {
    return viruses;
  }
  function update(): Patient {
    // Keep only the viruses that are still alive
    const survivingViruses = viruses.filter((virus) => virus.doesSurvive());
    // calculate the population density of the surviving viruses
    const popDensity = getPopDensity(survivingViruses);
    // return a new patient with updated virus population
    return createPatient(
      // add the viruses that replicate
      survivingViruses.concat(
        viruses
          .filter((virus) => virus.doesReproduce(popDensity, drugs))
          // calling reproduce returns a new virus with potentially mutated resistances
          .map((virus) => virus.reproduce())
      ),
      maxPop,
      drugs
    );
  }
  return Object.freeze({
    addDrug,
    getDrugs,
    getResistantCount,
    getPopDensity,
    getVirusCount,
    getViruses,
    update,
  });
}
