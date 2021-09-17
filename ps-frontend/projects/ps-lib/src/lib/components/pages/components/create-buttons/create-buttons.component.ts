import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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

  @Output() changed: EventEmitter<PageButton[]> = new EventEmitter<PageButton[]>();
  
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

  public onButtonChanged($event: {action: string, index: number, button: PageButton}): void {
    
    switch($event.action) {
      case 'delete':
        this.buttons.splice($event.index, 1);
        break;
      case 'changed':
        this.buttons[$event.index] = $event.button;
        break;
    }
    this.changed.emit(this.buttons);
  }
  
  public onAddClick($event): void {
    const button = new PageButton();
    button.name = '';
    button.route = '';
    button.roles = [];
    button.conditions = [];
    this.buttons.push(button);
    this.changed.emit(this.buttons);
  }

  public isFirstButton(i: number) : boolean {
    return i <= 0;
  }

  public isLastButton(i: number) : boolean {
    return i >= this.buttons.length - 1;
  }

  public moveUp(i: number): void {
    if (this.isFirstButton(i)) {
      return;
    }

    this.moveButton(i, i-1);
  }

  public moveDown(i: number): void {
    if (this.isLastButton(i)) {
      return;
    }

    this.moveButton(i, i+1);
  }

  private moveButton(oldIndex, newIndex) {
    this.buttons.splice(newIndex, 0, this.buttons.splice(oldIndex, 1)[0]);
  }
}
