import { Component, ɵConsole } from "@angular/core";
import { TraerclienteService } from "../../services/traercliente.service";
import { ModalController } from "@ionic/angular";
import { Cliente } from '../../interfaces/interfaces';
import { RegistrarAsistenciaService } from "../../services/registrar-asistencia.service";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { DomSanitizer } from "@angular/platform-browser";
import { EditarClienteFotoService } from "../../services/editar-cliente-foto.service";
import { ToastController } from "@ionic/angular";
import { LoadingController } from '@ionic/angular';
import { Keyboard } from "@ionic-native/keyboard/ngx";





//import {ImageResizer,ImageResizerOptions} from "@ionic-native/image-resizer/ngx";
import { UsuarioService } from '../../services/usuario.service';


//declare var window: any;



@Component({
  selector: "app-inicio",
  templateUrl: "./inicio.page.html",
  styleUrls: ["./inicio.page.scss"]
})
export class InicioPage {
  textoBuscar = "";
  buscando = false;
  clientes: Cliente[] = [];
  imagenBase64: string;
  myInput = "";
  noencuentra = false;

  constructor(
    private TraerclienteService: TraerclienteService,
    private RegistrarAsistenciaService: RegistrarAsistenciaService,
    private camera: Camera,
    public domSanitizer: DomSanitizer,
    private EditarClienteFotoService: EditarClienteFotoService,
    public toastController: ToastController,
    public loadingController: LoadingController,
    private keyboard: Keyboard,
    private usuarioService: UsuarioService
     // private imageResizer: ImageResizer
  ) {}

  limpiar()
  {
     this.buscando = false;
     this.clientes = [];
     this.noencuentra = false;
  }


  buscar(event) {
    const valor: string = event.trim();

    this.noencuentra = false;

    if (valor.length === 0 ) {
     this.buscando = false;
     this.clientes = [];
     return;
    }

   

    this.buscando = true;
    this.TraerclienteService.clientePorDni(valor).subscribe((resp: any) => {
    //  console.log(resp.data);
      this.clientes = resp.data;
      
      this.buscando = false;
      this.keyboard.hide();

      if (this.clientes.length === 0)
      {
        
        this.noencuentra = true;
       // console.log(this.noencuentra);
      }
      

    });
  }

  borrarSearchbar() {
    this.clientes = [];
  }

  camara() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA,
      //allowEdit: true,
      targetWidth: 300,
      targetHeight: 300
    };

    this.procesarImagen(options);
  }

  procesarImagen(options: CameraOptions) {
    this.camera.getPicture(options).then(imageData => {
      this.imagenBase64 = "data:image/jpeg;base64," + imageData;
     
      this.clientes[0].imagenBase64 = this.imagenBase64;

      delete this.clientes[0].fotoUrl;

      this.EditarClienteFotoService.cambiarFotoCliente(
        this.clientes[0]
      ).subscribe(
        (res: any) => {
         // console.log(res.data);
          this.clientes[0].fotoUrl = res.data.fotoUrl;
        },
        err => {
          console.log(err);
        }
      );

      //this.clientes[0].fotoUrl = this.imagenBase64;
    });
  }

  registrarIngreso() {
    this.RegistrarAsistenciaService.Ingresar(this.clientes[0].dni).subscribe(
      res => {
      //  console.log(res);
        this.presentToast();
        this.myInput = "";
        this.limpiar();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: "Ha ingresado con éxito.",
      duration: 3000,
      position: "bottom",
      color: "light"
    });
    toast.present();
  }

  

  logout(){
    this.usuarioService.logout();
  }




 
}
