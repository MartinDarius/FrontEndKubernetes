import * as RJD from 'react-js-diagrams';
import { PersistentVolumeClaimNodeModel } from './PersistentVolumeClaimNodeModel';

export class PersistentVolumeClaimNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('PersistentVolumeClaimNodeModel');
  }

  getInstance() {
    return new PersistentVolumeClaimNodeModel();
  }
}
