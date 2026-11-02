// Piani decisi da Paula. Prezzi finali, senza IVA (regime forfettario). Annuale = 10 mensilità («2 mesi gratis»).
export const PLANS = {
  start:  { id: 'start',  monthly: 99,  jobs: 5,        users: 8,  clients: false },
  team:   { id: 'team',   monthly: 249, jobs: Infinity, users: 25, clients: true, rec: true },
  studio: { id: 'studio', monthly: 499, jobs: Infinity, users: 60, clients: true },
};
export const ORDER = ['start', 'team', 'studio'];
export const TRIAL_DAYS = 14;
export const CONTACT = 'info@pigiservice.com';
export const annual = id => PLANS[id].monthly * 10;
export const annualFull = id => PLANS[id].monthly * 12;
