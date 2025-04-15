import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HomepageService {
  constructor(private http: HttpClient) {}
  postForm(formData: any) {
    return this.http.post('https://formspree.io/f/xqapnwnq', formData);
  }
}
