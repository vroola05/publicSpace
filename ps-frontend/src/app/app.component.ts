import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../model/user';
import { ActionService } from '../services/action/action.service';
import { AuthorisationService } from '../services/authorisation/authorisation.service';
import { ConfigService } from '../services/config/config.service';
import { NavigationService } from '../services/navigation/navigation.service';
import { StorageService } from '../services/storage/storage.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public loaded = false;
  public groupsLoaded = false;
  title = 'Public space';

  constructor(
    private activatedRoute: ActivatedRoute,
    private authorisation: AuthorisationService,
    private navigationService: NavigationService,
    protected action: ActionService,
    private storage: StorageService,
    private config: ConfigService
  ) {

      this.authorisation.userObservable.subscribe((user: User) => {
        this.navigationService.clearHeaderItems();
        if (user === null) {
          this.navigationService.navigate(['login']);
          this.loaded = true;
        } else {
          if (this.storage.getSession('haslogin') !== '1' && this.config.headers.length > 0) {
            this.storage.setSession('haslogin', '1');
            this.navigationService.navigate(['/overview/' + this.config.headers[0].id]);
          }
          this.loaded = true;
        }
      });

  }

  public noLogin(): boolean {
    if (
      this.activatedRoute.snapshot
      && this.activatedRoute.snapshot.firstChild
      && this.activatedRoute.snapshot.firstChild.data
      && this.activatedRoute.snapshot.firstChild.data['noLogin']) {
      return true;
    }
    return false;
  }
 
}
