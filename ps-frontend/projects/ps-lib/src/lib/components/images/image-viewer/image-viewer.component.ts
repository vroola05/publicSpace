import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { IPopup, PopupETypes } from '../../../../model/intefaces';
import { Document } from '../../../../model/document';
import { Image } from '../../../../model/image';

@Component({
  selector: 'lib-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent implements IPopup, OnInit {
  public events: EventEmitter<{event: PopupETypes, data?: any}> = new EventEmitter<{event: PopupETypes, data?: any}>();
  public image: Image;

  public _url: string;
  @Input() set url(url: string) {
    this._url = url;
  }
  public _documents: Document[] = [];
  @Input() set documents(documents: Document[]) {
    this._documents = documents;
  }

  constructor() { }

  ngOnInit(): void {
  }

  public click(image: Image) {
    this.image = image;
  }
}
