import * as RJD from 'react-js-diagrams';
import { StorageClassNodeWidgetFactory } from './StorageClassNodeWidget';

export class StorageClassWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('storageClass');
  }

  generateReactWidget(diagramEngine, node) {
    return StorageClassNodeWidgetFactory({ node });
  }
}
