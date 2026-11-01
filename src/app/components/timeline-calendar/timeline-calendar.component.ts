import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecruitService } from '../../services/recruit.service';
import { ScheduledInterview, WeekDayTimeline } from '../../models/recruit.model';

@Component({
  selector: 'app-timeline-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline-calendar.component.html'
})
export class TimelineCalendarComponent {
  recruitService = inject(RecruitService);

  getDayCardClasses(day: WeekDayTimeline): string {
    const isSelected = this.recruitService.selectedDateFilter() === day.dateStr;
    const base = 'flex flex-col p-3 rounded-2xl cursor-pointer transition-all duration-200 border ';

    if (isSelected) {
      return base + 'bg-indigo-600/20 border-indigo-500 ring-2 ring-indigo-500/40 shadow-lg shadow-indigo-500/10';
    }

    if (day.isToday) {
      return base + 'bg-gradient-to-b from-indigo-950/60 to-slate-900 border-indigo-500/40 ring-1 ring-indigo-500/20';
    }

    if (day.interviews.length > 0) {
      return base + 'bg-slate-900/90 border-slate-700/60 hover:border-slate-600 hover:bg-slate-800/80';
    }

    return base + 'bg-slate-900/40 border-slate-800/70 hover:border-slate-700 hover:bg-slate-800/50 opacity-80 hover:opacity-100';
  }

  getStatusClasses(status: string): string {
    const base = 'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide border ';
    switch (status) {
      case 'In Progress':
        return base + 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'Scheduled':
        return base + 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40';
      case 'Completed':
        return base + 'bg-slate-700/50 text-slate-300 border-slate-600/40';
      case 'Rescheduled':
        return base + 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      default:
        return base + 'bg-slate-800 text-slate-300 border-slate-700';
    }
  }
}
