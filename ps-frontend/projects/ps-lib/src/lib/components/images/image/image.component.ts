import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, Subscription } from 'rxjs';
import { Image } from '../../../../model/image';
import { ApiService } from '../../../services/api/api.service';

@Component({
  selector: 'lib-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit, OnDestroy {
  private subscription: Subscription[] = [];

  public _image: Image;
  @Input() set image(image: Image) {
    if ((!this._image && image) || (this._image && image && this._image.url !== image.url)) {
      this._image = image;
      this.subscription.push(this.getImage(this._image.url).subscribe(blob => {
        this.blobToImage(blob);
      }));
    }
  }

  public _classes: string;
  @Input() set classes(classes: string) {
    this._classes = classes;
  }

  public blobString: string;

  constructor(
    public sanitizer: DomSanitizer,
    private apiService: ApiService) { }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }

  public getImage(url: string): Observable<any> {
    return this.apiService.get(url, { responseType: 'blob' });
  }

  private blobToImage(blob: Blob): void {
    if (blob && blob instanceof Blob) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        this.blobString = reader.result as string;
      }, false);
      reader.readAsDataURL(blob);
    }
  }
}
