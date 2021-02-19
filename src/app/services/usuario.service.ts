import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Storage} from '@ionic/storage';
import { environment } from '../../environments/environment';
import { UiServiceService } from './ui-service.service';
import { NavController } from '@ionic/angular';
import { Usuario } from '../interfaces/interfaces';
import { HttpConfigInterceptor } from './interceptor.service';


const URL = environment.url;
@Injectable({
    providedIn: 'root'
})
export class UsuarioService
{

    token: string = null;
    private usuario: Usuario = {};

    constructor( private http: HttpClient,
                 private storage: Storage,
                 private uiService: UiServiceService,
                 private navController: NavController
                ) { }

    login( userName: string, password: string ) {
    const data = {userName, password};


    return new Promise(resolve => {

        this.http.post( `${ URL }api/auth`, data)
        .subscribe(async resp => {
           
           // console.log(resp);
           

            if (resp['success']){
                await this.guardarToken( resp['token']);
                
                resolve(true);
            } else {
                this.token = null;
                this.storage.clear();
                resolve(false);
                console.log("else");

            }


        }, error => {

            
            this.token = null;
            this.storage.clear();
            resolve(false);
        });
    });

 }

 async guardarToken( token: string ) {

  this.token = token;
  await this.storage.set('token', token);
  
 }

    logout(){

    this.token = null;
    this.usuario = null;
    this.storage.clear();
    this.navController.navigateRoot('/login', { animated: true });
   }

   

  

}