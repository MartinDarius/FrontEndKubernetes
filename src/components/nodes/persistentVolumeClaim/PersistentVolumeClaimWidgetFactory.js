import * as RJD from 'react-js-diagrams';
import { PersistentVolumeClaimNodeWidgetFactory } from './PersistentVolumeClaimNodeWidget';

export class PersistentVolumeClaimWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('persistentVolumeClaim');
  }

  generateReactWidget(diagramEngine, node) {
    return PersistentVolumeClaimNodeWidgetFactory({ node });
  }
}
