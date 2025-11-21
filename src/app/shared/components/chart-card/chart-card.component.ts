import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartData } from '../../../core/models/chart.model';

@Component({
  selector: 'app-chart-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="chart-card" [class.loading]="isLoading()">
      <div class="chart-card-header">
        <h3 class="chart-title">{{ chart.title }}</h3>
        <div class="chart-tags">
          <span class="tag" *ngFor="let tag of chart.tags">{{ tag }}</span>
        </div>
      </div>
      
      <div class="chart-image-container">
        <img 
          [src]="chart.imagePath" 
          [alt]="chart.title"
          (load)="onImageLoad()"
          (error)="onImageError()"
          class="chart-image"
        />
        <div class="image-overlay" *ngIf="isLoading()">
          <div class="spinner"></div>
        </div>
        <div class="error-message" *ngIf="hasError()">
          <span class="error-icon">⚠️</span>
          <p>Imagen no disponible</p>
        </div>
      </div>
      
      <div class="chart-description">
        <p>{{ chart.description }}</p>
      </div>
    </div>
  `,
  styles: [`
    .chart-card {
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
      overflow: hidden;
      transition: all 0.3s ease;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .chart-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
    }

    .chart-card-header {
      padding: 24px 24px 16px;
      border-bottom: 1px solid #f0f0f0;
    }

    .chart-title {
      margin: 0 0 12px 0;
      font-size: 1.25rem;
      font-weight: 600;
      color: #1a1a1a;
      line-height: 1.4;
    }

    .chart-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .tag {
      display: inline-block;
      padding: 4px 12px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: lowercase;
    }

    .chart-image-container {
      position: relative;
      width: 100%;
      padding-top: 60%;
      background: #f8f9fa;
      overflow: hidden;
    }

    .chart-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
      padding: 16px;
      transition: opacity 0.3s ease;
    }

    .loading .chart-image {
      opacity: 0;
    }

    .image-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.9);
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #667eea;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .error-message {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: #fff3f3;
      color: #d32f2f;
    }

    .error-icon {
      font-size: 2.5rem;
      margin-bottom: 8px;
    }

    .error-message p {
      margin: 0;
      font-size: 0.9rem;
      font-weight: 500;
    }

    .chart-description {
      padding: 20px 24px 24px;
      flex-grow: 1;
    }

    .chart-description p {
      margin: 0;
      color: #666;
      font-size: 0.95rem;
      line-height: 1.6;
    }

    @media (max-width: 768px) {
      .chart-card-header {
        padding: 20px 16px 12px;
      }

      .chart-title {
        font-size: 1.1rem;
      }

      .chart-description {
        padding: 16px;
      }
    }
  `]
})
export class ChartCardComponent {
  @Input({ required: true }) chart!: ChartData;
  
  isLoading = signal(true);
  hasError = signal(false);

  onImageLoad() {
    this.isLoading.set(false);
    this.hasError.set(false);
  }

  onImageError() {
    this.isLoading.set(false);
    this.hasError.set(true);
  }
}