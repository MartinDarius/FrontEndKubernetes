import * as RJD from 'react-js-diagrams';
import { ConfigMapNodeWidgetFactory } from './ConfigMapNodeWidget';

export class ConfigMapWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('configMap');
  }

  generateReactWidget(diagramEngine, node) {
    return ConfigMapNodeWidgetFactory({ node });
  }
}
