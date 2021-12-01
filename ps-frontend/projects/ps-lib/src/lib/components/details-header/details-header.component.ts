import { Component, Input, OnInit } from '@angular/core';
import { CallList } from '../../../model/call-list';
import { ListTemplateColumnT } from '../../../model/template';
import { ConfigService } from '../../services/config/config.service';
import moment from 'moment';

@Component({
  selector: 'lib-details-header',
  templateUrl: './details-header.component.html',
  styleUrls: ['./details-header.component.scss']
})
export class DetailsHeaderComponent implements OnInit {
  public columns: ListTemplateColumnT[] = [];
  public open = false;

  @Input() public data: CallList;

  constructor(
    private config: ConfigService,
  ) { }

  public ngOnInit(): void {
    if (this.config.template.components && this.config.template.components) {
      this.columns = this.config.template.components.detailsHeader;
    }
  }

  public toggle() {
    this.open = !this.open;
  }

  public getValue(id: string): string {
    return this.data[id] ? this.data[id] : ' ';
  }

  public date(id: string): string {
    const date = this.data[id] as Date;
    if (date) {
      return moment(date).format('DD MMM YYYY');
    }
    return '';
  }
  
  public dateAsDays(id: string): string {
    const date = this.data[id] as Date;
    const today = new Date().setHours(0, 0, 0, 0);
    const dateHours = new Date(date).setHours(0, 0, 0, 0);
    const days = Math.abs(Math.round(((new Date(today).getTime() - new Date(dateHours).getTime()) / 1000) / (60 * 60 * 24)));
    return (days === 0 ? 'Vandaag' : (days === 1 ? days + ' dag' : days + ' dagen'));
  }

}
