import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable, catchError, finalize, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

export const apiInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const started = Date.now();

  // 1. Resolve URL: Prefix relative API paths with environment.apiUrl
  let url = req.url;
  const isAbsolute = url.startsWith('http://') || url.startsWith('https://') || url.startsWith('assets/');

  if (!isAbsolute) {
    const base = environment.apiUrl.replace(/\/+$/, '');
    const path = url.replace(/^\/+/, '');
    url = `${base}/${path}`;
  }

  // 2. Prepare Standard Headers
  const headers: Record<string, string> = {
    Accept: 'application/json',
  };

  // Only set application/json if body is not FormData or Blob
  const isFormData = typeof FormData !== 'undefined' && req.body instanceof FormData;
  const isBlob = typeof Blob !== 'undefined' && req.body instanceof Blob;
  if (!isFormData && !isBlob && !req.headers.has('Content-Type')) {
    headers['Content-Type'] = 'application/json';
  }

  // Optional Auth or User identification header
  if (typeof localStorage !== 'undefined') {
    const token = localStorage.getItem('auth_token');
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const userId = localStorage.getItem('user_id');
    if (userId) headers['X-User-Id'] = userId;
  }

  const clonedReq = req.clone({
    url,
    setHeaders: headers,
  });

  // 3. Traceability: Log outgoing request in non-production
  if (!environment.production) {
    const paramsObj = clonedReq.params.keys().reduce((acc, key) => {
      acc[key] = clonedReq.params.get(key);
      return acc;
    }, {} as Record<string, any>);

    const hasParams = Object.keys(paramsObj).length > 0;
    const hasBody = Boolean(clonedReq.body);

    console.groupCollapsed(
      `%c🚀 [API REQ] ${clonedReq.method} ${url}`,
      'color: #3b82f6; font-weight: bold;'
    );
    console.log('Method:', clonedReq.method);
    console.log('Target URL:', url);
    if (hasParams) console.log('Query Params:', paramsObj);
    if (hasBody) console.log('Request Body:', clonedReq.body);
    console.groupEnd();
  }

  // 4. Handle Response & Trace Errors
  return next(clonedReq).pipe(
    tap({
      next: (event: HttpEvent<unknown>) => {
        if (event instanceof HttpResponse && !environment.production) {
          const elapsed = Date.now() - started;
          const body: any = event.body;
          const count = body?.count ?? (Array.isArray(body?.data) ? body.data.length : null);
          const countText = count !== null ? `(${count} items)` : '';

          console.log(
            `%c✅ [API RES] ${clonedReq.method} ${url} [${event.status} OK] ${elapsed}ms ${countText}`,
            'color: #10b981; font-weight: bold;',
            body
          );
        }
      },
    }),
    catchError((error: HttpErrorResponse) => {
      const elapsed = Date.now() - started;
      let errorMessage = 'An unexpected network error occurred.';

      if (error.status === 0) {
        errorMessage = 'Backend is offline or unreachable at ' + environment.apiUrl;
      } else if (error.error?.error?.message) {
        errorMessage = error.error.error.message;
      } else if (error.error?.message) {
        errorMessage = error.error.message;
      } else if (typeof error.error === 'string') {
        errorMessage = error.error;
      } else if (error.message) {
        errorMessage = error.message;
      }

      console.error(
        `%c❌ [API ERR] ${clonedReq.method} ${url} [${error.status || 0}] ${elapsed}ms`,
        'color: #ef4444; font-weight: bold;',
        errorMessage,
        error
      );

      return throwError(() => ({
        status: error.status,
        statusText: error.statusText,
        message: errorMessage,
        raw: error,
      }));
    }),
    finalize(() => {
      // Completed
    })
  );
};
