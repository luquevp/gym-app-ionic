export interface RespuestaApi {
  success: boolean;
  data: Cliente[];
  page: number;
  pages: number;
}

export interface Cliente {
  fotoUrl: string;
  imagenBase64?: string;
  _id: string;
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
  email: string;
  debeCuota: boolean;
}

export interface Usuario {
  _id?: string;
  userName?: string;
  password?: string;
}