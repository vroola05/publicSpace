import { PageButton } from "./page-button";
import { PageOverviewColumns } from "./page-overview-columns";
import { Status } from "./status";

export class PageOverviewTemplate {
    public id: number;
    public name: string;
    public icon: string;
    public route: string;
    public toggle?: boolean;
    public priority?: boolean;
    public personal?: boolean;

    public statusses?: Status[] = [];
    public columns?: PageOverviewColumns[] = [];
    public buttonsLeft: PageButton[] = [];
    public buttonsRight: PageButton[] = [];
}
  