import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecruitService } from '../../services/recruit.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  readonly recruitService = inject(RecruitService);
  readonly authService = inject(AuthService);

  readonly todayFormatted = computed(() => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  });

  readonly topMatchScore = computed(() => {
    const list = this.recruitService.topCandidates();
    return list.length > 0 ? `${list[0].matchScore}%` : 'Active';
  });

  refresh(): void {
    this.recruitService.loadInitialData();
  }

  logout(): void {
    this.authService.logout();
  }
}
