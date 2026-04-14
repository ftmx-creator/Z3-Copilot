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
  { id: 'cooling_system', label: 'Radiateur + vase expansion', typeLabel: 'Entretien & réparation', category: 'maintenance', icon: 'shield-alert' },
  { id: 'clutch', label: 'Embrayage', typeLabel: 'Entretien & réparation', category: 'maintenance', icon: 'zap-off' },
  { id: 'timing', label: 'Chaîne / tendeur', typeLabel: 'Entretien & réparation', category: 'maintenance', icon: 'settings' },
  { id: 'coolant', label: 'Liquide refroidissement', typeLabel: 'Entretien & réparation', category: 'maintenance', icon: 'droplets' },
  { id: 'battery', label: 'Batterie', typeLabel: 'Entretien & réparation', category: 'other', icon: 'battery' },
  { id: 'tires', label: 'Pneus', typeLabel: 'Entretien & réparation', category: 'safety', icon: 'circle' },
];

const SCHEMA_DATA: Record<EngineType, Record<string, { km?: number, years?: number, detail: string, cost: string }>> = {
  '4cyl': {
    oil: { km: 10000, years: 1, detail: 'Usage standard, moteur robuste.', cost: '100 – 200 €' },
    air_filter: { km: 20000, detail: 'Entretien simple et peu fréquent.', cost: '30 – 80 €' },
    cabin_filter: { km: 20000, years: 2, detail: 'Confort de l\'habitacle.', cost: '40 – 100 €' },
    spark_plugs: { km: 60000, detail: '4 bougies, coût de remplacement modéré.', cost: '80 – 200 €' },
    fuel_filter: { km: 60000, detail: 'Souvent oublié, important pour la pompe.', cost: '80 – 150 €' },
    brake_fluid: { years: 2, detail: 'Standard pour maintenir la sécurité.', cost: '80 – 150 €' },
    brake_pads: { km: 50000, detail: 'Usure modérée sur ces modèles.', cost: '150 – 300 €' },
    brake_discs: { km: 100000, detail: 'Environ 1 jeu de disques pour 2 plaquettes.', cost: '300 – 700 €' },
    shocks: { km: 120000, detail: 'Usage confort privilégié.', cost: '400 – 900 €' },
    bushings: { km: 120000, detail: 'Vieillissement classique des plastiques.', cost: '300 – 800 €' },
    water_pump: { km: 120000, detail: 'Préventif conseillé.', cost: '300 – 600 €' },
    thermostat: { km: 120000, detail: 'À remplacer avec la pompe à eau.', cost: '150 – 300 €' },
    cooling_system: { km: 150000, detail: 'Vieillissement des plastiques avec le temps.', cost: '400 – 800 €' },
    clutch: { km: 150000, detail: 'Usage normal, longévité standard.', cost: '700 – 1 500 €' },
    timing: { km: 150000, detail: 'Peu fréquent sur ces motorisations.', cost: '300 – 1 000 €' },
    coolant: { years: 4, detail: 'Standard BMW, vidange complète.', cost: '80 – 150 €' },
    battery: { years: 5.5, detail: 'Simple et fiable.', cost: '100 – 250 €' },
    tires: { years: 4.5, detail: 'Usure modérée selon conduite.', cost: '400 – 1 000 €' },
  },
  '6cyl': {
    oil: { km: 9000, detail: 'Moteur sensible à la qualité d\'huile.', cost: '100 – 200 €' },
    air_filter: { km: 17500, detail: 'Plus sollicité sur les gros poumons.', cost: '30 – 80 €' },
    cabin_filter: { km: 17500, detail: 'Ventilation plus active.', cost: '40 – 100 €' },
    spark_plugs: { km: 50000, detail: '6 bougies, coût supérieur.', cost: '80 – 200 €' },
    fuel_filter: { km: 50000, detail: 'Important pour les performances.', cost: '80 – 150 €' },
    brake_fluid: { years: 2, detail: 'Important vu le poids supérieur.', cost: '80 – 150 €' },
    brake_pads: { km: 40000, detail: 'Usure plus rapide (Poids/Puissance).', cost: '150 – 300 €' },
    brake_discs: { km: 80000, detail: 'Usure plus marquée sur le train avant.', cost: '300 – 700 €' },
    shocks: { km: 90000, detail: 'Plus sollicités par le poids du moteur.', cost: '400 – 900 €' },
    bushings: { km: 90000, detail: '🔴 Faiblesse connue du châssis Z3.', cost: '300 – 800 €' },
    water_pump: { km: 90000, detail: '🔴 Point critique connu sur 6 cyl.', cost: '300 – 600 €' },
    thermostat: { km: 100000, detail: '🔴 Risque surchauffe (culasse longue).', cost: '150 – 300 €' },
    cooling_system: { km: 110000, detail: '🔴 Fragilité des plastiques (Vase).', cost: '400 – 800 €' },
    clutch: { km: 135000, detail: 'Couple moteur plus important.', cost: '700 – 1 500 €' },
    timing: { km: 150000, detail: 'Tendeur de chaîne à surveiller.', cost: '300 – 1 000 €' },
    coolant: { years: 3.5, detail: '🔴 Très important pour la culasse.', cost: '80 – 150 €' },
    battery: { years: 4.5, detail: 'Plus d\'équipements électriques.', cost: '100 – 250 €' },
    tires: { years: 3.5, detail: 'Couple + Poids = usure plus rapide.', cost: '400 – 1 000 €' },
  },
  'M': {
    oil: { km: 6000, detail: '🔴 Huile premium (10W60) obligatoire.', cost: '100 – 200 €' },
    air_filter: { km: 12500, detail: 'Usage sport fréquent.', cost: '30 – 80 €' },
    cabin_filter: { km: 15000, detail: 'Important pour la santé du circuit clim.', cost: '40 – 100 €' },
    spark_plugs: { km: 35000, detail: '🔴 Haute performance exigeante.', cost: '80 – 200 €' },
    fuel_filter: { km: 40000, detail: '🔴 Crucial pour les injecteurs.', cost: '80 – 150 €' },
    brake_fluid: { years: 1.5, detail: '🔴 Performance de freinage critique.', cost: '80 – 150 €' },
    brake_pads: { km: 30000, detail: '🔴 Forte sollicitation sportive.', cost: '150 – 300 €' },
    brake_discs: { km: 60000, detail: '🔴 Surveillance rapprochée nécessaire.', cost: '300 – 700 €' },
    shocks: { km: 70000, detail: '🔴 Comportement routier exigeant.', cost: '400 – 900 €' },
    bushings: { km: 70000, detail: '🔴 Train arrière très sollicité.', cost: '300 – 800 €' },
    water_pump: { km: 80000, detail: '🔴 À anticiper impérativement.', cost: '300 – 600 €' },
    thermostat: { km: 90000, detail: '🔴 Remplacement préventif.', cost: '150 – 300 €' },
    cooling_system: { km: 100000, detail: '🔴 Remplacement complet conseillé.', cost: '400 – 800 €' },
    clutch: { km: 100000, detail: '🔴 Usure selon le type d\'utilisation.', cost: '700 – 1 500 €' },
    timing: { km: 150000, detail: '🔴 VANOS / Chaîne sensibles sur S50/S54.', cost: '300 – 1 000 €' },
    coolant: { years: 2.5, detail: '🔴 Critique pour la survie du bloc M.', cost: '80 – 150 €' },
    battery: { years: 4, detail: 'Hivernage fréquent.', cost: '100 – 250 €' },
    tires: { years: 2.5, detail: '🔴 Conduite sportive = changement fréquent.', cost: '400 – 1 000 €' },
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
