export interface ChartData {
  id: string;
  title: string;
  description: string;
  imagePath: string;
  category: ChartCategory;
  tags: string[];
}

export enum ChartCategory {
  CONSUMPTION = 'consumption',
  RENEWABLE_SHARE = 'renewable-share',
  PRIMARY_ENERGY = 'primary-energy',
  FOSSIL_VS_LOW_CARBON = 'fossil-vs-low-carbon'
}

export interface FilterOption {
  value: string;
  label: string;
  icon: string;
}