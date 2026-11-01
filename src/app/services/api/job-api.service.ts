import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiHttpService } from './api-http.service';
import { API_ENDPOINTS } from './api.endpoints';
import { JobPost, ApiListResponse, ApiResponse } from '../../models/recruit.model';

export interface JobFilterParams {
  status?: string;
  department?: string;
  search?: string;
}

@Injectable({
  providedIn: 'root',
})
export class JobApiService {
  private readonly http = inject(ApiHttpService);

  /**
   * [GET /api/v1/jobs]
   * List all active jobs, with optional filters by status ('Active', 'Urgent'), department, or search query.
   */
  getJobs(filters?: JobFilterParams): Observable<ApiListResponse<JobPost>> {
    return this.http.get<ApiListResponse<JobPost>>(API_ENDPOINTS.JOBS.LIST, filters);
  }

  /**
   * [GET /api/v1/jobs/:id]
   * Retrieve a single job post by ID.
   */
  getJobById(id: string): Observable<ApiResponse<JobPost>> {
    return this.http.get<ApiResponse<JobPost>>(API_ENDPOINTS.JOBS.GET_BY_ID(id));
  }

  /**
   * [POST /api/v1/jobs]
   * Create a new job post in the database.
   */
  createJob(job: Partial<JobPost>): Observable<ApiResponse<JobPost>> {
    return this.http.post<ApiResponse<JobPost>>(API_ENDPOINTS.JOBS.CREATE, job);
  }

  /**
   * [PUT /api/v1/jobs/:id]
   * Update an existing job post details.
   */
  updateJob(id: string, updates: Partial<JobPost>): Observable<ApiResponse<JobPost>> {
    return this.http.put<ApiResponse<JobPost>>(API_ENDPOINTS.JOBS.UPDATE(id), updates);
  }

  /**
   * [DELETE /api/v1/jobs/:id]
   * Soft-delete a job (marks lifecycleStatus = 'deleted').
   */
  deleteJob(id: string): Observable<ApiResponse<{ message: string }>> {
    return this.http.delete<ApiResponse<{ message: string }>>(API_ENDPOINTS.JOBS.DELETE(id));
  }
}
