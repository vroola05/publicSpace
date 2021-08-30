import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Document } from '../../../../model/document';
import { Image } from '../../../../model/image';

@Component({
  selector: 'lib-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent implements OnInit {
  @ViewChild('psGallery') public psGallery: ElementRef;
  @Output() clicked: EventEmitter<Image> = new EventEmitter<Image>();

  public shadow = '';
  public selected = 0;
  public index = 0;

  public _url: string;
  @Input() set url(url: string) {
    this._url = url;
  }

  public images: Image[] = [];
  @Input() set documents(documents: Document[]) {
    if (documents) {
      this.images = [];

      documents.forEach(document => {
        this.images.push(this.getImage(document));
      });

      setTimeout(() => {
        this.setShadow(this.psGallery.nativeElement.children.length);

        if (documents.length > 0) {
          this.click(0, this.images[0]);
        }
      });
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

  public click(selected: number, image: Image) {
    this.selected = selected;
    this.clicked.emit(image);
  }

  public getImage(document: Document): Image {
    const image = new Image();
    image.url = `${this._url}/${document.id}`;
    image.name = document.name;
    image.alt = document.title;
    return image;
  }

  public previous($event): void {
    setTimeout(() => {
      if (this.psGallery.nativeElement) {
        const galleryRect = this.psGallery.nativeElement.getBoundingClientRect();
        const images: any[] = this.psGallery.nativeElement.children;

        let size = 0;
        if (this.index >= 0) {
          for (this.index; this.index > 0; this.index--) {
            if (size + images[this.index].getBoundingClientRect().width < galleryRect.width) {
              size += images[this.index].getBoundingClientRect().width;
            } else {
              break;
            }
          }
        }
        this.setShadow(images.length);
        this.psGallery.nativeElement.scrollLeft -= size;
      }
    });
  }

  public next($event): void {
    setTimeout(() => {
      if (this.psGallery.nativeElement) {
        const galleryRect = this.psGallery.nativeElement.getBoundingClientRect();
        const images: any[] = this.psGallery.nativeElement.children;

        let size = 0;
        if (this.index < images.length) {
          let i = this.index;
          for (i = this.index; i < images.length - 1; i++) {
            if (size + images[i].getBoundingClientRect().width < galleryRect.width) {
              size += images[i].getBoundingClientRect().width;
            } else {
              break;
            }
          }
          this.index = i;
        }
        this.setShadow(images.length);
        this.psGallery.nativeElement.scrollLeft += size;
      }
    });
  }

  public showPrevious(): boolean {
    return this.index > 0;
  }

  public showNext(): boolean {
    return this.index < this.images.length - 1;
  }

  public setShadow(size: number) {
    if (this.index > 0 && this.index < size - 1) {
      this.shadow = 'shadowLeft shadowRight';
    } else
    if (this.index > 0 ) {
      this.shadow = 'shadowLeft';
    } else
    if ( this.index < size - 1 ) {
      this.shadow = 'shadowRight';
    } else {
      this.shadow = '';
    }
  }

  public isSelected(index: number): string {
    return index === this.selected ? 'selected' : '';
  }
}
