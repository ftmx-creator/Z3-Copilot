import { colors } from '../theme/colors';

export type EngineType = '4cyl' | '6cyl' | 'M';

export interface MaintenanceItem {
  id: string;
  label: string;
  category: 'maintenance' | 'safety' | 'other';
  icon: string;
}

export interface DetailedMaintenanceItem extends MaintenanceItem {
  intervalKm?: number;
  intervalYears?: number;
  detail: string;
}

export const getEngineType = (model: string): EngineType => {
  const m = model.toLowerCase();
  if (m.includes('m roadster') || m.includes('m coupé')) return 'M';
  if (m.includes('2.0') || m.includes('2.2') || m.includes('2.8') || m.includes('3.0')) return '6cyl';
  return '4cyl';
};

export const MAINTENANCE_BASE: MaintenanceItem[] = [
  { id: 'oil', label: 'Vidange + filtre à huile', category: 'maintenance', icon: 'droplet' },
  { id: 'air_filter', label: 'Filtre à air', category: 'maintenance', icon: 'wind' },
  { id: 'cabin_filter', label: 'Filtre habitacle', category: 'maintenance', icon: 'airway' },
  { id: 'spark_plugs', label: 'Bougies d\'allumage', category: 'maintenance', icon: 'zap' },
  { id: 'fuel_filter', label: 'Filtre à essence', category: 'maintenance', icon: 'fuel' },
  { id: 'brake_fluid', label: 'Liquide de frein', category: 'safety', icon: 'disc' },
  { id: 'brake_pads', label: 'Plaquettes de frein', category: 'safety', icon: 'disc' },
  { id: 'brake_discs', label: 'Disques de frein', category: 'safety', icon: 'disc' },
  { id: 'shocks', label: 'Amortisseurs', category: 'safety', icon: 'arrow-up-down' },
  { id: 'bushings', label: 'Silentblocs', category: 'safety', icon: 'layers' },
  { id: 'water_pump', label: 'Pompe à eau', category: 'maintenance', icon: 'refresh-cw' },
  { id: 'thermostat', label: 'Thermostat', category: 'maintenance', icon: 'thermometer' },
  { id: 'cooling_system', label: 'Radiateur + vase expansion', category: 'maintenance', icon: 'shield-alert' },
  { id: 'clutch', label: 'Embrayage', category: 'maintenance', icon: 'zap-off' },
  { id: 'timing', label: 'Chaîne / tendeur', category: 'maintenance', icon: 'settings' },
  { id: 'coolant', label: 'Liquide refroidissement', category: 'maintenance', icon: 'droplets' },
  { id: 'battery', label: 'Batterie', category: 'other', icon: 'battery' },
  { id: 'tires', label: 'Pneus', category: 'safety', icon: 'circle' },
];

const SCHEMA_DATA: Record<EngineType, Record<string, { km?: number, years?: number, detail: string }>> = {
  '4cyl': {
    oil: { km: 10000, years: 1, detail: 'Usage standard, moteur robuste et tolérant.' },
    air_filter: { km: 20000, detail: 'Peu contraint sur ces motorisations.' },
    cabin_filter: { km: 20000, years: 2, detail: 'Pour un confort optimal dans l\'habitacle.' },
    spark_plugs: { km: 60000, detail: '4 bougies seulement, coût de remplacement faible.' },
    fuel_filter: { km: 60000, detail: 'Souvent oublié, important pour la pompe.' },
    brake_fluid: { years: 2, detail: 'Standard pour maintenir le point d\'ébullition.' },
    brake_pads: { km: 40000, detail: 'Usure modérée sur ces modèles moins puissants.' },
    brake_discs: { km: 80000, detail: 'Souvent 1 jeu de disques pour 2 jeux de plaquettes.' },
    shocks: { km: 120000, detail: 'Conduite souple privilégiée.' },
    bushings: { km: 120000, detail: 'Vieillissement classique du caoutchouc.' },
    water_pump: { km: 120000, detail: 'Préventif conseillé pour éviter la panne.' },
    thermostat: { km: 120000, detail: 'À faire impérativement avec la pompe à eau.' },
    cooling_system: { km: 150000, detail: 'Vieillissement des plastiques du vase et du radiateur.' },
    clutch: { km: 150000, detail: 'Usage normal, longévité standard.' },
    timing: { km: 150000, detail: 'Contrôle simple, peu de risques de saut de chaîne.' },
    coolant: { years: 4, detail: 'Standard BMW Bleu, vidange complète conseillée.' },
    battery: { years: 5, detail: 'Faible consommation électrique au repos.' },
    tires: { years: 4, detail: 'Usure modérée selon le style de conduite.' },
  },
  '6cyl': {
    oil: { km: 8000, years: 1, detail: 'Sensible à la qualité d’huile. 8-10k km max.' },
    air_filter: { km: 15000, detail: 'Encrassement plus rapide sur les gros poumons.' },
    cabin_filter: { km: 15000, detail: 'Ventilation plus sollicitée sur les roadsters.' },
    spark_plugs: { km: 40000, detail: '6 bougies, coût supérieur, accès plus serré.' },
    fuel_filter: { km: 40000, detail: 'Important pour maintenir les performances du M52/M54.' },
    brake_fluid: { years: 2, detail: 'Important vu le poids supérieur du bloc 6 cylindres.' },
    brake_pads: { km: 30000, detail: 'Usure plus rapide due au poids et aux performances.' },
    brake_discs: { km: 60000, detail: 'Surveiller le voile lors des freinages appuyés.' },
    shocks: { km: 80000, detail: 'Usure plus rapide due au poids sur l\'avant.' },
    bushings: { km: 80000, detail: '🔴 Faiblesse connue du châssis Z3, à surveiller.' },
    water_pump: { km: 80000, detail: '🔴 Point critique BMW, roulements fragiles.' },
    thermostat: { km: 100000, detail: 'Risque de surchauffe moteur (culasse longue).' },
    cooling_system: { km: 100000, detail: '🔴 Plastiques fragiles avec le temps (Vase/Radiateur).' },
    clutch: { km: 120000, detail: 'Couple plus élevé à encaisser.' },
    timing: { km: 120000, detail: 'Tendeur de chaîne à surveiller pour éviter les bruits.' },
    coolant: { years: 3, detail: '🔴 Très important pour la santé de la culasse longue.' },
    battery: { years: 4, detail: 'Plus d’équipements et d\'électronique embarquée.' },
    tires: { years: 3, detail: 'Couple + Poids = usure plus prononcée.' },
  },
  'M': {
    oil: { km: 5000, detail: '🔴 Huile haut de gamme obligatoire (10W60). Sensible.' },
    air_filter: { km: 10000, detail: 'Usage sport fréquent, admission à surveiller.' },
    cabin_filter: { km: 15000, detail: 'Important pour la santé du circuit clim.' },
    spark_plugs: { km: 30000, detail: '🔴 Allumage critique pour les performances du S50/S54.' },
    fuel_filter: { km: 40000, detail: '🔴 À ne pas négliger pour la santé des injecteurs.' },
    brake_fluid: { years: 1, detail: '🔴 Usage intensif fréquent, liquide haute température.' },
    brake_pads: { km: 20000, detail: '🔴 Forte sollicitation en conduite dynamique.' },
    brake_discs: { km: 40000, detail: '🔴 Conduite sportive = surveillance rapprochée.' },
    shocks: { km: 60000, detail: '🔴 Comportement sportif exigeant.' },
    bushings: { km: 60000, detail: '🔴 Très sollicité, renforts de train arrière conseillés.' },
    water_pump: { km: 80000, detail: '🔴 À anticiper absolument pour éviter la casse moteur.' },
    thermostat: { km: 80000, detail: '🔴 Remplacement préventif systématique.' },
    cooling_system: { km: 100000, detail: '🔴 Remplacement conseillé (Radiateur plus gros).' },
    clutch: { km: 80000, detail: '🔴 Usure rapide selon le type de conduite.' },
    timing: { km: 100000, detail: '🔴 VANOS + chaîne extrêmement sensibles sur bloc S.' },
    coolant: { years: 2, detail: '🔴 Critique pour la survie du moteur S.' },
    battery: { years: 4, detail: 'Usage irrégulier fréquent (hivernage fréquent).' },
    tires: { years: 2, detail: '🔴 Conduite sportive = changement fréquent.' },
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
  }));
};
