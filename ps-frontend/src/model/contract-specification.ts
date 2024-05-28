import { ContractSpecificationItem } from "./contract-specification-item";

export class ContractSpecification {
  public id: number;
  public description: string;
  public dateCreated?: Date;
  public dateStart?: Date;
  public dateEnd?: Date;
  public active?: boolean;

  public contractSpecificationItems?: ContractSpecificationItem[];
}
