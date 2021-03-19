import { createSimpleVirus, createSimpleVirusPopulation } from './simpleVirus';

describe('createSimpleVirus', () => {
  it('returns the birthProb and clearProb args as properties', () => {
    const { birthProb, clearProb } = createSimpleVirus({
      birthProb: 0.3,
      clearProb: 0.5,
      random0to1: Math.random,
    });
    expect(birthProb).toEqual(0.3);
    expect(clearProb).toEqual(0.5);
  });
  it('returns a method doesSurvive that returns true when random is bigger than clearProb', () => {
    const fakeRandom = () => 0.4;
    const virus = createSimpleVirus({
      birthProb: 0.3,
      clearProb: 0.3,
      random0to1: fakeRandom,
    });
    expect(virus.doesSurvive()).toEqual(true);
  });
  it('returns a method doesSurvive that returns false when random is smaller than clearProb', () => {
    const fakeRandom = () => 0.2;
    const virus = createSimpleVirus({
      birthProb: 0.3,
      clearProb: 0.3,
      random0to1: fakeRandom,
    });
    expect(virus.doesSurvive()).toEqual(false);
  });
  it('returns a method doesReproduce that returns true when random is smaller than birthProb * (1 - popDensity)', () => {
    const fakeRandom = () => 0.4;
    const virus = createSimpleVirus({
      birthProb: 1,
      clearProb: 0.3,
      random0to1: fakeRandom,
    });
    // random 0.4 < birthProb 1 * (1 - 0.5) // true
    expect(virus.doesReproduce(0.5)).toEqual(true);
  });
  it('returns a method doesReproduce that returns false when random is larger than birthProb * (1 - popDensity)', () => {
    const fakeRandom = () => 0.6;
    const virus = createSimpleVirus({
      birthProb: 1,
      clearProb: 0.3,
      random0to1: fakeRandom,
    });
    // random 0.6 < birthProb 1 * (1 - 0.5) // false
    expect(virus.doesReproduce(0.5)).toEqual(false);
  });
});

describe('createVirusPopulation', () => {
  it('returns an array of the specified length', () => {
    const viruses = createSimpleVirusPopulation({
      virusCount: 13,
      birthProb: 0.1,
      clearProb: 0.01,
    });
    expect(viruses.length).toEqual(13);
  });
});
