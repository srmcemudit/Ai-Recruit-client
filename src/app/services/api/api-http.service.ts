import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Low-level HTTP Client wrapper with automated HttpParams mapping.
 */
@Injectable({
  providedIn: 'root',
})
export class ApiHttpService {
  private readonly http = inject(HttpClient);

  private buildParams(params?: Record<string, any>): HttpParams {
    let httpParams = new HttpParams();
    if (!params) return httpParams;

    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null && value !== '') {
        httpParams = httpParams.set(key, String(value));
      }
    }
    return httpParams;
  }

  get<T>(endpoint: string, params?: Record<string, any>): Observable<T> {
    return this.http.get<T>(endpoint, { params: this.buildParams(params) });
  }

  post<T>(endpoint: string, body?: any, params?: Record<string, any>): Observable<T> {
    return this.http.post<T>(endpoint, body ?? {}, { params: this.buildParams(params) });
  }

  put<T>(endpoint: string, body?: any, params?: Record<string, any>): Observable<T> {
    return this.http.put<T>(endpoint, body ?? {}, { params: this.buildParams(params) });
  }

  patch<T>(endpoint: string, body?: any, params?: Record<string, any>): Observable<T> {
    return this.http.patch<T>(endpoint, body ?? {}, { params: this.buildParams(params) });
  }

  delete<T>(endpoint: string, params?: Record<string, any>): Observable<T> {
    return this.http.delete<T>(endpoint, { params: this.buildParams(params) });
  }
}

