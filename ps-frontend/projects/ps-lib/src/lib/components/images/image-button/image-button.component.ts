import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Popup } from '../../../services/popup/popup.service';
import { Document } from '../../../../model/document';
import { Image } from '../../../../model/image';
import { ImageViewerComponent } from '../image-viewer/image-viewer.component';
import { ApiService } from '../../../services/api/api.service';
import { Loader } from '../../../services/loader/loader.service';

@Component({
  selector: 'lib-image-button',
  templateUrl: './image-button.component.html',
  styleUrls: ['./image-button.component.scss']
})
export class ImageButtonComponent implements OnInit {
  @ViewChild('inputUpload') public inputUpload: ElementRef;

  @Input() urlImages: string;
  @Input() urlImage: string;
  @Input() urlImageUpload: string;
  @Input() documents: Document[];

  constructor(
    private apiService: ApiService,
    private popup: Popup,
    private loader: Loader) {

  }

  public ngOnInit(): void {
  }

  public popupImage($event) {
    if (this.hasImages()) {
      this.popup.add('Afbeelding', ImageViewerComponent, {
        url: this.urlImage,
        documents: this.documents
      });
    }
  }

  public hasImages(): boolean {
    return this.documents && this.documents.length > 0;
  }

  public hasUploadUrl(): boolean {
    return this.urlImageUpload && this.urlImageUpload !== '';
  }

  public getImage(): Image {
    const document = this.documents[0];
    const image = new Image();
    image.url = `${this.urlImage}/${document.id}`;
    image.name = document.name;
    image.alt = document.title;
    return image;
  }

  public hasOverlayText(): string {
    return !this.documents || this.documents.length === 0 ? 'Geen foto\'s' : this.documents.length + ' foto\'s';
  }

  public uploadPhotoClick() {
    this.inputUpload.nativeElement.click();
  }

  public uploadPhoto($event): void {
    if (this.hasUploadUrl()) {
      const file = $event.target.files[0];
      if (file) {
        const extension = this.getFileExtension(file.name).toLowerCase();
        if (extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png' && extension !== 'gif') {
          return;
        }
        const loader = this.loader.add('Bezig met uploaden!');
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        this.apiService.post(this.urlImageUpload, formData, {}, true).subscribe(result => {
          this.loader.remove(loader);
          if (this.urlImages) {
            this.apiService.get(this.urlImages).subscribe(documents => {
              this.documents = documents;
            });
          }
        },
        () => {
          this.loader.remove(loader);
        });
      }
    }
  }

  protected getFileExtension(filename: string) {
    return filename.split('.').pop();
  }
}
