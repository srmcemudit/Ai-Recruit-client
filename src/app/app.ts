import { Component, inject, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { TimelineCalendarComponent } from './components/timeline-calendar/timeline-calendar.component';
import { TopCandidatesComponent } from './components/top-candidates/top-candidates.component';
import { JobPostsComponent } from './components/job-posts/job-posts.component';
import { ShortlistedCandidatesComponent } from './components/shortlisted-candidates/shortlisted-candidates.component';
import { ScheduleModalComponent } from './components/schedule-modal/schedule-modal.component';
import { NewJobModalComponent } from './components/new-job-modal/new-job-modal.component';
import { InterviewModalComponent } from './components/interview-modal/interview-modal.component';
import { CandidateDetailModalComponent } from './components/candidate-detail-modal/candidate-detail-modal.component';
import { JobCandidatesModalComponent } from './components/job-candidates-modal/job-candidates-modal.component';
import { ResumeModalComponent } from './components/resume-modal/resume-modal.component';
import { CompareModalComponent } from './components/compare-modal/compare-modal.component';
import { AuthComponent } from './components/auth/auth.component';
import { RecruitService } from './services/recruit.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    AuthComponent,
    SidebarComponent,
    HeaderComponent,
    TimelineCalendarComponent,
    TopCandidatesComponent,
    JobPostsComponent,
    ShortlistedCandidatesComponent,
    ScheduleModalComponent,
    NewJobModalComponent,
    InterviewModalComponent,
    CandidateDetailModalComponent,
    JobCandidatesModalComponent,
    ResumeModalComponent,
    CompareModalComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  readonly recruitService = inject(RecruitService);
  readonly authService = inject(AuthService);

  constructor() {
    effect(() => {
      if (this.authService.isAuthenticated()) {
        this.recruitService.loadInitialData();
      }
    });
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.recruitService.loadInitialData();
    }
  }

  data(): void {
    this.recruitService.loadInitialData();
  }
}
