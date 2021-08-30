import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, Subscription } from 'rxjs';
import { Image } from '../../../../../model/image';
import { ApiService } from '../../../../services/api/api.service';

@Component({
  selector: 'lib-panel-supervisor',
  templateUrl: './panel-supervisor.component.html',
  styleUrls: ['./panel-supervisor.component.scss']
})
export class PanelSupervisorComponent implements OnInit, OnDestroy {
  public _image: Image;
  @Input() public set image(image: Image) {
    if (!this._image || this._image.url !== image.url) {
      this._image = {...image};
    }
  }
  public blobString: string;
  private imageSubscription: Subscription;

  constructor(
    public sanitizer: DomSanitizer,
    private apiService: ApiService) { }

  public ngOnInit(): void {
    if (this._image.url) {
      if (this._image.api) {
        this.imageSubscription = this.getImage(this._image.url).subscribe(blob => {
          this.blobToImage(blob);
          this.imageSubscription.unsubscribe();
        });
      } else if (this.blobString !== this._image.url) {
        this.blobString = this._image.url;
      }
    }
  }

  public ngOnDestroy(): void {
    if (this.imageSubscription) {
      this.imageSubscription.unsubscribe();
    }
  }

  public getImage(url: string): Observable<any> {
    return this.apiService.get(url, { responseType: 'blob' });
  }

  public blobToImage(blob: Blob): void {
    if (blob && blob instanceof Blob) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        this.blobString = reader.result as string;
      }, false);
      reader.readAsDataURL(blob);
    }
  }

  public getNameAsAvatar(image: Image): string {
    if (!image || !image.alt) {
      return '';
    }
    const letters = image.alt.split(' ').map((name) => {
      return name[0];
    });
    return letters.join('');
  }
}
