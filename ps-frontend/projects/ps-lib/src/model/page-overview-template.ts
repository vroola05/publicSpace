import { PageButton } from "./page-button";
import { PageOverviewColumns } from "./page-overview-columns";
import { PageType } from "./page-type";

export class PageOverviewTemplate {
    public id: number;
    public name: string;
    public route: string;
    public toggle?: boolean;
    public priority?: boolean;
    public personal?: boolean;

    public columns?: PageOverviewColumns[];
    public buttonsLeft: PageButton[];
    public buttonsRight: PageButton[];
}
  