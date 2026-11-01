import { Injectable, inject } from '@angular/core';
import { AuthApiService } from './auth-api.service';
import { JobApiService } from './job-api.service';
import { UserApiService } from './user-api.service';
import { AppliedJobApiService } from './applied-job-api.service';
import { InterviewApiService } from './interview-api.service';
import { AnalyticsApiService } from './analytics-api.service';
import { AiApiService } from './ai-api.service';
import { ApiHttpService } from './api-http.service';

/**
 * Unified API Client for AI Recruit.
 *
 * Single, intuitive entry point for all backend services:
 * - api.auth          -> Recruiter Login & Signup (POST /auth/login, POST /auth/signup)
 * - api.jobs          -> Job catalog CRUD (GET /jobs, POST /jobs, etc.)
 * - api.candidates    -> Candidates & Users (GET /users, GET /users/:id/resume, etc.)
 * - api.applications  -> Applied jobs tracking (POST /applied-jobs, PATCH /applied-jobs/:id/status, etc.)
 * - api.interviews    -> Interview schedules (GET /interviews, GET /interviews/timeline, etc.)
 * - api.analytics     -> Dashboard metrics (GET /analytics/dashboard)
 * - api.ai            -> AI ATS evaluation & interview questions
 * - api.http          -> Low-level generic HTTP helpers
 */
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  readonly auth = inject(AuthApiService);
  readonly jobs = inject(JobApiService);
  readonly candidates = inject(UserApiService);
  readonly applications = inject(AppliedJobApiService);
  readonly interviews = inject(InterviewApiService);
  readonly analytics = inject(AnalyticsApiService);
  readonly ai = inject(AiApiService);
  readonly http = inject(ApiHttpService);
}
