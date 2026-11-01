import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecruitService } from '../../services/recruit.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  readonly recruitService = inject(RecruitService);
  readonly authService = inject(AuthService);

  logout(): void {
    this.authService.logout();
  }

  navigateTo(section: 'dashboard' | 'candidates' | 'jobs' | 'schedule' | 'shortlisted') {
    this.recruitService.setSection(section);
    if (typeof window !== 'undefined') {
      if (section === 'dashboard') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (section === 'schedule') {
        document.getElementById('calendar-timeline')?.scrollIntoView({ behavior: 'smooth' });
      } else if (section === 'candidates') {
        document.getElementById('top-candidates')?.scrollIntoView({ behavior: 'smooth' });
      } else if (section === 'jobs') {
        document.getElementById('job-posts')?.scrollIntoView({ behavior: 'smooth' });
      } else if (section === 'shortlisted') {
        document.getElementById('shortlisted-candidates')?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
