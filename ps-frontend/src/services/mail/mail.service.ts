import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, } from 'rxjs';
import { Message } from '../../model/message';
import { EndpointService } from '../endpoint/endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  private template = '';
  private text = '';
  private textObserver: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private descriptor: string;

  constructor(
    private endpoints: EndpointService
  ) { }

  public clear(): void {
    this.template = '';
    this.text = '';
    this.textObserver.next(null);
  }

  public setDescriptor(descriptor: string): void {
    this.descriptor = descriptor;
  }

  public templateObservable(): Observable<any> {
    return this.textObserver.asObservable();
  }

  public setText(text: string): void {
    this.text = text;
    if (this.template) {
      if (text || text === '') {
        this.textObserver.next(this.template.replace(this.descriptor, text));
      } else {
        this.textObserver.next(null);
      }
    }
  }

  public reveiveMailTemplate(url: string, data: any, method: string): void {
    if (!url) {
      this.textObserver.next(null);
    }
    if (method === 'post') {
      this.endpoints.post(url, data).then((message: Message) => {
        this.template = this.replaceLinebreaks(message.message);
        this.setText(this.text);
      })
      .catch((err) => {
        this.template = '';
        this.setText(this.text);
      });
    } else {
      this.endpoints.get(url).then((message: Message) => {
        this.template = this.replaceLinebreaks(message.message);
        this.setText(this.text);
      })
      .catch((err) => {
        this.template = '';
        this.setText(this.text);
      })
    }
  }

  private replaceLinebreaks(value: string): string {
    return value === undefined || value === null ? '' : value.replace(new RegExp('\n', 'g'), '<br />');
  }
}
