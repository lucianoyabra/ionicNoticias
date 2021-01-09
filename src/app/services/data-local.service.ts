import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  noticias: Article[] = [];

  constructor(private storage: Storage, private toastCtrl: ToastController) {
    this.cargarFavoritos();
  }

  guardarNoticia(noticia: Article){
    const existe = this.noticias.find(not => not.title === noticia.title );
    if (!existe){
      this.noticias.unshift(noticia);
      this.storage.set('favoritos', this.noticias);
      this.presentToast('Agregado a favoritos');
    }else{
      this.presentToast('El elemento ya estaba cargado');
    }
  }
  async cargarFavoritos(){
    const favoritos = await this.storage.get('favoritos');
    if (favoritos){
      this.noticias = favoritos;
    }else{
      this.noticias = [];
    }
  }
  borrarNoticia(noticia: Article){
      this.noticias = this.noticias.filter(noti => noti.title !== noticia.title);
      this.storage.set('favoritos', this.noticias);
      this.presentToast('Se ha eliminado correctamente');
  }

  async presentToast(message) {
    const toast = await this.toastCtrl.create({
      message,
      position: 'middle',
      duration: 1500
    });
    toast.present();
  }

}
