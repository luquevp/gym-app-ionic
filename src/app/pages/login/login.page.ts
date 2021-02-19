import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { from } from 'rxjs';
import { UiServiceService } from '../../services/ui-service.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  @ViewChild('slidePrincipal', {static: true}) slides: IonSlides;

  loginUser = {
    userName: '',
    password: ''
  };

  constructor(private usuarioService: UsuarioService,
              private navCtrl: NavController,
              private uiService: UiServiceService,
              private alertcontroller: AlertController) { }

  ngOnInit() {
    this.slides.lockSwipes(true);
  }

  async login( flogin: NgForm) {

    if (flogin.invalid) { return; }
    const valido = await this.usuarioService.login(this.loginUser.userName, this.loginUser.password);
    //console.log(flogin.valid);
    //console.log(this.loginUser);

    if ( valido ) {
      this.navCtrl.navigateRoot('/main', {animated: true})

    }
    else {
      
     
      this.uiService.alertaInformativa('Usuario y/o contraseña incorrecta.');

    }

  }





  

}
