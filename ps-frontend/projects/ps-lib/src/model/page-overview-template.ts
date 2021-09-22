import { PageButton } from "./page-button";
import { PageType } from "./page-type";

export class PageOverviewTemplate {
    public id: number;
    public name: string;
    public route: string;
    public toggle?: boolean;
    public priority?: boolean;
    
    public buttonsLeft: PageButton[];
    public buttonsRight: PageButton[];
}
  