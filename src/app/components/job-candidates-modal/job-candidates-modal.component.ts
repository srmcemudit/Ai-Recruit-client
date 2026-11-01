import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecruitService } from '../../services/recruit.service';
import { Candidate, JobPost } from '../../models/recruit.model';

@Component({
  selector: 'app-job-candidates-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './job-candidates-modal.component.html'
})
export class JobCandidatesModalComponent {
  recruitService = inject(RecruitService);

  searchQuery = signal<string>('');
  statusFilter = signal<'all' | 'shortlisted' | 'interviewing' | 'new'>('all');
  sortBy = signal<'match' | 'experience' | 'recent'>('match');

  selectedJob = computed(() => this.recruitService.selectedJobForCandidates());

  // Candidates belonging strictly to this job (no fallback to unrelated candidates)
  allJobCandidates = computed(() => {
    const job = this.selectedJob();
    const all = this.recruitService.candidates();
    if (!job) return all;

    return all.filter(c => c.jobId === job.id);
  });

  // Filtered and sorted candidates
  displayedCandidates = computed(() => {
    const list = this.allJobCandidates();
    const q = this.searchQuery().trim().toLowerCase();
    const sf = this.statusFilter();
    const sort = this.sortBy();

    let result = list;

    // Filter by search query
    if (q) {
      result = result.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.role.toLowerCase().includes(q) ||
        c.currentCompany.toLowerCase().includes(q) ||
        c.skills.some(s => s.toLowerCase().includes(q))
      );
    }

    // Filter by status
    if (sf !== 'all') {
      result = result.filter(c => c.status === sf);
    }

    // Sort
    return [...result].sort((a, b) => {
      if (sort === 'match') {
        return b.matchScore - a.matchScore;
      } else if (sort === 'experience') {
        return b.experienceYears - a.experienceYears;
      } else {
        return new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime();
      }
    });
  });

  countByStatus(status: 'shortlisted' | 'interviewing' | 'new'): number {
    return this.allJobCandidates().filter(c => c.status === status).length;
  }

  onSelectJob(jobId: string) {
    const target = this.recruitService.jobs().find(j => j.id === jobId);
    if (target) {
      this.recruitService.selectJobForCandidates(target);
    }
  }

  scheduleCandidate(candidate: Candidate) {
    this.recruitService.openScheduleModal(candidate);
  }

  resetFilters() {
    this.searchQuery.set('');
    this.statusFilter.set('all');
    this.sortBy.set('match');
  }
}
