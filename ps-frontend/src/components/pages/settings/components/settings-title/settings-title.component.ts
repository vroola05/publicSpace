import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EnvironmentService } from '../../../../../services/environment/environment.service';
import { Environment } from '../../../../../model/intefaces';

@Component({
  selector: 'app-settings-title',
  templateUrl: './settings-title.component.html',
  styleUrls: ['./settings-title.component.scss']
})
export class SettingsTitleComponent implements OnInit {

  public title = '';
  public environment: Environment;

  constructor(
    protected activatedRoute: ActivatedRoute,
    private environmentService: EnvironmentService
  ) {
    this.environment = this.environmentService.get();
    if (this.activatedRoute.snapshot.data && this.activatedRoute.snapshot.data['title']) {
      this.title = this.activatedRoute.snapshot.data['title'];
    }
  }

  ngOnInit(): void {
  }

}
