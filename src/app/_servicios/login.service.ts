import { Injectable } from '@angular/core';
import { SignInRequest } from '../_modelo/signin_request';
import { JwtAuthenticationResponse } from '../_modelo/JwtAuthenticationResponse';
import { entorno } from '../_enviroment/entorno';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient , private router:Router ) { }
  autenticar (datos:SignInRequest){
    return this.http.post<JwtAuthenticationResponse>
    (`${entorno.HOSTNAME}/auth/signin`, datos)
  }
  estaLogueado(){
    let token= sessionStorage.getItem(entorno.TOKEN_NAME);
    return token != null;
  }
  cerrarSesion(){
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
}
