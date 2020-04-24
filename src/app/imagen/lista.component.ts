import { Component, OnInit } from '@angular/core';
import { Imagen } from '../models/imagen';
import { ImagenService } from '../services/imagen.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetalleComponent } from './detalle.component';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  imagenes: Imagen[] = [];

  constructor(private service: ImagenService ,
              private spinnerService: NgxSpinnerService,
              private modal: NgbModal
    ) { }

  ngOnInit(): void {
    this.cargarImagenes();
  }

  cargarImagenes():void{
    this.service.list().subscribe(imagenes => {
      this.imagenes = imagenes;
    });
  }
  deleteImage(id: number): void{
    this.spinnerService.show();
    this.service.delete(id).subscribe(status => {
      console.log('Imagen eliminada ' + id);
      this.spinnerService.hide();
      this.cargarImagenes();
    }, err => {
      alert('ocurrio un error intentelo nuevamente');
      this.spinnerService.hide();
    });
  }
  showdetalle(i: number): void {
    const modalRef =  this.modal.open(DetalleComponent);
    modalRef.componentInstance.index = i;
  }

}
