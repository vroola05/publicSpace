import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  LoginComponent,
  OverviewComponent,
  DetailsComponent,
  NewConfirmationComponent,
  NewInformationComponent,
  NewLocationComponent,
  AssignPOrGComponent,
  SendMailComponent,
  ChangeConfirmationComponent,
  ChangeLocationComponent,
  ChangeInformationComponent,
  OrderCreationComponent,
  OrderConfirmationComponent,
  SettingsStartComponent,
  PanelSettingsCompaniesComponent,
  PanelSettingsDomainsComponent,
  PanelSettingsUsersComponent,
  PanelSettingsGroupsComponent,
  PanelSettingsMainCategoryComponent,
  PanelSettingsCategoryComponent,
  PanelSettingsStatusComponent,
  PanelSettingsActionsComponent,
  PanelSettingsPagesComponent
} from 'ps-lib';

const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { title: 'Public space' } },
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
  { path: 'assign/:id', component: AssignPOrGComponent, data: { title: 'Melding toewijzen' } },
  { path: 'new/location', component: NewLocationComponent, data: { title: 'Waar is de melding' } },
  { path: 'new/information', component: NewInformationComponent, data: { title: 'Nieuwe melding maken' } },
  { path: 'new/confirmation', component: NewConfirmationComponent, data: { title: 'Melding controleren' } },
  { path: 'change/:id', component: ChangeConfirmationComponent, data: { title: 'Melding wijzigen' } },
  { path: 'change/:id/location', component: ChangeLocationComponent, data: { title: 'Wijzig de locatie' } },
  { path: 'change/:id/information', component: ChangeInformationComponent, data: { title: 'Wijzig informatie' } },
  { path: 'change/:id/confirmation', component: ChangeConfirmationComponent, data: { title: 'Wijzigingen controleren' } },
  { path: 'details/:id/order/creation', component: OrderCreationComponent, data: { title: 'Opdracht aanmaken' } },
  { path: 'details/:id/order/confirmation', component: OrderConfirmationComponent, data: { title: 'Opdracht controleren' } },
  { path: 'mail/:id/:mailId', component: SendMailComponent, data: { title: 'Verstuur e-mail' } },
  { path: '', component: LoginComponent, data: { title: 'Inloggen' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
