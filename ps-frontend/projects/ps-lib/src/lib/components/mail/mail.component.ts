import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, Subscription } from 'rxjs';
import { MailService } from '../../services/mail/mail.service';

@Component({
  selector: 'lib-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.scss']
})
export class MailComponent implements OnInit, OnDestroy {
  private mailSubscription: Subscription;
  @Input() public title: string;

  public template: any;

  constructor(
    public sanitizer: DomSanitizer,
    private mailService: MailService
  ) {}

  public ngOnInit(): void {
    this.mailSubscription =
      this.mailService.templateObservable().subscribe((template: string) => {
        this.template = template;
      });
  }

  public ngOnDestroy(): void {
    if (this.mailSubscription) {
      this.mailSubscription.unsubscribe();
    }
  }
}
