import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartCardComponent } from '../../shared/components/chart-card/chart-card.component';
import { ChartService } from '../../core/services/chart.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, ChartCardComponent],
  template: `
    <div class="dashboard-container">
      <!-- Header -->
      <header class="dashboard-header">
        <div class="header-content">
          <div class="header-title-section">
            <h1 class="dashboard-title">
              <span class="title-icon">🌍</span>
              Dashboard de Energías Renovables
            </h1>
            <p class="dashboard-subtitle">
              Análisis de producción, consumo y emisiones de CO₂
            </p>
          </div>
          
          <div class="stats-container">
            <div class="stat-card">
              <div class="stat-icon">📊</div>
              <div class="stat-content">
                <span class="stat-value">{{ filteredCharts().length }}</span>
                <span class="stat-label">Gráficos</span>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">🌱</div>
              <div class="stat-content">
                <span class="stat-value">100%</span>
                <span class="stat-label">Renovable</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Filters Section -->
      <section class="filters-section">
        <div class="search-container">
          <span class="search-icon">🔍</span>
          <input 
            type="text" 
            class="search-input"
            placeholder="Buscar por título, descripción o etiquetas..."
            [(ngModel)]="searchQuery"
            (ngModelChange)="onSearchChange()"
          />
          <button 
            *ngIf="searchQuery()" 
            class="clear-search"
            (click)="clearSearch()"
          >
            ✕
          </button>
        </div>

        <div class="category-filters">
          <button 
            *ngFor="let option of filterOptions"
            class="filter-btn"
            [class.active]="selectedCategory() === option.value"
            (click)="selectCategory(option.value)"
          >
            <span class="filter-icon">{{ option.icon }}</span>
            <span class="filter-label">{{ option.label }}</span>
          </button>
        </div>
      </section>

      <!-- Charts Grid -->
      <section class="charts-section">
        <div class="charts-grid" *ngIf="filteredCharts().length > 0">
          <app-chart-card 
            *ngFor="let chart of filteredCharts()"
            [chart]="chart"
          />
        </div>
        
        <div class="empty-state" *ngIf="filteredCharts().length === 0">
          <div class="empty-icon">📭</div>
          <h3>No se encontraron gráficos</h3>
          <p>Intenta con otros filtros o términos de búsqueda</p>
          <button class="reset-btn" (click)="resetFilters()">
            Restablecer filtros
          </button>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .dashboard-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 24px;
    }

    .dashboard-header {
      background: white;
      border-radius: 20px;
      padding: 32px;
      margin-bottom: 24px;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 32px;
    }

    .header-title-section {
      flex: 1;
    }

    .dashboard-title {
      margin: 0 0 8px 0;
      font-size: 2.5rem;
      font-weight: 700;
      color: #1a1a1a;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .title-icon {
      font-size: 2.5rem;
    }

    .dashboard-subtitle {
      margin: 0;
      font-size: 1.1rem;
      color: #666;
      font-weight: 400;
    }

    .stats-container {
      display: flex;
      gap: 16px;
    }

    .stat-card {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 16px;
      padding: 20px 24px;
      display: flex;
      align-items: center;
      gap: 16px;
      color: white;
      min-width: 140px;
    }

    .stat-icon {
      font-size: 2rem;
    }

    .stat-content {
      display: flex;
      flex-direction: column;
    }

    .stat-value {
      font-size: 1.75rem;
      font-weight: 700;
      line-height: 1;
    }

    .stat-label {
      font-size: 0.85rem;
      opacity: 0.9;
      margin-top: 4px;
    }

    .filters-section {
      background: white;
      border-radius: 20px;
      padding: 24px;
      margin-bottom: 24px;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    }

    .search-container {
      position: relative;
      margin-bottom: 20px;
    }

    .search-icon {
      position: absolute;
      left: 16px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 1.2rem;
    }

    .search-input {
      width: 100%;
      padding: 14px 48px 14px 48px;
      border: 2px solid #e0e0e0;
      border-radius: 12px;
      font-size: 1rem;
      transition: all 0.3s ease;
      background: #f8f9fa;
    }

    .search-input:focus {
      outline: none;
      border-color: #667eea;
      background: white;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .clear-search {
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
      background: #e0e0e0;
      border: none;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 0.9rem;
      color: #666;
      transition: all 0.2s ease;
    }

    .clear-search:hover {
      background: #d0d0d0;
      color: #333;
    }

    .category-filters {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }

    .filter-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 20px;
      border: 2px solid #e0e0e0;
      background: white;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 0.95rem;
      font-weight: 500;
      color: #666;
    }

    .filter-btn:hover {
      border-color: #667eea;
      color: #667eea;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(102, 126, 234, 0.2);
    }

    .filter-btn.active {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-color: transparent;
      color: white;
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    }

    .filter-icon {
      font-size: 1.2rem;
    }

    .charts-section {
      background: white;
      border-radius: 20px;
      padding: 32px;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    }

    .charts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
      gap: 24px;
    }

    .empty-state {
      text-align: center;
      padding: 60px 20px;
    }

    .empty-icon {
      font-size: 4rem;
      margin-bottom: 16px;
    }

    .empty-state h3 {
      margin: 0 0 8px 0;
      font-size: 1.5rem;
      color: #1a1a1a;
    }

    .empty-state p {
      margin: 0 0 24px 0;
      color: #666;
      font-size: 1rem;
    }

    .reset-btn {
      padding: 12px 28px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 12px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .reset-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
    }

    @media (max-width: 1024px) {
      .charts-grid {
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      }

      .header-content {
        flex-direction: column;
        align-items: flex-start;
      }

      .stats-container {
        width: 100%;
        justify-content: flex-start;
      }
    }

    @media (max-width: 768px) {
      .dashboard-container {
        padding: 16px;
      }

      .dashboard-header {
        padding: 24px 20px;
      }

      .dashboard-title {
        font-size: 1.75rem;
      }

      .title-icon {
        font-size: 1.75rem;
      }

      .dashboard-subtitle {
        font-size: 0.95rem;
      }

      .stats-container {
        flex-direction: column;
        width: 100%;
      }

      .stat-card {
        width: 100%;
      }

      .filters-section {
        padding: 20px;
      }

      .charts-section {
        padding: 24px 20px;
      }

      .charts-grid {
        grid-template-columns: 1fr;
        gap: 20px;
      }

      .category-filters {
        gap: 8px;
      }

      .filter-btn {
        flex: 1 1 calc(50% - 4px);
        justify-content: center;
        padding: 10px 16px;
        font-size: 0.85rem;
      }
    }
  `]
})
export class DashboardComponent {
  private chartService = ChartService;
  
  selectedCategory = signal('all');
  searchQuery = signal('');
  
  filterOptions = this.chartService.prototype.getFilterOptions();
  
  filteredCharts = computed(() => {
    let charts = this.chartService.prototype.getCharts();
    
    // Apply category filter
    if (this.selectedCategory() !== 'all') {
      charts = this.chartService.prototype.getChartsByCategory(this.selectedCategory());
    }
    
    // Apply search filter
    if (this.searchQuery()) {
      const query = this.searchQuery().toLowerCase();
      charts = charts.filter(chart =>
        chart.title.toLowerCase().includes(query) ||
        chart.description.toLowerCase().includes(query) ||
        chart.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    return charts;
  });

//   constructor(private chartService: ChartService) {}

//  constructor() {
//     this.chartService = new ChartService();
//   }

  constructor() {
    this.chartService;
  }

  selectCategory(category: string) {
    this.selectedCategory.set(category);
  }

  onSearchChange() {
    // Trigger computed signal update
  }

  clearSearch() {
    this.searchQuery.set('');
  }

  resetFilters() {
    this.selectedCategory.set('all');
    this.searchQuery.set('');
  }
}