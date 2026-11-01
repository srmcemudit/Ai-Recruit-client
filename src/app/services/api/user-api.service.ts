import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiHttpService } from './api-http.service';
import { API_ENDPOINTS } from './api.endpoints';
import { Candidate, CandidateResume, ApiListResponse, ApiResponse } from '../../models/recruit.model';

export interface UserFilterParams {
  role?: string;
  search?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private readonly http = inject(ApiHttpService);

  /**
   * [GET /api/v1/users]
   * Get all active users or filter by role ('candidate', 'recruiter', etc.) and keyword.
   */
  getUsers(filters?: UserFilterParams): Observable<ApiListResponse<any>> {
    return this.http.get<ApiListResponse<any>>(API_ENDPOINTS.CANDIDATES.LIST, filters);
  }

  /**
   * [GET /api/v1/users?role=candidate]
   * Convenience method to fetch only candidates with optional keyword search.
   */
  getCandidates(search?: string): Observable<ApiListResponse<Candidate>> {
    return this.http.get<ApiListResponse<Candidate>>(API_ENDPOINTS.CANDIDATES.LIST, {
      role: 'candidate',
      search,
    });
  }

  /**
   * [GET /api/v1/users/:id]
   * Get single candidate / user profile by ID.
   */
  getUserById(id: string): Observable<ApiResponse<Candidate>> {
    return this.http.get<ApiResponse<Candidate>>(API_ENDPOINTS.CANDIDATES.GET_BY_ID(id));
  }

  /**
   * [GET /api/v1/users/:id/resume]
   * Get structured resume profile for a candidate.
   */
  getUserResume(id: string): Observable<ApiResponse<CandidateResume>> {
    return this.http.get<ApiResponse<CandidateResume>>(API_ENDPOINTS.CANDIDATES.GET_RESUME(id));
  }

  /**
   * [POST /api/v1/users]
   * Create a new user profile / candidate.
   */
  createUser(user: Partial<Candidate>): Observable<ApiResponse<Candidate>> {
    return this.http.post<ApiResponse<Candidate>>(API_ENDPOINTS.CANDIDATES.CREATE, user);
  }

  /**
   * [PUT /api/v1/users/:id]
   * Update an existing candidate / user profile.
   */
  updateUser(id: string, updates: Partial<Candidate>): Observable<ApiResponse<Candidate>> {
    return this.http.put<ApiResponse<Candidate>>(API_ENDPOINTS.CANDIDATES.UPDATE(id), updates);
  }

  /**
   * [DELETE /api/v1/users/:id]
   * Soft-delete a user profile (marks lifecycleStatus = 'deleted').
   */
  deleteUser(id: string): Observable<ApiResponse<{ message: string }>> {
    return this.http.delete<ApiResponse<{ message: string }>>(API_ENDPOINTS.CANDIDATES.DELETE(id));
  }
}
