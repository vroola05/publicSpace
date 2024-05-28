import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AssignComponent } from '../components/pages/assign/assign/assign.component';
import { ChangeConfirmationComponent } from '../components/pages/change/change-confirmation/change-confirmation.component';
import { ChangeInformationComponent } from '../components/pages/change/change-information/change-information.component';
import { ChangeLocationComponent } from '../components/pages/change/change-location/change-location.component';
import { DetailsComponent } from '../components/pages/details/details/details.component';
import { LoginComponent } from '../components/pages/login/login/login.component';
import { NewConfirmationComponent } from '../components/pages/new/new-confirmation/new-confirmation.component';
import { NewInformationComponent } from '../components/pages/new/new-information/new-information.component';
import { NewLocationComponent } from '../components/pages/new/new-location/new-location.component';
import { OrderSpecificationsConfirmationComponent } from '../components/pages/order-specifications/order-specifications-confirmation/order-specifications-confirmation.component';
import { OrderSpecificationsHandleComponent } from '../components/pages/order-specifications/order-specifications-handle/order-specifications-handle.component';
import { OrderSpecificationsSelectComponent } from '../components/pages/order-specifications/order-specifications-select/order-specifications-select.component';
import { OrderConfirmationComponent } from '../components/pages/order/creation/order-confirmation/order-confirmation.component';
import { OrderCreationComponent } from '../components/pages/order/creation/order-creation/order-creation.component';
import { OverviewComponent } from '../components/pages/overview/overview.component';
import { SendMailComponent } from '../components/pages/send-mail/send-mail.component';
import { PanelSettingsActionsComponent } from '../components/pages/settings/components/panel-settings-actions/panel-settings-actions.component';
import { PanelSettingsCategoryComponent } from '../components/pages/settings/components/panel-settings-category/panel-settings-category.component';
import { PanelSettingsCompaniesComponent } from '../components/pages/settings/components/panel-settings-companies/panel-settings-companies.component';
import { PanelSettingsContractSpecificationsComponent } from '../components/pages/settings/components/panel-settings-contract-specifications/panel-settings-contract-specifications.component';
import { PanelSettingsContractsComponent } from '../components/pages/settings/components/panel-settings-contracts/panel-settings-contracts.component';
import { PanelSettingsDomainsComponent } from '../components/pages/settings/components/panel-settings-domains/panel-settings-domains.component';
import { PanelSettingsGroupsComponent } from '../components/pages/settings/components/panel-settings-groups/panel-settings-groups.component';
import { PanelSettingsMainCategoryComponent } from '../components/pages/settings/components/panel-settings-main-category/panel-settings-main-category.component';
import { PanelSettingsPagesComponent } from '../components/pages/settings/components/panel-settings-pages/panel-settings-pages.component';
import { PanelSettingsStatusComponent } from '../components/pages/settings/components/panel-settings-status/panel-settings-status.component';
import { PanelSettingsUsersComponent } from '../components/pages/settings/components/panel-settings-users/panel-settings-users.component';
import { SettingsStartComponent } from '../components/pages/settings/settings-start/settings-start.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { title: 'Publicspace' } },
  { path: 'overview/:id', component: OverviewComponent, data: { title: 'Overzicht' } },
  { path: 'overview/group/:id', component: OverviewComponent, data: { title: 'Overzicht' } },
  {
    path: 'settings', component: SettingsStartComponent, data: { title: 'Instellingen' },
    children: [
      
      {
        path: 'company',
        component: PanelSettingsCompaniesComponent, data: { title: 'Bedrijf' }
      },
      {
        path: 'domains',
        component: PanelSettingsDomainsComponent, data: { title: 'Domeinen' }
      },
      {
        path: 'contracts',
        component: PanelSettingsContractsComponent, data: { title: 'Contracten' }
      },
      {
        path: 'users',
        component: PanelSettingsUsersComponent, data: { title: 'Gebruikers' }
      },
      {
        path: 'groups',
        component: PanelSettingsGroupsComponent, data: { title: 'Groepen' }
      },
      {
        path: 'main-category',
        component: PanelSettingsMainCategoryComponent, data: { title: 'Hoofdcategorie' }
      },
      {
        path: 'category',
        component: PanelSettingsCategoryComponent, data: { title: 'Categorie' }
      },
      {
        path: 'order-specifications',
        component: PanelSettingsContractSpecificationsComponent, data: { title: 'Bestekposten' }
      },
      
      {
        path: 'status',
        component: PanelSettingsStatusComponent, data: { title: 'Status' }
      },
      {
        path: 'actions',
        component: PanelSettingsActionsComponent, data: { title: 'Acties' }
      },
      {
        path: 'pages',
        component: PanelSettingsPagesComponent, data: { title: 'Pagina\'s' }
      }
    ]
  },
  { path: 'details/:id', component: DetailsComponent, data: { title: 'Melding informatie' } },
  { path: 'assign/:id', component: AssignComponent, data: { title: 'Melding toewijzen' } },
  { path: 'new/location', component: NewLocationComponent, data: { title: 'Waar is de melding' } },
  { path: 'new/information', component: NewInformationComponent, data: { title: 'Nieuwe melding maken' } },
  { path: 'new/confirmation', component: NewConfirmationComponent, data: { title: 'Melding controleren' } },
  { path: 'change/:id', component: ChangeConfirmationComponent, data: { title: 'Melding wijzigen' } },
  { path: 'change/:id/location', component: ChangeLocationComponent, data: { title: 'Wijzig de locatie' } },
  { path: 'change/:id/information', component: ChangeInformationComponent, data: { title: 'Wijzig informatie' } },
  { path: 'change/:id/confirmation', component: ChangeConfirmationComponent, data: { title: 'Wijzigingen controleren' } },
  { path: 'details/:id/order/creation', component: OrderCreationComponent, data: { title: 'Opdracht aanmaken' } },
  { path: 'details/:id/order/confirmation', component: OrderConfirmationComponent, data: { title: 'Opdracht controleren' } },
  { path: 'details/:id/order-specifications/select', component: OrderSpecificationsSelectComponent, data: { title: 'Selecteer opdracht specificaties' } },
  { path: 'details/:id/order-specifications/handle', component: OrderSpecificationsHandleComponent, data: { title: 'Opdracht afhandelen' } },
  { path: 'details/:id/order-specifications/confirmation', component: OrderSpecificationsConfirmationComponent, data: { title: 'Opdracht afhandelen' } },
  { path: 'mail/:id/:mailId', component: SendMailComponent, data: { title: 'Verstuur e-mail' } },
  { path: '', component: LoginComponent, data: { title: 'Inloggen' } }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
