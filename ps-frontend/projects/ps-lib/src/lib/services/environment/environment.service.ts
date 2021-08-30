import { Injectable } from '@angular/core';
import { Domain } from '../../../model/domain';
import { Company } from '../../../model/company';
import { AuthorisationService } from '../authorisation/authorisation.service';
import { StorageService } from '../storage/storage.service';
import { Environment } from '../../../model/intefaces';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  constructor(
    protected storage: StorageService,
    protected authorisation: AuthorisationService
  ) { }

  public get(): { company: Company, domain: Domain } {
    const environmentString = this.storage.getSession('environment');
    if (!environmentString) {
      const environment: Environment = {
        company: this.authorisation.user.company,
        domain: this.authorisation.user.domain
      };
      this.store(environment);
      return environment;
    }
    return JSON.parse(environmentString) as { company: Company, domain: Domain };
  }

  public store(environment: Environment): void {
    this.storage.setSession('environment', JSON.stringify(environment), true);
  }
}
