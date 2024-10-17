import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient) { }

  apiUrl:string = 'http://localhost:3006/user/register';

  register(payload:any){
    console.log(payload)
    return this.http.post(this.apiUrl, payload);
  }

  checkToken(token:string){
    console.log(token);
    return this.http.post('http://localhost:3006/user/verify/',{tok:token})
  }

  signIn(payload:any){
    return this.http.post('http://localhost:3006/user/signin',payload)
  }

  forgotPass(payload:any){
    return this.http.post('http://localhost:3006/user/forgotpass', payload)
  }

  checKResetPassToken(payload:any){
    return this.
    http.post('http://localhost:3006/user/verifyresettoken',payload);
  }
  
  resetPassword(data: { password: string, token: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, data);
  }
}


