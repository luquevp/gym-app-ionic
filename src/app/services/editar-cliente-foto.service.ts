import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const URL = environment.url;

@Injectable({
  providedIn: "root"
})
export class EditarClienteFotoService {
  constructor(private http: HttpClient) {}

  /* private ejecutarQuery<T>(query: string, body: string) {

    query = URL + query;

    return this.http.put<T>("https://i-gym.herokuapp.com/api/client", body);

  }
*/

  cambiarFotoCliente(cliente: Cliente) {
    return this.http.put<Cliente>(
      "https://i-gym.herokuapp.com/api/client",
      cliente
    );
  }
}
