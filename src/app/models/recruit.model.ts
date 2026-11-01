export interface ResumeExperience {
  role: string;
  company: string;
  period: string;
  location: string;
  highlights: string[];
}

export interface ResumeEducation {
  degree: string;
  institution: string;
  year: string;
  honors?: string;
}

export interface CandidateResume {
  summary: string;
  experience: ResumeExperience[];
  education: ResumeEducation[];
  skillsByCategory: { category: string; skills: string[] }[];
  certifications?: string[];
  publications?: string[];
  languages?: string[];
  atsScore?: number;
  portfolioUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
}

export interface Candidate {
  id: string;
  jobId?: string;
  name: string;
  avatar: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  experienceYears: number;
  currentCompany: string;
  matchScore: number; // 0 - 100
  status: 'new' | 'shortlisted' | 'interviewing' | 'offered' | 'rejected';
  skills: string[];
  appliedDate: string;
  salaryExpectation: string;
  aiSummary: string;
  education: string;
  resume?: CandidateResume;
}

export interface JobPost {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Remote' | 'Hybrid';
  applicantsCount: number;
  shortlistedCount: number;
  interviewingCount: number;
  status: 'Active' | 'Urgent' | 'Draft' | 'Closed';
  salaryRange: string;
  postedDate: string;
  experienceRequired: string;
  postedBy?: string;
  postedByUser?: Partial<RecruiterUser>;
}

export interface ScheduledInterview {
  id: string;
  candidateId: string;
  candidateName: string;
  candidateAvatar: string;
  jobTitle: string;
  date: string; // YYYY-MM-DD
  startTime: string; // e.g. "10:00 AM"
  endTime: string; // e.g. "11:00 AM"
  roundType: 'Screening' | 'Technical Round' | 'System Architecture' | 'Culture Fit' | 'Final Executive';
  interviewer: string;
  interviewerRole: string;
  platform: 'Google Meet' | 'Zoom' | 'Microsoft Teams' | 'On-site';
  meetingLink?: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Rescheduled';
  aiSuggestedFocus: string[];
}

export interface WeekDayTimeline {
  date: Date;
  dateStr: string; // YYYY-MM-DD
  dayName: string; // Mon, Tue, etc.
  dayNumber: number;
  isToday: boolean;
  isSelected?: boolean;
  interviews: ScheduledInterview[];
}

export type AppliedJobStatus =
  | 'applied'
  | 'shortlisted'
  | 'not_shortlisted'
  | 'interviewing'
  | 'interviewed'
  | 'offered'
  | 'hired'
  | 'rejected'
  | 'withdrawn';

export interface AppliedJob {
  id: string;
  jobId: string;
  userId: string;
  status: AppliedJobStatus;
  stage?: string;
  appliedDate: string; // YYYY-MM-DD
  matchScore?: number; // 0 - 100
  salaryExpectation?: string;
  resume?: any;
  coverLetter?: string;
  notes?: string;
  feedback?: string;
  aiSummary?: string;
  lifecycleStatus?: 'active' | 'inactive' | 'deleted';
  createdAt?: string;
  updatedAt?: string;
  updatedBy?: string;
  job?: JobPost;
  user?: Partial<Candidate>;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  count?: number;
  error?: {
    message: string;
    details?: any;
  };
}

export interface ApiListResponse<T> {
  success: boolean;
  count: number;
  data: T[];
  message?: string;
}

export interface DashboardMetrics {
  totalJobs: number;
  activeJobs: number;
  totalUsers: number;
  totalApplications?: number;
  applicationsByStatus?: Record<string, number>;
  scheduledInterviewsThisWeek: number;
  jobsByDepartment: { department: string; count: number }[];
  usersByRole: { role: string; count: number }[];
  topSkills: { skill: string; count: number }[];
}

export interface ResumeEvaluationRequest {
  jobDescription: string;
  resumeText: string;
  candidateSkills?: string[];
}

export interface ResumeEvaluationResult {
  matchScore: number;
  verdict: 'Strong Match' | 'Moderate Match' | 'Low Match' | string;
  strengths: string[];
  gaps: string[];
  recommendation: string;
}

export interface GenerateQuestionsRequest {
  jobRole: string;
  candidateExperience: number;
  roundType: string;
  focusAreas?: string[];
}

export interface GenerateQuestionsResult {
  role: string;
  roundType: string;
  questions: string[];
}

export interface RecruiterUser {
  id: string;
  name: string;
  email: string;
  role: 'recruiter' | 'admin' | 'hiring_manager' | 'candidate' | 'interviewer';
  avatar?: string;
  headline?: string;
  currentCompany?: string;
  location?: string;
  phone?: string;
  experienceYears?: number;
  skills?: string[];
  bio?: string;
  education?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  lifecycleStatus?: 'active' | 'inactive' | 'deleted';
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginPayload {
  email: string;
  password?: string;
}

export interface RecruiterSignupPayload {
  name: string;
  email: string;
  password?: string;
  headline?: string;
  currentCompany?: string;
  location?: string;
  phone?: string;
  experienceYears?: number;
  skills?: string[];
  bio?: string;
  avatar?: string;
  linkedinUrl?: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  token: string;
  data: RecruiterUser;
}
