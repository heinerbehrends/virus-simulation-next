import { createVirusPopulation } from '../viruses/resistantVirus';
import { createPatient } from './patientWithDrugs';

describe('createPatientWithDrugs', () => {
  it(`returns a patient object with a method addDrug that adds a drug to the patient`, () => {
    const patient = createPatient(createVirusPopulation({}), 1000);
    expect(patient.getDrugs()).toHaveLength(0);
    const newPatient = patient.addDrug('guttagonol');
    expect(Array.isArray(newPatient.getDrugs())).toBe(true);
    expect(newPatient.getDrugs()).toContain('guttagonol');
  });
  it(`returns a patient object with a method getResistantCount that returns the 
    number of resistant viruses to the given drug`, () => {
    const patient = createPatient(createVirusPopulation({}), 1000);
    expect(patient.getResistantCount('guttagonol')).toBe(0);
    const patient2 = createPatient(
      createVirusPopulation({
        resistances: { guttagonol: true, grimpex: false },
      }),
      1000
    );
    expect(patient2.getResistantCount('guttagonol')).toBe(100);
    expect(patient2.getResistantCount('grimpex')).toBe(0);
  });
});
