import { FabricObject, Object } from 'fabric';

export interface ICustomFabricObject extends Object, FabricObject {
  objectId?: string;
}
