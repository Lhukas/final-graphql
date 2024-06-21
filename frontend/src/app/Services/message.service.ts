import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = 'http://localhost:3000'; // URL de votre serveur Node.js

  constructor(private http: HttpClient) {}

  sendMessage(message: string, sender: string | null): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/message/sendMessage`, { message, sender });
  }

  getMessages(): Observable<{ message: string, sender: string }[]> {
    return this.http.get<{ message: string, sender: string }[]>(`${this.apiUrl}/message/getAllMessage`);
  }
}
