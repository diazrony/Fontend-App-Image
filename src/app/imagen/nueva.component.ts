import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ImagenService } from '../services/imagen.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-nueva',
  templateUrl: './nueva.component.html',
  styleUrls: ['./nueva.component.css']
})
export class NuevaComponent implements OnInit {
  @ViewChild('ImagenInputFile', {static: false}) imagenFile: ElementRef;
  imagen: File;
  imagenMin: File;

  constructor(
    private imagenService: ImagenService,
    private route: Router,
    private spinnerService: NgxSpinnerService
    ) { }

  ngOnInit(): void {
  }
  onFileChange(event) {
    this.imagen = event.target.files[0];
    const fr = new FileReader();
    fr.onload = (evento: any) => {
      this.imagenMin = evento.target.result;
    };
    fr.readAsDataURL(this.imagen);
  }
  onUpload(): void {
    this.spinnerService.show();
    this.imagenService.upload(this.imagen).subscribe(data => {
      this.spinnerService.hide();
      this.route.navigate(['/']);
    }, err => {
      alert('Ocurrio un error por favor verficar el archivo es .jpg o .png');
      this.spinnerService.hide();
      this.reset();
    }
    );
  }

  reset(): void {
    this.imagen = null;
    this.imagenMin = null;
    this.imagenFile.nativeElement.value = '';
  }



}
