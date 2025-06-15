import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenUserService } from './services/token-user.service'

//con este Inteceptor lo que hacemos es obtener el token si esta guardado en localstorage y si lo tiene lo envia directamente al header
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenUserService = inject(TokenUserService);
  const userToken = tokenUserService.getToken();
  if (userToken) {
    // console.log(userToken)
    const clonedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${userToken}`)
    });
    return next(clonedReq);
  }
  return next(req);
};
