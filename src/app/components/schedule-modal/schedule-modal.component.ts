import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecruitService } from '../../services/recruit.service';

@Component({
  selector: 'app-schedule-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './schedule-modal.component.html'
})
export class ScheduleModalComponent implements OnInit {
  recruitService = inject(RecruitService);

  selectedCandidateId = 'cand-1';
  interviewDate = '2026-10-21';
  startTime = '02:00 PM';
  endTime = '03:00 PM';
  roundType: any = 'Technical Round';
  platform: any = 'Google Meet';
  interviewer = 'Alex Rivera';
  interviewerRole = 'Engineering Manager';
  meetingLink = 'https://meet.google.com/ai-rec-live';

  ngOnInit() {
    const selected = this.recruitService.selectedCandidate();
    if (selected) {
      this.selectedCandidateId = selected.id;
    }
  }

  submit() {
    const candidate = this.recruitService.candidates().find(c => c.id === this.selectedCandidateId);
    if (!candidate) return;

    this.recruitService.scheduleInterview({
      candidateId: candidate.id,
      candidateName: candidate.name,
      candidateAvatar: candidate.avatar,
      jobTitle: candidate.role,
      date: this.interviewDate,
      startTime: this.startTime,
      endTime: this.endTime,
      roundType: this.roundType,
      interviewer: this.interviewer,
      interviewerRole: this.interviewerRole,
      platform: this.platform,
      meetingLink: this.meetingLink,
      status: 'Scheduled',
      aiSuggestedFocus: [
        `Evaluate expertise in ${candidate.skills[0] || 'core technologies'}`,
        `Assess alignment with team velocity and architectural leadership`,
        `Examine problem-solving approach to real-world edge cases`
      ]
    });
  }
}
