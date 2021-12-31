import { EventEmitter } from "@angular/core";
import { Contract } from "../../../../../../../model/contract";

export interface ListPanelContractComponent {  
    onEvent: EventEmitter<{ action: string, isNew: boolean, data: any }>;
    isNew: boolean;
    contract: Contract;
  }