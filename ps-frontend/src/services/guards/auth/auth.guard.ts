import { CanActivateFn } from '@angular/router';

import { inject } from '@angular/core';
import { AuthorisationService } from '../../authorisation/authorisation.service';


export const authGuard: CanActivateFn = (route, state) => {
  const authorisationService = inject(AuthorisationService);
  const data = route.data;

  if (data?.['domainType'] && !authorisationService.isDomainType(data['domainType'])) {
    return false;
  }
  
  if (data?.['roles'] && !authorisationService.hasRoles(data['roles'])) {
    return false;
  }

  return true;

};
