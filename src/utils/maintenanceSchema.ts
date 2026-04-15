import { colors } from '../theme/colors';

export type EngineType = '4cyl' | '6cyl' | 'M';

export interface MaintenanceItem {
  id: string;
  label: string;
  typeLabel: 'Oil Service' | 'Entretien & réparation';
  category: 'maintenance' | 'safety' | 'other';
  icon: string;
}

export interface DetailedMaintenanceItem extends MaintenanceItem {
  intervalKm?: number;
  intervalYears?: number;
  detail: string;
  estimatedCost: string;
}

export const getEngineType = (model: string): EngineType => {
  const m = model.toLowerCase();
  if (m.includes('m roadster') || m.includes('m coupé')) return 'M';
  if (m.includes('2.0') || m.includes('2.2') || m.includes('2.8') || m.includes('3.0')) return '6cyl';
  return '4cyl';
};

export const MAINTENANCE_BASE: MaintenanceItem[] = [
  { id: 'oil', label: 'Vidange + filtre à huile', typeLabel: 'Oil Service', category: 'maintenance', icon: 'droplets' },
  { id: 'air_filter', label: 'Filtre à air', typeLabel: 'Entretien & réparation', category: 'maintenance', icon: 'wind' },
  { id: 'cabin_filter', label: 'Filtre habitacle', typeLabel: 'Entretien & réparation', category: 'maintenance', icon: 'airway' },
  { id: 'spark_plugs', label: 'Bougies d\'allumage', typeLabel: 'Entretien & réparation', category: 'maintenance', icon: 'zap' },
  { id: 'fuel_filter', label: 'Filtre à essence', typeLabel: 'Entretien & réparation', category: 'maintenance', icon: 'fuel' },
  { id: 'brake_fluid', label: 'Liquide de frein', typeLabel: 'Entretien & réparation', category: 'safety', icon: 'disc' },
  { id: 'brake_pads', label: 'Plaquettes de frein', typeLabel: 'Entretien & réparation', category: 'safety', icon: 'disc' },
  { id: 'brake_discs', label: 'Disques de frein', typeLabel: 'Entretien & réparation', category: 'safety', icon: 'disc' },
  { id: 'shocks', label: 'Amortisseurs', typeLabel: 'Entretien & réparation', category: 'safety', icon: 'arrow-up-down' },
  { id: 'bushings', label: 'Silentblocs', typeLabel: 'Entretien & réparation', category: 'safety', icon: 'layers' },
  { id: 'water_pump', label: 'Pompe à eau', typeLabel: 'Entretien & réparation', category: 'maintenance', icon: 'refresh-cw' },
  { id: 'thermostat', label: 'Thermostat', typeLabel: 'Entretien & réparation', category: 'maintenance', icon: 'thermometer' },
  { id: 'cooling_system', label: 'Radiateur', typeLabel: 'Entretien & réparation', category: 'maintenance', icon: 'shield-alert' },
  { id: 'clutch', label: 'Embrayage', typeLabel: 'Entretien & réparation', category: 'maintenance', icon: 'zap-off' },
  { id: 'timing', label: 'Chaîne / tendeur', typeLabel: 'Entretien & réparation', category: 'maintenance', icon: 'settings' },
  { id: 'coolant', label: 'Refroidissement', typeLabel: 'Entretien & réparation', category: 'maintenance', icon: 'droplets' },
  { id: 'battery', label: 'Batterie', typeLabel: 'Entretien & réparation', category: 'other', icon: 'battery' },
  { id: 'tires_front', label: 'Pneus AV (avant)', typeLabel: 'Entretien & réparation', category: 'safety', icon: 'circle' },
  { id: 'tires_rear', label: 'Pneus AR (arrière)', typeLabel: 'Entretien & réparation', category: 'safety', icon: 'circle' },
];

const SCHEMA_DATA: Record<EngineType, Record<string, { km?: number, years?: number, detail: string, cost: string }>> = {
  '4cyl': {
    oil: { km: 10000, years: 1, detail: 'Usage standard.', cost: '100 – 200 €' },
    air_filter: { km: 20000, detail: 'Simple.', cost: '30 – 80 €' },
    cabin_filter: { km: 20000, years: 2, detail: 'Confort.', cost: '40 – 100 €' },
    spark_plugs: { km: 60000, detail: '4 bougies.', cost: '80 – 200 €' },
    fuel_filter: { km: 60000, detail: 'Souvent oublié.', cost: '80 – 150 €' },
    brake_fluid: { years: 2, detail: 'Standard.', cost: '80 – 150 €' },
    brake_pads: { km: 40000, detail: 'Usure modérée.', cost: '150 – 300 €' },
    brake_discs: { km: 80000, detail: '1 jeu / 2 plaquettes.', cost: '300 – 700 €' },
    shocks: { km: 120000, detail: 'Confort.', cost: '400 – 900 €' },
    bushings: { km: 120000, detail: 'Vieillissement.', cost: '300 – 800 €' },
    water_pump: { km: 120000, detail: 'Préventif.', cost: '300 – 600 €' },
    thermostat: { km: 120000, detail: 'Avec pompe.', cost: '150 – 300 €' },
    cooling_system: { km: 150000, detail: 'Vieillissement.', cost: '400 – 800 €' },
    clutch: { km: 150000, detail: 'Usage normal.', cost: '700 – 1 500 €' },
    timing: { km: 150000, detail: 'Faible risque.', cost: '300 – 1 000 €' },
    coolant: { years: 4, detail: 'Standard.', cost: '80 – 150 €' },
    battery: { years: 5, detail: 'Simple.', cost: '100 – 250 €' },
    tires_front: { km: 30000, detail: 'Usure faible.', cost: '200 – 500 €' },
    tires_rear: { km: 20000, detail: 'Propulsion → usure.', cost: '250 – 600 €' },
  },
  '6cyl': {
    oil: { km: 8000, detail: 'Huile plus exigeante.', cost: '100 – 200 €' },
    air_filter: { km: 15000, detail: 'Plus sollicité.', cost: '30 – 80 €' },
    cabin_filter: { km: 15000, detail: 'Ventilation.', cost: '40 – 100 €' },
    spark_plugs: { km: 40000, detail: '6 bougies.', cost: '80 – 200 €' },
    fuel_filter: { km: 40000, detail: 'Important.', cost: '80 – 150 €' },
    brake_fluid: { years: 2, detail: 'Important.', cost: '80 – 150 €' },
    brake_pads: { km: 30000, detail: 'Plus rapide.', cost: '150 – 300 €' },
    brake_discs: { km: 60000, detail: 'Usure + rapide.', cost: '300 – 700 €' },
    shocks: { km: 80000, detail: 'Plus sollicités.', cost: '400 – 900 €' },
    bushings: { km: 80000, detail: '🔴 Faiblesse Z3.', cost: '300 – 800 €' },
    water_pump: { km: 80000, detail: '🔴 Critique.', cost: '300 – 600 €' },
    thermostat: { km: 100000, detail: 'Risque surchauffe.', cost: '150 – 300 €' },
    cooling_system: { km: 100000, detail: '🔴 Fragile.', cost: '400 – 800 €' },
    clutch: { km: 120000, detail: 'Couple ↑.', cost: '700 – 1 500 €' },
    timing: { km: 150000, detail: 'Tendeur.', cost: '300 – 1 000 €' },
    coolant: { years: 3, detail: '🔴 Important.', cost: '80 – 150 €' },
    battery: { years: 4, detail: '+ équipements.', cost: '100 – 250 €' },
    tires_front: { km: 25000, detail: 'Direction + poids.', cost: '200 – 500 €' },
    tires_rear: { km: 15000, detail: 'Couple élevé.', cost: '250 – 600 €' },
  },
  'M': {
    oil: { km: 5000, detail: '🔴 Huile premium.', cost: '100 – 200 €' },
    air_filter: { km: 10000, detail: 'Sport.', cost: '30 – 80 €' },
    cabin_filter: { km: 15000, detail: 'Clim.', cost: '40 – 100 €' },
    spark_plugs: { km: 30000, detail: '🔴 Perf.', cost: '80 – 200 €' },
    fuel_filter: { km: 40000, detail: '🔴', cost: '80 – 150 €' },
    brake_fluid: { years: 1, detail: '🔴', cost: '80 – 150 €' },
    brake_pads: { km: 20000, detail: '🔴', cost: '150 – 300 €' },
    brake_discs: { km: 40000, detail: '🔴', cost: '300 – 700 €' },
    shocks: { km: 60000, detail: '🔴', cost: '400 – 900 €' },
    bushings: { km: 60000, detail: '🔴', cost: '300 – 800 €' },
    water_pump: { km: 80000, detail: '🔴', cost: '300 – 600 €' },
    thermostat: { km: 80000, detail: '🔴', cost: '150 – 300 €' },
    cooling_system: { km: 100000, detail: '🔴', cost: '400 – 800 €' },
    clutch: { km: 80000, detail: '🔴', cost: '700 – 1 500 €' },
    timing: { km: 150000, detail: '🔴 VANOS', cost: '300 – 1 000 €' },
    coolant: { years: 2, detail: '🔴', cost: '80 – 150 €' },
    battery: { years: 4, detail: '', cost: '100 – 250 €' },
    tires_front: { km: 20000, detail: '🔴 Précision conduite', cost: '200 – 500 €' },
    tires_rear: { km: 10000, detail: '🔴 Très sollicité', cost: '250 – 600 €' },
  }
};

export const getMaintenanceSchema = (model: string): DetailedMaintenanceItem[] => {
  const engineType = getEngineType(model);
  const data = SCHEMA_DATA[engineType];
  
  return MAINTENANCE_BASE.map(base => ({
    ...base,
    intervalKm: data[base.id]?.km,
    intervalYears: data[base.id]?.years,
    detail: data[base.id]?.detail || '',
    estimatedCost: data[base.id]?.cost || 'Sur devis',
  }));
};
