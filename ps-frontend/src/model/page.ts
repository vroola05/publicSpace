import { PageConfig } from "./domain-type-config";
import { PageLayoutType } from "./intefaces";
import { PageButton } from "./page-button";
import { PageOverviewTemplate } from "./page-overview-template";
import { PageType } from "./page-type";

export class Page {
    public id: number;
    public name: string;
    public layoutType: PageLayoutType;
    public pageType: PageType;
    public buttonsLeft: PageButton[];
    public buttonsRight: PageButton[];
    public pageOverviewTemplate?: PageOverviewTemplate[];
    public pageConfig: PageConfig;
}
  