import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RecruiterSignupPayload } from '../../models/recruit.model';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  readonly authService = inject(AuthService);

  mode: 'login' | 'signup' = 'login';

  // Login form model
  loginEmail = '';
  loginPassword = 'Password123!';
  showLoginPassword = false;
  showSignupPassword = false;

  // Recruiter Signup form model (Strictly aligned with backend User schema)
  signupData: RecruiterSignupPayload = {
    name: '',
    email: '',
    password: '',
    headline: 'Senior Technical Recruiter',
    currentCompany: 'AI Recruit HQ',
    location: 'San Francisco, CA / Remote',
    phone: '',
    experienceYears: 5,
    bio: '',
    linkedinUrl: '',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    skills: ['Technical Recruiting', 'AI Talent Sourcing', 'Pipeline Strategy'],
  };

  skillsInput = 'Technical Recruiting, AI Talent Sourcing, Pipeline Strategy';
  signupSuccess = false;

  setMode(mode: 'login' | 'signup'): void {
    this.mode = mode;
    this.authService.errorMessage.set(null);
    this.authService.suggestRegister.set(false);
  }

  switchToRegister(): void {
    if (this.loginEmail) {
      this.signupData.email = this.loginEmail;
    }
    this.setMode('signup');
  }

  handleLogin(): void {
    if (!this.loginEmail || !this.loginEmail.includes('@')) {
      this.authService.errorMessage.set('Please provide a valid work email.');
      return;
    }
    if (!this.loginPassword) {
      this.authService.errorMessage.set('Please enter your password.');
      return;
    }
    this.authService.login({ email: this.loginEmail, password: this.loginPassword }).subscribe({
      next: () => {
        // Logged in successfully; state will automatically render dashboard
      },
      error: () => {},
    });
  }

  handleSignup(): void {
    if (!this.signupData.name || !this.signupData.email) {
      this.authService.errorMessage.set('Please fill in your name and a valid work email.');
      return;
    }
    if (!this.signupData.password || this.signupData.password.length < 6) {
      this.authService.errorMessage.set('Password must be at least 6 characters.');
      return;
    }

    // Process skills string to array
    const parsedSkills = this.skillsInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const payload: RecruiterSignupPayload = {
      ...this.signupData,
      skills: parsedSkills.length > 0 ? parsedSkills : ['Technical Recruiting', 'Executive Search'],
      experienceYears: Number(this.signupData.experienceYears) || 0,
    };

    this.authService.signup(payload).subscribe({
      next: () => {
        this.signupSuccess = true;
      },
      error: () => {},
    });
  }

  handleDemoLogin(): void {
    this.authService.demoLogin().subscribe({
      next: () => {},
      error: () => {},
    });
  }
}

