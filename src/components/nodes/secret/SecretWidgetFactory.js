import * as RJD from 'react-js-diagrams';
import { SecretNodeWidgetFactory } from './SecretNodeWidget';

export class SecretWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('secret');
  }

  generateReactWidget(diagramEngine, node) {
    return SecretNodeWidgetFactory({ node });
  }
}
