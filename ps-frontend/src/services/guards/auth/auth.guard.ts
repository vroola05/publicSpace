import { CanActivateFn, Router } from '@angular/router';

import { inject } from '@angular/core';
import { AuthorisationService } from '../../authorisation/authorisation.service';


export const authGuard: CanActivateFn = (route, state) => {
  return true;
  // console.log(route);
  // const authorisationService = inject(AuthorisationService);
  // const router = inject(Router);

  // const user = authorisationService.user;
  // if (user != null) {
  //   return true;
  // }
  // console.log('route de boel', user);
  // // Redirect to the login page
  // return router.parseUrl('/login');

};
