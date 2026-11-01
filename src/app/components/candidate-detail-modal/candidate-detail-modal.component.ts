import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecruitService } from '../../services/recruit.service';

@Component({
  selector: 'app-candidate-detail-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './candidate-detail-modal.component.html'
})
export class CandidateDetailModalComponent {
  recruitService = inject(RecruitService);

  viewResume(candidate: any) {
    this.recruitService.openResumeModal(candidate);
  }

  scheduleForCandidate(candidate: any) {
    this.recruitService.closeCandidateModal();
    this.recruitService.openScheduleModal(candidate);
  }
}
