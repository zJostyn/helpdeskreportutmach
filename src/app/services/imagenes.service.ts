import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {
  servidor = "https://api-proyweb.onrender.com";

  constructor(private servicio:HttpClient) { }

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.servicio.post(`${this.servidor}/upload`, formData, { headers });
  }
}
