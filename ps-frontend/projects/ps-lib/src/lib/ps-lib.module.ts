import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BtnContainedComponent } from './components/buttons/btn-contained/btn-contained.component';
import { BtnIconComponent } from './components/buttons/btn-icon/btn-icon.component';
import { CheckboxFieldComponent } from './components/fields/checkbox-field/checkbox-field.component';
import { DropdownFieldComponent } from './components/fields/dropdown-field/dropdown-field.component';
import { FilterComponent } from './components/filter/filter/filter.component';
import { FilterEqualsComponent } from './components/filter/filter-equals/filter-equals.component';
import { FilterBetweenComponent } from './components/filter/filter-between/filter-between.component';
import { HeaderButtonComponent } from './components/header/components/header-button/header-button.component';
import { HeaderComponent } from './components/header/header.component';
import { ListComponent } from './components/list/list.component';
import { ListPanelComponent } from './components/list/components/list-panel/list-panel.component';
import { LoginComponent } from './components/pages/login/login/login.component';
import { MapsComponent } from './components/maps/maps.component';
import { PasswordFieldComponent } from './components/fields/password-field/password-field.component';
import { TextareaFieldComponent } from './components/fields/textarea-field/textarea-field.component';
import { TextFieldBigComponent } from './components/fields/text-field-big/text-field-big.component';
import { TextFieldComponent } from './components/fields/text-field/text-field.component';
import { TextFieldPrefillComponent } from './components/fields/text-field-prefill/text-field-prefill.component';
import { TruncatePipe } from './pipes/truncate/truncate.pipe';
import { PopupComponent } from './components/popup/popup.component';
import { ImageComponent } from './components/images/image/image.component';
import { PanelComponent } from './components/panel/panel.component';
import { PanelInfoSecondComponent } from './components/panel/components/panel-info-second/panel-info-second.component';
import { PanelUserComponent } from './components/panel/components/panel-user/panel-user.component';
import { ImageButtonComponent } from './components/images/image-button/image-button.component';
import { ImageGalleryComponent } from './components/images/image-gallery/image-gallery.component';
import { ImageViewerComponent } from './components/images/image-viewer/image-viewer.component';
import { NotesComponent } from './components/notes/notes/notes.component';
import { NotesViewerComponent } from './components/notes/notes-viewer/notes-viewer.component';
import { NotesButtonComponent } from './components/notes/notes-button/notes-button.component';
import { DetailsHeaderComponent } from './components/details-header/details-header.component';
import { PanelInfoComponent } from './components/panel/components/panel-info/panel-info.component';
import { LoaderComponent } from './components/loader/loader.component';
import { PanelTitleComponent } from './components/panel/components/panel-title/panel-title.component';
import { PanelNewMapComponent } from './components/panel/components/panel-new-map/panel-new-map.component';
import { PanelNewInformationComponent } from './components/panel/components/panel-new-information/panel-new-information.component';
import { PanelNewContactComponent } from './components/panel/components/panel-new-contact/panel-new-contact.component';
import { PanelNewConfirmationComponent } from './components/panel/components/panel-new-confirmation/panel-new-confirmation.component';
import { FileFieldComponent } from './components/fields/file-field/file-field.component';
import { NewLocationComponent } from './components/pages/new/new-location/new-location.component';
import { NewInformationComponent } from './components/pages/new/new-information/new-information.component';
import { NewConfirmationComponent } from './components/pages/new/new-confirmation/new-confirmation.component';
import { OverviewComponent } from './components/pages/overview/overview.component';
import { SelectFieldComponent } from './components/fields/select-field/select-field.component';
import { PanelToggleComponent } from './components/panel/components/panel-toggle/panel-toggle.component';
import { PanelOrderInfoComponent } from './components/panel/components/panel-order-info/panel-order-info.component';
import { PanelOrderComponent } from './components/panel/components/panel-order/panel-order.component';
import { MailComponent } from './components/mail/mail.component';
import { ToastComponent } from './components/toast/toast.component';

import { ActionService } from './services/action/action.service';
import { ApiService } from './services/api/api.service';
import { AuthorisationService } from './services/authorisation/authorisation.service';
import { ConfigService } from './services/config/config.service';
import { FilterService } from './services/filter/filter.service';
import { Loader } from './services/loader/loader.service';
import { MailService } from './services/mail/mail.service';
import { NavigationService } from './services/navigation/navigation.service';
import { Popup } from './services/popup/popup.service';
import { StorageService } from './services/storage/storage.service';
import { ToastService } from './services/toast/toast.service';
import { PanelPersonComponent } from './components/panel/components/panel-person/panel-person.component';
import { AssignPOrGComponent } from './components/pages/assign/assign-p-or-g/assign-p-or-g.component';
import { AssignPAndGComponent } from './components/pages/assign/assign-p-and-g/assign-p-and-g.component';
import { PanelTabSelectorComponent } from './components/panel/components/panel-tab-selector/panel-tab-selector.component';
import { PopupConfirmComponent } from './components/popup/components/popup-confirm/popup-confirm.component';
import { SendMailComponent } from './components/pages/send-mail/send-mail.component';
import { ChangeLocationComponent } from './components/pages/change/change-location/change-location.component';
import { ChangeConfirmationComponent } from './components/pages/change/change-confirmation/change-confirmation.component';
import { ChangeInformationComponent } from './components/pages/change/change-information/change-information.component';
import { PanelChangeConfirmationComponent } from './components/panel/components/panel-change-confirmation/panel-change-confirmation.component';
import { HeaderGroupsComponent } from './components/header/components/header-groups/header-groups.component';
import { CommonModule } from '@angular/common';
import { FilterInComponent } from './components/filter/filter-in/filter-in.component';
import { NotificationService } from './services/notification/notification.service';
import { PanelPersonSimpleComponent } from './components/panel/components/panel-person-simple/panel-person-simple.component';
import { PanelOrderSecondComponent } from './components/panel/components/panel-order-second/panel-order-second.component';
import { ListPanelOrderComponent } from './components/list/components/list-panel-order/list-panel-order.component';
import { DetailsComponent } from './components/pages/details/details/details.component';
import { DetailsOrderComponent } from './components/pages/details/details-order/details-order.component';
import { OrderCreationComponent } from './components/pages/order/creation/order-creation/order-creation.component';
import { OrderConfirmationComponent } from './components/pages/order/creation/order-confirmation/order-confirmation.component';

import { WebInterceptor } from './interceptors/web.interceptor';
import { TransformService } from './services/transform/transform.service';
import { OrderitemCreationComponent } from './components/pages/orderitem/orderitem-creation/orderitem-creation.component';
import { OrderitemInformationComponent } from './components/pages/orderitem/orderitem-information/orderitem-information.component';
import { OrderitemConfirmationComponent } from './components/pages/orderitem/orderitem-confirmation/orderitem-confirmation.component';
import { ResetAccountComponent } from './components/pages/login/reset-account/reset-account.component';
import { OrderHandleNoLoginComponent } from './components/pages/order/handling/order-handle-no-login/order-handle-no-login.component';
import { OrderHandleComponent } from './components/pages/order/handling/order-handle/order-handle.component';
import { SettingsStartComponent } from './components/pages/settings/settings-start/settings-start.component';
import { SettingsButtonComponent } from './components/pages/settings/components/settings-button/settings-button.component';
import { PanelSettingsUsersComponent } from './components/pages/settings/components/panel-settings-users/panel-settings-users.component';
import { RouterModule } from '@angular/router';
import { EnvironmentService } from './services/environment/environment.service';

import { PanelSettingsComponent } from './components/pages/settings/components/panel-settings/panel-settings.component';
import { PanelSettingsCompaniesComponent } from './components/pages/settings/components/panel-settings-companies/panel-settings-companies.component';
import { PanelSettingsDomainsComponent } from './components/pages/settings/components/panel-settings-domains/panel-settings-domains.component';
import { ListPanelDomainComponent } from './components/pages/settings/components/panel-settings-domains/components/list-panel-domain/list-panel-domain.component';
import { ListPanelUserComponent } from './components/pages/settings/components/panel-settings-users/components/list-panel-user/list-panel-user.component';
import { ListPanelCompanyComponent } from './components/pages/settings/components/panel-settings-companies/components/list-panel-company/list-panel-company.component';
import { PanelSettingsGroupsComponent } from './components/pages/settings/components/panel-settings-groups/panel-settings-groups.component';
import { ListPanelGroupComponent } from './components/pages/settings/components/panel-settings-groups/components/list-panel-group/list-panel-group.component';
import { PanelSettingsMainCategoryComponent } from './components/pages/settings/components/panel-settings-main-category/panel-settings-main-category.component';
import { ListPanelMainCategoryComponent } from './components/pages/settings/components/panel-settings-main-category/components/list-panel-main-category/list-panel-main-category.component';
import { PanelSettingsCategoryComponent } from './components/pages/settings/components/panel-settings-category/panel-settings-category.component';
import { ListPanelCategoryComponent } from './components/pages/settings/components/panel-settings-category/components/list-panel-category/list-panel-category.component';
import { DateFieldComponent } from './components/fields/date-field/date-field.component';
import { PanelSettingsStatusComponent } from './components/pages/settings/components/panel-settings-status/panel-settings-status.component';
import { ListPanelStatusComponent } from './components/pages/settings/components/panel-settings-status/components/list-panel-status/list-panel-status.component';
import { PanelSettingsActionsComponent } from './components/pages/settings/components/panel-settings-actions/panel-settings-actions.component';
import { ListPanelActionComponent } from './components/pages/settings/components/panel-settings-actions/components/list-panel-action/list-panel-action.component';
import { PanelSettingsPagesComponent } from './components/pages/settings/components/panel-settings-pages/panel-settings-pages.component';
import { SettingsTitleComponent } from './components/pages/settings/components/settings-title/settings-title.component';
import { ListPanelPagesComponent } from './components/pages/settings/components/panel-settings-pages/components/list-panel-pages/list-panel-pages.component';
import { CreateButtonsComponent } from './components/pages/settings/components/panel-settings-pages/components/create-buttons/create-buttons.component';
import { CreateButtonComponent } from './components/pages/settings/components/panel-settings-pages/components/create-buttons/components/create-button/create-button.component';
import { CreateConditionsComponent } from './components/pages/settings/components/panel-settings-pages/components/create-buttons/components/create-conditions/create-conditions.component';
import { CreateConditionComponent } from './components/pages/settings/components/panel-settings-pages/components/create-buttons/components/create-condition/create-condition.component';
import { PanelPageOverviewComponent } from './components/pages/settings/components/panel-settings-pages/components/panel-page-overview/panel-page-overview.component';
import { ListPanelPagesOverviewComponent } from './components/pages/settings/components/panel-settings-pages/components/list-panel-pages-overview/list-panel-pages-overview.component';
import { CreateOverviewColumnsComponent } from './components/pages/settings/components/panel-settings-pages/components/create-overview-columns/create-overview-columns.component';
import { CreateOverviewColumnComponent } from './components/pages/settings/components/panel-settings-pages/components/create-overview-column/create-overview-column.component';
import { ValidationService } from './services/validation/validation.service';
import { PanelSettingsContractsComponent } from './components/pages/settings/components/panel-settings-contracts/panel-settings-contracts.component';
import { ListPanelContractGovernmentComponent } from './components/pages/settings/components/panel-settings-contracts/components/list-panel-contract-government/list-panel-contract-government.component';
import { ListPanelContractContractorComponent } from './components/pages/settings/components/panel-settings-contracts/components/list-panel-contract-contractor/list-panel-contract-contractor.component';
import { DynamicDirective } from './directives/dynamic.directive';
import { DynamicLeftDirective } from './directives/dynamic-left.directive';
import { DynamicRightDirective } from './directives/dynamic-right.directive';
import { ComponentService } from './services/component/component.service';
import { AssignComponent } from './components/pages/assign/assign/assign.component';
import { PanelAssignGOrUComponent } from './components/panel/components/panel-assign-g-or-u/panel-assign-g-or-u.component';
import { PanelAssignGAndUComponent } from './components/panel/components/panel-assign-g-and-u/panel-assign-g-and-u.component';


@NgModule({
  declarations: [
    TruncatePipe,
    HeaderComponent,
    HeaderButtonComponent,
    BtnIconComponent,
    BtnContainedComponent,
    DateFieldComponent,
    TextFieldComponent,
    TextFieldBigComponent,
    TextareaFieldComponent,
    PasswordFieldComponent,
    CheckboxFieldComponent,
    TextFieldPrefillComponent,
    DropdownFieldComponent,
    SelectFieldComponent,
    FileFieldComponent,
    LoginComponent,
    ListComponent,
    ListPanelComponent,
    ListPanelOrderComponent,
    ListPanelUserComponent,
    ListPanelDomainComponent,
    ListPanelCompanyComponent,
    ListPanelGroupComponent,
    ListPanelMainCategoryComponent,
    ListPanelCategoryComponent,
    ListPanelStatusComponent,
    ListPanelActionComponent,
    ListPanelPagesComponent,
    ListPanelPagesOverviewComponent,
    ListPanelContractGovernmentComponent,
    FilterComponent,
    FilterEqualsComponent,
    FilterBetweenComponent,
    FilterInComponent,
    MapsComponent,
    PopupComponent,
    PopupConfirmComponent,
    ImageComponent,
    ImageButtonComponent,
    ImageGalleryComponent,
    ImageViewerComponent,
    PanelComponent,
    PanelTitleComponent,
    PanelTabSelectorComponent,
    PanelInfoComponent,
    PanelInfoSecondComponent,
    PanelChangeConfirmationComponent,
    PanelNewMapComponent,
    PanelNewInformationComponent,
    PanelNewContactComponent,
    PanelNewConfirmationComponent,
    PanelToggleComponent,
    PanelOrderComponent,
    PanelOrderInfoComponent,
    PanelUserComponent,
    PanelPersonComponent,
    PanelPersonSimpleComponent,
    PanelSettingsComponent,
    PanelSettingsCompaniesComponent,
    PanelSettingsDomainsComponent,
    PanelSettingsUsersComponent,
    PanelSettingsGroupsComponent,
    PanelSettingsMainCategoryComponent,
    PanelSettingsCategoryComponent,
    PanelSettingsCompaniesComponent,
    PanelSettingsStatusComponent,
    PanelSettingsActionsComponent,
    PanelSettingsPagesComponent,
    PanelPageOverviewComponent,
    NotesComponent,
    NotesViewerComponent,
    NotesButtonComponent,
    DetailsHeaderComponent,
    LoaderComponent,
    NewLocationComponent,
    NewInformationComponent,
    NewConfirmationComponent,
    ChangeLocationComponent,
    ChangeConfirmationComponent,
    ChangeInformationComponent,
    OverviewComponent,
    DetailsComponent,
    DetailsOrderComponent,
    OrderCreationComponent,
    OrderConfirmationComponent,
    MailComponent,
    ToastComponent,
    AssignComponent,
    AssignPOrGComponent,
    AssignPAndGComponent,
    SendMailComponent,
    HeaderGroupsComponent,
    PanelOrderSecondComponent,
    OrderitemCreationComponent,
    OrderitemInformationComponent,
    OrderitemConfirmationComponent,
    ResetAccountComponent,
    OrderHandleNoLoginComponent,
    OrderHandleComponent,
    SettingsStartComponent,
    SettingsButtonComponent,
    SettingsTitleComponent,
    CreateButtonsComponent,
    CreateButtonComponent,
    CreateConditionsComponent,
    CreateConditionComponent,
    CreateOverviewColumnsComponent,
    CreateOverviewColumnComponent,
    PanelSettingsContractsComponent,
    ListPanelContractContractorComponent,
    DynamicDirective,
    DynamicLeftDirective,
    DynamicRightDirective,
    PanelAssignGOrUComponent,
    PanelAssignGAndUComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
//    LeafletModule,
    RouterModule
  ],
  exports: [
    TruncatePipe,
    MatDatepickerModule,
    MatNativeDateModule,
    HeaderComponent,
    HeaderButtonComponent,
    BtnIconComponent,
    BtnContainedComponent,
    DateFieldComponent,
    TextFieldComponent,
    TextFieldBigComponent,
    TextareaFieldComponent,
    PasswordFieldComponent,
    CheckboxFieldComponent,
    TextFieldPrefillComponent,
    DropdownFieldComponent,
    SelectFieldComponent,
    FileFieldComponent,
    LoginComponent,
    ListComponent,
    ListPanelComponent,
    ListPanelOrderComponent,
    ListPanelUserComponent,
    ListPanelCategoryComponent,
    ListPanelStatusComponent,
    ListPanelActionComponent,
    ListPanelPagesComponent,
    ListPanelPagesOverviewComponent,
    ListPanelContractGovernmentComponent,
    ListPanelContractContractorComponent,
    MapsComponent,
    PopupConfirmComponent,
    ImageComponent,
    ImageButtonComponent,
    ImageGalleryComponent,
    ImageViewerComponent,
    FilterEqualsComponent,
    FilterBetweenComponent,
    FilterInComponent,
    PanelComponent,
    PanelTitleComponent,
    PanelTabSelectorComponent,
    PanelInfoComponent,
    PanelInfoSecondComponent,
    PanelNewMapComponent,
    PanelNewInformationComponent,
    PanelNewContactComponent,
    PanelNewConfirmationComponent,
    PanelToggleComponent,
    PanelOrderComponent,
    PanelOrderSecondComponent,
    PanelOrderInfoComponent,
    PanelUserComponent,
    PanelPersonComponent,
    PanelPersonSimpleComponent,
    PanelSettingsComponent,
    PanelSettingsCompaniesComponent,
    PanelSettingsDomainsComponent,
    PanelSettingsUsersComponent,
    PanelSettingsGroupsComponent,
    PanelSettingsMainCategoryComponent,
    PanelSettingsCategoryComponent,
    PanelSettingsStatusComponent,
    PanelSettingsActionsComponent,
    PanelSettingsPagesComponent,
    PanelPageOverviewComponent,
    NotesComponent,
    NotesViewerComponent,
    NotesButtonComponent,
    DetailsHeaderComponent,
    DetailsOrderComponent,
    NewLocationComponent,
    NewInformationComponent,
    NewConfirmationComponent,
    ChangeLocationComponent,
    ChangeConfirmationComponent,
    ChangeInformationComponent,
    OverviewComponent,
    DetailsComponent,
    OrderCreationComponent,
    OrderConfirmationComponent,
    MailComponent,
    ToastComponent,
    AssignComponent,
    AssignPOrGComponent,
    AssignPAndGComponent,
    SendMailComponent,
    OrderitemCreationComponent,
    OrderitemInformationComponent,
    OrderitemConfirmationComponent,
    ResetAccountComponent,
    OrderHandleNoLoginComponent,
    OrderHandleComponent,
    SettingsStartComponent,
    SettingsTitleComponent,
    CreateButtonsComponent,
    CreateButtonComponent,
    CreateConditionsComponent,
    CreateConditionComponent,
    CreateOverviewColumnsComponent,
    CreateOverviewColumnComponent,
    PanelSettingsContractsComponent,
    PanelAssignGOrUComponent,
    PanelAssignGAndUComponent
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'nl-NL'},
    {provide: HTTP_INTERCEPTORS, useClass: WebInterceptor, multi: true},
  ]
})
export class PsLibModule {static forRoot(): ModuleWithProviders<PsLibModule> {
  return {
    ngModule: PsLibModule,
    providers: [
      ApiService,
      AuthorisationService,
      StorageService,
      NavigationService,
      FilterService,
      ConfigService,
      ComponentService,
      Popup,
      ActionService,
      Loader,
      MailService,
      ToastService,
      NotificationService,
      TransformService,
      EnvironmentService,
      ValidationService
    ]
  };
}}

