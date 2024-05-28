import { ActionType } from "./action-type";
import { ButtonTypes } from "./intefaces";
import { PageButtonCondition } from "./page-button-condition";
import { Role } from "./role";

export class PageButton {
    public id: number;
    public name: string;
    public route: string;
    public action: ActionType;
    public type: ButtonTypes;
    public roles?: Role[];
    public conditions?: PageButtonCondition[];
  }
  