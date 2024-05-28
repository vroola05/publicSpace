import { Company } from "./company";
import { DomainType } from "./domain-type";

export class Domain {
  public id: number;
  public name: string;
  public domain: string;
  public company: Company;
  public domainType: DomainType;
}
