import { SimpleVirus } from '../viruses/simpleVirusTypes';

export type patient = {
  getPopDensity: { (virusArr: SimpleVirus[]): number };
  getVirusCount: { (): number };
  getViruses: { (): SimpleVirus[] };
  update: { (): patient };
};

export function createPatient(viruses: SimpleVirus[], maxPop: number): patient {
  function getPopDensity(virusArr) {
    return virusArr.length / maxPop;
  }
  function getVirusCount() {
    return viruses.length;
  }
  function getViruses() {
    return viruses;
  }
  // gets called by the simple simulation
  function update() {
    // filter the viruses that die
    const survivingViruses = viruses.filter((virus) => virus.doesSurvive());
    // calculate the population density of the surviving viruses
    const popDensity = getPopDensity(survivingViruses);
    // return a new patient with updated virus population
    return createPatient(
      // add the viruses that replicate
      survivingViruses.concat(
        viruses.filter((virus) => virus.doesReproduce(popDensity))
      ),
      maxPop
    );
  }

  return Object.freeze({
    getPopDensity,
    getVirusCount,
    getViruses,
    update,
  });
}
