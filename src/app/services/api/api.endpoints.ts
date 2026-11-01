/**
 * Central API Endpoints Registry for AI Recruit
 *
 * All backend API routes are mapped here in one single place for maximum
 * traceability, maintainability, and clarity.
 */

export const API_ENDPOINTS = {
  /**
   * Recruiter Authentication & Profile (/api/v1/auth)
   */
  AUTH: {
    /** [POST] /auth/login - Log in with recruiter email */
    LOGIN: 'auth/login',
    /** [POST] /auth/signup - Register new recruiter profile */
    SIGNUP: 'auth/signup',
    /** [GET] /auth/me - Retrieve currently authenticated recruiter profile */
    ME: 'auth/me',
  },

  /**
   * Jobs Post Management (/api/v1/jobs)
   */
  JOBS: {
    /** [GET] /jobs - List all active jobs with optional status/department/search filters */
    LIST: 'jobs',
    /** [GET] /jobs/:id - Get a single active job post by ID */
    GET_BY_ID: (id: string) => `jobs/${id}`,
    /** [POST] /jobs - Create a new job post */
    CREATE: 'jobs',
    /** [PUT] /jobs/:id - Update an existing job post */
    UPDATE: (id: string) => `jobs/${id}`,
    /** [DELETE] /jobs/:id - Soft-delete a job (sets lifecycleStatus to 'deleted') */
    DELETE: (id: string) => `jobs/${id}`,
  },

  /**
   * Candidates & Users Management (/api/v1/users)
   */
  CANDIDATES: {
    /** [GET] /users - List active users/candidates with optional role/search filters */
    LIST: 'users',
    /** [GET] /users/:id - Get single candidate profile by ID */
    GET_BY_ID: (id: string) => `users/${id}`,
    /** [GET] /users/:id/resume - Get parsed candidate resume */
    GET_RESUME: (id: string) => `users/${id}/resume`,
    /** [POST] /users - Create new candidate profile */
    CREATE: 'users',
    /** [PUT] /users/:id - Update candidate profile */
    UPDATE: (id: string) => `users/${id}`,
    /** [DELETE] /users/:id - Soft-delete candidate profile */
    DELETE: (id: string) => `users/${id}`,
  },

  /**
   * Applied Jobs / Applications Tracking (/api/v1/applied-jobs)
   * Tracks when a candidate applies to a job, along with recruitment status:
   * 'applied' -> 'shortlisted' / 'not_shortlisted' -> 'interviewing' -> 'interviewed' -> 'offered' -> 'hired'
   */
  APPLICATIONS: {
    /** [GET] /applied-jobs - List all applications (supports ?jobId=...&userId=...&status=...) */
    LIST: 'applied-jobs',
    /** [GET] /applied-jobs/:id - Single application details with joined User and Job */
    GET_BY_ID: (id: string) => `applied-jobs/${id}`,
    /** [POST] /applied-jobs - Apply to a job (creates a new applied_job entry) */
    APPLY: 'applied-jobs',
    /** [PUT] /applied-jobs/:id - Update application fields */
    UPDATE: (id: string) => `applied-jobs/${id}`,
    /** [PATCH] /applied-jobs/:id/status - Track/update status (e.g., shortlisted, not_shortlisted, etc.) */
    UPDATE_STATUS: (id: string) => `applied-jobs/${id}/status`,
    /** [DELETE] /applied-jobs/:id - Soft-delete application */
    DELETE: (id: string) => `applied-jobs/${id}`,
  },

  /**
   * Scheduled Interviews (/api/v1/interviews)
   */
  INTERVIEWS: {
    /** [GET] /interviews - List scheduled interviews */
    LIST: 'interviews',
    /** [GET] /interviews/timeline - Weekly calendar timeline */
    TIMELINE: 'interviews/timeline',
    /** [GET] /interviews/:id - Single interview details */
    GET_BY_ID: (id: string) => `interviews/${id}`,
    /** [POST] /interviews - Schedule an interview linked to a candidate */
    SCHEDULE: 'interviews',
    /** [PUT] /interviews/:id - Update interview schedule */
    UPDATE: (id: string) => `interviews/${id}`,
    /** [PATCH] /interviews/:id/status - Update interview status */
    UPDATE_STATUS: (id: string) => `interviews/${id}/status`,
    /** [DELETE] /interviews/:id - Soft-delete interview */
    DELETE: (id: string) => `interviews/${id}`,
  },

  /**
   * Analytics & KPIs (/api/v1/analytics)
   */
  ANALYTICS: {
    /** [GET] /analytics/dashboard - Aggregated KPI metrics, application statuses, and department breakdown */
    DASHBOARD: 'analytics/dashboard',
  },

  /**
   * AI Recruitment Copilot (/api/v1/ai)
   */
  AI: {
    /** [POST] /ai/evaluate-resume - ATS scoring against job requirements */
    EVALUATE_RESUME: 'ai/evaluate-resume',
    /** [POST] /ai/generate-questions - Role-specific interview question generator */
    GENERATE_QUESTIONS: 'ai/generate-questions',
  },
} as const;

