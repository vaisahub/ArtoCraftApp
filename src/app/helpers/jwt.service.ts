import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, } from 'rxjs';
import { catchError, switchMap, take, filter } from 'rxjs/operators';
import { LoginServiceService } from '../shared/login-service.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    isRefreshing: Boolean;
    refreshTokenSubject: BehaviorSubject<any>;
    constructor(private authService: LoginServiceService) { }
 
intercept(request: HttpRequest < any >, next: HttpHandler): Observable < HttpEvent < any >> {

    // add authorization header with jwt token if available
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(currentUser && currentUser.token) {
    this.addToken(request, currentUser.token)



    // request = request.clone({
    //     setHeaders: {
    //         Authorization: `Bearer ${currentUser.token}`
    //     }
    // });


}



return next.handle(request).pipe(catchError(error => {
    if (error instanceof HttpErrorResponse && error.status === 401) {
        return this.handle401Error(request, next);
    }
    else {

        return throwError(error)
    }
}));
    }


    private handle401Error(request: HttpRequest < any >, next: HttpHandler) {
    if (!this.isRefreshing) {
        this.isRefreshing = true;
        this.refreshTokenSubject.next(null);

        return this.authService.refreshToken().pipe(
            switchMap((token: any) => {
                this.isRefreshing = false;
                this.refreshTokenSubject.next(token.jwt);
                return next.handle(this.addToken(request, token.jwt));
            }));
    }
    else {

        return this.refreshTokenSubject.pipe(
            filter(token => token != null),
            take(1),
            switchMap(jwt => {
                return next.handle(this.addToken(request, jwt));
            }));

    }
}

    private addToken(request: HttpRequest < any >, token: string) {

    request = request.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    });
    return request
}
}

