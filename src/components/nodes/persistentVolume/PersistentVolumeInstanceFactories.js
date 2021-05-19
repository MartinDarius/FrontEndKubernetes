import * as RJD from 'react-js-diagrams';
import { PersistentVolumeNodeModel } from './PersistentVolumeNodeModel';

export class PersistentVolumeNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('PersistentVolumeNodeModel');
  }

  getInstance() {
    return new PersistentVolumeNodeModel();
  }
}
