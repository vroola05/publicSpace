export class CallList {
  public id: number;
  public category?: string;
  public description?: string;
  public location?: string;
  public street?: string;
  public number?: string;
  public postal?: string;
  public city?: string;
  public priority?: boolean;
  public confidential?: boolean;
  public casenumber?: string;
  public status?: string;
  public notification?: string;

  public dateCreated?: string;
  public dateEnded?: string;
  public x?: number;
  public y?: number;
  public distanceCentre?: number;

  public area?: number;
  public supervisor?: string;
  public group?: string;
  public orderId?: number;
}
