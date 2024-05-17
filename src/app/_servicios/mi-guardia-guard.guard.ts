import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { entorno } from '../_enviroment/entorno';

export const miGuardiaGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  const jwtHelper = inject(JwtHelperService);

  let rpta = loginService.estaLogueado();

  //Verificar si esta logueado
  if(!rpta){
    console.log('no esta logueado-false')
    loginService.cerrarSesion();
    return false

    //Verificar si el token no ha expirado
  }else{
    let token = sessionStorage.getItem(entorno.TOKEN_NAME);
    if(!jwtHelper.isTokenExpired(token)){
      console.log("no ha expirado el token")
      return true

    }else{
      loginService.cerrarSesion();
      return false;
    }
  }

};
