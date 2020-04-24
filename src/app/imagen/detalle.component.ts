import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImagenService } from '../services/imagen.service';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Imagen } from '../models/imagen';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  @Input() index;

  imagenes: Imagen[] = [];

  public config: SwiperConfigInterface = {
    a11y: true,
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: true,
    pagination: false
  };

  constructor(
    private activeModal: NgbModal,
    private imagenService: ImagenService,
  ) { }

  ngOnInit(): void {
    this.config.initialSlide = this.index;
    this.imagenService.list().subscribe(imagenes => {
      this.imagenes = imagenes;
    }, err => console.log(err));
  }
  closeModal(): void {
    this.activeModal.dismissAll();
  }
}
