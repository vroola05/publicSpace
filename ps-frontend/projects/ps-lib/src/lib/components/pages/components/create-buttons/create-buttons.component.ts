import { Component, Input, OnInit, ViewChild } from '@angular/core';
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

  constructor(
    private apiService: ApiService,
    private domainService: DomainService,
    protected authorisation: AuthorisationService,
    protected transform: TransformService
  ) { }

  public ngOnInit(): void {
    this.getButtonTypes();
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
}
