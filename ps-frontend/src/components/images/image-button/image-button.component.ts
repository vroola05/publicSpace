import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Popup } from '../../../services/popup/popup.service';
import { Document } from '../../../model/document';
import { Image } from '../../../model/image';
import { ImageViewerComponent } from '../image-viewer/image-viewer.component';
import { Loader } from '../../../services/loader/loader.service';
import { EndpointService } from '../../../services/endpoint/endpoint.service';
import { AuthorisationService } from '../../../services/authorisation/authorisation.service';
import { ConfigService } from '../../../services/config/config.service';

@Component({
  selector: 'app-image-button',
  templateUrl: './image-button.component.html',
  styleUrls: ['./image-button.component.scss']
})
export class ImageButtonComponent implements OnInit {
  @ViewChild('inputUpload') public inputUpload: ElementRef = {} as ElementRef;

  @Input() urlImage: string = '';
  @Input() documents: Document[] = [];

  constructor(
    private endpoints: EndpointService,
    private authorisation: AuthorisationService,
    private config: ConfigService,
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
    return false;
    //return this.authorisation.hasRoles(this.config.getEndpoint('postImage').roles);
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
    const file = $event.target.files[0];
    if (file) {
      const extension = this.getFileExtension(file.name).toLowerCase();
      if (extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png' && extension !== 'gif') {
        return;
      }
      const loader = this.loader.add('Bezig met uploaden!');
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);

      this.endpoints.post('postImage', formData, {}, true).then(result => {
          this.loader.remove(loader);
          this.endpoints.get('getImages').then(documents => {
            this.documents = documents;
          });
      })
      .catch(() => {
        this.loader.remove(loader);
      });
    }
  }

  protected getFileExtension(filename: string) {
    return filename.split('.').pop();
  }
}
