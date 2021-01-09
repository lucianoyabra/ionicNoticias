import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  @ViewChild(IonSegment, {static: true}) segment: IonSegment;
  noticias: Article[] = [];

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit(){
    this.cargarNoticias(this.categorias[0]);
    this.segment.value = this.categorias[0];
  }

  segmentChanged(event){
/*     if ( this.segment.value === event.detail.value){
      return;
    } */
    this.noticias = [];
    this.cargarNoticias(event.detail.value);
  }

  loadData(event){
    this.cargarNoticias(this.segment.value, event);

  }

  cargarNoticias(categoria: string, event?) {
    this.noticiasService.getTopHeadlinesCategoria(categoria)
    .subscribe(res => {
      if (res.articles.length === 0){
        event.target.disabled = true;
        event.target.complete();
      }
      this.noticias.push(...res.articles);
      if (event){
        event.target.complete();
      }
    });
  }

}
