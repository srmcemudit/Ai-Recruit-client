import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecruitService } from '../../services/recruit.service';

@Component({
  selector: 'app-interview-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './interview-modal.component.html'
})
export class InterviewModalComponent {
  recruitService = inject(RecruitService);
}
