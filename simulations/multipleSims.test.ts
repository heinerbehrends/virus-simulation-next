import { runMultipleSims } from './multipleSims';

describe('multipleSimulations', () => {
  const sims = runMultipleSims({
    prescriptions: { 300: 'grimpex', 299: 'guttagonol' },
  });
  it('runs multiple simulations and returnS the number of cured not cured patients', () => {
    expect(typeof sims[0]).toBe('number');
    expect(typeof sims[1]).toBe('number');
  });
  it('returns zero cured Patients if there are no drugs administered', () => {
    expect(sims[0]).toBe(0);
    expect(sims[1]).toBe(20);
  });
  it('returns zero not cured Patients if both drugs are administered early', () => {
    const sims2 = runMultipleSims({
      prescriptions: { 1: 'grimpex', 2: 'guttagonol' },
    });
    expect(sims2[0]).toBe(20);
    expect(sims2[1]).toBe(0);
  });
});
