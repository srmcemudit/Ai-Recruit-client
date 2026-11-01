import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiHttpService } from './api-http.service';
import { API_ENDPOINTS } from './api.endpoints';
import { ScheduledInterview, WeekDayTimeline, ApiListResponse, ApiResponse } from '../../models/recruit.model';

export interface InterviewFilterParams {
  date?: string;
  userId?: string;
  candidateId?: string;
  status?: string;
}

@Injectable({
  providedIn: 'root',
})
export class InterviewApiService {
  private readonly http = inject(ApiHttpService);

  /**
   * [GET /api/v1/interviews]
   * Get all active scheduled interviews with optional date/user filters.
   */
  getInterviews(filters?: InterviewFilterParams): Observable<ApiListResponse<ScheduledInterview>> {
    return this.http.get<ApiListResponse<ScheduledInterview>>(API_ENDPOINTS.INTERVIEWS.LIST, filters);
  }

  /**
   * [GET /api/v1/interviews/timeline]
   * Get weekly calendar timeline interviews with date breakdown.
   */
  getTimelineInterviews(weekOffset = 0): Observable<ApiResponse<{ timeline: WeekDayTimeline[]; interviews: ScheduledInterview[] }>> {
    return this.http.get<ApiResponse<{ timeline: WeekDayTimeline[]; interviews: ScheduledInterview[] }>>(
      API_ENDPOINTS.INTERVIEWS.TIMELINE,
      { offset: weekOffset }
    );
  }

  /**
   * [GET /api/v1/interviews/:id]
   * Get single interview by ID.
   */
  getInterviewById(id: string): Observable<ApiResponse<ScheduledInterview>> {
    return this.http.get<ApiResponse<ScheduledInterview>>(API_ENDPOINTS.INTERVIEWS.GET_BY_ID(id));
  }

  /**
   * [POST /api/v1/interviews]
   * Schedule a new interview linked to a candidate.
   */
  scheduleInterview(interview: Partial<ScheduledInterview>): Observable<ApiResponse<ScheduledInterview>> {
    return this.http.post<ApiResponse<ScheduledInterview>>(API_ENDPOINTS.INTERVIEWS.SCHEDULE, interview);
  }

  /**
   * [PUT /api/v1/interviews/:id]
   * Update an existing interview details.
   */
  updateInterview(id: string, updates: Partial<ScheduledInterview>): Observable<ApiResponse<ScheduledInterview>> {
    return this.http.put<ApiResponse<ScheduledInterview>>(API_ENDPOINTS.INTERVIEWS.UPDATE(id), updates);
  }

  /**
   * [PATCH /api/v1/interviews/:id/status]
   * Update interview status ('Scheduled' | 'In Progress' | 'Completed' | 'Rescheduled').
   */
  updateStatus(
    id: string,
    status: 'Scheduled' | 'In Progress' | 'Completed' | 'Rescheduled' | string
  ): Observable<ApiResponse<ScheduledInterview>> {
    return this.http.patch<ApiResponse<ScheduledInterview>>(API_ENDPOINTS.INTERVIEWS.UPDATE_STATUS(id), { status });
  }

  /**
   * [DELETE /api/v1/interviews/:id]
   * Soft-delete an interview.
   */
  deleteInterview(id: string): Observable<ApiResponse<{ message: string }>> {
    return this.http.delete<ApiResponse<{ message: string }>>(API_ENDPOINTS.INTERVIEWS.DELETE(id));
  }
}
