import { Injectable, signal, computed, inject } from '@angular/core';
import { Observable, tap, catchError, throwError, of } from 'rxjs';
import { ApiService } from './api';
import { RecruiterUser, RecruiterSignupPayload, AuthResponse, LoginPayload } from '../models/recruit.model';

const STORAGE_KEY_USER = 'current_user';
const STORAGE_KEY_TOKEN = 'auth_token';
const STORAGE_KEY_USER_ID = 'user_id';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly api = inject(ApiService);

  /**
   * Reactive state signals
   */
  readonly currentUser = signal<RecruiterUser | null>(this.getStoredUser());
  readonly isAuthenticated = computed(() => Boolean(this.currentUser()));
  readonly isLoading = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);
  readonly suggestRegister = signal<boolean>(false);

  /**
   * Log in with recruiter work email and password
   */
  login(payload: LoginPayload | { email: string; password?: string }): Observable<AuthResponse> {
    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.suggestRegister.set(false);

    const loginData: LoginPayload = {
      email: payload.email,
      password: payload.password || 'Password123!',
    };

    return this.api.auth.login(loginData).pipe(
      tap((res) => {
        this.saveSession(res.token, res.data);
        this.isLoading.set(false);
      }),
      catchError((err) => {
        this.isLoading.set(false);
        const errObj = err?.error || err;
        const msg = errObj?.message || 'Login failed. Please check your credentials or register.';
        this.errorMessage.set(msg);
        if (errObj?.suggestRegister || errObj?.code === 'USER_NOT_FOUND' || errObj?.code === 'ACCOUNT_DELETED') {
          this.suggestRegister.set(true);
        }
        return throwError(() => err);
      })
    );
  }

  /**
   * Sign up a new recruiter according to the backend schema
   */
  signup(payload: RecruiterSignupPayload): Observable<AuthResponse> {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    return this.api.auth.signup(payload).pipe(
      tap((res) => {
        this.saveSession(res.token, res.data);
        this.isLoading.set(false);
      }),
      catchError((err) => {
        this.isLoading.set(false);
        const msg = err?.message || 'Registration failed. Please check your information.';
        this.errorMessage.set(msg);
        return throwError(() => err);
      })
    );
  }

  /**
   * One-click demo login as pre-seeded recruiter (Elena Rostova)
   */
  demoLogin(demoEmail = 'elena.rostova@recruiter.ai'): Observable<any> {
    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.suggestRegister.set(false);

    return this.api.auth.login({ email: demoEmail, password: 'Password123!' }).pipe(
      tap((res) => {
        this.saveSession(res.token, res.data);
        this.isLoading.set(false);
      }),
      catchError((err) => {
        this.isLoading.set(false);
        const errObj = err?.error || err;
        const msg = errObj?.message || 'Demo login failed. Backend is unreachable.';
        this.errorMessage.set(msg);
        return throwError(() => err);
      })
    );
  }

  /**
   * Log out and clear stored session
   */
  logout(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY_USER);
      localStorage.removeItem(STORAGE_KEY_TOKEN);
      localStorage.removeItem(STORAGE_KEY_USER_ID);
    }
    this.currentUser.set(null);
    this.errorMessage.set(null);
  }

  /**
   * Save session to storage and update signal
   */
  private saveSession(token: string, user: RecruiterUser): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_TOKEN, token);
      localStorage.setItem(STORAGE_KEY_USER_ID, user.id);
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    }
    this.currentUser.set(user);
  }

  /**
   * Retrieve cached user from localStorage
   */
  private getStoredUser(): RecruiterUser | null {
    if (typeof localStorage === 'undefined') return null;
    const raw = localStorage.getItem(STORAGE_KEY_USER);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as RecruiterUser;
    } catch {
      return null;
    }
  }
}

