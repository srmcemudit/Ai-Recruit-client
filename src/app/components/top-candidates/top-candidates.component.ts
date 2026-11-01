import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecruitService } from '../../services/recruit.service';
import { Candidate } from '../../models/recruit.model';

@Component({
  selector: 'app-top-candidates',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-candidates.component.html'
})
export class TopCandidatesComponent {
  recruitService = inject(RecruitService);
}
