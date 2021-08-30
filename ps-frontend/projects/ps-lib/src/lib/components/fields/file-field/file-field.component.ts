import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ButtonTypes } from '../../../../model/intefaces';
import { FieldAbstract } from '../field-abstract';

@Component({
  selector: 'lib-file-field',
  templateUrl: './file-field.component.html',
  styleUrls: ['./file-field.component.scss']
})
export class FileFieldComponent extends FieldAbstract implements OnInit, OnDestroy {
  @ViewChild('uploader') public uploader: ElementRef;
  @Input() amount = 1;
  public buttonTypes = ButtonTypes;
  @Input() files: File[] = [];

  constructor() {
    super();
    this.value = '';
  }

  public ngOnInit(): void {
    super.ngOnInit();
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  public getFileSize(size: number) {
    if (size < 1000) {
      return size + 'b';
    } else if (size < 1000 * 1000) {
      return this.round(size / 1000) + 'kb';
    } else if (size < 1000 * 1000 * 1000) {
      return this.round(size / 1000 / 1000) + 'mb';
    } else {
      return this.round(size / 1000 / 1000 / 1000) + 'gb';
    }
  }

  public round(num: number): number {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  }

  public onChanged(event): void {
    if (event.target.files.length > this.amount) {
      alert('Het maximale aantal bestanden is ' + this.amount + '.');
      return;
    }

    for (const file of event.target.files) {
      this.files.push(file);
    }
    event.target.value = '';
    this.changed.emit(this.files);
  }

  public removeFile(file: File) {
    this.files.splice(this.files.indexOf(file), 1);
    this.changed.emit(this.files);
  }

  public addFile() {
    this.uploader.nativeElement.click();
  }
}
