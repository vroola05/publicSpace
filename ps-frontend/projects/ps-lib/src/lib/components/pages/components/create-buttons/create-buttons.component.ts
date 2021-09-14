import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Role } from '../../../../../model/role';
import { PageButton } from '../../../../../model/page-button';

import { ApiService } from '../../../../services/api/api.service';
import { AuthorisationService } from '../../../../services/authorisation/authorisation.service';
import { DomainService } from '../../../../services/domain/domain.service';
import { TransformService } from '../../../../services/transform/transform.service';

@Component({
  selector: 'lib-create-buttons',
  templateUrl: './create-buttons.component.html',
  styleUrls: ['./create-buttons.component.scss']
})
export class CreateButtonsComponent implements OnInit {
  
  @Input() public buttons: PageButton[];

  public buttonTypeItems: { name: string, value?: string, data?: any }[] = [];
  public roleItems: { name: string, value?: string, selected?: boolean, data?: any }[] = [];

  constructor(
    private apiService: ApiService,
    private domainService: DomainService,
    protected authorisation: AuthorisationService,
    protected transform: TransformService
  ) { }

  public ngOnInit(): void {

    this.getButtonTypes();
    this.getRoles();
  }

  

  public getButtonTypes(): void {
    const endpointT = this.domainService.getEndpoint('getButtonTypes');
    if (this.authorisation.hasRoles(endpointT.roles)) {
      let url = this.transform.URL(endpointT.endpoint);

      this.apiService.get(url).subscribe((pageButtonTypes: string[]) => {
        const buttonTypeItems: { name: string, value?: string, data?: any }[] = [];
        pageButtonTypes.forEach(pageButtonType => {
          buttonTypeItems.push({ name: pageButtonType, value: null, data: pageButtonType });
        });
        this.buttonTypeItems = buttonTypeItems;
      });
    }
  }

  public getRoles(): void {
    const endpointT = this.domainService.getEndpoint('getRoles');
    if (this.authorisation.hasRoles(endpointT.roles)) {
      let url = this.transform.URL(endpointT.endpoint);

      this.apiService.get(url).subscribe((roles: Role[]) => {
        const roleItems: { name: string, value?: string, selected?: boolean, data?: any }[] = [];
        roles.forEach(role => {
          roleItems.push({ name: role.role, value: String(role.id), data: role });
        });
        this.roleItems = roleItems;
      });
    }
  }
  
}
