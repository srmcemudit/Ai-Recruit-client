import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecruitService } from '../../services/recruit.service';
import { Candidate } from '../../models/recruit.model';

@Component({
  selector: 'app-shortlisted-candidates',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shortlisted-candidates.component.html'
})
export class ShortlistedCandidatesComponent {
  recruitService = inject(RecruitService);
  statusFilter = signal<'all' | 'interviewing' | 'shortlisted'>('all');

  filteredCandidates = computed(() => {
    const filter = this.statusFilter();
    const q = this.recruitService.searchQuery().trim().toLowerCase();
    let list = this.recruitService.shortlistedCandidates();
    if (filter !== 'all') {
      list = list.filter(c => c.status === filter);
    }
    if (q) {
      list = list.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.role.toLowerCase().includes(q) ||
        c.currentCompany.toLowerCase().includes(q) ||
        c.skills.some(s => s.toLowerCase().includes(q))
      );
    }
    return list;
  });
}
