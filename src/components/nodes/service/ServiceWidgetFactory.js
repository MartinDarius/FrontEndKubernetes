import * as RJD from 'react-js-diagrams';
import { ServiceNodeWidgetFactory } from './ServiceNodeWidget';

export class ServiceWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('service');
  }

  generateReactWidget(diagramEngine, node) {
    return ServiceNodeWidgetFactory({ node });
  }
}
