import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecruitService } from '../../services/recruit.service';
import { Candidate } from '../../models/recruit.model';

@Component({
  selector: 'app-compare-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './compare-modal.component.html'
})
export class CompareModalComponent {
  recruitService = inject(RecruitService);

  viewResume(candidate: Candidate) {
    this.recruitService.openResumeModal(candidate);
  }

  scheduleCandidate(candidate: Candidate) {
    this.recruitService.closeCompareModal();
    this.recruitService.openScheduleModal(candidate);
  }
}
