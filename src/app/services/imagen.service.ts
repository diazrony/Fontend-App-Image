import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Imagen } from '../models/imagen';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {
  imagenURL = 'http://localhost:8080/cloudinary/';

  constructor( private httpClient: HttpClient) { }

  public list() {
    return this.httpClient.get<Imagen[]>(this.imagenURL + 'list');
  }
  public upload(imagen: File) {
    const formData = new FormData();
    formData.append('multipartFile', imagen);
    return this.httpClient.post<any>('http://localhost:8080/cloudinary/upload', formData);
  }
  public delete(id: number){
    return this.httpClient.delete(this.imagenURL + `delete/${id}`);
  }
}
