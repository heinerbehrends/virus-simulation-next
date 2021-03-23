import { simulation } from './simulation';

describe('simulation', () => {
  it(`runs a simulation and returns an array of tuples with virus count
    and resistant virus count`, () => {
    const virusCounts = simulation({
      repetitions: 100,
      virusCount: 50,
    });
    expect(virusCounts[0]).toStrictEqual([50, 0, 0]);
    const [
      virusCountEnd,
      resistantGuttagonol,
      resistantGrimpex,
    ] = virusCounts[99];
    expect(virusCountEnd).toBeGreaterThan(50);
    expect(resistantGrimpex).toBeGreaterThan(0);
    expect(resistantGuttagonol).toBeGreaterThan(0);
  });
  it(`will return less than 2 virusCounts if both drugs are administered 
    before enough mutations exist and the viruses can't replicate`, () => {
    const virusCount = simulation({
      repetitions: 100,
      virusCount: 50,
      prescriptions: { 1: 'guttagonol', 0: 'grimpex' },
    });
    expect(Math.max(...virusCount[virusCount.length - 1])).toBeLessThan(2);
  });
  it(`will return a greater number of resistant viruses if the drug is 
      administered later in the simulation compared with early on`, () => {
    const virusCount = simulation({
      repetitions: 100,
      virusCount: 50,
      prescriptions: { 200: 'guttagonol' },
    });
    const virusCount2 = simulation({
      repetitions: 100,
      virusCount: 50,
      prescriptions: { 0: 'guttagonol' },
    });
    const guttaResistant = virusCount[virusCount.length - 1][1];
    const guttaResistant2 = virusCount2[virusCount2.length - 1][1];
    expect(guttaResistant).toBeGreaterThan(guttaResistant2);
  });
});
