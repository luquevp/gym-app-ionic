import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UsuarioService } from './usuario.service';

const URL = environment.url;


@Injectable({
  providedIn: 'root'
})

export class TraerclienteService {


  constructor(private http: HttpClient,
              private usuarioService: UsuarioService) { }


  private ejecutarQuery<T>(query: string) {

    query = URL + query;

    return this.http.get<T>(query);

  }


  clientePorDni(texto: string) {
    
  

    return this.ejecutarQuery(`api/client?dni=${texto}`);
  }


}


