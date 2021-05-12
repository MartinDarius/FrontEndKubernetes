import * as RJD from 'react-js-diagrams';
import { StorageClassNodeModel } from './StorageClassNodeModel';

export class StorageClassNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('StorageClassNodeModel');
  }

  getInstance() {
    return new StorageClassNodeModel();
  }
}
