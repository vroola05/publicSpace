import { PageButton } from "./page-button";
import { PageType } from "./page-type";

export class Page {
    public id: number;
    public name: string;
    public pageType: PageType;
    public buttonsLeft: PageButton[];
    public buttonsRight: PageButton[];
}
  