import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecruitService } from '../../services/recruit.service';
import { Candidate, CandidateResume } from '../../models/recruit.model';

@Component({
  selector: 'app-resume-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resume-modal.component.html'
})
export class ResumeModalComponent {
  recruitService = inject(RecruitService);

  isDownloading = signal<boolean>(false);
  showToast = signal<boolean>(false);

  resume(candidate: Candidate): CandidateResume {
    return this.recruitService.getCandidateResume(candidate);
  }

  scheduleCandidate(candidate: Candidate) {
    this.recruitService.closeResumeModal();
    this.recruitService.openScheduleModal(candidate);
  }

  downloadResume(candidate: Candidate) {
    this.isDownloading.set(true);
    setTimeout(() => {
      this.isDownloading.set(false);
      this.showToast.set(true);
      setTimeout(() => {
        this.showToast.set(false);
      }, 4000);
    }, 600);
  }
}
