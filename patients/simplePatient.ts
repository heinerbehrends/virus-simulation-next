import { SimpleVirus } from '../viruses/simpleVirusTypes';
import { SimplePatient } from './patientTypes';

export function createSimplePatient(
  viruses: ReadonlyArray<SimpleVirus>,
  maxPop: number
): SimplePatient {
  function getPopDensity(virusArr: ReadonlyArray<SimpleVirus>) {
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
    const nextViruses: ReadonlyArray<SimpleVirus> = survivingViruses.concat(
      viruses.filter((virus) => virus.doesReproduce(popDensity))
    );
    return createSimplePatient(
      // add the viruses that replicate
      nextViruses,
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
