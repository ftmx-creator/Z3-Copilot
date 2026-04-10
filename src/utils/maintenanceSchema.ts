export interface MaintenanceItem {
  id: string;
  label: string;
  intervalKm: number;
  category: 'maintenance' | 'safety' | 'other';
  icon: string;
}

export const MAINTENANCE_SCHEMA: MaintenanceItem[] = [
  { id: 'oil', label: 'Oil Service', intervalKm: 15000, category: 'maintenance', icon: 'droplet' },
  { id: 'insp1', label: 'Inspection I', intervalKm: 30000, category: 'maintenance', icon: 'clipboard-check' },
  { id: 'insp2', label: 'Inspection II', intervalKm: 60000, category: 'maintenance', icon: 'clipboard-list' },
  { id: 'tires', label: 'Pneus', intervalKm: 50000, category: 'safety', icon: 'circle' },
  { id: 'brakes', label: 'Plaquettes de freins', intervalKm: 40000, category: 'safety', icon: 'disc' },
  { id: 'cooling', label: 'Système Refroidissement', intervalKm: 100000, category: 'maintenance', icon: 'thermometer' },
  { id: 'spark_plugs', label: 'Bougies d\'allumage', intervalKm: 60000, category: 'maintenance', icon: 'zap' },
  { id: 'filters', label: 'Filtres Air/Habitacle', intervalKm: 30000, category: 'maintenance', icon: 'wind' },
  { id: 'ac', label: 'Recharge Clim', intervalKm: 45000, category: 'other', icon: 'snowflake' },
];

export const getMaintenanceById = (id: string) => 
  MAINTENANCE_SCHEMA.find(item => item.id === id);
