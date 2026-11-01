import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiHttpService } from './api-http.service';
import { API_ENDPOINTS } from './api.endpoints';
import {
  LoginPayload,
  RecruiterSignupPayload,
  AuthResponse,
  ApiResponse,
  RecruiterUser,
} from '../../models/recruit.model';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private readonly http = inject(ApiHttpService);

  /**
   * [POST /api/v1/auth/login]
   * Log in using work email
   */
  login(payload: LoginPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, payload);
  }

  /**
   * [POST /api/v1/auth/signup]
   * Register a new recruiter according to the User backend schema
   */
  signup(payload: RecruiterSignupPayload): Observable<AuthResponse> {
    console.log(API_ENDPOINTS.AUTH.SIGNUP);
    
    return this.http.post<AuthResponse>(API_ENDPOINTS.AUTH.SIGNUP, payload);
  }

  /**
   * [GET /api/v1/auth/me]
   * Retrieve currently authenticated recruiter profile
   */
  getProfile(): Observable<ApiResponse<RecruiterUser>> {
    return this.http.get<ApiResponse<RecruiterUser>>(API_ENDPOINTS.AUTH.ME);
  }
}

