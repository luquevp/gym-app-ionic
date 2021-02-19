import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Storage } from '@ionic/storage'
import { Observable, throwError, from} from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
const TOKEN_KEY = 'token';
@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  isLoading: boolean = false;
  constructor(
    public storage: Storage,
    public loadingCtrl: LoadingController,
  ) { }
  intercept(request: HttpRequest<any>, 
               next: HttpHandler): 
          Observable<HttpEvent<any>> {
    return from(this.storage.get(TOKEN_KEY))
      .pipe(
        switchMap(token => {
          if (token) {
            request = request.clone(
              { 
              headers: request.headers.set('x-access-token', token) 
            });
          }
          this.presentLoading();

          return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
              if (event instanceof HttpResponse) {
                 // Cerramos el loading en el fin de la llamada
                 this.dismissLoading();
              }
              return event;
            }),
            catchError((error: HttpErrorResponse) => {
              console.error(error);
               // En caso de error cerramos el loading
               this.dismissLoading();
              return throwError(error);
            })
          );
        })
      );
  }

  // Creación del loading
  async presentLoading() {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      message: 'Por favor espere...',
      duration: 5000,
      spinner: "bubbles",
      translucent: true,
    }).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss().then(() => console.log());
        }
      });
    });
  }
  // Cierre del loading
  async dismissLoading() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
  }
}