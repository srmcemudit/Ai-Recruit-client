import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiHttpService } from './api-http.service';
import { API_ENDPOINTS } from './api.endpoints';
import { ApiResponse } from '../../models/recruit.model';

export interface EvaluateResumePayload {
  roleTitle?: string;
  candidateSkills?: string[];
  requiredSkills?: string[];
  experienceYears?: number;
  summaryText?: string;
  userId?: string;
  candidateId?: string;
}

export interface GenerateQuestionsPayload {
  candidateRole?: string;
  roundType?: string;
  skills?: string[];
  userId?: string;
  candidateId?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AiApiService {
  private readonly http = inject(ApiHttpService);

  /**
   * [POST /api/v1/ai/evaluate-resume]
   * Evaluate candidate resume match against job criteria using AI scoring.
   */
  evaluateResume(payload: EvaluateResumePayload): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(API_ENDPOINTS.AI.EVALUATE_RESUME, payload);
  }

  /**
   * [POST /api/v1/ai/generate-questions]
   * Generate role-specific AI interview questions based on candidate profile and interview round.
   */
  generateQuestions(payload: GenerateQuestionsPayload): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(API_ENDPOINTS.AI.GENERATE_QUESTIONS, payload);
  }
}
