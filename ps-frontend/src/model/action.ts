import { ActionType } from "./action-type";
import { Status } from "./status";

export class Action {
  public id: number;
  public actionType: ActionType;
  public status: Status;
}
