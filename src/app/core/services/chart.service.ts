import { Injectable, signal } from '@angular/core';
import { ChartData, ChartCategory, FilterOption } from '../models/chart.model';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private chartsData = signal<ChartData[]>([
    {
      id: '1',
      title: 'Generación de Electricidad Renovable Mundial',
      description: 'Evolución histórica de la generación de electricidad renovable global desde 1965 hasta 2024, desglosada por fuentes: hidroeléctrica, eólica, solar y otras renovables.',
      imagePath: 'assets/charts/renewable-electricity-generation.png',
      category: ChartCategory.CONSUMPTION,
      tags: ['generación', 'electricidad', 'renovables', 'hidroeléctrica', 'eólica', 'solar']
    },
    {
      id: '2',
      title: 'Participación de Energías Renovables por País (2024)',
      description: 'Mapa mundial que muestra el porcentaje del consumo de energía primaria proveniente de fuentes renovables en cada país, medido mediante el método de sustitución.',
      imagePath: 'assets/charts/renewable-share-energy.png',
      category: ChartCategory.RENEWABLE_SHARE,
      tags: ['participación', 'porcentaje', 'mundial', 'países', 'mapa']
    },
    {
      id: '3',
      title: 'Consumo de Energía Primaria Renovable (2024)',
      description: 'Distribución geográfica del consumo de energía primaria renovable medido en terawatt-horas, incluyendo hidroeléctrica, solar, eólica, geotérmica, mareomotriz y bioenergía.',
      imagePath: 'assets/charts/primary-energy-renewables.png',
      category: ChartCategory.PRIMARY_ENERGY,
      tags: ['consumo', 'energía primaria', 'TWh', 'global', 'mapa']
    },
    {
      id: '4',
      title: 'Cambio Anual: Combustibles Fósiles vs Energía Baja en Carbono',
      description: 'Comparativa del cambio año a año en el consumo de energía primaria entre combustibles fósiles y energías bajas en carbono (nuclear + renovables) desde 1966 hasta 2024.',
      imagePath: 'assets/charts/fossil-vs-low-carbon.png',
      category: ChartCategory.FOSSIL_VS_LOW_CARBON,
      tags: ['fósiles', 'carbono', 'nuclear', 'renovables', 'comparativa', 'histórico']
    }
  ]);

  private filterOptions: FilterOption[] = [
    { value: 'all', label: 'Todos los Gráficos', icon: '📊' },
    { value: ChartCategory.CONSUMPTION, label: 'Consumo', icon: '⚡' },
    { value: ChartCategory.RENEWABLE_SHARE, label: 'Participación', icon: '🔋' },
    { value: ChartCategory.PRIMARY_ENERGY, label: 'Energía Primaria', icon: '🌱' },
    { value: ChartCategory.FOSSIL_VS_LOW_CARBON, label: 'Fósiles vs Limpias', icon: '🏭' }
  ];

  getCharts() {
    return this.chartsData();
  }

  getFilterOptions() {
    return this.filterOptions;
  }

  getChartsByCategory(category: string): ChartData[] {
    if (category === 'all') {
      return this.chartsData();
    }
    return this.chartsData().filter(chart => chart.category === category);
  }

  searchCharts(query: string): ChartData[] {
    const lowerQuery = query.toLowerCase();
    return this.chartsData().filter(chart =>
      chart.title.toLowerCase().includes(lowerQuery) ||
      chart.description.toLowerCase().includes(lowerQuery) ||
      chart.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }
}