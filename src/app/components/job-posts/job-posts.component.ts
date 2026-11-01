import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecruitService } from '../../services/recruit.service';
import { JobPost } from '../../models/recruit.model';

@Component({
  selector: 'app-job-posts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-posts.component.html'
})
export class JobPostsComponent {
  recruitService = inject(RecruitService);
}
