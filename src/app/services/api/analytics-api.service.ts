import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiHttpService } from './api-http.service';
import { API_ENDPOINTS } from './api.endpoints';
import { DashboardMetrics, ApiResponse } from '../../models/recruit.model';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsApiService {
  private readonly http = inject(ApiHttpService);

  /**
   * [GET /api/v1/analytics/dashboard]
   * Get aggregated dashboard metrics, KPI counters, department stats, and application breakdown.
   */
  getDashboardMetrics(): Observable<ApiResponse<DashboardMetrics>> {
    return this.http.get<ApiResponse<DashboardMetrics>>(API_ENDPOINTS.ANALYTICS.DASHBOARD);
  }
}
