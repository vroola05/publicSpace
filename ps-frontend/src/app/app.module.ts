import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ActionService } from '../services/action/action.service';
import { ApiService } from '../services/api/api.service';
import { AuthorisationService } from '../services/authorisation/authorisation.service';
import { ComponentService } from '../services/component/component.service';
import { ConfigService } from '../services/config/config.service';
import { EnvironmentService } from '../services/environment/environment.service';
import { FilterService } from '../services/filter/filter.service';
import { Loader } from '../services/loader/loader.service';
import { MailService } from '../services/mail/mail.service';
import { NavigationService } from '../services/navigation/navigation.service';
import { NotificationService } from '../services/notification/notification.service';
import { Popup } from '../services/popup/popup.service';
import { StorageService } from '../services/storage/storage.service';
import { ToastService } from '../services/toast/toast.service';
import { TransformService } from '../services/transform/transform.service';
import { ValidationService } from '../services/validation/validation.service';
import { CommonModule } from '@angular/common';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BtnContainedComponent } from '../components/buttons/btn-contained/btn-contained.component';
import { BtnIconComponent } from '../components/buttons/btn-icon/btn-icon.component';
import { DetailsHeaderComponent } from '../components/details-header/details-header.component';
import { CheckboxFieldComponent } from '../components/fields/checkbox-field/checkbox-field.component';
import { DateFieldComponent } from '../components/fields/date-field/date-field.component';
import { DropdownFieldComponent } from '../components/fields/dropdown-field/dropdown-field.component';
import { FileFieldComponent } from '../components/fields/file-field/file-field.component';
import { PasswordFieldComponent } from '../components/fields/password-field/password-field.component';
import { SelectFieldComponent } from '../components/fields/select-field/select-field.component';
import { TextFieldBigComponent } from '../components/fields/text-field-big/text-field-big.component';
import { TextFieldPrefillComponent } from '../components/fields/text-field-prefill/text-field-prefill.component';
import { TextFieldComponent } from '../components/fields/text-field/text-field.component';
import { TextareaFieldComponent } from '../components/fields/textarea-field/textarea-field.component';
import { FilterBetweenComponent } from '../components/filter/filter-between/filter-between.component';
import { FilterEqualsComponent } from '../components/filter/filter-equals/filter-equals.component';
import { FilterInComponent } from '../components/filter/filter-in/filter-in.component';
import { HeaderButtonComponent } from '../components/header/components/header-button/header-button.component';
import { HeaderComponent } from '../components/header/header.component';
import { ImageButtonComponent } from '../components/images/image-button/image-button.component';
import { ImageGalleryComponent } from '../components/images/image-gallery/image-gallery.component';
import { ImageViewerComponent } from '../components/images/image-viewer/image-viewer.component';
import { ImageComponent } from '../components/images/image/image.component';
import { ListPanelOrderComponent } from '../components/list/components/list-panel-order/list-panel-order.component';
import { ListPanelComponent } from '../components/list/components/list-panel/list-panel.component';
import { ListComponent } from '../components/list/list.component';
import { MailComponent } from '../components/mail/mail.component';
import { MapsComponent } from '../components/maps/maps.component';
import { NotesButtonComponent } from '../components/notes/notes-button/notes-button.component';
import { NotesViewerComponent } from '../components/notes/notes-viewer/notes-viewer.component';
import { NotesComponent } from '../components/notes/notes/notes.component';
import { OrderNotesComponent } from '../components/notes/order-notes/order-notes.component';
import { AssignComponent } from '../components/pages/assign/assign/assign.component';
import { ChangeConfirmationComponent } from '../components/pages/change/change-confirmation/change-confirmation.component';
import { ChangeInformationComponent } from '../components/pages/change/change-information/change-information.component';
import { ChangeLocationComponent } from '../components/pages/change/change-location/change-location.component';
import { DetailsOrderComponent } from '../components/pages/details/details-order/details-order.component';
import { DetailsComponent } from '../components/pages/details/details/details.component';
import { LoginComponent } from '../components/pages/login/login/login.component';
import { ResetAccountComponent } from '../components/pages/login/reset-account/reset-account.component';
import { NewConfirmationComponent } from '../components/pages/new/new-confirmation/new-confirmation.component';
import { NewInformationComponent } from '../components/pages/new/new-information/new-information.component';
import { NewLocationComponent } from '../components/pages/new/new-location/new-location.component';
import { OrderSpecificationsConfirmationComponent } from '../components/pages/order-specifications/order-specifications-confirmation/order-specifications-confirmation.component';
import { OrderSpecificationsHandleComponent } from '../components/pages/order-specifications/order-specifications-handle/order-specifications-handle.component';
import { OrderSpecificationsSelectComponent } from '../components/pages/order-specifications/order-specifications-select/order-specifications-select.component';
import { OrderConfirmationComponent } from '../components/pages/order/creation/order-confirmation/order-confirmation.component';
import { OrderCreationComponent } from '../components/pages/order/creation/order-creation/order-creation.component';
import { OrderHandleNoLoginComponent } from '../components/pages/order/handling/order-handle-no-login/order-handle-no-login.component';
import { OrderHandleComponent } from '../components/pages/order/handling/order-handle/order-handle.component';
import { OrderitemConfirmationComponent } from '../components/pages/orderitem/orderitem-confirmation/orderitem-confirmation.component';
import { OrderitemCreationComponent } from '../components/pages/orderitem/orderitem-creation/orderitem-creation.component';
import { OrderitemInformationComponent } from '../components/pages/orderitem/orderitem-information/orderitem-information.component';
import { OverviewComponent } from '../components/pages/overview/overview.component';
import { SendMailComponent } from '../components/pages/send-mail/send-mail.component';
import { ListPanelActionComponent } from '../components/pages/settings/components/panel-settings-actions/components/list-panel-action/list-panel-action.component';
import { PanelSettingsActionsComponent } from '../components/pages/settings/components/panel-settings-actions/panel-settings-actions.component';
import { ListPanelCategoryComponent } from '../components/pages/settings/components/panel-settings-category/components/list-panel-category/list-panel-category.component';
import { PanelSettingsCategoryComponent } from '../components/pages/settings/components/panel-settings-category/panel-settings-category.component';
import { PanelSettingsCompaniesComponent } from '../components/pages/settings/components/panel-settings-companies/panel-settings-companies.component';
import { ListPanelContractSpecificationComponent } from '../components/pages/settings/components/panel-settings-contract-specifications/components/list-panel-contract-specification/list-panel-contract-specification.component';
import { PanelContractSpecificationItemComponent } from '../components/pages/settings/components/panel-settings-contract-specifications/components/panel-contract-specification-item/panel-contract-specification-item.component';
import { PanelSettingsContractSpecificationsComponent } from '../components/pages/settings/components/panel-settings-contract-specifications/panel-settings-contract-specifications.component';
import { ListPanelContractContractorComponent } from '../components/pages/settings/components/panel-settings-contracts/components/list-panel-contract-contractor/list-panel-contract-contractor.component';
import { ListPanelContractGovernmentComponent } from '../components/pages/settings/components/panel-settings-contracts/components/list-panel-contract-government/list-panel-contract-government.component';
import { PanelSettingsContractsComponent } from '../components/pages/settings/components/panel-settings-contracts/panel-settings-contracts.component';
import { PanelSettingsDomainsComponent } from '../components/pages/settings/components/panel-settings-domains/panel-settings-domains.component';
import { PanelSettingsGroupsComponent } from '../components/pages/settings/components/panel-settings-groups/panel-settings-groups.component';
import { PanelSettingsMainCategoryComponent } from '../components/pages/settings/components/panel-settings-main-category/panel-settings-main-category.component';
import { CreateButtonComponent } from '../components/pages/settings/components/panel-settings-pages/components/create-buttons/components/create-button/create-button.component';
import { CreateConditionComponent } from '../components/pages/settings/components/panel-settings-pages/components/create-buttons/components/create-condition/create-condition.component';
import { CreateConditionsComponent } from '../components/pages/settings/components/panel-settings-pages/components/create-buttons/components/create-conditions/create-conditions.component';
import { CreateButtonsComponent } from '../components/pages/settings/components/panel-settings-pages/components/create-buttons/create-buttons.component';
import { CreateOverviewColumnComponent } from '../components/pages/settings/components/panel-settings-pages/components/create-overview-column/create-overview-column.component';
import { CreateOverviewColumnsComponent } from '../components/pages/settings/components/panel-settings-pages/components/create-overview-columns/create-overview-columns.component';
import { ListPanelPagesOverviewComponent } from '../components/pages/settings/components/panel-settings-pages/components/list-panel-pages-overview/list-panel-pages-overview.component';
import { ListPanelPagesComponent } from '../components/pages/settings/components/panel-settings-pages/components/list-panel-pages/list-panel-pages.component';
import { PanelPageOverviewComponent } from '../components/pages/settings/components/panel-settings-pages/components/panel-page-overview/panel-page-overview.component';
import { PanelSettingsPagesComponent } from '../components/pages/settings/components/panel-settings-pages/panel-settings-pages.component';
import { ListPanelStatusComponent } from '../components/pages/settings/components/panel-settings-status/components/list-panel-status/list-panel-status.component';
import { PanelSettingsStatusComponent } from '../components/pages/settings/components/panel-settings-status/panel-settings-status.component';
import { ListPanelUserComponent } from '../components/pages/settings/components/panel-settings-users/components/list-panel-user/list-panel-user.component';
import { PanelSettingsUsersComponent } from '../components/pages/settings/components/panel-settings-users/panel-settings-users.component';
import { PanelSettingsComponent } from '../components/pages/settings/components/panel-settings/panel-settings.component';
import { SettingsTitleComponent } from '../components/pages/settings/components/settings-title/settings-title.component';
import { SettingsStartComponent } from '../components/pages/settings/settings-start/settings-start.component';
import { PanelAssignGAndUComponent } from '../components/panel/components/panel-assign-g-and-u/panel-assign-g-and-u.component';
import { PanelAssignGOrUComponent } from '../components/panel/components/panel-assign-g-or-u/panel-assign-g-or-u.component';
import { PanelInfoSecondComponent } from '../components/panel/components/panel-info-second/panel-info-second.component';
import { PanelInfoComponent } from '../components/panel/components/panel-info/panel-info.component';
import { PanelNewConfirmationComponent } from '../components/panel/components/panel-new-confirmation/panel-new-confirmation.component';
import { PanelNewContactComponent } from '../components/panel/components/panel-new-contact/panel-new-contact.component';
import { PanelNewInformationComponent } from '../components/panel/components/panel-new-information/panel-new-information.component';
import { PanelNewMapComponent } from '../components/panel/components/panel-new-map/panel-new-map.component';
import { PanelOrderConfirmationComponent } from '../components/panel/components/panel-order-confirmation/panel-order-confirmation.component';
import { PanelOrderHandleComponent } from '../components/panel/components/panel-order-handle/panel-order-handle.component';
import { PanelOrderInfoComponent } from '../components/panel/components/panel-order-info/panel-order-info.component';
import { PanelOrderSecondComponent } from '../components/panel/components/panel-order-second/panel-order-second.component';
import { PanelOrderSelectComponent } from '../components/panel/components/panel-order-select/panel-order-select.component';
import { PanelOrderSpecificationsComponent } from '../components/panel/components/panel-order-specifications/panel-order-specifications.component';
import { PanelOrderComponent } from '../components/panel/components/panel-order/panel-order.component';
import { PanelPersonSimpleComponent } from '../components/panel/components/panel-person-simple/panel-person-simple.component';
import { PanelPersonComponent } from '../components/panel/components/panel-person/panel-person.component';
import { PanelTabSelectorComponent } from '../components/panel/components/panel-tab-selector/panel-tab-selector.component';
import { PanelTitleComponent } from '../components/panel/components/panel-title/panel-title.component';
import { PanelToggleComponent } from '../components/panel/components/panel-toggle/panel-toggle.component';
import { PanelUserComponent } from '../components/panel/components/panel-user/panel-user.component';
import { PanelComponent } from '../components/panel/panel.component';
import { PopupConfirmComponent } from '../components/popup/components/popup-confirm/popup-confirm.component';
import { ToastComponent } from '../components/toast/toast.component';
import { UserHoverComponent } from '../components/user-hover/user-hover.component';
import { TruncatePipe } from '../pipes/truncate/truncate.pipe';
import { ListPanelDomainComponent } from '../components/pages/settings/components/panel-settings-domains/components/list-panel-domain/list-panel-domain.component';
import { FilterComponent } from '../components/filter/filter/filter.component';
import { HeaderGroupsComponent } from '../components/header/components/header-groups/header-groups.component';
import { LoaderComponent } from '../components/loader/loader.component';
import { ListPanelCompanyComponent } from '../components/pages/settings/components/panel-settings-companies/components/list-panel-company/list-panel-company.component';
import { ListPanelGroupComponent } from '../components/pages/settings/components/panel-settings-groups/components/list-panel-group/list-panel-group.component';
import { ListPanelMainCategoryComponent } from '../components/pages/settings/components/panel-settings-main-category/components/list-panel-main-category/list-panel-main-category.component';
import { SettingsButtonComponent } from '../components/pages/settings/components/settings-button/settings-button.component';
import { PanelChangeConfirmationComponent } from '../components/panel/components/panel-change-confirmation/panel-change-confirmation.component';
import { PopupComponent } from '../components/popup/popup.component';
import { DynamicLeftDirective } from '../directives/dynamic-left.directive';
import { DynamicRightDirective } from '../directives/dynamic-right.directive';
import { DynamicDirective } from '../directives/dynamic.directive';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { WebInterceptor } from '../interceptors/web.interceptor';

@NgModule({
  declarations: [
    AppComponent,
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
    PanelAssignGAndUComponent,
    OrderNotesComponent,
    OrderSpecificationsSelectComponent,
    OrderSpecificationsHandleComponent,
    OrderSpecificationsConfirmationComponent,
    PanelSettingsContractSpecificationsComponent,
    ListPanelContractSpecificationComponent,
    PanelContractSpecificationItemComponent,
    PanelOrderSelectComponent,
    PanelOrderHandleComponent,
    PanelOrderConfirmationComponent,
    PanelOrderSpecificationsComponent,
    UserHoverComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    AppRoutingModule
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
    SendMailComponent,
    OrderNotesComponent,
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
    PanelAssignGAndUComponent,
    OrderSpecificationsSelectComponent,
    OrderSpecificationsHandleComponent,
    OrderSpecificationsConfirmationComponent,
    PanelSettingsContractSpecificationsComponent,
    ListPanelContractSpecificationComponent,
    PanelContractSpecificationItemComponent,
    PanelOrderSelectComponent,
    PanelOrderHandleComponent,
    PanelOrderConfirmationComponent,
    PanelOrderSpecificationsComponent,
    UserHoverComponent
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync('noop'),
    provideHttpClient(withFetch()),
    {provide: MAT_DATE_LOCALE, useValue: 'nl-NL'},
    {provide: HTTP_INTERCEPTORS, useClass: WebInterceptor, multi: true},
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
