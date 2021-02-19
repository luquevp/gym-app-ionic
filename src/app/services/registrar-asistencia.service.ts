import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Cliente } from "../interfaces/interfaces";

const URL = environment.url;

@Injectable({
  providedIn: "root"
})
export class RegistrarAsistenciaService {
  constructor(private http: HttpClient) {}

  private ejecutarQuery<T>(query: string) {
    query = URL + query;

    return this.http.get<T>(query);
  }

  Ingresar(dni: string){
   
    
    return this.ejecutarQuery(`api/client/access/${dni}`);
  }

  

}
