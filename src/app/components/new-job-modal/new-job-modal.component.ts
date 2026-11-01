import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecruitService } from '../../services/recruit.service';

@Component({
  selector: 'app-new-job-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-job-modal.component.html'
})
export class NewJobModalComponent {
  recruitService = inject(RecruitService);

  title = '';
  department = 'Platform Engineering';
  type: any = 'Remote';
  location = 'San Francisco, CA (Remote)';
  salaryRange = '$190k - $230k';
  experienceRequired = '5+ years';
  status: any = 'Active';

  submit() {
    if (!this.title) return;
    this.recruitService.addJobPost({
      title: this.title,
      department: this.department,
      type: this.type,
      location: this.location,
      salaryRange: this.salaryRange,
      experienceRequired: this.experienceRequired,
      status: this.status
    });
  }
}
