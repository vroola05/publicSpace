export class CallList {
  public id: number = undefined;
  public category?: string = undefined;
  public description?: string = undefined;
  public location?: string = undefined;
  public street?: string = undefined;
  public number?: string = undefined;
  public postal?: string = undefined;
  public city?: string = undefined;
  public priority?: boolean;
  public confidential?: boolean = undefined;
  public casenumber?: string = undefined;
  public status?: string = undefined;
  public notification?: string;

  public dateCreated?: string = undefined;
  public dateEnded?: string = undefined;
  public x?: number;
  public y?: number;
  public distanceCentre?: number;

  public area?: number = undefined;
  public supervisor?: string = undefined;
  public group?: string = undefined;
  public orderId?: number;
}
