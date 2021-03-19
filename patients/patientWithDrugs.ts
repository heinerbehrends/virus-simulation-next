import { Drug, ResistantVirus } from '../viruses/resistantVirusTypes';

export function createPatient(viruses: ResistantVirus[], maxPop, drugs = []) {
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
  function getPopDensity(virusArr) {
    return virusArr.length / maxPop;
  }
  function getVirusCount() {
    return viruses.length;
  }
  function getViruses() {
    return viruses;
  }
  function update() {
    // filter the viruses that die
    const survivingViruses = viruses.filter((virus) => virus.doesSurvive());
    // calculate the population density of the surviving viruses
    const popDensity = getPopDensity(survivingViruses);
    // return a new patient with updated virus population
    return createPatient(
      // add the viruses that replicate
      survivingViruses.concat(
        viruses.filter((virus) => virus.doesReproduce(popDensity, drugs))
      ),
      maxPop
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
