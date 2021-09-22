import { ActionType } from "./action-type";
import { PageButtonCondition } from "./page-button-condition";
import { PageType } from "./page-type";
import { Role } from "./role";

export class PageButton {
    public id: number;
    public name: string;
    public route: string;
    public action: ActionType;
    public type: string;
    public roles?: Role[];
    public conditions?: PageButtonCondition[];
  }
  