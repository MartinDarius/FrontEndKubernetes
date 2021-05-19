import * as RJD from 'react-js-diagrams';
import { PersistentVolumeNodeWidgetFactory } from './PersistentVolumeNodeWidget';

export class PersistentVolumeWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('persistentVolume');
  }

  generateReactWidget(diagramEngine, node) {
    return PersistentVolumeNodeWidgetFactory({ node });
  }
}
