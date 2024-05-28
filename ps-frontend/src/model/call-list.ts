import { List } from "./list";

export class CallList extends List {
  public override priority?: boolean = undefined;
  public confidential?: boolean = undefined;
  public area?: number = undefined;
}
