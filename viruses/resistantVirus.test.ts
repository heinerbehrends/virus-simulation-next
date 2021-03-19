import { createResistantVirus } from './resistantVirus';

describe('Resistant Virus', () => {
  it('extends simple virus', () => {
    const virus = createResistantVirus({});
    const { birthProb, clearProb, doesSurvive, doesReproduce } = virus;
    expect(birthProb).toBeTruthy();
    expect(clearProb).toBeTruthy();
    expect(doesSurvive).toBeTruthy();
    expect(doesReproduce).toBeTruthy();
  });
  it(`returns a method isRestistantAgainst that returns true if the given drug 
    exists in the resistances and false otherwise`, () => {
    const virus = createResistantVirus({
      resistances: { guttagonol: true, grimpex: false },
    });
    expect(virus.isResistantAgainst('guttagonol')).toBe(true);
    expect(virus.isResistantAgainst('grimpex')).toBe(false);
  });
  it(`returns a method doesReproduce that returns false if one or more
    of the drugs in activeDrugs does not exist in the resistances`, () => {
    const virus = createResistantVirus({
      resistances: { guttagonol: true, grimpex: false },
      birthProb: 1,
      random0to1: () => 0.4,
    });
    expect(virus.doesReproduce(0.5, ['grimpex'])).toBe(false);
    expect(virus.doesReproduce(0.5, ['guttagonol', 'grimpex'])).toBe(false);
    expect(virus.doesReproduce(0.5, [])).toBe(true);
  });
  it(`return an object with a method doesMutate that returns true
    when random is smaller than mutProb`, () => {
    const virus = createResistantVirus({ mutProb: 1 });
    expect(virus.doesMutate()).toBe(true);
    const virus2 = createResistantVirus({ mutProb: 0 });
    expect(virus2.doesMutate()).toBe(false);
  });
  it(`returns an object with a method reproduce that returns a new virus
    whose resistances mutate with a probability of mutProb.`, () => {
    const virus = createResistantVirus({
      resistances: { guttagonol: false, grimpex: false },
      mutProb: 1,
    });
    const mutatedVirus = virus.reproduce();
    expect(mutatedVirus.isResistantAgainst('grimpex')).toBe(true);
    expect(mutatedVirus.isResistantAgainst('guttagonol')).toBe(true);
    const virus2 = createResistantVirus({
      resistances: { guttagonol: false, grimpex: false },
      mutProb: 0,
    });
    const mutatedVirus2 = virus2.reproduce();
    expect(mutatedVirus2.isResistantAgainst('grimpex')).toBe(false);
    expect(mutatedVirus2.isResistantAgainst('guttagonol')).toBe(false);
  });
});
