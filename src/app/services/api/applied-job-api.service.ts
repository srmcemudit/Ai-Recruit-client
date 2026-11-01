import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiHttpService } from './api-http.service';
import { API_ENDPOINTS } from './api.endpoints';
import { AppliedJob, AppliedJobStatus, ApiListResponse, ApiResponse } from '../../models/recruit.model';

export interface AppliedJobFilterParams {
  jobId?: string;
  userId?: string;
  status?: AppliedJobStatus | string;
  stage?: string;
  search?: string;
}

export interface UpdateApplicationStatusPayload {
  status: AppliedJobStatus | string;
  stage?: string;
  feedback?: string;
  notes?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AppliedJobApiService {
  private readonly http = inject(ApiHttpService);

  /**
   * [GET /api/v1/applied-jobs]
   * Get all active job applications with optional filters (by jobId, userId, status, stage, search).
   */
  getApplications(filters?: AppliedJobFilterParams): Observable<ApiListResponse<AppliedJob>> {
    return this.http.get<ApiListResponse<AppliedJob>>(API_ENDPOINTS.APPLICATIONS.LIST, filters);
  }

  /**
   * [GET /api/v1/applied-jobs?jobId=...]
   * Get applications for a specific job post.
   */
  getApplicationsForJob(jobId: string, status?: AppliedJobStatus | string): Observable<ApiListResponse<AppliedJob>> {
    return this.http.get<ApiListResponse<AppliedJob>>(API_ENDPOINTS.APPLICATIONS.LIST, { jobId, status });
  }

  /**
   * [GET /api/v1/applied-jobs?userId=...]
   * Get applications submitted by a specific user.
   */
  getApplicationsForUser(userId: string): Observable<ApiListResponse<AppliedJob>> {
    return this.http.get<ApiListResponse<AppliedJob>>(API_ENDPOINTS.APPLICATIONS.LIST, { userId });
  }

  /**
   * [GET /api/v1/applied-jobs/:id]
   * Get single application details with joined User and Job.
   */
  getApplicationById(id: string): Observable<ApiResponse<AppliedJob>> {
    return this.http.get<ApiResponse<AppliedJob>>(API_ENDPOINTS.APPLICATIONS.GET_BY_ID(id));
  }

  /**
   * [POST /api/v1/applied-jobs]
   * Apply to a job (Creates a new entry in applied_jobs).
   */
  applyToJob(application: {
    jobId: string;
    userId: string;
    status?: AppliedJobStatus | string;
    stage?: string;
    salaryExpectation?: string;
    coverLetter?: string;
    resume?: any;
    matchScore?: number;
    aiSummary?: string;
  }): Observable<ApiResponse<AppliedJob>> {
    return this.http.post<ApiResponse<AppliedJob>>(API_ENDPOINTS.APPLICATIONS.APPLY, application);
  }

  /**
   * [PUT /api/v1/applied-jobs/:id]
   * Update general application details.
   */
  updateApplication(id: string, updates: Partial<AppliedJob>): Observable<ApiResponse<AppliedJob>> {
    return this.http.put<ApiResponse<AppliedJob>>(API_ENDPOINTS.APPLICATIONS.UPDATE(id), updates);
  }

  /**
   * [PATCH /api/v1/applied-jobs/:id/status]
   * Track / update application status (e.g. shortlisted, not_shortlisted, interviewing, interviewed, etc.).
   */
  updateStatus(
    id: string,
    payload: UpdateApplicationStatusPayload | AppliedJobStatus
  ): Observable<ApiResponse<AppliedJob>> {
    const body: UpdateApplicationStatusPayload =
      typeof payload === 'string' ? { status: payload } : payload;
    return this.http.patch<ApiResponse<AppliedJob>>(API_ENDPOINTS.APPLICATIONS.UPDATE_STATUS(id), body);
  }

  /**
   * [DELETE /api/v1/applied-jobs/:id]
   * Soft-delete an application.
   */
  deleteApplication(id: string): Observable<ApiResponse<{ message: string }>> {
    return this.http.delete<ApiResponse<{ message: string }>>(API_ENDPOINTS.APPLICATIONS.DELETE(id));
  }
}
